// The Tools lens, 2.0 — a control surface over the labs probe (../labs) + live collector
// feed (../live), composed from the region modules in this folder:
//
//   A StatusStrip        persistent: probe freshness · counts · collector chip · filter chip
//   B AttentionBanner    conditional: Callouts ONLY when something is wrong (absence = health)
//   C SyncFunnel         control: clickable pipeline stages + drill-in Stat row
//   D rail │ dossier     master-detail: every experience, next-action-first detail
//   E StudioNow          secondary: live heartbeats (collector-offline is a normal state)
//   F+G WorkbenchRunbook reference: toolchain/repo cards · workspace toolbox · the loop Brief
//
// Primary = A–D: "is everything OK?" and "what do I run next?" answer without scrolling.
// One sync filter (funnel stage / stat / banner) scopes the rail; the selection SURVIVES
// filtering (Packages idiom — chosen deliberately, the rail just dims it). All actions stay
// COPY-ONLY so the static build is fully functional; the one runtime call is the /live poll,
// lifted here so the strip chip and region E share a single feed.
//
// Deep link: #tools=<projectId> selects that experience on load; rail clicks write it back
// via replaceState (in-page state, not routes — mirror of App's tab handling).
import { useEffect, useState } from 'react';
import { Button, EmptyState, Tooltip } from '@trembus/ui';
import { built, labs, projects } from '../labs';
import { agoMs } from '../time';
import { AttentionBanner, deriveAttention } from './AttentionBanner';
import { ExperienceDossier } from './ExperienceDossier';
import { ExperienceRail } from './ExperienceRail';
import { StatusStrip } from './StatusStrip';
import { StudioNow, useLiveFeed } from './StudioNow';
import { SyncFunnel } from './SyncFunnel';
import { WorkbenchRunbook } from './WorkbenchRunbook';
import { useCopyFlash } from './useCopyFlash';

// The probe is a build-time snapshot; past this age the strip flips to 'stale'.
const PROBE_STALE_MS = 24 * 60 * 60 * 1000;

// Re-render tick — fmtAgo reads a `now` per render, so one slow interval keeps every
// relative stamp honest while the lens sits open (StudioNow re-renders via its own poll).
function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);
  return now;
}

// Honor a #tools=<projectId> deep link on first load; unknown ids fall through to the
// first project. Read once at mount — selection is in-page state after that.
function initialProjectId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const m = /^#tools=(.+)$/.exec(window.location.hash);
  const id = m ? decodeURIComponent(m[1]) : undefined;
  return id && projects.some((p) => p.id === id) ? id : undefined;
}

export function ToolsPanel() {
  const now = useNow();
  const feed = useLiveFeed();
  const [syncFilter, setSyncFilter] = useState<string | null>(null);
  const [selId, setSelId] = useState<string | undefined>(initialProjectId);

  if (!labs.present) {
    return (
      <div className="cc-explorer">
        <MissingLabs />
      </div>
    );
  }

  const attention = deriveAttention();
  const probeAge = agoMs(built, now);
  const probeStale = probeAge !== null && probeAge > PROBE_STALE_MS;

  const visibleIds = new Set(
    (syncFilter ? projects.filter((p) => p.sync === syncFilter) : projects).map((p) => p.id),
  );
  // Explicit selection survives filtering (the rail dims it); otherwise lead with the
  // first filtered row so a stage click immediately shows a matching dossier.
  const selected =
    (selId ? projects.find((p) => p.id === selId) : undefined) ??
    projects.find((p) => visibleIds.has(p.id)) ??
    projects[0];

  const toggleFilter = (state: string) => setSyncFilter((f) => (f === state ? null : state));
  const clearFilter = () => setSyncFilter(null);
  const selectProject = (id: string) => {
    setSelId(id);
    window.history.replaceState(null, '', `#tools=${encodeURIComponent(id)}`);
  };
  const jumpToRepo = () =>
    document.getElementById('cc-repo-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="cc-explorer">
      {/* A — STATUS STRIP */}
      <section className="cc-section">
        <StatusStrip
          probeStale={probeStale}
          now={now}
          feed={feed}
          syncFilter={syncFilter}
          onClearFilter={clearFilter}
          allClear={attention.length === 0}
        />
      </section>

      {/* B — ATTENTION (renders nothing when healthy) */}
      {attention.length > 0 && (
        <section className="cc-section">
          <AttentionBanner items={attention} onShowSyncbackDue={() => setSyncFilter('syncback-due')} />
        </section>
      )}

      {/* C — SYNC PIPELINE (hidden with zero projects — the D EmptyState carries the story) */}
      {projects.length > 0 && (
        <section className="cc-section">
          <h3 className="cc-section-title">Sync pipeline</h3>
          <SyncFunnel
            syncFilter={syncFilter}
            onToggle={toggleFilter}
            onClear={clearFilter}
            onJumpToRepo={jumpToRepo}
          />
        </section>
      )}

      {/* D — EXPERIENCES (master rail │ dossier) */}
      <section className="cc-section">
        <h3 className="cc-section-title">Experiences</h3>
        {projects.length === 0 || !selected ? (
          <EmptyState
            title="No lab experiences discovered"
            description={`The probe found no <dir>/default.project.json under ${labs.path}. Scaffold a Rojo project there (any top-level directory with a default.project.json is auto-discovered), then refresh the lens.`}
            pendingSource="previews/dashboards/labs-status.json"
          />
        ) : (
          <div className="cc-dossier">
            <ExperienceRail
              projects={projects}
              visibleIds={visibleIds}
              selectedId={selected.id}
              onSelect={selectProject}
            />
            <div className="cc-dossier__detail">
              {/* Keyed by id so switching experiences resets the dossier's copy flash. */}
              <ExperienceDossier key={selected.id} project={selected} now={now} />
            </div>
          </div>
        )}
      </section>

      {/* E — STUDIO NOW */}
      <section className="cc-section">
        <StudioNow feed={feed} />
      </section>

      {/* F + G — WORKBENCH · TOOLBOX · THE LOOP (sibling sections, own titles) */}
      <WorkbenchRunbook now={now} />
    </div>
  );
}

// The labs repo itself is missing — the whole lens reduces to the one next action.
function MissingLabs() {
  const { flash, copy } = useCopyFlash();
  return (
    <>
      <EmptyState
        title="roblox-labs not found"
        description={`Expected the labs repo at ${labs.path}. Clone it beside the other Roblox repos, then re-run the probe and rebuild the app.`}
        pendingSource="previews/dashboards/labs-status.json"
        action={
          <Tooltip content={<code>{labs.path}</code>} openDelay={300}>
            <Button size="sm" variant="outline" onPress={() => void copy('expected path', labs.path)}>
              ⎘ expected path
            </Button>
          </Tooltip>
        }
      />
      {flash && (
        <span className="cc-explorer__flash" role="status">
          {flash}
        </span>
      )}
    </>
  );
}
