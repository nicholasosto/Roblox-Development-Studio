import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import orientationDiagnosticUrl from './assets/spatial-orientation-diagnostic_BLK.svg';
import {
  applyWorldStudUvs,
  clipPolygonToBounds,
  gridLineGeometry,
  hexRingGeometry,
  hexRingSegments,
  hexVertices,
  lineGeometry,
  lineLoopGeometry,
  prismGeometry,
  quadFromApproach,
  rayExitDistance,
  type XzPoint,
} from './geometry';
import type { ManifestModel } from './buildManifest';
import {
  SPATIAL_SURFACE_TARGETS,
  type AppearanceSpec,
  type GridSpec,
  type SpatialSurfaceDefinition,
  type SpatialTextureAsset,
  type SurfaceRole,
  type TextureRole,
} from './gridSpec';

const BUNDLED_TEXTURE_SOURCES: ReadonlyMap<string, string> = new Map([
  ['spatial-orientation-diagnostic', orientationDiagnosticUrl],
]);

export const SPATIAL_LAYER_KEYS = [
  'grid',
  'core',
  'sidewalks',
  'road',
  'approaches',
  'annotations',
  'envelope',
  'assemblies',
] as const;

export type SpatialLayerKey = (typeof SPATIAL_LAYER_KEYS)[number];
export type SpatialViewMode = 'perspective' | 'top';

interface SurfaceSpan {
  top: number;
  bottom: number;
}

export interface ResolvedElevation {
  /** True when these came from the contract's elevation block rather than the fallback. */
  declared: boolean;
  surfaces: Record<SurfaceRole, SurfaceSpan>;
  annotations: {
    grid: number;
    axis: number;
    laneMark: number;
    crosswalk: number;
    boundary: number;
  };
}

/**
 * The heights this renderer used before contracts could declare their own (decision 0013).
 * They are presentation values chosen to separate layers on screen, not buildable studs, and
 * they remain the fallback for any revision-1 contract that carries no elevation block.
 */
const ILLUSTRATIVE_SURFACES: Record<SurfaceRole, SurfaceSpan> = {
  ground: { top: -0.12, bottom: -0.12 },
  core: { top: 1.35, bottom: 0 },
  'sidewalk.inner': { top: 0.88, bottom: 0 },
  'sidewalk.outer': { top: 0.88, bottom: 0 },
  'sidewalk.approach': { top: 0.88, bottom: 0 },
  'road.ring': { top: 0.14, bottom: -0.02 },
  'road.approach': { top: 0.14, bottom: -0.02 },
};

// Annotations float just clear of whichever surface they mark, so they survive a change of
// datum without z-fighting. The offsets reproduce the spacing the illustrative set used.
const ANNOTATION_LIFT = {
  grid: 0.06,
  axis: 0.085,
  laneMark: 0.05,
  crosswalk: 0.06,
  boundary: 0.02,
} as const;

export function resolveElevation(spec: GridSpec): ResolvedElevation {
  const declared = spec.elevation != null;
  const surfaces = spec.elevation
    ? (Object.fromEntries(
        SPATIAL_SURFACE_TARGETS.map((role) => [
          role,
          {
            top: spec.elevation!.surfaces[role].topStuds,
            bottom: spec.elevation!.surfaces[role].bottomStuds,
          },
        ]),
      ) as Record<SurfaceRole, SurfaceSpan>)
    : ILLUSTRATIVE_SURFACES;

  const groundTop = surfaces.ground.top;
  const roadTop = surfaces['road.ring'].top;
  const sidewalkTop = surfaces['sidewalk.outer'].top;

  return {
    declared,
    surfaces,
    annotations: {
      grid: groundTop + ANNOTATION_LIFT.grid,
      axis: groundTop + ANNOTATION_LIFT.axis,
      laneMark: roadTop + ANNOTATION_LIFT.laneMark,
      crosswalk: roadTop + ANNOTATION_LIFT.crosswalk,
      boundary: sidewalkTop + ANNOTATION_LIFT.boundary,
    },
  };
}

export interface SpatialSelection {
  key: 'core' | 'sidewalks' | 'road' | 'approaches' | 'assemblies';
  detail: string;
}

export type SpatialAppearanceStatus =
  | 'loading'
  | 'ready'
  | 'fallback'
  | 'warning';

export interface SpatialAppearanceState {
  status: SpatialAppearanceStatus;
  message: string;
  requestedMaps: number;
  loadedMaps: number;
  fallbackMaps: number;
}

export interface SpatialSceneCallbacks {
  onSelection: (selection: SpatialSelection | null) => void;
  onError: (message: string | null) => void;
  onAppearanceState: (state: SpatialAppearanceState) => void;
}

export interface SpatialSceneController {
  replaceSpec: (spec: SpatialModel) => void;
  setLayerVisible: (key: SpatialLayerKey, visible: boolean) => void;
  setView: (mode: SpatialViewMode) => void;
  setYScale: (scale: number) => void;
  dispose: () => void;
}

type SelectKey = SpatialSelection['key'];

interface SurfaceMaterialPair {
  top: THREE.MeshStandardMaterial;
  solid: THREE.MeshStandardMaterial;
}

interface AppearanceMapRequest {
  asset: SpatialTextureAsset;
  definition: SpatialSurfaceDefinition;
  role: TextureRole;
  surfaceRoles: SurfaceRole[];
}

interface MaterialSet {
  surfaces: Record<SurfaceRole, SurfaceMaterialPair>;
  annotation: THREE.LineDashedMaterial;
  annotationSolid: THREE.LineBasicMaterial;
  gridMinor: THREE.LineBasicMaterial;
  gridMajor: THREE.LineBasicMaterial;
  gridSuper: THREE.LineBasicMaterial;
  axisX: THREE.LineBasicMaterial;
  axisZ: THREE.LineBasicMaterial;
  /** Envelope-precision surfaces are translucent so they can never read as measurement. */
  assemblyFace: THREE.MeshStandardMaterial;
  envelopeLine: THREE.LineBasicMaterial;
}

interface WorldBundle {
  group: THREE.Group;
  groups: Record<SpatialLayerKey, THREE.Group>;
  selectables: THREE.Mesh[];
}

function materialSet(): MaterialSet {
  const mesh = (): THREE.MeshStandardMaterial =>
    new THREE.MeshStandardMaterial({
      roughness: 0.82,
      metalness: 0.02,
      side: THREE.FrontSide,
    });
  const surfaces = Object.fromEntries(
    SPATIAL_SURFACE_TARGETS.map((role) => [
      role,
      { top: mesh(), solid: mesh() } satisfies SurfaceMaterialPair,
    ]),
  ) as Record<SurfaceRole, SurfaceMaterialPair>;
  return {
    surfaces,
    annotation: new THREE.LineDashedMaterial({
      dashSize: 5,
      gapSize: 4,
      transparent: true,
      opacity: 0.92,
    }),
    annotationSolid: new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.9,
    }),
    gridMinor: new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.34,
    }),
    gridMajor: new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.58,
    }),
    gridSuper: new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.84,
    }),
    axisX: new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.92,
    }),
    axisZ: new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.92,
    }),
    assemblyFace: new THREE.MeshStandardMaterial({
      roughness: 0.9,
      metalness: 0,
      transparent: true,
      opacity: 0.34,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
    envelopeLine: new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.55,
    }),
  };
}

function themeColor(token: string, fallback: string): THREE.Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const color = new THREE.Color();
  color.setStyle(value || fallback);
  return color;
}

function disposeObjectGeometries(root: THREE.Object3D): void {
  root.traverse((object) => {
    const renderable = object as THREE.Object3D & { geometry?: THREE.BufferGeometry };
    renderable.geometry?.dispose();
  });
}

function disposeMaterials(materials: MaterialSet): void {
  for (const pair of Object.values(materials.surfaces)) {
    pair.top.dispose();
    pair.solid.dispose();
  }
  materials.annotation.dispose();
  materials.annotationSolid.dispose();
  materials.gridMinor.dispose();
  materials.gridMajor.dispose();
  materials.gridSuper.dispose();
  materials.axisX.dispose();
  materials.axisZ.dispose();
}

function meshFromGeometry(
  geometry: THREE.BufferGeometry,
  material: THREE.Material | THREE.Material[],
  selectKey?: SelectKey,
  detail?: string,
): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material);
  if (selectKey) {
    mesh.userData.selectKey = selectKey;
    mesh.userData.detail = detail;
  }
  return mesh;
}

function dashedLine(
  geometry: THREE.BufferGeometry,
  material: THREE.LineDashedMaterial,
): THREE.Line {
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  return line;
}

function approachPoint(
  origin: readonly [number, number],
  angleDegrees: number,
  distance: number,
  lateral: number,
): XzPoint {
  const radians = (angleDegrees * Math.PI) / 180;
  const normal: XzPoint = [Math.cos(radians), Math.sin(radians)];
  const tangent: XzPoint = [-Math.sin(radians), Math.cos(radians)];
  return [
    origin[0] + normal[0] * distance + tangent[0] * lateral,
    origin[1] + normal[1] * distance + tangent[1] * lateral,
  ];
}

/**
 * The two spatial documents this lens reads. They share only what the scene machinery needs —
 * bounds, size, origin, a reference grid — and diverge entirely in what they can describe.
 */
export type SpatialModel = GridSpec | ManifestModel;

function createWorld(model: SpatialModel, materials: MaterialSet): WorldBundle {
  return model.kind === 'manifest'
    ? createManifestWorld(model, materials)
    : createGridWorld(model, materials);
}

/**
 * Draws a build manifest as declared *layers*, not as individual assemblies.
 *
 * The manifest gives every assembly a `layer_y` and no X/Z whatsoever, so two assemblies sharing
 * a layer share the only footprint the document actually states — one translucent plate per
 * distinct Y, listing what lives there. Drawing them apart would be inventing geometry, which is
 * the one thing a review surface for an envelope-precision document must not do.
 */
function createManifestWorld(model: ManifestModel, materials: MaterialSet): WorldBundle {
  const group = new THREE.Group();
  group.name = 'spatial-manifest-world';
  const groups = Object.fromEntries(
    SPATIAL_LAYER_KEYS.map((key) => {
      const layer = new THREE.Group();
      layer.name = key;
      group.add(layer);
      return [key, layer];
    }),
  ) as Record<SpatialLayerKey, THREE.Group>;
  const selectables: THREE.Mesh[] = [];

  try {
    const [envelopeX, envelopeY, envelopeZ] = model.envelope;
    const [originX, originZ] = model.origin;
    // The manifest never says where its envelope sits vertically, so it is anchored to the lowest
    // declared layer — the reading that keeps every declared element inside the box.
    const floorY = model.layers[0].y;

    for (const level of ['minor', 'major', 'super'] as const) {
      groups.grid.add(
        new THREE.LineSegments(
          gridLineGeometry(model, level, floorY - 0.05),
          level === 'minor'
            ? materials.gridMinor
            : level === 'major'
              ? materials.gridMajor
              : materials.gridSuper,
        ),
      );
    }

    const envelopeBox = new THREE.BoxGeometry(envelopeX, envelopeY, envelopeZ);
    envelopeBox.translate(originX, floorY + envelopeY / 2, originZ);
    const edges = new THREE.EdgesGeometry(envelopeBox);
    envelopeBox.dispose();
    groups.envelope.add(new THREE.LineSegments(edges, materials.envelopeLine));

    // Nominal — the manifest declares no thickness for anything. Enough to read as a solid at a
    // glance, thin enough that it never suggests a measured slab depth.
    const PLATE_STUDS = 0.6;
    for (const layer of model.layers) {
      const names = layer.assemblies.map((a) => a.id).join(' + ');
      const jobs = layer.assemblies.flatMap((a) => a.jobs);
      const detail =
        `Layer y=${layer.y} · ${names} · ${layer.partBudget} parts budgeted` +
        (jobs.length ? ` · ${jobs.join('; ')}` : '');

      const plate = new THREE.BoxGeometry(envelopeX, PLATE_STUDS, envelopeZ);
      plate.translate(originX, layer.y, originZ);
      const mesh = meshFromGeometry(plate, materials.assemblyFace, 'assemblies', detail);
      groups.assemblies.add(mesh);
      selectables.push(mesh);
      // Outlined as well as filled: stacked translucent plates otherwise blend into one mass and
      // the layer count — the document's only real structure — stops being readable.
      groups.assemblies.add(
        new THREE.LineSegments(new THREE.EdgesGeometry(plate), materials.envelopeLine),
      );
    }

    return { group, groups, selectables };
  } catch (error) {
    disposeObjectGeometries(group);
    throw error;
  }
}

function createGridWorld(spec: GridSpec, materials: MaterialSet): WorldBundle {
  const group = new THREE.Group();
  group.name = 'spatial-grid-world';
  const groups = Object.fromEntries(
    SPATIAL_LAYER_KEYS.map((key) => {
      const layer = new THREE.Group();
      layer.name = key;
      group.add(layer);
      return [key, layer];
    }),
  ) as Record<SpatialLayerKey, THREE.Group>;
  const selectables: THREE.Mesh[] = [];

  try {
    const elevation = resolveElevation(spec);
    const width = spec.boundsX[1] - spec.boundsX[0];
    const depth = spec.boundsZ[1] - spec.boundsZ[0];
    const groundGeometry = new THREE.PlaneGeometry(width, depth);
    groundGeometry.rotateX(-Math.PI / 2);
    groundGeometry.translate(
      (spec.boundsX[0] + spec.boundsX[1]) / 2,
      elevation.surfaces.ground.top,
      (spec.boundsZ[0] + spec.boundsZ[1]) / 2,
    );
    applyWorldStudUvs(groundGeometry);
    group.add(
      meshFromGeometry(groundGeometry, materials.surfaces.ground.top),
    );

    const gridMaterials = {
      minor: materials.gridMinor,
      major: materials.gridMajor,
      super: materials.gridSuper,
    };
    for (const level of ['minor', 'major', 'super'] as const) {
      groups.grid.add(
        new THREE.LineSegments(
          gridLineGeometry(spec, level, elevation.annotations.grid),
          gridMaterials[level],
        ),
      );
    }
    groups.grid.add(
      new THREE.Line(
        lineGeometry(
          [
            [spec.boundsX[0], spec.origin[1]],
            [spec.boundsX[1], spec.origin[1]],
          ],
          elevation.annotations.axis,
        ),
        materials.axisX,
      ),
      new THREE.Line(
        lineGeometry(
          [
            [spec.origin[0], spec.boundsZ[0]],
            [spec.origin[0], spec.boundsZ[1]],
          ],
          elevation.annotations.axis,
        ),
        materials.axisZ,
      ),
    );

    const coreDetail = `Core · ${(spec.hex.coreA * 2).toFixed(0)} studs flat-to-flat`;
    const coreMesh = meshFromGeometry(
      prismGeometry(
        hexVertices(spec.hex.coreA, spec.origin),
        elevation.surfaces.core.bottom,
        elevation.surfaces.core.top,
      ),
      [
        materials.surfaces.core.top,
        materials.surfaces.core.solid,
      ],
      'core',
      coreDetail,
    );
    groups.core.add(coreMesh);
    selectables.push(coreMesh);

    const sidewalkDetail = `Sidewalks · ${(spec.hex.innerA - spec.hex.coreA).toFixed(0)} studs edge-normal`;
    const innerSidewalk = meshFromGeometry(
      hexRingGeometry(
        spec.hex.coreA,
        spec.hex.innerA,
        spec.origin,
        elevation.surfaces['sidewalk.inner'].bottom,
        elevation.surfaces['sidewalk.inner'].top,
      ),
      [
        materials.surfaces['sidewalk.inner'].top,
        materials.surfaces['sidewalk.inner'].solid,
      ],
      'sidewalks',
      sidewalkDetail,
    );
    groups.sidewalks.add(innerSidewalk);
    selectables.push(innerSidewalk);

    // The outer ring is the one the approaches cross, so it is cut at each of them rather
    // than drawn as an annulus that hides the junctions beneath itself.
    const outerSidewalkDetail =
      `Outer sidewalk · ${(spec.hex.outerA - spec.hex.roadOuterA).toFixed(0)} studs edge-normal · ` +
      `open at ${spec.approaches.angles.length} approaches`;
    for (const segment of hexRingSegments(
      spec.hex.roadOuterA,
      spec.hex.outerA,
      spec.origin,
      spec.approaches.angles.map((angleDegrees) => ({
        angleDegrees,
        halfWidth: spec.approaches.roadWidth / 2,
      })),
    )) {
      const outerSidewalk = meshFromGeometry(
        prismGeometry(
          segment,
          elevation.surfaces['sidewalk.outer'].bottom,
          elevation.surfaces['sidewalk.outer'].top,
        ),
        [
          materials.surfaces['sidewalk.outer'].top,
          materials.surfaces['sidewalk.outer'].solid,
        ],
        'sidewalks',
        outerSidewalkDetail,
      );
      groups.sidewalks.add(outerSidewalk);
      selectables.push(outerSidewalk);
    }

    const roadDetail = `Ring road · ${(spec.hex.roadOuterA - spec.hex.innerA).toFixed(0)} studs total`;
    const ringRoad = meshFromGeometry(
      hexRingGeometry(
        spec.hex.innerA,
        spec.hex.roadOuterA,
        spec.origin,
        elevation.surfaces['road.ring'].bottom,
        elevation.surfaces['road.ring'].top,
      ),
      [
        materials.surfaces['road.ring'].top,
        materials.surfaces['road.ring'].solid,
      ],
      'road',
      roadDetail,
    );
    groups.road.add(ringRoad);
    selectables.push(ringRoad);

    const approachDetail =
      `Approaches · ${spec.approaches.roadWidth.toFixed(0)}-stud road + ` +
      `${spec.approaches.sidewalkWidth.toFixed(0)}-stud sidewalk per side`;
    for (const angle of spec.approaches.angles) {
      const radians = (angle * Math.PI) / 180;
      const normal: XzPoint = [Math.cos(radians), Math.sin(radians)];
      const rayExit = rayExitDistance(spec.origin, normal, spec.boundsX, spec.boundsZ);
      // A declared extent is the terminus. Without one, fall back to running off the view
      // edge — which is what made revision-1 approaches unequal, since a square boundary
      // clips a hexagonal arrangement at different radii.
      const far = spec.approaches.extent ?? rayExit + spec.approaches.totalWidth * 2;
      const halfRoad = spec.approaches.roadWidth / 2;

      const roadQuad = clipPolygonToBounds(
        quadFromApproach(
          spec.origin,
          angle,
          spec.hex.roadOuterA,
          far,
          -halfRoad,
          halfRoad,
        ),
        spec.boundsX,
        spec.boundsZ,
      );
      const roadMesh = meshFromGeometry(
        prismGeometry(
          roadQuad,
          elevation.surfaces['road.approach'].bottom,
          elevation.surfaces['road.approach'].top,
        ),
        [
          materials.surfaces['road.approach'].top,
          materials.surfaces['road.approach'].solid,
        ],
        'approaches',
        approachDetail,
      );
      groups.approaches.add(roadMesh);
      selectables.push(roadMesh);

      const sidewalkRanges: Array<readonly [number, number]> = [
        [halfRoad, halfRoad + spec.approaches.sidewalkWidth],
        [-halfRoad - spec.approaches.sidewalkWidth, -halfRoad],
      ];
      for (const [lateralMin, lateralMax] of sidewalkRanges) {
        if (lateralMin === lateralMax) continue;
        const sidewalkQuad = clipPolygonToBounds(
          quadFromApproach(
            spec.origin,
            angle,
            spec.hex.outerA,
            far,
            lateralMin,
            lateralMax,
          ),
          spec.boundsX,
          spec.boundsZ,
        );
        const approachSidewalk = meshFromGeometry(
          prismGeometry(
            sidewalkQuad,
            elevation.surfaces['sidewalk.approach'].bottom,
            elevation.surfaces['sidewalk.approach'].top,
          ),
          [
            materials.surfaces['sidewalk.approach'].top,
            materials.surfaces['sidewalk.approach'].solid,
          ],
          'approaches',
          approachDetail,
        );
        groups.approaches.add(approachSidewalk);
        selectables.push(approachSidewalk);
      }

      const laneLine = dashedLine(
        lineGeometry(
          [
            approachPoint(spec.origin, angle, spec.hex.roadOuterA, 0),
            approachPoint(spec.origin, angle, far, 0),
          ],
          elevation.annotations.laneMark,
        ),
        materials.annotation,
      );
      groups.annotations.add(laneLine);

      const crosswalkNear = spec.hex.roadOuterA;
      const crosswalkFar = crosswalkNear + spec.approaches.crosswalkDepth;
      for (const distance of [crosswalkNear, crosswalkFar]) {
        groups.annotations.add(
          new THREE.Line(
            lineGeometry(
              [
                approachPoint(spec.origin, angle, distance, -halfRoad),
                approachPoint(spec.origin, angle, distance, halfRoad),
              ],
              elevation.annotations.crosswalk,
            ),
            materials.annotationSolid,
          ),
        );
      }
    }

    const ringCenterline = dashedLine(
      lineLoopGeometry(
        hexVertices(spec.hex.centerA, spec.origin),
        elevation.annotations.crosswalk,
      ),
      materials.annotation,
    );
    // Anchored to the sidewalk it outlines. The illustrative set put this at 0.21, partway up
    // the sidewalk's outer wall rather than on its top face.
    const outsideBoundary = new THREE.Line(
      lineLoopGeometry(
        hexVertices(spec.hex.outerA, spec.origin),
        elevation.annotations.boundary,
      ),
      materials.annotationSolid,
    );
    groups.annotations.add(ringCenterline, outsideBoundary);

    return { group, groups, selectables };
  } catch (error) {
    disposeObjectGeometries(group);
    throw error;
  }
}

export function createSpatialScene(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  initialSpec: SpatialModel,
  callbacks: SpatialSceneCallbacks,
): SpatialSceneController {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = false;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new THREE.Scene();
  const materials = materialSet();
  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x111111, 1.75);
  const directional = new THREE.DirectionalLight(0xffffff, 2.25);
  directional.position.set(180, 360, 220);
  scene.add(hemisphere, directional);

  const perspectiveCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 10000);
  const topCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10000);
  let activeCamera: THREE.Camera = perspectiveCamera;
  let currentView: SpatialViewMode = 'perspective';
  let currentSpec = initialSpec;
  let yScale = 4;
  let viewportAspect = 1;
  let disposed = false;
  const layerVisibility = Object.fromEntries(
    SPATIAL_LAYER_KEYS.map((key) => [key, true]),
  ) as Record<SpatialLayerKey, boolean>;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // A grid spec is essentially flat, so y = 0 frames it. A manifest is a vertical stack — the
  // Void Ship spans -6 to +26 — and targeting the floor would put the camera inside the geometry.
  const centerOf = (spec: SpatialModel): THREE.Vector3 =>
    new THREE.Vector3(
      (spec.boundsX[0] + spec.boundsX[1]) / 2,
      spec.kind === 'manifest'
        ? (spec.layers[0].y + spec.layers[spec.layers.length - 1].y) / 2
        : 0,
      (spec.boundsZ[0] + spec.boundsZ[1]) / 2,
    );

  const extentOf = (spec: SpatialModel): number =>
    spec.kind === 'manifest'
      ? Math.max(spec.size[0], spec.size[1], spec.envelope[1])
      : Math.max(spec.size[0], spec.size[1]);

  const configurePerspective = (spec: SpatialModel): void => {
    const center = centerOf(spec);
    const extent = extentOf(spec);
    // A grid spec's geometry occupies roughly half its declared view, so these multipliers frame
    // it well. A manifest fills its envelope edge to edge, so the same numbers put the camera
    // inside the box — it needs pulling back by about the ratio of those two situations.
    const pull = spec.kind === 'manifest' ? 1.9 : 1;
    perspectiveCamera.near = Math.max(0.05, extent / 20000);
    perspectiveCamera.far = extent * 12 * pull;
    perspectiveCamera.position.set(
      center.x + extent * 0.65 * pull,
      center.y + extent * 0.58 * pull,
      center.z + extent * 0.78 * pull,
    );
    perspectiveCamera.up.set(0, 1, 0);
    perspectiveCamera.lookAt(center);
    perspectiveCamera.updateProjectionMatrix();
  };

  const updateTopFrustum = (spec: SpatialModel): void => {
    const halfHeight =
      Math.max(spec.size[1] / 2, spec.size[0] / (2 * viewportAspect)) * 1.08;
    topCamera.left = -halfHeight * viewportAspect;
    topCamera.right = halfHeight * viewportAspect;
    topCamera.top = halfHeight;
    topCamera.bottom = -halfHeight;
    topCamera.updateProjectionMatrix();
  };

  const configureTop = (spec: SpatialModel): void => {
    const center = centerOf(spec);
    const extent = extentOf(spec);
    topCamera.near = Math.max(0.05, extent / 20000);
    topCamera.far = extent * 6;
    topCamera.zoom = 1;
    topCamera.position.set(center.x, extent * 2, center.z);
    // The JSON contract defines north as -Z. This makes -Z the top of the screen.
    topCamera.up.set(0, 0, -1);
    topCamera.lookAt(center);
    updateTopFrustum(spec);
  };

  const makeControls = (camera: THREE.Camera): OrbitControls => {
    const next = new OrbitControls(camera, canvas);
    next.target.copy(centerOf(currentSpec));
    next.enableDamping = !reducedMotion.matches;
    next.dampingFactor = 0.075;
    next.enableRotate = camera === perspectiveCamera;
    next.enablePan = true;
    next.screenSpacePanning = true;
    if (camera === perspectiveCamera) {
      const extent = extentOf(currentSpec);
      next.minDistance = extent * 0.14;
      next.maxDistance = extent * 4;
      next.maxPolarAngle = Math.PI * 0.49;
    } else {
      next.minZoom = 0.4;
      next.maxZoom = 20;
    }
    next.update();
    return next;
  };

  configurePerspective(currentSpec);
  configureTop(currentSpec);
  let controls = makeControls(activeCamera);
  let currentWorld = createWorld(initialSpec, materials);
  currentWorld.group.scale.y = yScale;
  scene.add(currentWorld.group);

  const surfaceMaterialList = (
    ...roles: SurfaceRole[]
  ): THREE.MeshStandardMaterial[] =>
    roles.flatMap((role) => [
      materials.surfaces[role].top,
      materials.surfaces[role].solid,
    ]);
  const selectionMaterials: Record<SelectKey, THREE.MeshStandardMaterial[]> = {
    core: surfaceMaterialList('core'),
    sidewalks: surfaceMaterialList('sidewalk.inner', 'sidewalk.outer'),
    road: surfaceMaterialList('road.ring'),
    approaches: surfaceMaterialList('road.approach', 'sidewalk.approach'),
    // Manifest layer plates share one translucent material rather than a top/solid pair.
    assemblies: [materials.assemblyFace],
  };
  let selectedKey: SelectKey | null = null;
  const applySelection = (key: SelectKey | null): void => {
    selectedKey = key;
    for (const [candidate, candidateMaterials] of Object.entries(
      selectionMaterials,
    ) as Array<[SelectKey, THREE.MeshStandardMaterial[]]>) {
      for (const material of candidateMaterials) {
        material.emissiveIntensity = candidate === key ? 0.46 : 0;
      }
    }
  };

  const themeSurfaceColors: Record<
    SurfaceRole,
    readonly [token: string, fallback: string]
  > = {
    ground: ['--tcl-bg', '#0a0d12'],
    core: ['--tcl-accent', '#d4af37'],
    'sidewalk.inner': ['--tcl-status-info', '#44ddff'],
    'sidewalk.outer': ['--tcl-status-info', '#44ddff'],
    'road.ring': ['--tcl-text-faint', '#5a6371'],
    'road.approach': ['--tcl-text-faint', '#5a6371'],
    'sidewalk.approach': ['--tcl-status-info', '#44ddff'],
  };
  const textureLoader = new THREE.TextureLoader();
  const activeTextures = new Set<THREE.Texture>();
  const safeAnisotropy = Math.max(
    1,
    Math.min(8, renderer.capabilities.getMaxAnisotropy()),
  );
  let appearanceGeneration = 0;
  let hasDeclaredAppearance = false;

  const detachSurfaceTextures = (): void => {
    for (const pair of Object.values(materials.surfaces)) {
      for (const material of [pair.top, pair.solid]) {
        const hadMaps = Boolean(
          material.map ||
            material.normalMap ||
            material.roughnessMap ||
            material.metalnessMap,
        );
        material.map = null;
        material.normalMap = null;
        material.roughnessMap = null;
        material.metalnessMap = null;
        if (hadMaps) material.needsUpdate = true;
      }
    }
  };

  const releaseActiveTextures = (): void => {
    detachSurfaceTextures();
    for (const texture of activeTextures) texture.dispose();
    activeTextures.clear();
  };

  const applyThemeSurfaceStyles = (): void => {
    for (const role of SPATIAL_SURFACE_TARGETS) {
      const [token, fallback] = themeSurfaceColors[role];
      const color = themeColor(token, fallback);
      const pair = materials.surfaces[role];
      for (const material of [pair.top, pair.solid]) {
        material.color.copy(color);
        material.roughness = 0.82;
        material.metalness = 0.02;
        material.normalScale.set(1, 1);
      }
    }
  };

  const applyDeclaredSurfaceStyles = (appearance: AppearanceSpec): void => {
    const definitions = new Map(
      appearance.surfaceDefinitions.map((definition) => [
        definition.id,
        definition,
      ]),
    );
    for (const binding of appearance.surfaceBindings) {
      const definition = definitions.get(binding.surfaceId);
      if (!definition) continue;
      const pair = materials.surfaces[binding.geometryRole];
      for (const material of [pair.top, pair.solid]) {
        material.color.setStyle(definition.preview.fallbackColor);
        material.roughness = definition.preview.roughness;
        material.metalness = definition.preview.metalness;
        material.normalScale.set(
          definition.preview.normalStrength,
          definition.preview.normalStrength,
        );
      }
    }
  };

  const appearanceRequests = (
    appearance: AppearanceSpec,
  ): AppearanceMapRequest[] => {
    const assets = new Map(
      appearance.textureAssets.map((asset) => [asset.id, asset]),
    );
    const rolesBySurface = new Map<string, SurfaceRole[]>();
    for (const binding of appearance.surfaceBindings) {
      const roles = rolesBySurface.get(binding.surfaceId) ?? [];
      roles.push(binding.geometryRole);
      rolesBySurface.set(binding.surfaceId, roles);
    }
    const requests: AppearanceMapRequest[] = [];
    for (const definition of appearance.surfaceDefinitions) {
      const surfaceRoles = rolesBySurface.get(definition.id);
      if (!surfaceRoles?.length) continue;
      for (const [role, assetId] of Object.entries(definition.maps) as Array<
        [TextureRole, string]
      >) {
        const asset = assets.get(assetId);
        if (asset) {
          requests.push({ asset, definition, role, surfaceRoles });
        }
      }
    }
    return requests;
  };

  const configureTexture = (
    texture: THREE.Texture,
    request: AppearanceMapRequest,
    appearance: AppearanceSpec,
  ): void => {
    const { tileStuds, offsetStuds } = request.definition.mapping;
    const [anchorX, anchorZ] = appearance.projection.anchor;
    texture.name = `${request.definition.id}:${request.role}:${request.asset.id}`;
    texture.colorSpace =
      request.role === 'color' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / tileStuds[0], 1 / tileStuds[1]);
    texture.offset.set(
      (-anchorX + offsetStuds[0]) / tileStuds[0],
      (anchorZ + offsetStuds[1]) / tileStuds[1],
    );
    texture.rotation = 0;
    texture.anisotropy = safeAnisotropy;
    texture.needsUpdate = true;
  };

  const attachTexture = (
    texture: THREE.Texture,
    request: AppearanceMapRequest,
  ): void => {
    for (const surfaceRole of request.surfaceRoles) {
      const material = materials.surfaces[surfaceRole].top;
      if (request.role === 'color') {
        material.map = texture;
        // MeshStandardMaterial multiplies albedo by material.color.
        material.color.set(0xffffff);
      } else if (request.role === 'normal') {
        material.normalMap = texture;
        material.normalScale.set(
          request.definition.preview.normalStrength,
          request.definition.preview.normalStrength,
        );
      } else if (request.role === 'roughness') {
        material.roughnessMap = texture;
        // Data maps multiply these scalar channels; one preserves the map.
        material.roughness = 1;
      } else {
        material.metalnessMap = texture;
        material.metalness = 1;
      }
      material.needsUpdate = true;
    }
  };

  const beginAppearance = (spec: SpatialModel): void => {
    const generation = ++appearanceGeneration;
    releaseActiveTextures();
    // A build manifest declares `material_tokens` rather than an appearance block; the lens does
    // not read them yet, so it falls through to theme materials like any spec without appearance.
    const appearance = spec.kind === 'grid' ? spec.appearance : undefined;
    hasDeclaredAppearance = Boolean(appearance);
    if (!appearance) {
      applyThemeSurfaceStyles();
      const warning = spec.kind === 'grid' ? spec.appearanceWarning : undefined;
      callbacks.onAppearanceState({
        status: warning ? 'warning' : 'fallback',
        message:
          warning ??
          (spec.kind === 'manifest'
            ? 'Build manifests declare material tokens, not a preview appearance; using theme materials.'
            : 'No preview appearance is declared; using theme fallback materials.'),
        requestedMaps: 0,
        loadedMaps: 0,
        fallbackMaps: 0,
      });
      return;
    }

    applyDeclaredSurfaceStyles(appearance);
    const requests = appearanceRequests(appearance);
    if (requests.length === 0) {
      callbacks.onAppearanceState({
        status: 'fallback',
        message:
          'Preview appearance uses declared fallback materials; no texture maps were requested.',
        requestedMaps: 0,
        loadedMaps: 0,
        fallbackMaps: 0,
      });
      return;
    }

    callbacks.onAppearanceState({
      status: 'loading',
      message: `Loading ${requests.length} bundled preview map${
        requests.length === 1 ? '' : 's'
      }…`,
      requestedMaps: requests.length,
      loadedMaps: 0,
      fallbackMaps: 0,
    });

    void Promise.all(
      requests.map(async (request) => {
        const source = BUNDLED_TEXTURE_SOURCES.get(request.asset.sourceKey);
        if (!source) {
          return {
            loaded: false,
            optional: request.asset.optional,
            label: request.asset.sourceKey,
          };
        }
        try {
          const texture = await textureLoader.loadAsync(source);
          if (disposed || generation !== appearanceGeneration) {
            texture.dispose();
            return {
              loaded: false,
              optional: request.asset.optional,
              label: request.asset.sourceKey,
            };
          }
          configureTexture(texture, request, appearance);
          activeTextures.add(texture);
          attachTexture(texture, request);
          return {
            loaded: true,
            optional: request.asset.optional,
            label: request.asset.sourceKey,
          };
        } catch {
          return {
            loaded: false,
            optional: request.asset.optional,
            label: request.asset.sourceKey,
          };
        }
      }),
    ).then((results) => {
      if (disposed || generation !== appearanceGeneration) return;
      const loadedMaps = results.filter((result) => result.loaded).length;
      const failures = results.filter((result) => !result.loaded);
      const fallbackMaps = failures.length;
      if (fallbackMaps === 0) {
        callbacks.onAppearanceState({
          status: 'ready',
          message: `${loadedMaps} bundled preview map${
            loadedMaps === 1 ? '' : 's'
          } ready.`,
          requestedMaps: requests.length,
          loadedMaps,
          fallbackMaps: 0,
        });
        return;
      }
      const onlyOptional = failures.every((failure) => failure.optional);
      const labels = [...new Set(failures.map((failure) => failure.label))].join(
        ', ',
      );
      callbacks.onAppearanceState({
        status: 'warning',
        message:
          `${loadedMaps}/${requests.length} bundled preview maps loaded; ` +
          `${fallbackMaps} ${onlyOptional ? 'optional ' : ''}map${
            fallbackMaps === 1 ? '' : 's'
          } using declared fallback (${labels}).`,
        requestedMaps: requests.length,
        loadedMaps,
        fallbackMaps,
      });
    });
  };

  const refreshTheme = (): void => {
    const background = themeColor('--tcl-surface-sunken', '#14181e');
    scene.background = background;
    renderer.setClearColor(background, 1);
    if (!hasDeclaredAppearance) applyThemeSurfaceStyles();
    materials.annotation.color.copy(themeColor('--tcl-text', '#e6edf3'));
    materials.annotationSolid.color.copy(
      themeColor('--tcl-text', '#e6edf3'),
    );
    materials.gridMinor.color.copy(themeColor('--tcl-border-soft', '#1f242c'));
    materials.gridMajor.color.copy(themeColor('--tcl-border-strong', '#3a4350'));
    materials.gridSuper.color.copy(themeColor('--tcl-status-info', '#44ddff'));
    materials.axisX.color.copy(themeColor('--tcl-status-danger', '#ff4444'));
    materials.axisZ.color.copy(themeColor('--tcl-status-info', '#44ddff'));
    materials.assemblyFace.color.copy(themeColor('--tcl-status-info', '#44ddff'));
    materials.envelopeLine.color.copy(themeColor('--tcl-border-strong', '#3a4350'));
    const selectionColor = themeColor('--tcl-text', '#e6edf3');
    for (const candidateMaterials of Object.values(selectionMaterials)) {
      for (const material of candidateMaterials) {
        material.emissive.copy(selectionColor);
      }
    }
    // Scene lighting stays spectrally neutral across UI themes; using the text token here would
    // turn the lights nearly black in light mode and crush every material to silhouette.
    hemisphere.color.set(0xffffff);
    hemisphere.groundColor.copy(background);
    directional.color.set(0xffffff);
    applySelection(selectedKey);
  };

  const setView = (mode: SpatialViewMode): void => {
    if (disposed) return;
    currentView = mode;
    controls.dispose();
    if (mode === 'top') {
      configureTop(currentSpec);
      activeCamera = topCamera;
    } else {
      configurePerspective(currentSpec);
      activeCamera = perspectiveCamera;
    }
    controls = makeControls(activeCamera);
  };

  const setLayerVisible = (key: SpatialLayerKey, visible: boolean): void => {
    layerVisibility[key] = visible;
    currentWorld.groups[key].visible = visible;
    const selectionLayer: Record<SelectKey, SpatialLayerKey> = {
      core: 'core',
      sidewalks: 'sidewalks',
      road: 'road',
      approaches: 'approaches',
      assemblies: 'assemblies',
    };
    if (selectedKey && selectionLayer[selectedKey] === key) {
      applySelection(null);
      callbacks.onSelection(null);
    }
  };

  const replaceSpec = (nextSpec: SpatialModel): void => {
    if (disposed) return;
    // Build completely before touching the current scene. An incompatible or unexpectedly
    // expensive spec can never erase the last valid world.
    const nextWorld = createWorld(nextSpec, materials);
    for (const key of SPATIAL_LAYER_KEYS) {
      nextWorld.groups[key].visible = layerVisibility[key];
    }
    nextWorld.group.scale.y = yScale;
    // Reset the shared materials synchronously before the new world can render;
    // asynchronous loads are generation-guarded below.
    beginAppearance(nextSpec);
    const previousWorld = currentWorld;
    currentWorld = nextWorld;
    currentSpec = nextSpec;
    scene.add(nextWorld.group);
    scene.remove(previousWorld.group);
    disposeObjectGeometries(previousWorld.group);
    applySelection(null);
    callbacks.onSelection(null);
    setView(currentView);
  };

  const setYScale = (scale: number): void => {
    if (!Number.isFinite(scale)) return;
    yScale = THREE.MathUtils.clamp(scale, 1, 8);
    currentWorld.group.scale.y = yScale;
  };

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerDown: { x: number; y: number } | null = null;

  const effectivelyVisible = (object: THREE.Object3D): boolean => {
    let candidate: THREE.Object3D | null = object;
    while (candidate) {
      if (!candidate.visible) return false;
      if (candidate === currentWorld.group) return true;
      candidate = candidate.parent;
    }
    return false;
  };

  const onPointerDown = (event: PointerEvent): void => {
    pointerDown = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent): void => {
    if (!pointerDown) return;
    const movement = Math.hypot(
      event.clientX - pointerDown.x,
      event.clientY - pointerDown.y,
    );
    pointerDown = null;
    if (movement > 5) return;

    const bounds = canvas.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) return;
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    raycaster.setFromCamera(pointer, activeCamera);
    const hit = raycaster
      .intersectObjects(currentWorld.selectables, false)
      .find((candidate) => effectivelyVisible(candidate.object));
    if (!hit) {
      applySelection(null);
      callbacks.onSelection(null);
      return;
    }
    const key = hit.object.userData.selectKey as SelectKey;
    const detail = hit.object.userData.detail as string;
    applySelection(key);
    callbacks.onSelection({ key, detail });
  };

  const resize = (width: number, height: number): void => {
    if (width <= 0 || height <= 0) return;
    viewportAspect = width / height;
    renderer.setSize(width, height, false);
    perspectiveCamera.aspect = viewportAspect;
    perspectiveCamera.updateProjectionMatrix();
    updateTopFrustum(currentSpec);
  };
  const resizeObserver = new ResizeObserver((entries) => {
    const box = entries[0]?.contentRect;
    if (box) resize(box.width, box.height);
  });
  resizeObserver.observe(host);
  const hostBounds = host.getBoundingClientRect();
  resize(hostBounds.width || 960, hostBounds.height || 600);

  const onReducedMotion = (): void => {
    controls.enableDamping = !reducedMotion.matches;
  };
  reducedMotion.addEventListener('change', onReducedMotion);

  const themeObserver = new MutationObserver(refreshTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'style', 'data-theme'],
  });

  const onContextLost = (event: Event): void => {
    event.preventDefault();
    callbacks.onError('The 3D context was lost. Reload the Command Center to restore it.');
  };
  const onContextRestored = (): void => callbacks.onError(null);
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);

  refreshTheme();
  beginAppearance(initialSpec);
  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, activeCamera);
  });

  return {
    replaceSpec,
    setLayerVisible,
    setView,
    setYScale,
    dispose: () => {
      if (disposed) return;
      disposed = true;
      appearanceGeneration += 1;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener('change', onReducedMotion);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      controls.dispose();
      scene.remove(currentWorld.group);
      disposeObjectGeometries(currentWorld.group);
      releaseActiveTextures();
      disposeMaterials(materials);
      renderer.dispose();
      // The panel gives every effect mount its own canvas. Explicitly release this mount's context
      // so StrictMode and repeated tab visits cannot accumulate dormant GPU contexts.
      renderer.forceContextLoss();
    },
  };
}
