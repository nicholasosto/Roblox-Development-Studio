// Sidecar review annotations for spatial documents — the third capability of the review loop
// (visualise → find → comment), kept OUT of the contract on purpose: the contract stays
// geometry-only, while notes live in a companion `<spec>.annotations.json` that diffs in git and
// can be handed to a builder (Codex) verbatim.
//
// Trust policy: annotations are review metadata, not dimensions. Per the 0013 rule (dimensional
// hard, cosmetic soft) a malformed sidecar must never cost the scene — this reader degrades to
// `{ notes, warnings }` and only an entirely wrong schema string discards the file, mirroring how
// the appearance block is matched by exact string and dropped whole on a version bump.
//
// Anchors are single strings so a note records exactly what it was written against:
//   "document"                      the whole spec
//   "region:<key>"                  a grid-spec region (open set; today the selectable ones)
//   "assembly:<id>"                 a manifest assembly id
//   "layer:y:<number>"              a manifest layer by its declared Y
// Region and assembly ids are open vocabularies, so a rename must not lose notes: an anchor that
// no longer resolves is surfaced as ORPHANED, never dropped.
import type { GridSpec } from './gridSpec';
import type { ManifestModel } from './buildManifest';

export const ANNOTATIONS_SCHEMA = 'trembus.spatial-annotations/v1';
export const MAX_ANNOTATIONS_BYTES = 2 * 1024 * 1024;

export type NoteStatus = 'open' | 'resolved';

export interface ReviewNote {
  id: string;
  /** What the note was written against — kept verbatim even when it no longer resolves. */
  anchor: string;
  status: NoteStatus;
  text: string;
  author?: string;
  /** ISO date the note was written, when the sidecar states one. */
  created?: string;
}

export interface ParsedAnnotations {
  notes: ReviewNote[];
  /** Everything the reader skipped or normalized, surfaced instead of thrown. */
  warnings: string[];
  /** The spec path the sidecar says it annotates, when it says one. */
  targetSpec?: string;
}

export interface AnchorOption {
  anchor: string;
  label: string;
}

type SpatialDocument = GridSpec | ManifestModel;

/** Human names for the grid-spec regions the scene can select today. */
const REGION_LABELS: Record<string, string> = {
  core: 'City core',
  sidewalks: 'Sidewalk rings',
  road: 'Ring road',
  approaches: 'Approaches',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Every anchor the given document can currently resolve, in a stable order the compose UI can
 * list directly: the document first, then the model's own vocabulary.
 */
export function anchorOptions(model: SpatialDocument): AnchorOption[] {
  const options: AnchorOption[] = [{ anchor: 'document', label: 'Whole document' }];
  if (model.kind === 'manifest') {
    for (const layer of model.layers) {
      options.push({ anchor: `layer:y:${layer.y}`, label: `Layer · y=${layer.y}` });
    }
    for (const layer of model.layers) {
      for (const assembly of layer.assemblies) {
        options.push({
          anchor: `assembly:${assembly.id}`,
          label: `Assembly · ${assembly.id} (y=${layer.y})`,
        });
      }
    }
    return options;
  }
  for (const [key, label] of Object.entries(REGION_LABELS)) {
    options.push({ anchor: `region:${key}`, label: `Region · ${label}` });
  }
  return options;
}

/** The label an anchor would carry in the compose list, or the raw anchor when it cannot resolve. */
export function anchorLabel(anchor: string, model: SpatialDocument): string {
  return anchorOptions(model).find((option) => option.anchor === anchor)?.label ?? anchor;
}

export function resolvableAnchors(model: SpatialDocument): Set<string> {
  return new Set(anchorOptions(model).map((option) => option.anchor));
}

/**
 * Soft reader for a sidecar value. Returns what it could read plus what it had to skip; the only
 * whole-file rejection is a schema string that is not exactly ours, so a future v2 degrades to
 * "ignored with a reason" rather than to half-read notes.
 */
export function parseAnnotationsValue(value: unknown): ParsedAnnotations {
  if (!isRecord(value)) {
    return { notes: [], warnings: ['Annotations sidecar is not a JSON object — ignored'] };
  }
  if (value.schema !== ANNOTATIONS_SCHEMA) {
    return {
      notes: [],
      warnings: [
        `Annotations sidecar declares schema ${JSON.stringify(value.schema ?? null)}; this lens reads ${ANNOTATIONS_SCHEMA} only — ignored whole`,
      ],
    };
  }
  const warnings: string[] = [];
  const targetSpec = typeof value.targetSpec === 'string' ? value.targetSpec : undefined;
  const notesRaw = Array.isArray(value.notes) ? value.notes : [];
  if (!Array.isArray(value.notes)) {
    warnings.push('Sidecar declares no notes[] list — reading it as empty');
  }
  const notes: ReviewNote[] = [];
  const seenIds = new Set<string>();
  for (let index = 0; index < notesRaw.length; index += 1) {
    const entry = notesRaw[index];
    if (!isRecord(entry)) {
      warnings.push(`notes[${index}] is not an object and was skipped`);
      continue;
    }
    const text = typeof entry.text === 'string' ? entry.text.trim() : '';
    if (!text) {
      warnings.push(`notes[${index}] has no text and was skipped`);
      continue;
    }
    let anchor = 'document';
    if (typeof entry.anchor === 'string' && entry.anchor.trim()) {
      anchor = entry.anchor.trim();
    } else {
      warnings.push(`notes[${index}] declares no anchor — read as a whole-document note`);
    }
    let status: NoteStatus = 'open';
    if (entry.status === 'resolved') status = 'resolved';
    else if (entry.status != null && entry.status !== 'open') {
      warnings.push(`notes[${index}] status ${JSON.stringify(entry.status)} is unknown — read as open`);
    }
    let id = typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : `note-${index + 1}`;
    while (seenIds.has(id)) id = `${id}-dup`;
    seenIds.add(id);
    notes.push({
      id,
      anchor,
      status,
      text,
      ...(typeof entry.author === 'string' && entry.author.trim() ? { author: entry.author.trim() } : {}),
      ...(typeof entry.created === 'string' && entry.created.trim() ? { created: entry.created.trim() } : {}),
    });
  }
  return { notes, warnings, ...(targetSpec ? { targetSpec } : {}) };
}

/** The local-file path: size-capped and JSON-parsed, then the same soft read. */
export function parseAnnotationsText(text: string, byteLength: number): ParsedAnnotations {
  if (byteLength > MAX_ANNOTATIONS_BYTES) {
    return { notes: [], warnings: ['Annotations sidecar exceeds the 2 MiB local-file limit — ignored'] };
  }
  try {
    return parseAnnotationsValue(JSON.parse(text));
  } catch {
    return { notes: [], warnings: ['Annotations sidecar is not valid JSON — ignored'] };
  }
}

/** `output/x/spec.json` → `output/x/spec.annotations.json` — the sidecar sits beside its spec. */
export function sidecarPathFor(specPath: string): string {
  return specPath.replace(/\.json$/, '.annotations.json');
}

/** Download filename for an export when the spec's repo path is unknown (picker-loaded files). */
export function sidecarNameForTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slug || 'spatial-spec'}.annotations.json`;
}

/** Serialized sidecar, stable field order, pretty-printed with a trailing newline for git. */
export function serializeAnnotations(targetSpec: string, notes: ReviewNote[]): string {
  const payload = {
    schema: ANNOTATIONS_SCHEMA,
    targetSpec,
    notes: notes.map((note) => ({
      id: note.id,
      anchor: note.anchor,
      status: note.status,
      ...(note.author ? { author: note.author } : {}),
      ...(note.created ? { created: note.created } : {}),
      text: note.text,
    })),
  };
  return `${JSON.stringify(payload, null, 2)}\n`;
}
