// The lab catalog registry — the fourth emitted artifact the Command Center consumes. This module
// is the ONLY reader of ui-catalog.json; the Catalog lens derives its whole view from the typed
// exports here (never re-reads the JSON).
//
// ui-catalog.json is written by tools/telemetry-collector.mjs whenever the
// @trembus/studio-telemetry plugin's `catalog` channel posts a changed ledger snapshot from
// Studio — the decision-0008 in-place ledger (UIStudio.Catalog attributes + UIMockups kits +
// GenerationManifest values) as an automatic feed. Field-presence contract: a catalog entry's
// attribute fields are ABSENT when the instance doesn't carry them.
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
interface UiCatalogFile {
  generatedBy: string;
  schemaVersion: number;
  receivedAt: string;
  channelTimestamp: number | null;
  place: string;
  placeId: number;
  catalog: CatalogEntryRecord[];
  kits: KitRecord[];
  manifests: ManifestRecord[];
}

// Cast-only typing: nothing validates the emitted JSON against this mirror, so every export is
// guarded — a parseable-but-drifted feed must degrade to an empty Catalog lens, never crash.
const file = uiCatalog as unknown as Partial<UiCatalogFile>;

export const catalog: CatalogEntryRecord[] = Array.isArray(file.catalog) ? file.catalog : [];
export const kits: KitRecord[] = Array.isArray(file.kits) ? file.kits : [];
export const manifests: ManifestRecord[] = Array.isArray(file.manifests) ? file.manifests : [];
export const place: string = file.place ?? '(unknown place)';
export const placeId: number = file.placeId ?? 0;
export const receivedAt: string = file.receivedAt ?? '(never)';

export const counts = {
  entries: catalog.length,
  kits: kits.length,
  manifests: manifests.length,
  emptySlots: catalog.filter((e) => e.templates === 0).length,
};

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
