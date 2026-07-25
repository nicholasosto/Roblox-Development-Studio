import * as THREE from 'three';
import type { GridSpec, StudPair } from './gridSpec';

export type XzPoint = readonly [number, number];
export type GridLevel = 'minor' | 'major' | 'super';

export function hexVertices(apothem: number, origin: StudPair): XzPoint[] {
  const [originX, originZ] = origin;
  const k = apothem / Math.sqrt(3);
  return [
    [originX + 2 * k, originZ],
    [originX + k, originZ + apothem],
    [originX - k, originZ + apothem],
    [originX - 2 * k, originZ],
    [originX - k, originZ - apothem],
    [originX + k, originZ - apothem],
  ];
}

/**
 * Stores unscaled world-space stud coordinates in UVs. Surface definitions apply
 * their tile size and anchor through Texture.repeat/offset, so independently built
 * meshes keep one continuous +X / -Z projection.
 */
export function applyWorldStudUvs(
  geometry: THREE.BufferGeometry,
): THREE.BufferGeometry {
  const positions = geometry.getAttribute('position');
  const uvs = new Float32Array(positions.count * 2);
  for (let index = 0; index < positions.count; index += 1) {
    uvs[index * 2] = positions.getX(index);
    uvs[index * 2 + 1] = -positions.getZ(index);
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  return geometry;
}

function finalizeSurfaceGeometry(
  indexed: THREE.BufferGeometry,
  topIndexCount: number,
): THREE.BufferGeometry {
  const geometry = indexed.toNonIndexed();
  indexed.dispose();
  geometry.clearGroups();
  geometry.addGroup(0, topIndexCount, 0);
  geometry.addGroup(
    topIndexCount,
    geometry.getAttribute('position').count - topIndexCount,
    1,
  );
  applyWorldStudUvs(geometry);
  geometry.computeVertexNormals();
  return geometry;
}

export function prismGeometry(
  vertices: XzPoint[],
  bottomY: number,
  topY: number,
): THREE.BufferGeometry {
  const count = vertices.length;
  if (count < 3) throw new Error('A prism needs at least three X/Z vertices');

  const positions: number[] = [];
  for (const [x, z] of vertices) positions.push(x, topY, z);
  for (const [x, z] of vertices) positions.push(x, bottomY, z);

  const indices: number[] = [];
  for (let index = 1; index < count - 1; index += 1) {
    // X/Z polygon vertices are counter-clockwise when viewed in the X/Z plane.
    // Reverse the top winding so its normal is +Y; retain CCW for the -Y bottom.
    indices.push(0, index + 1, index);
  }
  const topIndexCount = indices.length;
  for (let index = 1; index < count - 1; index += 1) {
    indices.push(count, count + index, count + index + 1);
  }
  for (let index = 0; index < count; index += 1) {
    const next = (index + 1) % count;
    indices.push(index, count + next, count + index);
    indices.push(index, next, count + next);
  }

  const indexed = new THREE.BufferGeometry();
  indexed.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  indexed.setIndex(indices);
  return finalizeSurfaceGeometry(indexed, topIndexCount);
}

export function hexRingGeometry(
  innerApothem: number,
  outerApothem: number,
  origin: StudPair,
  bottomY: number,
  topY: number,
): THREE.BufferGeometry {
  const outer = hexVertices(outerApothem, origin);
  const inner = hexVertices(innerApothem, origin);
  const positions: number[] = [];
  for (const [x, z] of outer) positions.push(x, topY, z);
  for (const [x, z] of inner) positions.push(x, topY, z);
  for (const [x, z] of outer) positions.push(x, bottomY, z);
  for (const [x, z] of inner) positions.push(x, bottomY, z);

  const indices: number[] = [];
  for (let index = 0; index < 6; index += 1) {
    const next = (index + 1) % 6;
    const outerTop = index;
    const outerTopNext = next;
    const innerTop = 6 + index;
    const innerTopNext = 6 + next;
    indices.push(
      outerTop,
      innerTopNext,
      outerTopNext,
      outerTop,
      innerTop,
      innerTopNext,
    );
  }
  const topIndexCount = indices.length;
  for (let index = 0; index < 6; index += 1) {
    const next = (index + 1) % 6;
    const outerTop = index;
    const outerTopNext = next;
    const innerTop = 6 + index;
    const innerTopNext = 6 + next;
    const outerBottom = 12 + index;
    const outerBottomNext = 12 + next;
    const innerBottom = 18 + index;
    const innerBottomNext = 18 + next;
    indices.push(
      outerBottom,
      outerBottomNext,
      innerBottomNext,
      outerBottom,
      innerBottomNext,
      innerBottom,
    );
    indices.push(
      outerBottom,
      outerTopNext,
      outerBottomNext,
      outerBottom,
      outerTop,
      outerTopNext,
    );
    indices.push(
      innerBottom,
      innerBottomNext,
      innerTopNext,
      innerBottom,
      innerTopNext,
      innerTop,
    );
  }

  const indexed = new THREE.BufferGeometry();
  indexed.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  indexed.setIndex(indices);
  return finalizeSurfaceGeometry(indexed, topIndexCount);
}

export function quadFromApproach(
  origin: StudPair,
  angleDegrees: number,
  near: number,
  far: number,
  lateralMin: number,
  lateralMax: number,
): XzPoint[] {
  const radians = (angleDegrees * Math.PI) / 180;
  const normal: XzPoint = [Math.cos(radians), Math.sin(radians)];
  const tangent: XzPoint = [-Math.sin(radians), Math.cos(radians)];
  const point = (distance: number, lateral: number): XzPoint => [
    origin[0] + normal[0] * distance + tangent[0] * lateral,
    origin[1] + normal[1] * distance + tangent[1] * lateral,
  ];
  return [
    point(near, lateralMin),
    point(far, lateralMin),
    point(far, lateralMax),
    point(near, lateralMax),
  ];
}

export function clipPolygonToBounds(
  vertices: XzPoint[],
  boundsX: StudPair,
  boundsZ: StudPair,
): XzPoint[] {
  const clip = (
    points: XzPoint[],
    inside: (point: XzPoint) => boolean,
    intersect: (from: XzPoint, to: XzPoint) => XzPoint,
  ): XzPoint[] => {
    const output: XzPoint[] = [];
    if (points.length === 0) return output;
    for (let index = 0; index < points.length; index += 1) {
      const current = points[index];
      const previous = points[(index + points.length - 1) % points.length];
      const currentInside = inside(current);
      const previousInside = inside(previous);
      if (currentInside) {
        if (!previousInside) output.push(intersect(previous, current));
        output.push(current);
      } else if (previousInside) {
        output.push(intersect(previous, current));
      }
    }
    return output;
  };

  const intersectX =
    (value: number) =>
    (from: XzPoint, to: XzPoint): XzPoint => {
      const ratio = (value - from[0]) / (to[0] - from[0]);
      return [value, from[1] + (to[1] - from[1]) * ratio];
    };
  const intersectZ =
    (value: number) =>
    (from: XzPoint, to: XzPoint): XzPoint => {
      const ratio = (value - from[1]) / (to[1] - from[1]);
      return [from[0] + (to[0] - from[0]) * ratio, value];
    };

  let result = vertices;
  result = clip(result, (point) => point[0] >= boundsX[0], intersectX(boundsX[0]));
  result = clip(result, (point) => point[0] <= boundsX[1], intersectX(boundsX[1]));
  result = clip(result, (point) => point[1] >= boundsZ[0], intersectZ(boundsZ[0]));
  result = clip(result, (point) => point[1] <= boundsZ[1], intersectZ(boundsZ[1]));
  return result;
}

export function rayExitDistance(
  origin: StudPair,
  normal: XzPoint,
  boundsX: StudPair,
  boundsZ: StudPair,
): number {
  const distances: number[] = [];
  if (Math.abs(normal[0]) > 0.000001) {
    const boundaryX = normal[0] > 0 ? boundsX[1] : boundsX[0];
    const distanceX = (boundaryX - origin[0]) / normal[0];
    if (distanceX > 0) distances.push(distanceX);
  }
  if (Math.abs(normal[1]) > 0.000001) {
    const boundaryZ = normal[1] > 0 ? boundsZ[1] : boundsZ[0];
    const distanceZ = (boundaryZ - origin[1]) / normal[1];
    if (distanceZ > 0) distances.push(distanceZ);
  }
  if (distances.length === 0) {
    throw new Error('Approach ray does not intersect the view bounds');
  }
  return Math.min(...distances);
}

export function gridLineGeometry(
  spec: GridSpec,
  level: GridLevel,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const { minor, major, super: superStep } = spec.grid;
  const [originX, originZ] = spec.origin;
  const superRatio = Math.round(superStep / minor);
  const majorRatio = Math.round(major / minor);
  const classify = (index: number): GridLevel => {
    if (index % superRatio === 0) return 'super';
    if (index % majorRatio === 0) return 'major';
    return 'minor';
  };

  const xStart = Math.ceil((spec.boundsX[0] - originX) / minor);
  const xEnd = Math.floor((spec.boundsX[1] - originX) / minor);
  for (let index = xStart; index <= xEnd; index += 1) {
    if (classify(index) !== level) continue;
    const x = originX + index * minor;
    positions.push(x, -0.06, spec.boundsZ[0], x, -0.06, spec.boundsZ[1]);
  }

  const zStart = Math.ceil((spec.boundsZ[0] - originZ) / minor);
  const zEnd = Math.floor((spec.boundsZ[1] - originZ) / minor);
  for (let index = zStart; index <= zEnd; index += 1) {
    if (classify(index) !== level) continue;
    const z = originZ + index * minor;
    positions.push(spec.boundsX[0], -0.06, z, spec.boundsX[1], -0.06, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export function lineLoopGeometry(
  points: XzPoint[],
  y: number,
): THREE.BufferGeometry {
  const closed = [...points, points[0]];
  return new THREE.BufferGeometry().setFromPoints(
    closed.map(([x, z]) => new THREE.Vector3(x, y, z)),
  );
}

export function lineGeometry(
  points: XzPoint[],
  y: number,
): THREE.BufferGeometry {
  return new THREE.BufferGeometry().setFromPoints(
    points.map(([x, z]) => new THREE.Vector3(x, y, z)),
  );
}
