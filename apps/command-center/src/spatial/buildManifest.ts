// Reader for the second spatial format: the Roblox build manifest under
// `output/architecture/<slug>/roblox-build-manifest.json`.
//
// This format carries build intent and no geometry — an assembly declares an id, the Y it sits
// at, a part budget, and prose jobs, with one envelope box for the whole build. It is therefore
// read as *envelope* precision throughout: nothing here is a measured footprint, and the renderer
// must not draw it as one.
//
// Unlike `validateGridSpec`, this reader **degrades rather than refuses**. The operator's blocker
// was "I couldn't load it to the viewer", so a manifest that is partly unreadable still yields a
// scene plus a list of what could not be read. Only a document that is not a manifest at all is
// rejected outright.
import type { StudPair } from './gridSpec';

export const MAX_MANIFEST_BYTES = 2 * 1024 * 1024;

/** The reference grid the lens draws. A manifest declares no grid; this is a viewer default. */
const REFERENCE_GRID = { minor: 4, major: 16, super: 64 } as const;

export interface ManifestAssembly {
  id: string;
  partBudget: number;
  jobs: string[];
}

/**
 * One declared Y level. Assemblies are grouped by their `layer_y` rather than drawn individually,
 * because the manifest gives no X/Z for any of them — two assemblies sharing a layer share the
 * only footprint the document actually states.
 */
export interface ManifestLayer {
  y: number;
  assemblies: ManifestAssembly[];
  partBudget: number;
}

export interface ManifestBudgets {
  baseparts?: number;
  localLights?: number;
  shadowCasters?: number;
  particleEmitters?: number;
  scripts?: number;
}

export interface ManifestMaterialToken {
  token: string;
  fallbackMaterial: string;
  /** CSS color derived from the declared `fallback_color` RGB triple, when it is a valid one. */
  fallbackColor?: string;
  /** The `_BLK` texture family this token is waiting on, or null when none is named. */
  candidate: string | null;
}

export interface ManifestModel {
  kind: 'manifest';
  raw: Record<string, unknown>;
  title: string;
  status: string;
  revision: string;
  date: string;
  authority: string;
  origin: StudPair;
  north: string;
  boundsX: StudPair;
  boundsZ: StudPair;
  size: StudPair;
  grid: { minor: number; major: number; super: number };
  /** Full declared envelope, [x, y, z] studs. */
  envelope: readonly [number, number, number];
  layers: ManifestLayer[];
  assemblyCount: number;
  budgets: ManifestBudgets;
  materialTokens: ManifestMaterialToken[];
  qaViews: string[];
  preserve: string[];
  promotionGates: Record<string, boolean>;
  /** Everything this reader could not make sense of, surfaced instead of thrown. */
  warnings: string[];
}

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function finiteOr(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function text(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : [];
}

/** A manifest is recognized by carrying assemblies, not by its schema_version — 0.1 may move. */
export function looksLikeBuildManifest(value: unknown): boolean {
  return Array.isArray(record(value).assemblies);
}

export function validateBuildManifest(input: unknown): ManifestModel {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Build manifest must be a JSON object');
  }
  const root = input as UnknownRecord;
  const warnings: string[] = [];

  if (!Array.isArray(root.assemblies)) {
    throw new Error('Build manifest declares no assemblies[] — nothing to place');
  }

  const coordinate = record(root.coordinate_contract);
  const envelopeRaw = coordinate.envelope_studs;
  let envelope: readonly [number, number, number] = [64, 32, 64];
  if (
    Array.isArray(envelopeRaw) &&
    envelopeRaw.length === 3 &&
    envelopeRaw.every((n) => typeof n === 'number' && Number.isFinite(n) && n > 0)
  ) {
    envelope = [envelopeRaw[0], envelopeRaw[1], envelopeRaw[2]] as const;
  } else {
    warnings.push(
      'coordinate_contract.envelope_studs is missing or invalid — falling back to a 64 × 32 × 64 stud box',
    );
  }

  const originRaw = coordinate.origin;
  let origin: StudPair = [0, 0];
  if (
    Array.isArray(originRaw) &&
    originRaw.length === 3 &&
    originRaw.every((n) => typeof n === 'number' && Number.isFinite(n))
  ) {
    origin = [originRaw[0], originRaw[2]];
  } else if (originRaw != null) {
    warnings.push('coordinate_contract.origin is not an [x, y, z] triple — assuming the world origin');
  }

  // The manifest states forward/teleport axes rather than a north. The lens is -Z north, so that
  // is what the scene is drawn against; say so rather than implying the document declared it.
  const forward = text(coordinate.forward_axis, '');
  if (forward) {
    warnings.push(
      `This manifest declares forward_axis ${forward} and no north; the preview is drawn with the lens convention, north = -Z`,
    );
  }

  const byLayer = new Map<number, ManifestAssembly[]>();
  let assemblyCount = 0;
  for (let index = 0; index < root.assemblies.length; index += 1) {
    const entry = record(root.assemblies[index]);
    const id = text(entry.id, '');
    if (!id) {
      warnings.push(`assemblies[${index}] has no id and was skipped`);
      continue;
    }
    if (typeof entry.layer_y !== 'number' || !Number.isFinite(entry.layer_y)) {
      warnings.push(`Assembly "${id}" declares no numeric layer_y and was skipped`);
      continue;
    }
    const assembly: ManifestAssembly = {
      id,
      partBudget: Math.max(0, Math.round(finiteOr(entry.part_budget, 0))),
      jobs: stringList(entry.jobs),
    };
    const existing = byLayer.get(entry.layer_y);
    if (existing) existing.push(assembly);
    else byLayer.set(entry.layer_y, [assembly]);
    assemblyCount += 1;
  }

  if (assemblyCount === 0) {
    throw new Error('No assembly in this manifest declares both an id and a layer_y');
  }

  const layers: ManifestLayer[] = [...byLayer.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([y, assemblies]) => ({
      y,
      assemblies,
      partBudget: assemblies.reduce((sum, a) => sum + a.partBudget, 0),
    }));

  const budgetsRaw = record(root.budgets);
  const budgets: ManifestBudgets = {
    baseparts: typeof budgetsRaw.generated_baseparts_max === 'number' ? budgetsRaw.generated_baseparts_max : undefined,
    localLights: typeof budgetsRaw.active_local_lights_max === 'number' ? budgetsRaw.active_local_lights_max : undefined,
    shadowCasters:
      typeof budgetsRaw.shadow_casting_local_lights_max === 'number'
        ? budgetsRaw.shadow_casting_local_lights_max
        : undefined,
    particleEmitters: typeof budgetsRaw.particle_emitters_max === 'number' ? budgetsRaw.particle_emitters_max : undefined,
    scripts: typeof budgetsRaw.scripts_in_root_max === 'number' ? budgetsRaw.scripts_in_root_max : undefined,
  };

  // Material tokens carry a fallback material/color pair plus the texture family they are waiting
  // on. Only the fallback material is required; a bad color triple degrades to "no swatch".
  const materialTokens: ManifestMaterialToken[] = [];
  for (const [token, definitionRaw] of Object.entries(record(root.material_tokens))) {
    const definition = record(definitionRaw);
    const fallbackMaterial = text(definition.fallback_material, '');
    if (!fallbackMaterial) {
      warnings.push(`material_tokens.${token} declares no fallback_material and was skipped`);
      continue;
    }
    const rgb = definition.fallback_color;
    const fallbackColor =
      Array.isArray(rgb) &&
      rgb.length === 3 &&
      rgb.every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 255)
        ? `rgb(${rgb.map((n) => Math.round(n)).join(', ')})`
        : undefined;
    materialTokens.push({
      token,
      fallbackMaterial,
      ...(fallbackColor ? { fallbackColor } : {}),
      candidate: text(definition.candidate, '') || null,
    });
  }

  // The manifest tracks authorization as `*_authorized` booleans rather than a promotionGates
  // block; surface them through the same gate display so both formats read alike.
  const authorityRaw = record(root.authority);
  const promotionGates: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(authorityRaw)) {
    if (typeof value === 'boolean') promotionGates[key] = value;
  }

  const halfX = envelope[0] / 2;
  const halfZ = envelope[2] / 2;

  return {
    kind: 'manifest',
    raw: root,
    title: text(root.design_id, 'Untitled build manifest')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    status: text(root.status, 'manifest'),
    revision: text(root.schema_version, '—'),
    date: text(record(root.studio_evidence).captured_on, '—'),
    authority: text(
      record(root.ownership).root_name,
      'Build manifest — envelope precision, no measured footprints',
    ),
    origin,
    north: '-Z',
    boundsX: [origin[0] - halfX, origin[0] + halfX],
    boundsZ: [origin[1] - halfZ, origin[1] + halfZ],
    size: [envelope[0], envelope[2]],
    grid: { ...REFERENCE_GRID },
    envelope,
    layers,
    assemblyCount,
    budgets,
    materialTokens,
    qaViews: stringList(root.qa_views),
    preserve: stringList(root.preserve),
    promotionGates,
    warnings,
  };
}

export function parseBuildManifestText(text: string, byteLength: number): ManifestModel {
  if (byteLength > MAX_MANIFEST_BYTES) {
    throw new Error('Build manifest exceeds the 2 MiB local-file limit');
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Build manifest is not valid JSON');
  }
  return validateBuildManifest(parsed);
}
