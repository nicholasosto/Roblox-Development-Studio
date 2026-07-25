// The single reader and runtime validator for the Spatial lens's current measured draft.
//
// This intentionally reads an app-local copy of the task's measured draft rather than pretending
// the grid is an emitted Project-System/dashboard contract. The Command Center labels it as
// provisional, and a future promotion can replace this reader with a generated spatial registry.
import measuredDraftJson from './fixtures/hex-city-center-grid-spec.json';

export const MAX_GRID_SPEC_BYTES = 2 * 1024 * 1024;

export type StudPair = readonly [number, number];

export const SPATIAL_APPEARANCE_SCHEMA = 'trembus.spatial-appearance/v1' as const;

export const SPATIAL_SURFACE_TARGETS = [
  'ground',
  'core',
  'sidewalk.inner',
  'sidewalk.outer',
  'road.ring',
  'road.approach',
  'sidewalk.approach',
] as const;

export type TextureRole = 'color' | 'normal' | 'roughness' | 'metalness';
export type SurfaceRole = (typeof SPATIAL_SURFACE_TARGETS)[number];

export interface SpatialTextureAsset {
  id: string;
  role: TextureRole;
  sourceKey: string;
  optional: boolean;
}

export interface SpatialSurfaceDefinition {
  id: string;
  maps: Partial<Record<TextureRole, string>>;
  mapping: {
    tileStuds: StudPair;
    offsetStuds: StudPair;
    rotationDegrees: 0;
  };
  preview: {
    fallbackColor: string;
    roughness: number;
    metalness: number;
    normalStrength: number;
  };
  roblox?: {
    /** Preview intent only; this renderer never creates or mutates a Roblox material. */
    mode: 'enumMaterial';
    material: string;
    physics: 'inherit';
  };
}

export interface SpatialSurfaceBinding {
  geometryRole: SurfaceRole;
  surfaceId: string;
}

export interface AppearanceSpec {
  schema: typeof SPATIAL_APPEARANCE_SCHEMA;
  revision: number;
  projection: {
    mode: 'world-xz';
    uAxis: '+X';
    vAxis: '-Z';
    anchor: StudPair;
  };
  textureAssets: SpatialTextureAsset[];
  surfaceDefinitions: SpatialSurfaceDefinition[];
  surfaceBindings: SpatialSurfaceBinding[];
}

export interface GridSpec {
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
  grid: {
    minor: number;
    major: number;
    super: number;
  };
  hex: {
    coreA: number;
    innerA: number;
    centerA: number;
    roadOuterA: number;
    outerA: number;
  };
  approaches: {
    angles: number[];
    roadWidth: number;
    laneWidth: number;
    sidewalkWidth: number;
    totalWidth: number;
    crosswalkDepth: number;
  };
  promotionGates: Record<string, boolean>;
  appearance?: AppearanceSpec;
  appearanceWarning?: string;
}

export type DefaultGridSpecLoad =
  | { ok: true; spec: GridSpec }
  | { ok: false; message: string };

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown, name: string): UnknownRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${name} must be a JSON object`);
  }
  return value as UnknownRecord;
}

function optionalRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function finite(value: unknown, name: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
  return value;
}

function optionalFinite(value: unknown, fallback: number, name: string): number {
  return value == null ? fallback : finite(value, name);
}

function pair(value: unknown, name: string): StudPair {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error(`${name} must contain two numbers`);
  }
  const first = finite(value[0], `${name}[0]`);
  const second = finite(value[1], `${name}[1]`);
  if (!(first < second)) throw new Error(`${name} must be ascending`);
  return [first, second];
}

function coordinate(value: unknown, name: string): StudPair {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error(`${name} must contain X and Z`);
  }
  return [finite(value[0], `${name}[0]`), finite(value[1], `${name}[1]`)];
}

function closeEnough(a: number, b: number, tolerance = 0.001): boolean {
  return Math.abs(a - b) <= tolerance;
}

function textOr(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function checkDeclaredDimension(
  value: unknown,
  expected: number,
  name: string,
): void {
  if (value != null && !closeEnough(finite(value, name), expected)) {
    throw new Error(`${name} conflicts with the apothem geometry`);
  }
}

const STRICT_ID = /^[a-z][a-z0-9._-]{0,63}$/;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const TEXTURE_ROLES = ['color', 'normal', 'roughness', 'metalness'] as const;
const MAX_TEXTURE_ASSETS = 16;
const MAX_SURFACE_DEFINITIONS = 32;
const MAX_SURFACE_BINDINGS = 16;
const MAX_APPEARANCE_COORDINATE = 8192;

function assertOnlyKeys(
  record: UnknownRecord,
  allowed: readonly string[],
  name: string,
): void {
  for (const key of Object.keys(record)) {
    if (!allowed.includes(key)) {
      throw new Error(`${name}.${key} is not supported`);
    }
  }
}

function cappedArray(value: unknown, name: string, maximum: number): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${name} must be an array`);
  if (value.length > maximum) {
    throw new Error(`${name} may contain at most ${maximum} entries`);
  }
  return value;
}

function strictId(value: unknown, name: string): string {
  if (typeof value !== 'string' || !STRICT_ID.test(value)) {
    throw new Error(
      `${name} must be a lowercase id using letters, numbers, dot, underscore, or hyphen`,
    );
  }
  if (value === 'constructor' || value === 'prototype' || value === '__proto__') {
    throw new Error(`${name} uses a reserved id`);
  }
  return value;
}

function boundedNumber(
  value: unknown,
  name: string,
  minimum: number,
  maximum: number,
): number {
  const number = finite(value, name);
  if (number < minimum || number > maximum) {
    throw new Error(`${name} must be between ${minimum} and ${maximum}`);
  }
  return number;
}

function boundedCoordinate(value: unknown, name: string): StudPair {
  const result = coordinate(value, name);
  for (const component of result) {
    if (Math.abs(component) > MAX_APPEARANCE_COORDINATE) {
      throw new Error(
        `${name} components may not exceed ${MAX_APPEARANCE_COORDINATE} studs`,
      );
    }
  }
  return result;
}

function positiveStudPair(value: unknown, name: string): StudPair {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error(`${name} must contain two stud dimensions`);
  }
  return [
    boundedNumber(value[0], `${name}[0]`, 0.125, MAX_APPEARANCE_COORDINATE),
    boundedNumber(value[1], `${name}[1]`, 0.125, MAX_APPEARANCE_COORDINATE),
  ];
}

function fixedColor(value: unknown, name: string): string {
  if (typeof value !== 'string' || !HEX_COLOR.test(value)) {
    throw new Error(`${name} must be a six-digit hexadecimal color`);
  }
  return value.toUpperCase();
}

function textureRole(value: unknown, name: string): TextureRole {
  if (
    typeof value !== 'string' ||
    !(TEXTURE_ROLES as readonly string[]).includes(value)
  ) {
    throw new Error(`${name} must be color, normal, roughness, or metalness`);
  }
  return value as TextureRole;
}

function robloxMaterialIntent(value: unknown, name: string): string {
  if (
    typeof value !== 'string' ||
    !/^[A-Z][A-Za-z0-9]{0,63}$/.test(value)
  ) {
    throw new Error(`${name} must be a Roblox Enum.Material member name`);
  }
  return value;
}

function validateSpatialAppearance(input: unknown): AppearanceSpec {
  const appearance = asRecord(input, 'appearance');
  assertOnlyKeys(
    appearance,
    [
      'schema',
      'revision',
      'projection',
      'textureAssets',
      'surfaceDefinitions',
      'surfaceBindings',
    ],
    'appearance',
  );
  if (appearance.schema !== SPATIAL_APPEARANCE_SCHEMA) {
    throw new Error(`appearance.schema must be ${SPATIAL_APPEARANCE_SCHEMA}`);
  }
  const revision = boundedNumber(appearance.revision, 'appearance.revision', 1, 9999);
  if (!Number.isInteger(revision)) {
    throw new Error('appearance.revision must be an integer');
  }

  const projection = asRecord(appearance.projection, 'appearance.projection');
  assertOnlyKeys(
    projection,
    ['mode', 'uAxis', 'vAxis', 'anchor'],
    'appearance.projection',
  );
  if (
    projection.mode !== 'world-xz' ||
    projection.uAxis !== '+X' ||
    projection.vAxis !== '-Z'
  ) {
    throw new Error(
      'appearance.projection must use world-xz with +X U and -Z V axes',
    );
  }
  const anchor = boundedCoordinate(
    projection.anchor,
    'appearance.projection.anchor',
  );

  const textureAssetsRaw = cappedArray(
    appearance.textureAssets,
    'appearance.textureAssets',
    MAX_TEXTURE_ASSETS,
  );
  const textureAssets: SpatialTextureAsset[] = [];
  const textureById = new Map<string, SpatialTextureAsset>();
  for (let index = 0; index < textureAssetsRaw.length; index += 1) {
    const name = `appearance.textureAssets[${index}]`;
    const asset = asRecord(textureAssetsRaw[index], name);
    assertOnlyKeys(asset, ['id', 'role', 'sourceKey', 'optional'], name);
    const id = strictId(asset.id, `${name}.id`);
    if (textureById.has(id)) throw new Error(`duplicate texture asset id "${id}"`);
    const optional = asset.optional == null ? false : asset.optional;
    if (typeof optional !== 'boolean') {
      throw new Error(`${name}.optional must be a boolean`);
    }
    const normalized: SpatialTextureAsset = {
      id,
      role: textureRole(asset.role, `${name}.role`),
      sourceKey: strictId(asset.sourceKey, `${name}.sourceKey`),
      optional,
    };
    textureAssets.push(normalized);
    textureById.set(id, normalized);
  }

  const surfaceDefinitionsRaw = cappedArray(
    appearance.surfaceDefinitions,
    'appearance.surfaceDefinitions',
    MAX_SURFACE_DEFINITIONS,
  );
  const surfaceDefinitions: SpatialSurfaceDefinition[] = [];
  const surfaceById = new Map<string, SpatialSurfaceDefinition>();
  for (let index = 0; index < surfaceDefinitionsRaw.length; index += 1) {
    const name = `appearance.surfaceDefinitions[${index}]`;
    const surface = asRecord(surfaceDefinitionsRaw[index], name);
    assertOnlyKeys(surface, ['id', 'maps', 'mapping', 'preview', 'roblox'], name);
    const id = strictId(surface.id, `${name}.id`);
    if (surfaceById.has(id)) {
      throw new Error(`duplicate surface definition id "${id}"`);
    }

    const mapsRaw = asRecord(surface.maps, `${name}.maps`);
    assertOnlyKeys(mapsRaw, TEXTURE_ROLES, `${name}.maps`);
    const maps: Partial<Record<TextureRole, string>> = {};
    for (const role of TEXTURE_ROLES) {
      if (mapsRaw[role] == null) continue;
      const assetId = strictId(mapsRaw[role], `${name}.maps.${role}`);
      const asset = textureById.get(assetId);
      if (!asset) {
        throw new Error(`${name}.maps.${role} references unknown asset "${assetId}"`);
      }
      if (asset.role !== role) {
        throw new Error(
          `${name}.maps.${role} references ${asset.role} asset "${assetId}"`,
        );
      }
      maps[role] = assetId;
    }

    const mappingRaw = asRecord(surface.mapping, `${name}.mapping`);
    assertOnlyKeys(
      mappingRaw,
      ['tileStuds', 'offsetStuds', 'rotationDegrees'],
      `${name}.mapping`,
    );
    const rotationDegrees = finite(
      mappingRaw.rotationDegrees,
      `${name}.mapping.rotationDegrees`,
    );
    if (rotationDegrees !== 0) {
      throw new Error(`${name}.mapping.rotationDegrees must be 0 in appearance v1`);
    }

    const previewRaw = asRecord(surface.preview, `${name}.preview`);
    assertOnlyKeys(
      previewRaw,
      ['fallbackColor', 'roughness', 'metalness', 'normalStrength'],
      `${name}.preview`,
    );

    let roblox: SpatialSurfaceDefinition['roblox'];
    if (surface.roblox != null) {
      const robloxRaw = asRecord(surface.roblox, `${name}.roblox`);
      assertOnlyKeys(robloxRaw, ['mode', 'material', 'physics'], `${name}.roblox`);
      if (robloxRaw.mode !== 'enumMaterial') {
        throw new Error(`${name}.roblox.mode must be enumMaterial`);
      }
      if (robloxRaw.physics !== 'inherit') {
        throw new Error(`${name}.roblox.physics must be inherit`);
      }
      roblox = {
        mode: 'enumMaterial',
        material: robloxMaterialIntent(
          robloxRaw.material,
          `${name}.roblox.material`,
        ),
        physics: 'inherit',
      };
    }

    const normalized: SpatialSurfaceDefinition = {
      id,
      maps,
      mapping: {
        tileStuds: positiveStudPair(
          mappingRaw.tileStuds,
          `${name}.mapping.tileStuds`,
        ),
        offsetStuds: boundedCoordinate(
          mappingRaw.offsetStuds,
          `${name}.mapping.offsetStuds`,
        ),
        rotationDegrees: 0,
      },
      preview: {
        fallbackColor: fixedColor(
          previewRaw.fallbackColor,
          `${name}.preview.fallbackColor`,
        ),
        roughness: boundedNumber(
          previewRaw.roughness,
          `${name}.preview.roughness`,
          0,
          1,
        ),
        metalness: boundedNumber(
          previewRaw.metalness,
          `${name}.preview.metalness`,
          0,
          1,
        ),
        normalStrength: boundedNumber(
          previewRaw.normalStrength,
          `${name}.preview.normalStrength`,
          0,
          4,
        ),
      },
      ...(roblox ? { roblox } : {}),
    };
    surfaceDefinitions.push(normalized);
    surfaceById.set(id, normalized);
  }

  const surfaceBindingsRaw = cappedArray(
    appearance.surfaceBindings,
    'appearance.surfaceBindings',
    MAX_SURFACE_BINDINGS,
  );
  if (surfaceBindingsRaw.length !== SPATIAL_SURFACE_TARGETS.length) {
    throw new Error(
      `appearance.surfaceBindings must bind all ${SPATIAL_SURFACE_TARGETS.length} surface roles`,
    );
  }
  const surfaceBindings: SpatialSurfaceBinding[] = [];
  const boundTargets = new Set<SurfaceRole>();
  for (let index = 0; index < surfaceBindingsRaw.length; index += 1) {
    const name = `appearance.surfaceBindings[${index}]`;
    const binding = asRecord(surfaceBindingsRaw[index], name);
    assertOnlyKeys(binding, ['geometryRole', 'surfaceId'], name);
    if (
      typeof binding.geometryRole !== 'string' ||
      !(SPATIAL_SURFACE_TARGETS as readonly string[]).includes(binding.geometryRole)
    ) {
      throw new Error(`${name}.geometryRole is not a supported surface role`);
    }
    const geometryRole = binding.geometryRole as SurfaceRole;
    if (boundTargets.has(geometryRole)) {
      throw new Error(`duplicate surface binding role "${geometryRole}"`);
    }
    const surfaceId = strictId(binding.surfaceId, `${name}.surfaceId`);
    if (!surfaceById.has(surfaceId)) {
      throw new Error(`${name}.surfaceId references unknown surface "${surfaceId}"`);
    }
    boundTargets.add(geometryRole);
    surfaceBindings.push({ geometryRole, surfaceId });
  }
  for (const geometryRole of SPATIAL_SURFACE_TARGETS) {
    if (!boundTargets.has(geometryRole)) {
      throw new Error(
        `appearance.surfaceBindings is missing geometry role "${geometryRole}"`,
      );
    }
  }

  return {
    schema: SPATIAL_APPEARANCE_SCHEMA,
    revision,
    projection: {
      mode: 'world-xz',
      uAxis: '+X',
      vAxis: '-Z',
      anchor,
    },
    textureAssets,
    surfaceDefinitions,
    surfaceBindings,
  };
}

export function validateGridSpec(input: unknown): GridSpec {
  const root = asRecord(input, 'Grid spec');
  const coordinateSystem = asRecord(root.coordinateSystem, 'coordinateSystem');
  if (coordinateSystem.plane !== 'X/Z') {
    throw new Error('Only X/Z grid specs are supported');
  }
  if (coordinateSystem.verticalAxisShown === true) {
    throw new Error('Authoritative Y geometry is not supported by this renderer');
  }
  const north = textOr(coordinateSystem.north, '-Z');
  if (north !== '-Z') {
    throw new Error('Only grid specs with north = -Z are supported');
  }

  const view = asRecord(root.view, 'view');
  const boundsStuds = asRecord(view.boundsStuds, 'view.boundsStuds');
  const boundsX = pair(boundsStuds.x, 'view.boundsStuds.x');
  const boundsZ = pair(boundsStuds.z, 'view.boundsStuds.z');
  const width = boundsX[1] - boundsX[0];
  const depth = boundsZ[1] - boundsZ[0];
  if (width > 8192 || depth > 8192) {
    throw new Error('View bounds may not exceed 8,192 studs per axis');
  }

  const origin = coordinate(coordinateSystem.origin ?? [0, 0], 'coordinateSystem.origin');
  if (
    origin[0] < boundsX[0] ||
    origin[0] > boundsX[1] ||
    origin[1] < boundsZ[0] ||
    origin[1] > boundsZ[1]
  ) {
    throw new Error('The origin must lie inside the view bounds');
  }

  if (view.sizeStuds != null) {
    const declaredSize = coordinate(view.sizeStuds, 'view.sizeStuds');
    if (!closeEnough(declaredSize[0], width) || !closeEnough(declaredSize[1], depth)) {
      throw new Error('view.sizeStuds conflicts with view.boundsStuds');
    }
  }

  const grid = asRecord(root.grid, 'grid');
  const minor = finite(grid.minorStuds, 'grid.minorStuds');
  const major = finite(grid.majorStuds, 'grid.majorStuds');
  const superStep = finite(grid.superStuds, 'grid.superStuds');
  if (!(minor > 0 && major >= minor && superStep >= major)) {
    throw new Error('Grid steps must satisfy 0 < minor ≤ major ≤ super');
  }
  if (
    !closeEnough(major / minor, Math.round(major / minor)) ||
    !closeEnough(superStep / minor, Math.round(superStep / minor))
  ) {
    throw new Error('Major and super grid steps must be whole minor-grid multiples');
  }
  const lineEstimate = width / minor + depth / minor;
  if (lineEstimate > 1200) {
    throw new Error('Minor grid spacing would create too many lines');
  }

  const hex = asRecord(root.hex, 'hex');
  if (hex.orientation !== 'flat-top') {
    throw new Error('Only flat-top regular hex specs are supported');
  }
  const core = asRecord(hex.core, 'hex.core');
  const innerSidewalk = asRecord(
    hex.innerSidewalkOuterEdge,
    'hex.innerSidewalkOuterEdge',
  );
  const roadCenterline = optionalRecord(hex.roadCenterline);
  const roadOuter = asRecord(hex.roadOuterEdge, 'hex.roadOuterEdge');
  const outerSidewalk = asRecord(
    hex.outerSidewalkOuterEdge,
    'hex.outerSidewalkOuterEdge',
  );
  const coreA = finite(core.apothemStuds, 'hex.core.apothemStuds');
  const innerA = finite(
    innerSidewalk.apothemStuds,
    'hex.innerSidewalkOuterEdge.apothemStuds',
  );
  const roadOuterA = finite(
    roadOuter.apothemStuds,
    'hex.roadOuterEdge.apothemStuds',
  );
  const outerA = finite(
    outerSidewalk.apothemStuds,
    'hex.outerSidewalkOuterEdge.apothemStuds',
  );
  const centerA = optionalFinite(
    roadCenterline.apothemStuds,
    (innerA + roadOuterA) / 2,
    'hex.roadCenterline.apothemStuds',
  );
  if (
    !(
      0 < coreA &&
      coreA < innerA &&
      innerA < centerA &&
      centerA < roadOuterA &&
      roadOuterA < outerA
    )
  ) {
    throw new Error('Hex apothems must increase from core through outer sidewalk');
  }
  const maximumOuterApothem = Math.min(
    ((boundsX[1] - origin[0]) * Math.sqrt(3)) / 2,
    ((origin[0] - boundsX[0]) * Math.sqrt(3)) / 2,
    boundsZ[1] - origin[1],
    origin[1] - boundsZ[0],
  );
  if (outerA > maximumOuterApothem + 0.001) {
    throw new Error('The outer hex must fit completely inside the declared view bounds');
  }

  checkDeclaredDimension(core.flatToFlatStuds, 2 * coreA, 'hex.core.flatToFlatStuds');
  checkDeclaredDimension(
    core.pointToPointStuds,
    (4 * coreA) / Math.sqrt(3),
    'hex.core.pointToPointStuds',
  );
  checkDeclaredDimension(
    innerSidewalk.flatToFlatStuds,
    2 * innerA,
    'hex.innerSidewalkOuterEdge.flatToFlatStuds',
  );
  checkDeclaredDimension(
    innerSidewalk.pointToPointStuds,
    (4 * innerA) / Math.sqrt(3),
    'hex.innerSidewalkOuterEdge.pointToPointStuds',
  );
  checkDeclaredDimension(
    roadCenterline.flatToFlatStuds,
    2 * centerA,
    'hex.roadCenterline.flatToFlatStuds',
  );
  checkDeclaredDimension(
    roadCenterline.pointToPointStuds,
    (4 * centerA) / Math.sqrt(3),
    'hex.roadCenterline.pointToPointStuds',
  );
  checkDeclaredDimension(
    roadOuter.flatToFlatStuds,
    2 * roadOuterA,
    'hex.roadOuterEdge.flatToFlatStuds',
  );
  checkDeclaredDimension(
    roadOuter.pointToPointStuds,
    (4 * roadOuterA) / Math.sqrt(3),
    'hex.roadOuterEdge.pointToPointStuds',
  );
  checkDeclaredDimension(
    outerSidewalk.flatToFlatStuds,
    2 * outerA,
    'hex.outerSidewalkOuterEdge.flatToFlatStuds',
  );
  checkDeclaredDimension(
    outerSidewalk.pointToPointStuds,
    (4 * outerA) / Math.sqrt(3),
    'hex.outerSidewalkOuterEdge.pointToPointStuds',
  );
  checkDeclaredDimension(
    innerSidewalk.bandWidthStuds,
    innerA - coreA,
    'hex.innerSidewalkOuterEdge.bandWidthStuds',
  );
  checkDeclaredDimension(
    roadOuter.bandWidthStuds,
    roadOuterA - innerA,
    'hex.roadOuterEdge.bandWidthStuds',
  );
  checkDeclaredDimension(
    outerSidewalk.bandWidthStuds,
    outerA - roadOuterA,
    'hex.outerSidewalkOuterEdge.bandWidthStuds',
  );

  const approaches = asRecord(root.approaches, 'approaches');
  if (
    !Array.isArray(approaches.normalAnglesDegreesFromPositiveX) ||
    approaches.normalAnglesDegreesFromPositiveX.length === 0 ||
    approaches.normalAnglesDegreesFromPositiveX.length > 6
  ) {
    throw new Error('approaches must provide one to six face-normal angles');
  }
  const angles = approaches.normalAnglesDegreesFromPositiveX.map((angle, index) =>
    finite(angle, `approaches.normalAnglesDegreesFromPositiveX[${index}]`),
  );
  if (
    approaches.count != null &&
    finite(approaches.count, 'approaches.count') !== angles.length
  ) {
    throw new Error('approaches.count must match the angle array');
  }
  const normalizedAngles = angles.map((angle) => ((angle % 360) + 360) % 360);
  if (
    new Set(normalizedAngles.map((angle) => angle.toFixed(6))).size !==
    normalizedAngles.length
  ) {
    throw new Error('Approach angles must be unique');
  }
  for (const angle of normalizedAngles) {
    const faceNormalOffset = ((angle - 30) % 60 + 60) % 60;
    if (!closeEnough(faceNormalOffset, 0) && !closeEnough(faceNormalOffset, 60)) {
      throw new Error('Approaches must align to flat-top hex face normals');
    }
  }

  const roadWidth = finite(approaches.roadWidthStuds, 'approaches.roadWidthStuds');
  const laneWidth = optionalFinite(
    approaches.laneWidthStuds,
    roadWidth / 2,
    'approaches.laneWidthStuds',
  );
  const sidewalkWidth = finite(
    approaches.sidewalkEachSideStuds,
    'approaches.sidewalkEachSideStuds',
  );
  const crosswalkDepth = optionalFinite(
    approaches.crosswalkDepthStuds,
    outerA - roadOuterA,
    'approaches.crosswalkDepthStuds',
  );
  const totalWidth = roadWidth + 2 * sidewalkWidth;
  if (
    !(
      roadWidth > 0 &&
      laneWidth > 0 &&
      laneWidth <= roadWidth &&
      sidewalkWidth >= 0 &&
      crosswalkDepth >= 0 &&
      Number.isFinite(totalWidth)
    )
  ) {
    throw new Error('Approach road, lane, sidewalk, and crosswalk widths are invalid');
  }
  const maximumViewExtent = Math.max(width, depth);
  if (
    totalWidth > Math.min(width, depth) ||
    crosswalkDepth > maximumViewExtent
  ) {
    throw new Error('Approach dimensions must remain within the declared view extent');
  }
  if (approaches.crosswalkPaintHasPhysicalWidth === true) {
    throw new Error('Crosswalk paint must remain a zero-width annotation');
  }
  checkDeclaredDimension(
    approaches.sidewalkToSidewalkWidthStuds,
    roadWidth + 2 * sidewalkWidth,
    'approaches.sidewalkToSidewalkWidthStuds',
  );

  const promotionGatesRaw = optionalRecord(root.promotionGates);
  const promotionGates = Object.fromEntries(
    Object.entries(promotionGatesRaw)
      .filter((entry): entry is [string, boolean] => typeof entry[1] === 'boolean'),
  );
  const authority = optionalRecord(root.authority);
  let appearance: AppearanceSpec | undefined;
  let appearanceWarning: string | undefined;
  if (Object.prototype.hasOwnProperty.call(root, 'appearance')) {
    try {
      appearance = validateSpatialAppearance(root.appearance);
    } catch (error) {
      appearanceWarning =
        error instanceof Error
          ? `Appearance ignored: ${error.message}`
          : 'Appearance ignored: the appearance contract is invalid';
    }
  }

  return {
    raw: root,
    title: textOr(root.title, 'Untitled grid spec'),
    status: textOr(root.status, 'draft'),
    revision: String(root.revision ?? '—'),
    date: String(root.date ?? '—'),
    authority: textOr(authority.dimensional, 'Loaded local JSON'),
    origin,
    north,
    boundsX,
    boundsZ,
    size: [width, depth],
    grid: { minor, major, super: superStep },
    hex: { coreA, innerA, centerA, roadOuterA, outerA },
    approaches: {
      angles: normalizedAngles,
      roadWidth,
      laneWidth,
      sidewalkWidth,
      totalWidth,
      crosswalkDepth,
    },
    promotionGates,
    appearance,
    appearanceWarning,
  };
}

export function parseGridSpecText(text: string, byteLength: number): GridSpec {
  if (byteLength > MAX_GRID_SPEC_BYTES) {
    throw new Error('Grid spec exceeds the 2 MiB local-file limit');
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Grid spec is not valid JSON');
  }
  return validateGridSpec(parsed);
}

export const defaultGridSpecLoad: DefaultGridSpecLoad = (() => {
  try {
    return { ok: true, spec: validateGridSpec(measuredDraftJson) };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : 'The bundled measured draft could not be validated',
    };
  }
})();
