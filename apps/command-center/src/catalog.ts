// The lab catalog registry — the fourth emitted artifact the Command Center consumes. This module
// is the ONLY reader of ui-catalog.json; the Catalog lens derives its whole view from the typed
// exports here (never re-reads the JSON).
//
// ui-catalog.json is written by tools/telemetry-collector.mjs whenever the
// @trembus/studio-telemetry plugin's `catalog` channel posts a changed ledger snapshot from
// Studio — the decision-0008 in-place ledger (UIStudio.Catalog attributes + UIMockups kits +
// GenerationManifest values) as an automatic feed. Field-presence contract: a catalog entry's
// attribute fields are ABSENT when the instance doesn't carry them.
//
// Schema v2 keys the feed BY PLACE. v1 was a single flat slot, so a place with no ledger (the
// hub, Part Textures) overwrote whichever lab reported before it — the file was last-writer-wins
// and silently went empty. Both shapes are accepted here: a v1 file still renders as one place,
// so a build taken before the collector migrates the file degrades instead of breaking.
import uiCatalog from '../../../previews/dashboards/ui-catalog.json';

// ── The emitted record shapes (mirror of the collector's output) ──
export interface CatalogEntryRecord {
  name: string;
  component?: string;
  state?: string;
  sourceGuiPath?: string;
  variants?: string;
  generatedBy?: string;
  harnessVersion?: number;
  /** Child count of the entry — 0 means the registry slot has no template yet (CF-3 signal). */
  templates: number;
}
export interface KitRecord {
  name: string;
  className: string;
  descendants: number;
  hasManifest: boolean;
}
export interface ManifestRecord {
  path: string;
  value: string;
}
/** One place's ledger — the v2 registry holds an array of these, keyed by `key`. */
interface PlaceRecord {
  key: string;
  place: string;
  placeId: number;
  receivedAt: string;
  channelTimestamp: number | null;
  catalog: CatalogEntryRecord[];
  kits: KitRecord[];
  manifests: ManifestRecord[];
}
interface UiCatalogFile {
  generatedBy: string;
  schemaVersion: number;
  places: PlaceRecord[];
  /** v1 only — the flat single-slot shape, migrated on read. */
  place?: string;
  placeId?: number;
  receivedAt?: string;
  catalog?: CatalogEntryRecord[];
  kits?: KitRecord[];
  manifests?: ManifestRecord[];
}

// Cast-only typing: nothing validates the emitted JSON against this mirror, so every export is
// guarded — a parseable-but-drifted feed must degrade to an empty Catalog lens, never crash.
const file = uiCatalog as unknown as Partial<UiCatalogFile>;

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

/** v2 places, or a v1 flat file folded into a single-place list. */
function readPlaces(): PlaceRecord[] {
  if (Array.isArray(file.places)) return file.places;
  if (file.placeId !== undefined || file.place !== undefined) {
    return [
      {
        key: file.placeId ? `place:${file.placeId}` : `name:${file.place ?? '?'}`,
        place: file.place ?? '(unknown place)',
        placeId: file.placeId ?? 0,
        receivedAt: file.receivedAt ?? '(never)',
        channelTimestamp: null,
        catalog: arr<CatalogEntryRecord>(file.catalog),
        kits: arr<KitRecord>(file.kits),
        manifests: arr<ManifestRecord>(file.manifests),
      },
    ];
  }
  return [];
}

// ── Place identity ──
// `game.Name` is "Place1" for every published place, so the raw name is useless as a label —
// only placeId identifies the source. These names come from decision 0009 (universe topology)
// plus the two roblox-labs platform labs; keep them in step with that ADR. An unlisted place
// renders as its bare id rather than guessing.
const PLACE_NAMES: Record<number, string> = {
  75067279879490: 'User Interface Development',
  134559055187413: 'Part Textures',
  102596975485791: 'Soul Steel — hub',
  82362521847286: 'Steel City',
  139731337909746: 'Crystal Sanctum',
  78520415943353: 'Lab - Architecture',
  90536127244624: 'Lab - Emergent Behavior',
};

export interface PlaceLedger extends PlaceRecord {
  /** Resolved human label — the ADR-known name, else the bare place id. */
  displayName: string;
  counts: { entries: number; kits: number; manifests: number; emptySlots: number };
  /** False for a place that honestly reports no decision-0008 ledger (the hub, Part Textures). */
  hasLedger: boolean;
}

function toLedger(p: PlaceRecord): PlaceLedger {
  const catalog = arr<CatalogEntryRecord>(p.catalog);
  const kits = arr<KitRecord>(p.kits);
  const manifests = arr<ManifestRecord>(p.manifests);
  return {
    ...p,
    catalog,
    kits,
    manifests,
    displayName: PLACE_NAMES[p.placeId] ?? (p.placeId ? `Place ${p.placeId}` : p.place),
    counts: {
      entries: catalog.length,
      kits: kits.length,
      manifests: manifests.length,
      emptySlots: catalog.filter((e) => e.templates === 0).length,
    },
    hasLedger: catalog.length > 0 || kits.length > 0,
  };
}

/**
 * Every reporting place, ordered for the picker: places that actually carry a ledger first, each
 * group most-recently-reported first. This is what stops an empty place from hiding a full one —
 * opening the hub adds a row, it never takes the lens away from the lab you're working in.
 */
export const places: PlaceLedger[] = readPlaces()
  .map(toLedger)
  .sort(
    (a, b) =>
      Number(b.hasLedger) - Number(a.hasLedger) || b.receivedAt.localeCompare(a.receivedAt),
  );

export const defaultPlaceKey: string = places[0]?.key ?? '';
export const schemaVersion: number = file.schemaVersion ?? 1;

/**
 * Most recent report across ALL places — the feed's freshness as a whole (the Tools lens runbook
 * shows it as "last envelope"). Computed as a max, not `places[0]`, because the display order puts
 * ledger-bearing places first rather than newest first.
 */
export const latestReceivedAt: string =
  places.length > 0 ? places.map((p) => p.receivedAt).sort().at(-1)! : '(never)';

// ── Presentation vocabulary ──
// Ledger state → Badge tone (decision-0008 contract v1 vocabulary, open — unknown words tone
// neutral so agent-invented states like "interactive-prototype" still render).
export type CatalogTone = 'success' | 'info' | 'warning' | 'accent' | 'neutral';
const STATE_TONE: Record<string, CatalogTone> = {
  prototype: 'info',
  'interactive-prototype': 'info',
  proven: 'success',
  promoted: 'accent',
};
export const stateTone = (s?: string): CatalogTone => (s ? (STATE_TONE[s] ?? 'neutral') : 'neutral');

/** First TGL status line of a manifest ("Status: BLK / local proof only") — or its first line. */
export const manifestStatusLine = (value: string): string => {
  const lines = value.split('\n');
  return lines.find((l) => l.startsWith('Status:')) ?? lines[0] ?? '';
};
