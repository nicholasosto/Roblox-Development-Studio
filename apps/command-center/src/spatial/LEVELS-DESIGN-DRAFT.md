# Design draft — `levels[]` multi-floor extension to the spatial grid spec

> **Status: proposal. Nothing here is implemented in this repo.** No file under
> `apps/command-center/src/spatial/` has been modified — verify with `git diff`. This document is a
> design draft only; it does not authorize a change.

Target: `apps/command-center/src/spatial/{gridSpec.ts, geometry.ts, spatialScene.ts, SpatialGridPanel.tsx}`.
Every line reference below was read against the files at HEAD.

**Provenance.** Drafted 2026-07-26 from three independent designs (minimum-diff, schema-correctness,
builder-need), scored by a three-lens judge panel — implementability, contract soundness, and
willingness to admit what it cannot do — with the winner's structure kept and the runners-up's best
ideas grafted in. The judges verified each claimed seam against real source; several designs lost
points for claims that did not survive that check (see §5's "two alternatives", which is one of them).

**What was actually executed.** The validator half of §4 was prototyped against a copy of the real
`gridSpec.ts`, compiled clean under the project's own `tsc --strict`, and run against both the
shipped fixture and a two-level document. The §7 error strings are that run's verbatim output,
re-executed and confirmed independently before this draft was filed. The prototype lives outside the
repo and is **not** proposed for merge as-is — it exists to prove the seams are real. The renderer,
panel and appearance halves (§4's `spatialScene.ts` / `SpatialGridPanel.tsx` sections, §5, §6) are
**designed but not executed**; treat their effort ratings as estimates.

---

## 1. Scope

### Delivered

- A grid spec may declare `levels[]`: an ordered array of complete X/Z hex plans, each pinned to the
  shared document frame by one placement scalar, `baseElevationStuds`.
- The frame — `coordinateSystem` (plane, origin, north, `verticalAxisShown`), `view.boundsStuds`,
  `view.sizeStuds`, `grid` cadence, `appearance` — stays document-global and is validated **once**,
  before any level is parsed.
- Every level body is re-parsed by `validateGridSpec` itself, so all 14 `checkDeclaredDimension`
  calls, the apothem ordering (`gridSpec.ts:615-625`), the bounds containment (`:626-634`) and the
  approach-extent guard (`:757-763`) run per level with zero drift risk.
- One opening primitive: `levels[i].hex.core.voidApothemStuds`. The core becomes an annulus drawn by
  the already-existing `hexRingGeometry` (`geometry.ts:90`). Zero new geometry code, zero new surface
  roles.
- Per-level visibility with three states (solid / ghost / hidden) and an isolate action.
- A picking fix: meshes carry `levelId`, selection is scoped to an active level, and the footer
  readout names the floor.
- An elevation texture channel so slab **edges** are mapped for the first time
  (`spatialScene.ts:713-714` writes maps only to `.top` today).
- A dimensional schema identifier, `trembus.spatial-grid/v1|v2`, and an appearance bump to
  `trembus.spatial-appearance/v2`.

### NOT delivered — read this before planning around it

- **No stairs, ramps, escalators, lifts, or any inter-level connection geometry.** There is no
  `connections[]`. Circulation between floors is out of contract; a whitebox author adds a wedge in
  Studio.
- **No CSG, and none is faked.** `geometry.ts` cannot subtract. `prismGeometry` (`:56`) caps with a
  triangle fan from vertex 0 (`:69-73`), so a concave or keyholed ring inverts.
  `clipPolygonToBounds` (`:187`) is a Sutherland–Hodgman clip against four axis-aligned half-planes
  emitting exactly one ring. `hexRingGeometry` (`:90`) is hardcoded to 6+6 concentric hex vertices
  with literal 6/12/18 index offsets. `three ^0.183.2` is the only 3D dependency and no CSG package
  is installed.
- **The only opening is one hex void concentric with the document origin, in the core band only.**
  The three annulus bands are already rings. You cannot cut an off-centre stair shaft, a rectangular
  lift core, a circular light well, or two voids on one floor. Sector-band tiling (an opening as a
  declared-absent `(band, sector)` tile) is the sanctioned future generalization — recorded in the
  ADR, not built here.
- **No floor plates.** A level is a plan drawn at an elevation. The only full-footprint surface in
  the scene remains the single global ground `PlaneGeometry` (`spatialScene.ts:237-247`). Nothing has
  a hole to cut because nothing is solid across the footprint.
- **No per-level slab thickness, floor-to-floor pitch, headroom, or clearance rule.** The Y literals
  stay in the renderer (`:284` core 0/1.35, `:297`/`:306` sidewalks 0/0.88, `:319`/`:353` roads
  -0.02/0.14, `:383` approach walks 0/0.88, annotations 0.19/0.20/0.21). Any predicate of the form
  "gap(k+1,k) must exceed level k's thickness" is a Y-valued dimensional check and would require
  moving the refusal at `:529`.
- **No per-level `origin`, `grid`, `view`, `north`, or `verticalAxisShown`.** Rejected **by name** by
  `assertOnlyKeys` on the closed level record, not silently ignored.
- **Every level is a complete five-band hex plan with one to six approaches.** A mezzanine cannot
  drop its ring road, cannot have zero approaches, and cannot be a bare deck. This is the price of
  reusing `validateGridSpec` wholesale. See §9, question 1.

---

## 2. Spec shape

Valid JSON. Level 0 is the shipped fixture's numbers byte-for-byte. `appearance` is omitted here for
length (it is optional — `gridSpec.ts:781` is a `hasOwnProperty` test); the v2 appearance delta is in
§6. The root object is deliberately **open** (adding a root `assertOnlyKeys` would reject the
fixture's `implementationNotes`, `authority.canonicalSpec`, `view.pngPixels`, `view.plotPixels`,
`view.plotPixelsPerStud`, `hex.construction`), so the `_notes` map below is legal and ignored. The
**level** record is **closed**.

```json
{
  "schema": "trembus.spatial-grid/v2",
  "title": "Hex City Center Roblox Unit Grid",
  "status": "measured-draft",
  "revision": 2,
  "date": "2026-07-26",
  "authority": {
    "dimensional": "This app-local JSON is the sole numeric authority for X/Z and for level base elevations; slab thickness remains illustrative"
  },
  "coordinateSystem": {
    "plane": "X/Z",
    "origin": [0, 0],
    "imageRight": "+X",
    "imageDown": "+Z",
    "north": "-Z",
    "verticalAxisShown": false
  },
  "view": {
    "boundsStuds": { "x": [-256, 256], "z": [-256, 256] },
    "sizeStuds": [512, 512]
  },
  "grid": { "minorStuds": 4, "majorStuds": 16, "superStuds": 64 },
  "levels": [
    {
      "id": "ground",
      "label": "Ground · city core",
      "baseElevationStuds": 0,
      "hex": {
        "orientation": "flat-top",
        "core": {
          "apothemStuds": 80,
          "flatToFlatStuds": 160,
          "pointToPointStuds": 184.752086
        },
        "innerSidewalkOuterEdge": {
          "apothemStuds": 92,
          "bandWidthStuds": 12,
          "flatToFlatStuds": 184,
          "pointToPointStuds": 212.464899
        },
        "roadCenterline": {
          "apothemStuds": 108,
          "flatToFlatStuds": 216,
          "pointToPointStuds": 249.415316
        },
        "roadOuterEdge": {
          "apothemStuds": 124,
          "bandWidthStuds": 32,
          "laneWidthStuds": 16,
          "flatToFlatStuds": 248,
          "pointToPointStuds": 286.365734
        },
        "outerSidewalkOuterEdge": {
          "apothemStuds": 136,
          "bandWidthStuds": 12,
          "flatToFlatStuds": 272,
          "pointToPointStuds": 314.078546
        }
      },
      "approaches": {
        "count": 6,
        "normalAnglesDegreesFromPositiveX": [30, 90, 150, 210, 270, 330],
        "roadWidthStuds": 32,
        "laneWidthStuds": 16,
        "sidewalkEachSideStuds": 12,
        "sidewalkToSidewalkWidthStuds": 56,
        "crosswalkDepthStuds": 12,
        "crosswalkPaintHasPhysicalWidth": false
      }
    },
    {
      "id": "mezzanine",
      "label": "Mezzanine deck",
      "baseElevationStuds": 48,
      "hex": {
        "orientation": "flat-top",
        "core": {
          "apothemStuds": 60,
          "voidApothemStuds": 20,
          "voidFlatToFlatStuds": 40,
          "voidPointToPointStuds": 46.188022,
          "flatToFlatStuds": 120,
          "pointToPointStuds": 138.564065
        },
        "innerSidewalkOuterEdge": {
          "apothemStuds": 72,
          "bandWidthStuds": 12,
          "flatToFlatStuds": 144,
          "pointToPointStuds": 166.276878
        },
        "roadOuterEdge": {
          "apothemStuds": 96,
          "bandWidthStuds": 24,
          "laneWidthStuds": 8,
          "flatToFlatStuds": 192,
          "pointToPointStuds": 221.702503
        },
        "outerSidewalkOuterEdge": {
          "apothemStuds": 108,
          "bandWidthStuds": 12,
          "flatToFlatStuds": 216,
          "pointToPointStuds": 249.415316
        }
      },
      "approaches": {
        "count": 3,
        "normalAnglesDegreesFromPositiveX": [30, 150, 270],
        "roadWidthStuds": 16,
        "laneWidthStuds": 8,
        "sidewalkEachSideStuds": 6,
        "sidewalkToSidewalkWidthStuds": 28,
        "crosswalkPaintHasPhysicalWidth": false
      }
    }
  ],
  "promotionGates": {
    "projectEntityCreated": true,
    "studioImported": false,
    "committed": false
  },
  "_notes": {
    "schema": "Required for a levels document. Absent or 'trembus.spatial-grid/v1' means the legacy single-plan shape and forbids levels[]. Read at gridSpec.ts:524, strictly before the coordinateSystem read at :525.",
    "root.hex / root.approaches": "Forbidden under v2. This is the anti-silent-truncation device: a pre-levels build reaches asRecord(root.hex,'hex') at gridSpec.ts:582 and throws 'hex must be a JSON object', so SpatialGridPanel.tsx:452 renders SpatialUnavailable with a real message instead of quietly drawing one floor.",
    "coordinateSystem.verticalAxisShown": "Still false, still refused at gridSpec.ts:529, still checked exactly once for the whole document. A base elevation is a placement scalar, never an operand of a planar predicate.",
    "coordinateSystem.origin": "Document-global. It is simultaneously the hex centre, the grid-lattice phase anchor (geometry.ts:264, 273-286) and the drawn axis cross (spatialScene.ts:263-276). A per-level origin would desynchronise the lattice from the plan above it with nothing thrown; the closed level record rejects it by name.",
    "levels[i]": "CLOSED to exactly id, label, baseElevationStuds, hex, approaches. thicknessStuds / slabStuds / headroomStuds / floorToFloorStuds / clearanceStuds / origin / verticalAxisShown are all rejected by name. The vocabulary that would turn a placement scalar into authoritative Y cannot enter the contract by accretion. This is free because the record is new and has no legacy content to grandfather.",
    "levels[i].id": "strictId (gridSpec.ts:177 pattern plus the reserved-word guard), unique across the array. Not cosmetic: it keys mesh.userData.levelId, the per-level visibility switch, the picking filter, and the replaceSpec visibility merge (merge by id, never by index).",
    "levels[i].baseElevationStuds": "The one new number. Finite, |v| <= 8192, strictly ascending across the array. Nothing recomputes it, because there is nothing in the plan plane to recompute it from — that absence is the tell that it is not a dimension. Ordering is well-formedness in the spirit of 'Approach angles must be unique' (gridSpec.ts:720): comparing two scalars for order measures nothing about a shape.",
    "levels[1].hex.core.voidApothemStuds": "The atrium. Not a hole cut in a prism — a declaration that the core is a RING, drawn by hexRingGeometry(20, 60, origin, 0, 1.35). The void wall is the ring's inner side, already index group 1, already painted by the core '.solid' material, so SPATIAL_SURFACE_TARGETS stays closed at seven and the exact-cardinality rule at gridSpec.ts:472-476 never moves. Rule: 0 < voidA < coreA. Declared voidFlatToFlatStuds / voidPointToPointStuds are recomputed and rejected past 0.001 like every other derived number.",
    "levels[1].hex.roadCenterline": "Omitted on purpose. centerA falls back to (innerA + roadOuterA)/2 = (72 + 96)/2 = 84 via the existing optionalFinite at gridSpec.ts:610-614.",
    "levels[1].approaches.crosswalkDepthStuds": "Omitted on purpose. It falls back to outerA - roadOuterA = 108 - 96 = 12 via optionalFinite at gridSpec.ts:739-743. Note this one is a DEFAULT, not a checkDeclaredDimension — it is never cross-checked when declared.",
    "containment": "maximumOuterApothem at origin (0,0) inside ±256 is min(256·√3/2, 256·√3/2, 256, 256) = 221.702. Both 136 and 108 fit."
  }
}
```

---

## 3. The versioning decision

Two axes. They move independently.

### 3a. Dimensional schema — created, not bumped

There is no identifier today. That absence is the real defect: the root has no `assertOnlyKeys`, so a
`levels` array fed to the current build is silently ignored and one floor renders as if it were the
document.

```ts
// gridSpec.ts, beside SPATIAL_APPEARANCE_SCHEMA at :12
export const SPATIAL_GRID_SCHEMA_V1 = 'trembus.spatial-grid/v1' as const;
export const SPATIAL_GRID_SCHEMA_V2 = 'trembus.spatial-grid/v2' as const;
export const SUPPORTED_GRID_SCHEMAS = [
  SPATIAL_GRID_SCHEMA_V1,
  SPATIAL_GRID_SCHEMA_V2,
] as const;
export type GridSchema = (typeof SUPPORTED_GRID_SCHEMAS)[number];
```

Read is **tri-state**, at `gridSpec.ts:524` immediately after `asRecord(input, 'Grid spec')` and
strictly before the `coordinateSystem` read at `:525` — the last point at which no field-shape
assumption has been made:

| `root.schema` | `levels` present | result |
|---|---|---|
| absent | no | v1, legacy path (this is the shipped fixture) |
| absent | yes | throw `levels[] requires schema "trembus.spatial-grid/v2"` |
| `"trembus.spatial-grid/v1"` | no | v1, legacy path — an explicit no-op tag is writable |
| `"trembus.spatial-grid/v1"` | yes | throw, same message |
| `"trembus.spatial-grid/v2"` | yes | leveled path; root `hex`/`approaches` forbidden |
| `"trembus.spatial-grid/v2"` | no | throw `trembus.spatial-grid/v2 requires a levels array` |
| anything else | — | throw `Grid spec schema "…" is not supported` |

An unconditional equality throw (copying `:293`) is forbidden: `defaultGridSpecLoad` validates the
untagged fixture at module evaluation (`:833-845`), so a rejection is not a red test — there is no
test runner (`"build": "tsc --noEmit && vite build"`) — it is a permanently blank Spatial lens via
`SpatialGridPanel.tsx:452-455`.

`schema` is echoed on `GridSpec` next to `revision` (`:796`), the way appearance echoes at `:509`.
`GridSpec.schema` is synthesized as `SPATIAL_GRID_SCHEMA_V1` on the legacy path.

**Why levels is a major bump, not an additive key:** v2 *relocates* `hex` and `approaches` off the
root. The move — not the addition — is what buys forward compatibility. A stale build fed a v2
document dies loudly at `asRecord(root.hex, 'hex')` (`:582`). The tag and the mutual-exclusion rule
are complementary, not redundant: mutual exclusion protects **today's** builds, the tag is where a
v3 signal hangs.

**Forward rule, written down so the contract does not need re-cutting:** an additive optional key
whose absence preserves current meaning ships with **no bump** — and because the level record is
closed, it is rejected *by name* by an older build, so the upgrade is detectable in both directions.
A key whose presence changes the meaning of an existing key, or any rename, relocation, or removal,
bumps the major.

**`root.revision` is not a version gate and must not be pressed into service as one.** Line 796 is
`String(root.revision ?? '—')` — unvalidated, coerced, em-dash-defaulted. Contrast
`appearance.revision` at `:296-299`, which gets `boundedNumber(1, 9999)` plus an integer check.
Either promote it properly or leave it display-only; half-promoting keys a compatibility branch off
the literal `'—'`.

### 3b. Appearance schema — bumps to `/v2`, necessarily

```ts
export const SPATIAL_APPEARANCE_SCHEMA_V1 = 'trembus.spatial-appearance/v1' as const;
export const SPATIAL_APPEARANCE_SCHEMA_V2 = 'trembus.spatial-appearance/v2' as const;
export const SUPPORTED_APPEARANCE_SCHEMAS = [
  SPATIAL_APPEARANCE_SCHEMA_V1,
  SPATIAL_APPEARANCE_SCHEMA_V2,
] as const;
// Keep `export const SPATIAL_APPEARANCE_SCHEMA = SPATIAL_APPEARANCE_SCHEMA_V1` as an alias.
// Verified: this symbol is referenced only inside gridSpec.ts (:12, :62, :293, :294, :509).
```

The bump is necessary rather than decorative: under v1, `projection` fully determines the mapping
(top group only, world-XZ). Under v2, `projection.elevation` additionally routes maps to `.solid`.
Any consumer that read `projection` as *the* projection now reads half of it.

The v1/v2 boundary needs almost no new code, because two existing `assertOnlyKeys` lists already
enforce it: `assertOnlyKeys(projection, ['mode','uAxis','vAxis','anchor'])` at `:302-306` and
`assertOnlyKeys(mappingRaw, ['tileStuds','offsetStuds','rotationDegrees'])` at `:383-387` mean a v1
block carrying `elevation` or `edgeTileStuds` **already throws today**. The v2 branch widens exactly
those two lists. The exact-equality throw at `:293-295` becomes membership in
`SUPPORTED_APPEARANCE_SCHEMAS`; `AppearanceSpec['schema']` becomes the two-member union.

v1 appearance blocks stay accepted verbatim and behave exactly as they do now — top-only, no
elevation channel — which is what keeps the fixture's `"schema": "trembus.spatial-appearance/v1"`
line untouched.

The two axes are orthogonal: grid schema gates document **structure**, appearance schema gates
projection **semantics**. Adopt levels without touching appearance, or adopt edge texturing on a
single-plan document without adopting levels.

`MAX_GRID_SPEC_BYTES` (2 MiB, `:8`) needs no change. The binding limit is `MAX_LEVELS`.

---

## 4. Module-by-module changes

### `gridSpec.ts`

**[trivial] Constants.** Add the six schema constants above, plus beside `MAX_APPEARANCE_COORDINATE`
(`:183`):

```ts
const MAX_LEVELS = 8;
const LEVEL_KEYS = ['id', 'label', 'baseElevationStuds', 'hex', 'approaches'] as const;
```

`MAX_LEVELS = 8` is an object-count judgement, not a measured limit: `createWorld` is synchronous on
the main thread at roughly 48 leaf objects and 22 selectables per level, so 8 levels is ~390 objects
in one blocking call. No existing cap moves — `MAX_TEXTURE_ASSETS` 16, `MAX_SURFACE_DEFINITIONS` 32,
`MAX_SURFACE_BINDINGS` 16 and the 1200-line grid budget (`:577-580`) are untouched, because
appearance and the grid stay document-global.

**[trivial] Types.** `GridSpec['hex']` gains `voidA?: number`. `GridSpec` gains `schema: GridSchema`
and `levels: LevelSpec[]` (both non-optional). New interface beside `GridSpec`:

```ts
export interface LevelSpec {
  id: string;
  label: string;
  baseElevationStuds: number;
  hex: GridSpec['hex'];
  approaches: GridSpec['approaches'];
}
```

Indexed access types state the hex/approach shapes once. Everything else on `GridSpec` keeps its
position, type and meaning; the change is purely additive.

**[moderate] Extract the frame.** Lines `525-580` move verbatim into
`function validateFrame(root: UnknownRecord): FrameSpec` returning
`{ north, origin, boundsX, boundsZ, width, depth, minor, major, superStep }`. **No message changes at
all** — every path literal in that span (`'coordinateSystem'`, `'view.boundsStuds.x'`,
`'grid.minorStuds'`, …) is document-global and never needs a level prefix. `validateGridSpec`
destructures the result under the same names, so lines `582-771` are modified by **zero characters**.

This extraction is what makes error attribution correct, and it is the one thing the pure-overlay
design got wrong: without it, `"verticalAxisShown": true` on the document throws as
`levels[0] "ground": Authoritative Y geometry is not supported by this renderer`. With the frame
validated once, up front, a frame defect can never be blamed on a level. Verified — see §7.

**[trivial] Extract `readAppearance(root)`.** Lines `779-790` become
`function readAppearance(root): { appearance?: AppearanceSpec; appearanceWarning?: string }`,
returning **both keys always** (explicit `undefined`) so a spread cannot leak a stale value. Called
once from each branch.

**[trivial] The branch.** `validateGridSpec` becomes:

```ts
export function validateGridSpec(input: unknown): GridSpec {
  const root = asRecord(input, 'Grid spec');
  const schema = readGridSchema(root);
  if (schema === SPATIAL_GRID_SCHEMA_V2) return validateLeveledGridSpec(root);
  const { north, origin, boundsX, boundsZ, width, depth, minor, major, superStep } =
    validateFrame(root);
  const hex = asRecord(root.hex, 'hex');   // ← line 582 today, unchanged from here on
  …
```

**[moderate] `validateLeveledGridSpec(root)`, ~70 lines, the core of the feature.**

The organizing trick: a level is a **document overlay**, not a new object model. The shared frame
stays *ambient in the overlaid document* rather than being threaded through an invented context
parameter, which is what lets the two genuinely cross-scope predicates — bounds containment
(`:626-634`, which mixes the per-level `outerA` with the global bounds and origin) and the approach
extent guard (`:757-763`, which tests against the global width and depth) — keep working with no
frame argument at all. And it collapses the identity problem for all 14 `checkDeclaredDimension`
call sites — whose message body at `:173` is the fixed string `conflicts with the apothem geometry`,
with `name` as the only carrier of identity — into **one** catch-and-rethrow.

```ts
function validateLeveledGridSpec(root: UnknownRecord): GridSpec {
  const entries = cappedArray(root.levels, 'levels', MAX_LEVELS);   // reuses :197
  if (entries.length === 0) throw new Error('levels must declare at least one level');
  validateFrame(root);                        // frame errors surface here, unprefixed
  const { levels: _l, appearance: _a, schema: _s, ...frameDocument } = root;
  // Dropping `levels` terminates the recursion.
  // Dropping `schema` makes the overlay read as an untagged v1 document.
  // Dropping `appearance` means validateSpatialAppearance runs ONCE, not N+1 times.
  …
  for (let index = 0; index < entries.length; index += 1) {
    const path = `levels[${index}]`;
    const level = asRecord(entries[index], path);
    assertOnlyKeys(level, LEVEL_KEYS, path);          // reuses :185 — this is the closed record
    const id = strictId(level.id, `${path}.id`);      // reuses :205, unique across the array
    const baseElevationStuds = finite(level.baseElevationStuds, `${path}.baseElevationStuds`);
    // |v| <= MAX_APPEARANCE_COORDINATE, strictly ascending
    try {
      body = validateGridSpec({ ...frameDocument, hex: level.hex, approaches: level.approaches });
    } catch (error) {
      throw new Error(`${path} "${id}": ${error.message}`);
    }
    …
  }
  return { ...groundBody, raw: root, schema: SPATIAL_GRID_SCHEMA_V2, levels, ...readAppearance(root) };
}
```

Mutual recursion between two function declarations is fine (hoisted). `validateGridSpec` has no
module-level mutable state and neither module regex (`STRICT_ID` `:177`, `HEX_COLOR` `:178`) carries
a `/g` or `/y` flag, so no `lastIndex` bleeds between calls; it is already invoked more than once per
session (the IIFE at `:835` plus every file drop through `:830`). The one accepted waste: the
recursion re-runs `validateFrame` per level. Roughly twenty arithmetic operations, at most eight
times, and it can only pass — the root already cleared it.

`title`, `status`, `revision`, `date`, `authority`, `origin`, `north`, `boundsX`, `boundsZ`, `size`,
`grid` and `promotionGates` all come from `frameDocument` via the level-0 parse; `hex` and
`approaches` alias `levels[0]` **by reference** (verified: `spec.hex === spec.levels[0].hex` is
`true` in both branches).

**[trivial] Fail-fast, not degrade.** The first bad level aborts the document. This mirrors nothing
in the appearance path deliberately: the appearance try/catch at `:781-790` degrades because
appearance is decorative, whereas a missing floor is a missing floor. The diagnostic loss is small
because the message now carries the level index and id, which today's code could not do at all. See
§9, question 6.

**[trivial] The void.** Beside the `centerA` default (`:610-614`):

```ts
const voidA = core.voidApothemStuds == null
  ? undefined
  : finite(core.voidApothemStuds, 'hex.core.voidApothemStuds');
if (voidA !== undefined && !(0 < voidA && voidA < coreA)) {
  throw new Error('The core void apothem must be greater than 0 and less than the core apothem');
}
```

plus two `checkDeclaredDimension` calls for `voidFlatToFlatStuds` (`2·voidA`) and
`voidPointToPointStuds` (`4·voidA/√3`), guarded by `voidA !== undefined`, placed immediately before
the existing core checks at `:636`. Same ordering idiom as `:615-625`, same recompute-check-discard
discipline. Legal on a legacy single-plan document too.

**[trivial] Legacy return (`:792-817`).** Hoist the two inline literals into locals so the alias is
by reference:

```ts
const hexSpec = { coreA, innerA, centerA, roadOuterA, outerA, ...(voidA === undefined ? {} : { voidA }) };
const approachSpec = { angles: normalizedAngles, roadWidth, laneWidth, sidewalkWidth, totalWidth, crosswalkDepth };
// …
hex: hexSpec,
approaches: approachSpec,
schema: SPATIAL_GRID_SCHEMA_V1,
levels: [{ id: 'ground', label: 'Ground', baseElevationStuds: 0, hex: hexSpec, approaches: approachSpec }],
promotionGates,
...readAppearance(root),
```

The renderer therefore has **no branch** and no `?? [DEFAULT_LEVEL]` fallback anywhere.

**[moderate] Appearance v2** in `validateSpatialAppearance` (`:279-521`): membership test instead of
equality at `:293-295`; `'elevation'` added to the projection allow-list at `:302-306` and
`'edgeTileStuds'` to the mapping allow-list at `:383-387`, **under v2 only**; `elevation` validated
with its four literals pinned exactly the way `mode`/`uAxis`/`vAxis` are pinned at `:307-315`;
`edgeTileStuds` via the existing `positiveStudPair`. No cap moves; the exact-7 cardinality rule at
`:472-476` is untouched.

### `geometry.ts`

**[trivial] Rename first, before any other edit.** `export type GridLevel` (`:5`) → `GridLineTier`;
the parameter at `:260` and the `classify` return type at `:267` follow. Verified: those are the
**only three** occurrences of the symbol in the whole app — `spatialScene.ts:254` uses a local loop
variable named `level` (`for (const level of ['minor','major','super'] as const)`) but does not
import the type; rename that variable to `tier` in the same pass. `level` already means grid-line
tier in this file; shipping floors under the same word in a diff where both concepts appear is a
guaranteed wrong-variable bug.

**[moderate] The elevation UV channel — the only real geometry work.** One new function, called from
`finalizeSurfaceGeometry` (`:38-54`) after `applyWorldStudUvs`:

```ts
function applyElevationUvs(
  geometry: THREE.BufferGeometry,   // already non-indexed
  topVertexCount: number,           // = topIndexCount, the group-0 boundary
  datumStuds: number,
  anchorStuds: number,
): void
```

For each triangle whose first vertex index is `>= topVertexCount` (group 1 — sides and bottom):

- Compute the triangle normal. If `|n.y| > 0.5` it is a bottom cap: write `uv1 = (x, -z)`, the plan
  projection, so the underside stays world-XZ and never smears. (It is never visible in a stack.)
- Otherwise it is a wall: take `d = normalize(XZ of the longest horizontal edge)` and write
  `uv1 = (dot(p.xz, d), datumStuds + p.y - anchorStuds)`.

Both components are **world studs**: `u` is measured horizontal distance along that wall, `v` is
measured height above the appearance anchor. Because `v` carries the datum, a floor at 48 samples a
different band of the same texture than the floor at 0.

Why this works with no topology rewrite: `finalizeSurfaceGeometry` calls `toNonIndexed()` at `:42`,
which duplicates every vertex per triangle. The frequently-cited problem — that `prismGeometry`'s
side quads reuse the cap vertices at `:78-82`, so an arc-length attribute would mirror at the wrap
seam — only bites if the attribute is written on the **indexed** geometry. Written after
`toNonIndexed`, each triangle owns its vertices and there is no sharing to fight. No per-vertex
`perimeterStuds` attribute, no rebuilt side-vertex ring, no change to `prismGeometry`'s or
`hexRingGeometry`'s topology, index order, or `topIndexCount` contract. Group 0 is still
`[0, topIndexCount)` and still the top.

Known and accepted: `u` resets phase at each hex corner, because `d` changes there. That reads as
trim per wall segment, which is correct for a blockout.

**[trivial] `applyWorldStudUvs` (`:25-36`) is untouched**, so the documented world-XZ continuity
invariant at `:20-24` survives exactly. `hexVertices`, `prismGeometry`, `hexRingGeometry`,
`quadFromApproach`, `clipPolygonToBounds`, `rayExitDistance`, `lineLoopGeometry`, `lineGeometry` keep
their signatures. `gridLineGeometry`'s hardcoded `-0.06` (`:278`, `:286`) stays correct because the
lattice remains a root-level frame element drawn once.

**Signature change count for the whole file: `finalizeSurfaceGeometry` gains one parameter,
`prismGeometry` and `hexRingGeometry` each gain one trailing `datumStuds = 0`.** All six existing
call sites (`spatialScene.ts:284, 297, 306, 319, 353, 383`) compile unchanged because the parameter
is trailing and defaulted; `buildLevelBody` passes the level's datum.

### `spatialScene.ts`

**[trivial] Types.** `SpatialSelection` (`:43-46`) gains `levelId: string` and `levelLabel: string`.
`WorldBundle` (`:101-105`) gains one **additive** field and keeps `group`, `groups` and `selectables`
at their exact shapes:

```ts
levels: Array<{
  id: string;
  label: string;
  baseElevationStuds: number;
  groups: Record<SpatialLayerKey, THREE.Group>;   // one per layer, per level
  meshes: THREE.Mesh[];
}>;
```

Keeping `groups` is what holds `setLayerVisible` (`:893-906`) and the `replaceSpec` reapply loop
(`:913-915`) at **zero diff**. Verified: `:895` and `:914` are the only `.groups` consumers in the
codebase.

**[substantial] `createWorld` split.** Signature becomes
`createWorld(spec: GridSpec, materials: MaterialSet, yScale: number)`.

- Lines `222-280` stay **verbatim**: root group, the six root layer groups, the ground plane
  (`:237-247`, still a direct child of `group`), the three grid `LineSegments`, the two axis lines.
  All frame, all built once, all still under the single root scale.
- Lines `282-433` are cut **verbatim** into
  `buildLevelBody(spec, groups, materials, selectables, level)` — naming the third parameter
  `groups` means not one identifier inside the moved block changes. (Verified: that block's free
  identifiers from the enclosing scope are exactly `spec`, `groups`, `materials`, `selectables`.)
  The only edits inside it are: prefix the four detail strings (`:282`, `:295`, `:317`, `:330`) with
  `${level.label} · `; pass `level.id` and the surface role to `meshFromGeometry`; pass
  `level.baseElevationStuds` as the new trailing geometry argument; and use
  `hexRingGeometry(voidA, coreA, spec.origin, 0, 1.35)` instead of
  `prismGeometry(hexVertices(coreA, …), 0, 1.35)` at `:284` when `spec.hex.voidA` is set.
- In its place: for each `levelSpec` of `spec.levels`, build six fresh `THREE.Group`s parented to the
  corresponding **root layer group**, each at `position.y = levelSpec.baseElevationStuds / yScale`,
  then call `buildLevelBody` with the per-level view
  `{ ...spec, hex: levelSpec.hex, approaches: levelSpec.approaches }`.

**Levels nest INSIDE layers, not the other way round.** That is what keeps `setLayerVisible` and the
reapply loop at zero diff, and `.visible` still multiplies down the chain so the two axes AND
correctly with no compositing code — `effectivelyVisible` (`:941-949`) already walks arbitrary depth.
The level's `grid` child group is always empty (the lattice is frame); six groups per level instead
of five keeps the exhaustive `Record<SpatialLayerKey, THREE.Group>` type and the moved block's zero
diff. Cosmetic waste of N `Object3D`s.

Loop variable is `levelSpec`, avoiding the `GridLineTier` rename's territory.

**[trivial] Call sites.** `createWorld(initialSpec, materials, yScale)` at `:548` and
`createWorld(nextSpec, materials, yScale)` at `:912`. The `group.scale.y = yScale` writes at `:549`
and `:916` stay **exactly as they are**.

**[moderate] Per-level material math.** Today: 7 roles × `{top, solid}` = **14** `MeshStandardMaterial`
plus 7 line materials (`annotation`, `annotationSolid`, `gridMinor/Major/Super`, `axisX`, `axisZ`) =
21 total.

After: add a **ghost pair per role** — 14 more, **28** mesh materials + 7 line = **35 total, constant
in N**. `MaterialSet` gains `ghosts: Record<SurfaceRole, SurfaceMaterialPair>`. Ghost materials are
built alongside the solid ones in `materialSet()` (`:107-153`) with `transparent: true`,
`opacity: 0.12`, `depthWrite: false`, and are colour-synced in `applyThemeSurfaceStyles`
(`:622-634`) and `applyDeclaredSurfaceStyles` (`:636-657`) by iterating both records. Ghosts receive
**no texture maps**, which keeps `attachTexture` single-pass and `appearanceRequests` untouched.
`disposeMaterials` (`:169-181`) walks both records.

Rejected, with the arithmetic: per-level material pairs are 14N — 112 at N=8 — and force N-fold
rewrites of `materialSet`, `disposeMaterials`, `detachSurfaceTextures` (`:598-614`),
`applyThemeSurfaceStyles`, `applyDeclaredSurfaceStyles`, `selectionMaterials` (`:559-564`),
`themeSurfaceColors` (`:577-588`), `attachTexture` (`:709-735`) and `refreshTheme` (`:851-877`).
Level-qualified geometry roles (`'l1.road.ring'`) are worse: `SPATIAL_SURFACE_TARGETS` stops being a
literal tuple, `SurfaceRole` degrades to `string`, every `Record<SurfaceRole, …>` loses
exhaustiveness — and 7 roles × 3 levels = 21 breaks both `MAX_SURFACE_BINDINGS = 16` and the
exact-cardinality check at `:472-476`. Dead at three floors.

**[moderate] `setLevelState(id, 'solid' | 'ghost' | 'hidden')`**, beside `setLayerVisible` (`:893`).
Hidden writes `.visible = false` on that level's six groups. Ghost swaps each mesh's material array
from `[solid.top, solid.solid]` to `[ghost.top, ghost.solid]`, driven by
`mesh.userData.surfaceRole`. `setLevelIsolate(id)` sets the named level solid and everything else
ghost in one call.

This also **fixes the selection-highlight leak as a side effect**: `applySelection` (`:566-575`)
drives `emissiveIntensity` on the role-keyed *solid* materials, so when only the active level uses
the solid pair, the glow lands on the active level alone. With every level solid (the default), the
glow is role-scoped, not level-scoped — clicking one floor's ring road lights all of them. Stated,
not hidden: isolate is the answer, and the footer readout names the floor regardless.

**[moderate] The picking fix.** `meshFromGeometry` (`:183-195`) gains two trailing optional
parameters, `levelId?: string` and `surfaceRole?: SurfaceRole`, written into `userData` — the ground
mesh call at `:246` passes neither and is unchanged. A controller-level `activeLevelId` defaults to
`spec.levels[0].id`. `onPointerUp`'s intersect at `:969-971` filters
`currentWorld.selectables` to the active level before raycasting:

```ts
.intersectObjects(
  currentWorld.selectables.filter((m) => m.userData.levelId === activeLevelId),
  false,
)
```

For a legacy spec every mesh is level `'ground'`, so the filter is a no-op and behaviour is
identical to today. For a stack it is what makes lower floors clickable at all: `intersectObjects`
returns nearest-first, and a top-down ortho ray pierces every floor, so without the filter the
topmost plan always wins and everything under it is unreachable. `callbacks.onSelection` now emits
`{ key, detail, levelId, levelLabel }`.

While here: `raycaster.params` is **never set anywhere in this file** (verified — zero occurrences),
so the three.js default `Line.threshold` of 1 is currently dead code. If plan-mark annotations are
ever made pickable, note that `Line.raycast` divides that threshold by the line's *own* scale — with
`scale.y` on an ancestor the line's own scale stays `(1,1,1)`, so the effective Y pick tolerance
becomes `1 × yScale`, up to 8 studs, and adjacent floors cross-pick. Set it explicitly if that day
comes.

**[trivial] `setYScale` (`:931-935`)** gains one loop after the root write — see §5.

**[trivial] Cameras.** `configureTop` (`:511-522`) becomes Y-aware:

```ts
const stackTop = spec.levels[spec.levels.length - 1].baseElevationStuds + 16;  // levels ascend
topCamera.far = extent * 6 + stackTop;              // was :515
topCamera.position.set(center.x, extent * 2 + stackTop, center.z);  // was :517
```

The `+ 16` covers the scaled slab (1.35 × 8 = 10.8) and the annotation planes at 0.21 × 8. For a
legacy spec `stackTop` is 16 and the ortho eye moves from 1024 to 1040 with `far` 3072 → 3088 — no
visible change. **Correcting the record:** a 300-stud stack does *not* sit behind the current camera;
the eye is at `extent * 2` = 1024 studs for the bundled 512-stud draft, so the failure needs a stack
taller than ~1024. The fix is still right, because the failure when it comes is silent geometry loss.

`centerOf` (`:479-484`) hardcodes `y = 0`; change to `(0 + stackTopBase) / 2` so a tall stack orbits
around its middle. For a legacy spec that is 0 — numerically identical. `updateTopFrustum`
(`:501-509`) and `configurePerspective` (`:486-499`) are not touched. `maxPolarAngle = Math.PI * 0.49`
(`:536`) stays, so a stack still cannot be viewed from below — see §9.

**[moderate] `replaceSpec` (`:908-929`).** The build-then-swap ordering survives intact, and its
guarantee — a bad spec can never erase the last valid world — still holds. Three additions: the layer
reapply at `:913-915` is unchanged (that is the payoff of layers-above-levels); a **new** per-level
state reapply must be added, **merged by level id, never by index**, because there is no line for it
today and a spec swap would silently un-isolate the user's floor; the `yScale` write at `:916` gains
the per-level `position.y` loop. Rule to write down before anyone optimises identical floors into
shared buffers: geometry may be shared *within* a world (`disposeObjectGeometries` at `:162-167` is
effectively idempotent) but **never between** the outgoing and incoming worlds, because `:925` would
free buffers the new world is rendering.

**[moderate] `attachTexture` (`:709-735`) gains the elevation half.** Under appearance v2, for each
map request also produce `texture.clone()` with `channel = 1`, configured from
`mapping.edgeTileStuds` (defaulting to `tileStuds`) and `projection.elevation.anchorStuds`, assigned
to the pair's `.solid`. The clone shares `Texture.source`, so there is no second image decode and no
second GPU allocation — only sampler state. Under v1, `.solid` receives nothing, exactly as today.

### `SpatialGridPanel.tsx`

**[moderate], and mostly copy.** Nothing threads through the validator; level state is controller
state.

- A second `<fieldset><legend>Levels</legend>` beside the Layers block (`:343-370`), one row per
  level (label, base elevation, solid/ghost/hidden), plus an isolate button. The six layer switches
  keep their **global** meaning — a layer is a category, a level is a body — so visibility is the AND
  of two orthogonal axes rather than a 6×N switch matrix, which stops being legible past three
  floors.
- The metrics `<dl>` (`:256-282`): four of the five `<dd>` entries read `spec.hex.*` /
  `spec.approaches.*` and become ambiguous the instant levels differ ("Core 160 studs flat-to-flat"
  is which floor?). Key them to the active level; `Measured view` (`spec.size`) stays global. Add a
  "Levels" entry showing the count and the datum range.
- **Both** canvas aria-labels — `:105-108` (mount) and `:161-164` (`replaceSpec`) — must gain the
  level count and datum range. They drift independently; update both or the accessible description
  silently disagrees with itself after a local file load.
- `resetDraft` (`:190-206`) resets spec, six layers, view mode and yScale today. It must also reset
  per-level state and the active level.
- Copy that becomes false and must change together: the Y-slider help text at `:385`
  (`Separates layers visually. It does not define Roblox height.`) and the Callout title at `:439`
  (`Measured footprint; illustrative height`). Both must now split the claim — **level base
  elevations are measured at the spec; slab band thickness stays illustrative.**
- The selection footer at `:413-420` shows `selection.levelLabel` alongside `selection.detail`.
- Add a second fixture, `hex-city-center-stack-v2.json`, imported by nothing (so it stays out of the
  Vite graph and the bundle) and reachable only through the existing file-drop path at `:179`. With
  no test runner in this app, that file is the only way to exercise the v2 branch. Do not make it the
  default load.

---

## 5. The Y-scale interaction

### What `group.scale.y` does today

`spatialScene.ts:549` and `:916` set `currentWorld.group.scale.y = yScale` on the **world root**.
Every Y in the scene is multiplied: the ground plane at −0.12 (`:241`), the grid lines at −0.06
(`geometry.ts:278, 286`), the axes at −0.035 (`:266, 276`), the road underside at −0.02, the core top
at 1.35. Their *ordering* is therefore scale-invariant, which is why nothing z-fights at any slider
position. `yScale` is clamped to `[1, 8]` (`:933`) and defaults to 4 (`:471`).

### The requirement

Slab thickness is a readability exaggeration. A base elevation is measured placement data. Scaling
measured data by a readability slider makes the slider lie about the one thing `levels[]` exists to
communicate: at the default `yScale = 4`, a declared 48-stud pitch would render as 192.

### The answer: compensate inside the scaled root

Put the level group **inside** the root that carries `scale.y`, and pre-divide:

```
level.position.y = base / yScale
```

Composition:

```
y_world = yScale · ( base / yScale  +  y_local )
        = base  +  yScale · y_local
```

Base elevation is **measured** — one stud of declared pitch is one world stud at every slider
position. Band thickness is **exaggerated** by `yScale`, exactly as before. `setYScale` becomes:

```ts
const setYScale = (scale: number): void => {
  if (!Number.isFinite(scale)) return;
  yScale = THREE.MathUtils.clamp(scale, 1, 8);      // divisor is never 0
  currentWorld.group.scale.y = yScale;
  // y_world = yScale · (base/yScale + y_local) = base + yScale · y_local
  for (const level of currentWorld.levels) {
    for (const layer of Object.values(level.groups)) {
      layer.position.y = level.baseElevationStuds / yScale;
    }
  }
};
```

Worked, at `yScale = 8`, mezzanine base 48, core top `y_local = 1.35`:
`8 · (48/8 + 1.35) = 48 + 10.8 = 58.8`. Ground core top: `8 · 1.35 = 10.8`. Gap preserved at exactly
48 studs.

### Two alternatives, and why they are wrong

**Split the node** — leave the ground, grid and axes on an *unscaled* frame group and move
`scale.y` onto per-level content. This looks like the textbook fix and it silently changes the
existing render. Today the ground sits at `−0.12 × yScale` = −0.48 at the default; under the split it
freezes at −0.12 while the road underside still scales to `−0.02 × yScale`. At `yScale ≥ 3` the road
slab crosses the grid lines at −0.06, and at `yScale ≥ 6` it punches through the ground plane at
−0.12 and z-fights it. Any design that makes this move and also claims "the pixels are unchanged" is
wrong for every `yScale ≠ 1`.

**Bake the base into `prismGeometry`'s `bottomY`/`topY`** — this forces
`y_world = yScale · (base + y_local)`, i.e. a 48-stud pitch at 192 by default and 384 at maximum, and
it is unfixable afterwards without rebuilding every mesh. The group transform is the only formulation
in which the correct math is even expressible.

### The one honest artefact

The elevation UV channel bakes `v = datum + y_local` at build time and does not stretch with
`content.scale.y`. At `yScale = 8` a 1.35-stud core edge is drawn 10.8 studs tall carrying 1.35 studs
of texture, so the edge banding visibly compresses as the slider rises. That is a *tell*, not a bug:
it is the visual signal that intra-level Y is illustrative while the texture measures the real
thickness. The alternative — scaling `v` with `yScale` — would make the edge texture lie about
measurement in precisely the way the plan projection never does. See §9, question 2.

---

## 6. The appearance projection problem

### The defect, confirmed

`attachTexture` (`spatialScene.ts:709-735`) writes maps only to `materials.surfaces[surfaceRole].top`
(`:713-714`). The `.solid` material — index group 1, which `finalizeSurfaceGeometry`
(`geometry.ts:38-54`) assigns to sides *and* bottom — never receives a colour, normal, roughness or
metalness map. It only ever gets `preview.fallbackColor` from `applyDeclaredSurfaceStyles`
(`:636-657`). Invisible today, because everything is about a stud tall and viewed from overhead. In a
stack, the slab **edge** of every floor is a primary surface, and this becomes the most visible
quality gap in the render.

Second half of the problem: `applyWorldStudUvs` writes `u = local x`, `v = −local z` with no Y term
(`geometry.ts:31-32`) and level transforms are Y-only, so every floor is texel-for-texel identical
from overhead.

### The resolution

**Tops stay identical, and that is correct.** `UV = world studs` is the documented invariant
(`geometry.ts:20-24`): the same measurement must read the same texel on any surface. Differentiating
tops by floor would break measurement. Do not touch the plan projection.

**Edges get a second, measured channel.** Appearance v2 adds:

```json
"appearance": {
  "schema": "trembus.spatial-appearance/v2",
  "revision": 2,
  "projection": {
    "mode": "world-xz",
    "uAxis": "+X",
    "vAxis": "-Z",
    "anchor": [0, 0],
    "elevation": {
      "mode": "wall-y",
      "uAxis": "wall",
      "vAxis": "+Y",
      "anchorStuds": 0
    }
  },
  "surfaceDefinitions": [
    {
      "id": "road",
      "maps": { "color": "spatial-orientation-diagnostic" },
      "mapping": {
        "tileStuds": [16, 16],
        "edgeTileStuds": [16, 1],
        "offsetStuds": [0, 0],
        "rotationDegrees": 0
      },
      "preview": { "fallbackColor": "#5A6371", "roughness": 0.92, "metalness": 0, "normalStrength": 1 },
      "roblox": { "mode": "enumMaterial", "material": "Asphalt", "physics": "inherit" }
    }
  ]
}
```

`elevation.mode`, `uAxis` and `vAxis` are pinned to those exact literals the way the projection triple
is pinned at `:307-315`. `edgeTileStuds` is optional and defaults to `tileStuds`; a 16-stud plan tile
is wrong on a 1.35-stud edge, which is why it exists.

Implementation is `applyElevationUvs` (§4, `geometry.ts`) plus one `texture.clone()` per map at
`channel = 1` in `attachTexture`. The clone shares `Texture.source` — no second decode, no second GPU
allocation.

**This is what stops floors being identical.** `uv1.v = datumStuds + y_local − anchorStuds`, so the
mezzanine's slab edge samples a different band of the same texture than the ground's. No per-level
binding could have achieved that, and it costs zero extra materials.

**What stays global, and why.** `projection.anchor` is read in exactly one place (`configureTexture`,
`:693`, `:700-703`), which makes a per-level anchor look trivial to plumb — but one `THREE.Texture`
serves every role bound to a `surfaceId` and attaches to the shared `.top` slot, so it would need
cloned textures on per-level materials, and it silently violates the world-XZ continuity invariant:
the same measurement read on two floors would stop landing on the same texel. Rejected.

**Per-level appearance overrides are not in this cut.** They cascade through six functions and the
elevation channel already delivers the stated motivation (floors that are visually distinguishable).
Because the level record is closed, adding `levels[i].appearance` later is rejected by name by a
v2 build — detectable in both directions, exactly as the forward rule promises.

---

## 7. Backward compatibility

**1. The fixture is not edited. Not one byte.** `hex-city-center-grid-spec.json` has no `schema` key
and no `levels` key, so `readGridSchema` resolves v1 and the legacy path runs. `implementationNotes`,
`authority.canonicalSpec`, `view.pngPixels`, `view.plotPixels`, `view.plotPixelsPerStud`,
`hex.construction` and `hex.roadOuterEdge.laneWidthStuds` continue to be ignored, because **no root
`assertOnlyKeys` is added** — that is the single change that would reject the shipped fixture, and it
is not made. Closedness is applied only where it is free: the new level record.

**2. It is still the boot path, which matters more than a test.** Line 6's static import and the
module-scope IIFE at `:833-845` are unchanged, so the legacy branch is validated at module evaluation
on every page load. If the new validator rejected the levels-less fixture, the failure mode is not a
red test — there is no test runner — it is a permanently blank Spatial lens, because
`SpatialGridPanel.tsx:452-455` discriminates on `defaultGridSpecLoad.ok`.

**3. Error strings are byte-identical on the legacy path.** `validateFrame` carries no path prefix
(its literals are document-global) and lines `582-771` are unmodified, so
`hex.core.flatToFlatStuds conflicts with the apothem geometry`,
`Hex apothems must increase from core through outer sidewalk`,
`The outer hex must fit completely inside the declared view bounds`,
`Approaches must align to flat-top hex face normals` and the rest are produced character-for-
character.

**4. `GridSpec` is a superset.** `raw`, `title`, `status`, `revision`, `date`, `authority`, `origin`,
`north`, `boundsX`, `boundsZ`, `size`, `grid`, `hex`, `approaches`, `promotionGates`, `appearance`,
`appearanceWarning` keep their positions, types and values. `schema` and `levels` are appended, both
non-optional, synthesized for a legacy document, so the renderer has no branch anywhere.
`spec.hex === spec.levels[0].hex` by reference in **both** branches — they are the same datum,
deliberately. Every current reader compiles and behaves identically: the panel's metrics
(`:263-281`), both aria-labels, `resetDraft`, the boot gate, and all of `createWorld`'s
`spec.hex.*` / `spec.approaches.*` reads.

**5. The render is pixel-identical for a legacy spec.** Same meshes, same materials, same geometry
buffers, same hardcoded Y literals, same ground plane and grid drawn once at the root, same single
`group.scale.y = yScale` over the whole tree. The only structural difference is six `Group` nodes
inserted between each root layer group and its children, all at `position.y = 0 / yScale = 0`. The
`configureTop` change moves the ortho eye by a constant 16 studs at a 1024-stud eye height.
`applyElevationUvs` writes a `uv1` attribute that nothing samples, because the fixture declares
appearance v1 and no elevation channel is created.

**6. Old builds fail loudly on new documents — the other half of compatibility.** A v2 document has
no root `hex`, so a stale build reaches `asRecord(root.hex, 'hex')` at `:582` and throws
`hex must be a JSON object`, surfacing through `SpatialGridPanel.tsx:183` (`fileError`, last valid
scene retained) or `:452` (`SpatialUnavailable`). Symmetrically, a new build rejects an untagged or
v1-tagged document carrying `levels`. This is why `hex` **moves** rather than being mirrored into the
file for compatibility — the mirroring belongs in the normalized in-memory object, never in the JSON.

### Verified, not asserted

The validator half of this draft was implemented against the real `gridSpec.ts`, compiled clean with
the project's own `tsc` under `strict`, and run. Observed:

```
fixture ok: true
legacy schema: trembus.spatial-grid/v1 | levels: 1 | hex===levels[0].hex: true
             | approaches identity: true | base: 0 | voidA: undefined

two-level doc: schema=trembus.spatial-grid/v2 n=2 l0.core=80 l1.core=60 l1.voidA=20
               l1.centerA(derived)=84 l1.crosswalk(derived)=12
               alias hex===levels[0].hex:true raw.levels:true rev=2

levels[1] "mezzanine": hex.core.flatToFlatStuds conflicts with the apothem geometry
levels[1] "mezzanine": The outer hex must fit completely inside the declared view bounds
levels[1] "mezzanine": Approaches must align to flat-top hex face normals
levels[1] "mezzanine": hex.core.voidFlatToFlatStuds conflicts with the apothem geometry
levels[1] "mezzanine": The core void apothem must be greater than 0 and less than the core apothem
levels[1].origin is not supported
levels[1].slabThicknessStuds is not supported
levels[1].verticalAxisShown is not supported
Level base elevations must strictly ascend
duplicate level id "ground"
levels must declare at least one level
levels may contain at most 8 entries
trembus.spatial-grid/v2 moves hex and approaches into levels[]
trembus.spatial-grid/v2 requires a levels array
levels[] requires schema "trembus.spatial-grid/v2"
Grid spec schema "trembus.spatial-grid/v9" is not supported

# document-level defects attributed to the DOCUMENT, not to levels[0] — the frame pre-pass:
Authoritative Y geometry is not supported by this renderer
Major and super grid steps must be whole minor-grid multiples
Only grid specs with north = -Z are supported
```

An explicit `"schema": "trembus.spatial-grid/v1"` on the untouched fixture validates as a no-op.
A legacy single-plan document may declare `hex.core.voidApothemStuds` and gets `spec.hex.voidA`.

---

## 8. What the records must say

### `_project/workflows/measured-spatial-grid-to-studio-blockout.md`

- **`:22-23`** — "Renderer height is illustrative until a later build manifest declares
  authoritative Y dimensions." Must **split**, not be deleted; half of it stays true. Level base
  elevations become authoritative **at the spec**; intra-level extrusion thickness stays illustrative
  and stays in the renderer.
- **`:156`** (the studio step's note) — "Y dimensions become authoritative only when declared in the
  build manifest or pipeline." Same split. A level datum is declared in the JSON.
- **`:75`** (the validate step's `detail`) — add: a declared dimensional schema id; strictly
  ascending, unique level base elevations; one shared origin, bounds, grid cadence and north for the
  whole stack; every level a complete five-band hex plan with one to six approaches; a closed level
  record.
- **`:76`** (the validate step's `note`) — currently "Reject invalid input atomically…". Add the
  scope decision it lacks: a malformed level fails the **whole document**, prefixed with its index
  and id.
- **`:94`** (the spatial step's `detail`) — currently "…layer switches, unit readouts, geometry
  picking, and illustrative Y control". Add level isolate/ghost, and correct the Y description:
  measured level separation plus illustrative band thickness.
- **`:83-87`** (the reference step) — assumes one measured plan sheet per spec. N levels need N.

### `_project/pipeline/hex-city-center-spatial-lab-rev01.md`

This record describes the **existing single-level REV01 build**, which this change leaves
bit-identical. It needs edits only where its prose states a general rule that stops being general.

- **`:34-37`** — "ground `0.00–0.10`, road `-0.02–0.14`, sidewalks `0.00–0.88`, core `0.00–1.35`
  studs **above the baseplate datum**." Becomes: above **each level's own datum**, which is itself
  above the baseplate datum. This sentence currently collapses the authoritative numbers (level base)
  and the illustrative ones (band thickness) into one claim; they must be separated.
- **`:29-30`** — "Local design origin `(0, 0)` maps to world `(512, 0, 0)`." Needs a per-level Y term:
  `(512, <level base>, 0)`. The owned root at `:28`
  (`Workspace.HexCityCenterSpatialLab_REV01`) needs a per-level child convention.
- **`:58-70`** (exit criteria) — hard single-level counts: 465 descendants, 187 `BasePart`s, 12 core
  / 72 ring / 72 approach `WedgePart`s, 30 plan-mark `Part`s, 258 annotation lines, core 160
  flat-to-flat, six approaches at 30/90/150/210/270/330. Also repeated at `:83` and `:89`. These are
  prose verification anchors with nothing to surface a mismatch automatically. **Do not edit them
  for a stacked build — a leveled build is a new revision record** with per-level invariants times N
  (minus voided cores, plus the once-only grid and ground). Leave REV01 describing REV01.
- **`:15`** (Context) — records "geometry revision 1 / appearance revision 1". A leveled successor
  records both bumps and the new grid schema id.

### New ADR — `_project/decisions/0013-…`

Warranted, and it is the next serial number (0001–0012 exist). Three things belong in it, and they
are exactly what the decisions series is for:

1. The dimensional schema identifier — its introduction, the tri-state read, and the forward rule.
2. The **closed level record**: the boundary between a placement scalar and authoritative Y geometry
   is enforced by schema, not by discipline. `thicknessStuds` / `headroomStuds` /
   `floorToFloorStuds` are rejected **by name**, and the day someone needs one, the refusal at
   `gridSpec.ts:529` moves — one obvious place, one obvious trigger.
3. The opening model: one hex void concentric with the document origin, drawn by an existing
   primitive; sector-band tiling recorded as the sanctioned future path if that proves insufficient,
   with the argument for why — a sector tile is recomputable from two apothems and an integer, so it
   survives the file's recompute-check-discard philosophy, whereas an arbitrary hole polygon is
   recomputable from nothing and would put underivable geometry into a document whose only authority
   is derivation.

Author it with `/new decision "…"`. Do not hand-write frontmatter.

---

## 9. Open questions

1. **Can an upper level have zero approaches?** Today it cannot: `gridSpec.ts:699-705` demands one to
   six angles, and because a level body *is* `validateGridSpec` on an overlaid document, nothing
   inside the shared path can tell "I am a level" from "I am a document" — relaxing the rule for
   upper floors would relax it for every legacy single-plan document too. This is the real structural
   cost of the overlay, and it is the first thing I would revisit. The fix, if a roofless top floor is
   actually needed: extract `698-771` into `validateApproaches(body, frame)` with an `allowEmpty`
   flag, ~15 lines of mechanical diff plus a path-prefix helper. **Decide before the second consumer
   arrives, not after.**
2. **Edge texture versus `yScale`.** Bake `v = datum + y_local` (measured against true thickness, so
   the banding compresses as the slider rises — the current recommendation), or scale `v` with
   `yScale` (correct on screen, wrong about measurement). Cannot be done per-level with a single
   shared texture, because the affine map that would fix it needs a per-level offset.
3. **Default picking level.** Level 0 (proposed — legacy-identical, predictable), topmost visible, or
   click-cycling through depth at the same screen point. Cycling costs one piece of controller state
   and is the most discoverable; it was left out to keep the pointer path unchanged for a single-level
   spec.
4. **`MAX_LEVELS = 8`.** A judgement from the object-count math, not a measurement. If a real
   document wants 12, profile `createWorld` first — it is synchronous on the main thread.
5. **Strictly ascending, or merely non-descending?** Two coplanar plans at one datum (say, a
   pedestrian overlay on the road plan) is a legitimate authoring idea and would z-fight badly.
   Strict ascent forbids it today. Relaxing to non-descending is a one-character change and a real
   rendering problem.
6. **Fail-fast, or degrade a bad level to a warning?** Degradation mirrors the appearance precedent
   at `:781-790` and lets an author see all N failures at once, but it means a document can lose its
   ground floor and still render with `spec.hex` aliasing whatever survived lowest, and it obliges the
   panel to surface a `levelWarnings` array or the degradation is indistinguishable from a level the
   author never wrote. Fail-fast is proposed because the prefixed message already recovers most of the
   diagnostic value for one line of code.
7. **Does the appearance v2 bump ship with `levels[]`, or separately?** They are independent by
   construction (§3b). Shipping the elevation channel alone on the single-plan fixture is a smaller,
   independently verifiable change, and it is the half most likely to need visual iteration.
8. **Ghost as the default for non-active levels, or solid?** Solid-by-default is honest about the
   model; ghost-by-default makes the active floor legible immediately and makes the selection glow
   level-exact from the first click. Purely a UX call.
9. **`maxPolarAngle = Math.PI * 0.49` (`:536`)** still forbids orbiting below the horizon, so a tall
   stack cannot be viewed from underneath. Left alone deliberately — awkward framing rather than
   silent geometry loss — but a multi-level spec is the first case where looking up is a reasonable
   thing to want.
