// Region E — "Studio now", the live heartbeats. The poll hook lives here but is LIFTED into
// ToolsPanel (the strip's collector chip reads the same feed — one poll, two surfaces).
// Three states stay distinct: first-poll-in-flight (Skeleton, never a false "offline"
// flash), collector down (a NORMAL quiet one-liner — 'paused', never 'error'), and
// collector up. Polling is visibility-aware: a hidden tab stops the interval, re-fronting
// polls immediately.
import { useEffect, useState } from 'react';
import { Badge, Button, Card, DataStatusBar, Skeleton, Tooltip } from '@trembus/ui';
import { COLLECTOR_CMD, fmtWhen } from '../labs';
import { LIVE_POLL_MS, fetchLive, fmtUptime, isFresh, sessionLabel } from '../live';
import type { LiveFeed } from '../live';
import { fmtAgo, fmtClock } from '../time';
import { useCopyFlash } from './useCopyFlash';

export function useLiveFeed(): LiveFeed | null {
  const [feed, setFeed] = useState<LiveFeed | null>(null);
  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    const poll = () => {
      void fetchLive().then((f) => {
        if (!cancelled) setFeed(f);
      });
    };
    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };
    const start = () => {
      stop();
      poll();
      timer = window.setInterval(poll, LIVE_POLL_MS);
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelled = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  return feed;
}

export function StudioNow({ feed }: { feed: LiveFeed | null }) {
  const { flash, copy } = useCopyFlash();

  return (
    <div className="cc-tools-live">
      <DataStatusBar
        dense
        aria-label="Studio live sessions"
        title="Studio now"
        status={feed === null ? 'loading' : feed.up ? 'live' : 'paused'}
        statusLabel={feed === null ? 'checking…' : feed.up ? 'collector up' : 'collector offline'}
        updatedAt={feed?.up ? feed.updatedAt : undefined}
        updatedLabel={feed?.up && feed.updatedAt ? `as of ${fmtClock(feed.updatedAt)}` : undefined}
        metrics={feed?.up ? [{ id: 'sessions', label: 'sessions', value: feed.sessions.length }] : undefined}
      />
      {feed === null ? (
        <Skeleton variant="text" lines={2} />
      ) : !feed.up ? (
        <p className="cc-pkg-card__desc">
          Live heartbeats appear here while the collector runs.{' '}
          <Tooltip content={<code>{COLLECTOR_CMD}</code>} openDelay={300}>
            <Button size="sm" variant="ghost" onPress={() => void copy('collector command', COLLECTOR_CMD)}>
              ⎘ start the collector
            </Button>
          </Tooltip>
          {flash && (
            <span className="cc-explorer__flash" role="status">
              {flash}
            </span>
          )}
        </p>
      ) : feed.sessions.length === 0 ? (
        <p className="cc-pkg-card__desc">
          No Studio heartbeats — open a lab place with the{' '}
          <code className="cc-explorer__mono">@trembus/studio-telemetry</code> plugin installed (loads on
          Studio start).
        </p>
      ) : (
        <div className="cc-pkg-grid">
          {feed.sessions.map((s) => {
            const fresh = isFresh(s, feed.staleAfterSeconds);
            return (
              <Card key={`${s.placeId}:${s.place}`} className="cc-tools-card">
                <div className="cc-pkg-card__head">
                  <span className="cc-pkg-card__name">{sessionLabel(s)}</span>
                  <Badge tone={fresh ? 'success' : 'warning'} variant="soft" size="sm" dot>
                    {fresh ? 'live' : 'stale'}
                  </Badge>
                  <Badge tone={s.mode === 'play' ? 'accent' : 'neutral'} variant="outline" size="sm">
                    {s.mode}
                  </Badge>
                </div>
                <dl className="cc-explorer__facts">
                  <div>
                    <dt>Session uptime</dt>
                    <dd>{fmtUptime(s.uptimeSeconds)}</dd>
                  </div>
                  <div>
                    <dt>Instances</dt>
                    <dd>{s.instanceCount.toLocaleString()}</dd>
                  </div>
                  {/* Fresh sessions omit the row — their beat IS now (field-presence ethos). */}
                  {!fresh && (
                    <div>
                      <dt>Last seen</dt>
                      <dd title={fmtWhen(s.lastSeenAt)}>{fmtAgo(s.lastSeenAt)}</dd>
                    </div>
                  )}
                  {s.placeId > 0 && (
                    <div>
                      <dt>Place id</dt>
                      <dd>
                        <code className="cc-explorer__mono">{s.placeId}</code>
                      </dd>
                    </div>
                  )}
                </dl>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
