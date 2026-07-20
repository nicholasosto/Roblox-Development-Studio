// Region A — the persistent status strip. One DataStatusBar answers "can I trust this
// data?" (probe freshness drives `status`) and "what scoped it?" (the sync-filter chip),
// while the trailing chips carry the two OTHER axes: collector reachability (live poll,
// deliberately separate from probe freshness — never conflated) and the all-clear signal
// (present exactly when region B is empty). The refresh affordance COPIES the refresh
// command — the honest no-backend refresh, matching the lens's copy-only ethos.
import { Badge, DataStatusBar } from '@trembus/ui';
import type { DataFilter } from '@trembus/ui';
import { REFRESH_COMMAND, built, counts, syncStyle } from '../labs';
import type { LiveFeed } from '../live';
import { agoMs, fmtAgo } from '../time';
import { fmtWhen } from '../labs';
import { COLLECTOR_CMD } from '../labs';
import { useCopyFlash } from './useCopyFlash';

export function StatusStrip({
  probeStale,
  now,
  feed,
  syncFilter,
  onClearFilter,
  allClear,
}: {
  probeStale: boolean;
  now: number;
  feed: LiveFeed | null;
  syncFilter: string | null;
  onClearFilter: () => void;
  allClear: boolean;
}) {
  const { flash, copy } = useCopyFlash();

  // '(unknown)' built → agoMs null → no machine timestamp; the raw text degrades on its own.
  const builtParses = agoMs(built, now) !== null;

  const filters: DataFilter[] = syncFilter
    ? [{ id: 'sync', label: 'Sync', value: syncStyle(syncFilter).label, tone: 'accent' }]
    : [];

  return (
    <div className="cc-tools-strip">
      <DataStatusBar
        dense
        aria-label="Lab tooling status"
        title="Lab tooling"
        status={probeStale ? 'stale' : 'live'}
        statusLabel={probeStale ? 'Probe stale' : 'Probe fresh'}
        updatedAt={builtParses ? built : undefined}
        updatedLabel={`probed ${fmtAgo(built, now)}`}
        metrics={[
          { id: 'projects', label: 'projects', value: counts.projects },
          { id: 'luau', label: 'luau', value: counts.luau },
          { id: 'models', label: 'models', value: counts.rbxm },
          { id: 'sessions', label: 'sessions', value: feed?.up ? feed.sessions.length : '—' },
        ]}
        filters={filters}
        onRemoveFilter={onClearFilter}
        onRefresh={() => void copy('refresh command', REFRESH_COMMAND)}
        refreshLabel="⎘ refresh cmd"
      />
      <span className="cc-tools-strip__chips">
        {/* Collector chip — offline is a NORMAL quiet state (outline, no dot); the start
            command rides the title attr so the signal stays keyboard-reachable via region E. */}
        {feed === null ? (
          <Badge tone="neutral" variant="soft" size="sm">
            checking…
          </Badge>
        ) : feed.up ? (
          <span title={feed.updatedAt ? `as of ${fmtWhen(feed.updatedAt)}` : undefined}>
            <Badge tone="success" variant="soft" size="sm" dot>
              collector up
            </Badge>
          </span>
        ) : (
          <span title={`Start it: ${COLLECTOR_CMD}`}>
            <Badge tone="neutral" variant="outline" size="sm">
              collector offline
            </Badge>
          </span>
        )}
        {allClear && (
          <Badge tone="success" variant="soft" size="sm" dot>
            all clear
          </Badge>
        )}
        {flash && (
          <span className="cc-explorer__flash" role="status">
            {flash}
          </span>
        )}
      </span>
    </div>
  );
}
