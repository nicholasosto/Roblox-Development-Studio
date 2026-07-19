// The labs status probe — the third emitted artifact the Command Center consumes, alongside the
// entity contract (./contract) and the packages registry (./packages). This module is the ONLY
// reader of labs-status.json; the Tools lens derives its whole view from the typed exports here
// (never re-reads the JSON).
//
// The probe (tools/build-labs-status.mjs) is a moment-in-time snapshot of the lab serialization
// loop from decision 0008-studio-native-lab-lane: toolchain pins vs what resolves, the labs repo's
// git state, and each discovered Rojo project's snapshot/serialization freshness. Field-presence
// contract: snapshot.{bytes,savedAt} and serialization.lastSync are ABSENT when N/A (no nulls),
// so views skip those rows rather than showing empties.
import labsStatus from '../../../previews/dashboards/labs-status.json';

// ── The emitted record shapes (mirror of build-labs-status's output) ──
export interface CommitRef {
  sha: string;
  when: string;
  subject: string;
}
export interface LabsRepo {
  name: string;
  path: string;
  present: boolean;
  branch?: string;
  head?: CommitRef;
  dirty: number;
  recentCommits: CommitRef[];
}
export interface Toolchain {
  rojoPinLabs?: string;
  rojoPinMono?: string;
  rojoResolved?: string;
  rokitResolved?: string;
  syncbackAvailable: boolean;
}
export interface FileCensus {
  luau: number;
  rbxm: number;
  modelJson: number;
  metaJson: number;
  other: number;
}
export interface SnapshotInfo {
  present: boolean;
  file: string;
  bytes?: number;
  savedAt?: string;
}
export interface SerializationInfo {
  files: FileCensus;
  lastSync?: CommitRef;
}
export type SyncState = 'in-sync' | 'syncback-due' | 'never-synced' | 'no-snapshot';
export interface ProjectStatus {
  id: string;
  projectFile: string;
  snapshot: SnapshotInfo;
  serialization: SerializationInfo;
  /** One of SyncState; open vocabulary — unknown words tone neutral. */
  sync: string;
  commands: { dryRun: string; apply: string };
}
export interface LabsCounts {
  projects: number;
  luau: number;
  rbxm: number;
  modelJson: number;
  metaJson: number;
  dirty: number;
  syncbackDue: number;
}
interface LabsStatusFile {
  generatedBy: string;
  schemaVersion: number;
  built: string;
  builtMs: number;
  labs: LabsRepo;
  toolchain: Toolchain;
  counts: LabsCounts;
  projects: ProjectStatus[];
}

// Cast-only typing: nothing validates the emitted JSON against this mirror, so every export is
// guarded — a parseable-but-drifted probe must degrade to an empty Tools lens, never crash.
const file = labsStatus as unknown as Partial<LabsStatusFile>;

export const labs: LabsRepo = file.labs ?? {
  name: 'roblox-labs',
  path: 'external-locations/code/roblox-labs',
  present: false,
  dirty: 0,
  recentCommits: [],
};
export const toolchain: Toolchain = file.toolchain ?? { syncbackAvailable: false };
export const counts: LabsCounts = file.counts ?? {
  projects: 0,
  luau: 0,
  rbxm: 0,
  modelJson: 0,
  metaJson: 0,
  dirty: 0,
  syncbackDue: 0,
};
export const projects: ProjectStatus[] = Array.isArray(file.projects) ? file.projects : [];
export const built: string = file.built ?? '(unknown)';

// ── Presentation vocabulary ──
// Sync state → Badge tone + the one-line gloss the cards and inspector share.
export interface SyncStyle {
  label: string;
  tone: 'success' | 'info' | 'warning' | 'danger' | 'neutral';
  gloss: string;
}
const SYNC_STYLE: Record<SyncState, SyncStyle> = {
  'in-sync': { label: 'In sync', tone: 'success', gloss: 'serialized source is at least as new as the snapshot' },
  'syncback-due': { label: 'Syncback due', tone: 'warning', gloss: 'snapshot saved after the last serialization commit' },
  'never-synced': { label: 'Never synced', tone: 'info', gloss: 'snapshot present but no commit touches this project yet' },
  'no-snapshot': { label: 'No snapshot', tone: 'neutral', gloss: 'no local .rbxl (gitignored — save one from Studio)' },
};
export const syncStyle = (s: string): SyncStyle =>
  SYNC_STYLE[s as SyncState] ?? { label: s, tone: 'neutral', gloss: '' };

// ── Formatting helpers (presentation-only, shared by the Tools views) ──
export const fmtBytes = (n?: number): string =>
  n === undefined ? '—' : n >= 1_048_576 ? `${(n / 1_048_576).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;

/** ISO stamp (any offset) → the viewer's local "Jul 19, 2026, 8:11 AM" style. */
export const fmtWhen = (iso?: string): string => {
  if (!iso) return '—';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  return new Date(t).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

/** One-line file census — zero-count types skipped, matching the field-presence ethos. */
export const censusLine = (f: FileCensus): string =>
  (
    [
      [f.luau, 'luau'],
      [f.rbxm, 'rbxm'],
      [f.modelJson, 'model.json'],
      [f.metaJson, 'meta.json'],
      [f.other, 'other'],
    ] as [number, string][]
  )
    .filter(([n]) => n > 0)
    .map(([n, label]) => `${n} ${label}`)
    .join(' · ') || 'nothing serialized yet';

// ── Copy snippet builders (copy-only — the static build stays fully functional) ──
/** Space-relative project directory path (through the external-locations symlink). */
export const labDirPath = (p: ProjectStatus): string => `${labs.path}/${p.id}`;
/** The whole serialization loop for one project, as a paste-ready shell block. */
export const loopSnippet = (p: ProjectStatus): string =>
  [
    `cd ${labs.path}`,
    `# Studio: File → Save to File As… → ${p.snapshot.file}`,
    p.commands.dryRun,
    p.commands.apply,
    'git diff && git add -A && git commit',
  ].join('\n');
