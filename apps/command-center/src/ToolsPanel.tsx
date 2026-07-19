// The Tools lens — lab tooling + serialization status over the labs probe (./labs), routed from
// App like the other lenses. It adds presentation only: a status header read O(1) from `counts`,
// the toolchain/repo cards, the recent-commit log, and one card per discovered lab project with
// its sync state and copy-ready syncback commands. Every datum comes from the emitted probe JSON
// via ./labs — the panel names no field the generator doesn't emit, and never re-reads the JSON.
//
// All actions are COPY-ONLY (clipboard, never the filesystem or a dev-server API) so the static
// build stays fully functional — the probe itself is re-run from a shell:
//   node tools/build-labs-status.mjs && pnpm --dir apps/command-center build
import { useEffect, useState } from 'react';
import { Badge, Callout, Card, EmptyState, Inline, Stat, Table, Toolbar } from '@trembus/ui';
import { copyText } from './clipboard';
import { LIVE_POLL_MS, fetchLive, fmtUptime, isFresh, sessionLabel } from './live';
import type { LiveFeed } from './live';
import {
  built,
  censusLine,
  counts,
  fmtBytes,
  fmtWhen,
  labDirPath,
  labs,
  loopSnippet,
  projects,
  syncStyle,
  toolchain,
} from './labs';
import type { ProjectStatus } from './labs';

// Pin "owner/repo@x.y.z" → "x.y.z" (for the resolved-vs-pinned drift check).
const pinVersion = (pin?: string): string | undefined => pin?.split('@')[1];

export function ToolsPanel() {
  // Transient confirmation label for the copy actions (self-clears) — same pattern as the
  // Packages inspector.
  const [flash, setFlash] = useState<string | null>(null);
  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(null), 1600);
    return () => window.clearTimeout(t);
  }, [flash]);
  const copy = async (label: string, text: string) => {
    const ok = await copyText(text);
    setFlash(ok ? `Copied ${label}` : 'Copy failed');
  };

  if (!labs.present) {
    return (
      <div className="cc-explorer">
        <EmptyState
          title="roblox-labs not found"
          description={`Expected the labs repo at ${labs.path}. Clone it beside the other Roblox repos, then re-run node tools/build-labs-status.mjs and rebuild the app.`}
        />
      </div>
    );
  }

  // Resolved rojo drifting from the labs pin is the one toolchain failure worth shouting about —
  // syncback lives in 7.7+, and a stale shim quietly falls back to an older binary.
  const wantVersion = pinVersion(toolchain.rojoPinLabs);
  const rojoDrift = Boolean(
    wantVersion && toolchain.rojoResolved && !toolchain.rojoResolved.includes(wantVersion),
  );

  return (
    <div className="cc-explorer">
      {/* 1 — STATUS HEADER */}
      <section className="cc-section">
        <h3 className="cc-section-title">
          Lab tooling <span className="cc-explorer__built">status probed {fmtWhen(built)}</span>
          {flash && (
            <span className="cc-explorer__flash" role="status">
              {flash}
            </span>
          )}
        </h3>
        <div className="cc-explorer__stats">
          <Stat label="Lab projects" value={counts.projects} tone="neutral" />
          <Stat label="Luau modules" value={counts.luau} tone="info" />
          <Stat label="Instance models" value={counts.rbxm} tone="accent" />
          <Stat
            label="Syncback due"
            value={counts.syncbackDue}
            tone={counts.syncbackDue > 0 ? 'warning' : 'success'}
          />
          <Stat
            label="Dirty files"
            value={counts.dirty}
            tone={counts.dirty > 0 ? 'warning' : 'neutral'}
          />
        </div>
      </section>

      {/* 2 — STUDIO NOW (live heartbeats via the collector's /live endpoint) */}
      <section className="cc-section">
        <StudioNow />
      </section>

      {/* 3 — TOOLCHAIN + REPO */}
      <section className="cc-section">
        <div className="cc-tools-grid">
          <Card className="cc-tools-card">
            <h4 className="cc-tools-card__title">Toolchain</h4>
            <Inline wrap gap={1}>
              {toolchain.syncbackAvailable ? (
                <Badge tone="success" variant="soft" size="sm" dot>
                  syncback available
                </Badge>
              ) : (
                <Badge tone="danger" variant="soft" size="sm" dot>
                  syncback missing
                </Badge>
              )}
              {rojoDrift && (
                <Badge tone="warning" variant="outline" size="sm" dot>
                  resolved rojo ≠ pin
                </Badge>
              )}
            </Inline>
            <dl className="cc-explorer__facts">
              {toolchain.rojoPinLabs && (
                <div>
                  <dt>Rojo pin (labs)</dt>
                  <dd>
                    <code className="cc-explorer__mono">{toolchain.rojoPinLabs}</code>
                  </dd>
                </div>
              )}
              {toolchain.rojoResolved && (
                <div>
                  <dt>Resolves to</dt>
                  <dd>{toolchain.rojoResolved}</dd>
                </div>
              )}
              {toolchain.rojoPinMono && (
                <div>
                  <dt>Rojo pin (mono)</dt>
                  <dd>
                    <code className="cc-explorer__mono">{toolchain.rojoPinMono}</code>
                  </dd>
                </div>
              )}
              {toolchain.rokitResolved && (
                <div>
                  <dt>Rokit</dt>
                  <dd>{toolchain.rokitResolved}</dd>
                </div>
              )}
            </dl>
            {rojoDrift && (
              <Callout tone="warning" title="Toolchain drift">
                The rojo resolving inside the labs repo does not match its rokit pin — run{' '}
                <code className="cc-explorer__mono">rokit install</code> there.
              </Callout>
            )}
          </Card>

          <Card className="cc-tools-card">
            <h4 className="cc-tools-card__title">{labs.name} repo</h4>
            <Inline wrap gap={1}>
              {labs.branch && (
                <Badge tone="neutral" variant="soft" size="sm">
                  {labs.branch}
                </Badge>
              )}
              {labs.dirty > 0 ? (
                <Badge tone="warning" variant="soft" size="sm" dot>
                  {labs.dirty} dirty
                </Badge>
              ) : (
                <Badge tone="success" variant="soft" size="sm" dot>
                  clean
                </Badge>
              )}
            </Inline>
            <dl className="cc-explorer__facts">
              {labs.head && (
                <div>
                  <dt>HEAD</dt>
                  <dd>
                    <code className="cc-explorer__mono">{labs.head.sha}</code> {labs.head.subject}
                  </dd>
                </div>
              )}
              {labs.head && (
                <div>
                  <dt>Committed</dt>
                  <dd>{fmtWhen(labs.head.when)}</dd>
                </div>
              )}
              <div>
                <dt>Path</dt>
                <dd>
                  <code className="cc-explorer__mono">{labs.path}</code>
                </dd>
              </div>
            </dl>
            {labs.recentCommits.length > 0 && (
              <Table density="compact">
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>Commit</Table.HeaderCell>
                    <Table.HeaderCell>When</Table.HeaderCell>
                    <Table.HeaderCell>Subject</Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {labs.recentCommits.map((c) => (
                    <Table.Row key={c.sha}>
                      <Table.Cell>
                        <code className="cc-explorer__mono">{c.sha}</code>
                      </Table.Cell>
                      <Table.Cell>{fmtWhen(c.when)}</Table.Cell>
                      <Table.Cell>{c.subject}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Card>
        </div>
      </section>

      {/* 4 — EXPERIENCES */}
      <section className="cc-section">
        <h3 className="cc-section-title">Experiences</h3>
        <div className="cc-pkg-grid">
          {projects.map((p) => (
            <ExperienceCard key={p.id} project={p} onCopy={copy} />
          ))}
        </div>
      </section>

      {/* 5 — THE LOOP */}
      <section className="cc-section">
        <Callout tone="info" title="The serialization loop (decision 0008)">
          Work in Studio → <strong>File → Save to File As…</strong> into{' '}
          <code className="cc-explorer__mono">places/</code> → dry-run syncback → apply → review the
          diff → commit. Each experience card above carries copy-ready commands; run them inside{' '}
          <code className="cc-explorer__mono">{labs.path}</code>. Status here is a build-time probe —
          refresh with <code className="cc-explorer__mono">node tools/build-labs-status.mjs</code>{' '}
          and rebuild the app.
        </Callout>
      </section>
    </div>
  );
}

// ── "Studio now" — polls the collector's /live endpoint while the lens is mounted. Collector
// offline is a NORMAL state (the collector is a dev-time process), rendered as a quiet note, so
// the static build stays fully functional without it. ──
function StudioNow() {
  const [feed, setFeed] = useState<LiveFeed | null>(null);
  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      void fetchLive().then((f) => {
        if (!cancelled) setFeed(f);
      });
    };
    poll();
    const t = window.setInterval(poll, LIVE_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  return (
    <>
      <h3 className="cc-section-title">
        Studio now{' '}
        {feed?.up ? (
          <Badge tone="success" variant="soft" size="sm" dot>
            collector up
          </Badge>
        ) : (
          <Badge tone="neutral" variant="outline" size="sm">
            collector offline
          </Badge>
        )}
      </h3>
      {!feed?.up ? (
        <p className="cc-pkg-card__desc">
          Start <code className="cc-explorer__mono">node tools/telemetry-collector.mjs</code> to see
          live Studio session heartbeats here.
        </p>
      ) : feed.sessions.length === 0 ? (
        <p className="cc-pkg-card__desc">
          No Studio heartbeats — open a lab place with the{' '}
          <code className="cc-explorer__mono">@trembus/studio-telemetry</code> plugin installed
          (loads on Studio start).
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
    </>
  );
}

// ── A single experience card — sync state, snapshot/serialization facts, and the copy bar. ──
function ExperienceCard({
  project: p,
  onCopy,
}: {
  project: ProjectStatus;
  onCopy: (label: string, text: string) => Promise<void>;
}) {
  const style = syncStyle(p.sync);
  return (
    <Card className="cc-tools-card">
      <div className="cc-pkg-card__head">
        <span className="cc-pkg-card__name">{p.id}</span>
        <Badge tone={style.tone} variant="soft" size="sm" dot>
          {style.label}
        </Badge>
      </div>
      <p className="cc-pkg-card__desc">{style.gloss}</p>
      <dl className="cc-explorer__facts">
        <div>
          <dt>Snapshot</dt>
          <dd>
            {p.snapshot.present ? (
              <>
                {fmtBytes(p.snapshot.bytes)} · saved {fmtWhen(p.snapshot.savedAt)}
              </>
            ) : (
              <>none — save from Studio</>
            )}
          </dd>
        </div>
        <div>
          <dt>Serialized</dt>
          <dd>{censusLine(p.serialization.files)}</dd>
        </div>
        {p.serialization.lastSync && (
          <div>
            <dt>Last sync</dt>
            <dd title={p.serialization.lastSync.subject}>
              <code className="cc-explorer__mono">{p.serialization.lastSync.sha}</code> ·{' '}
              {fmtWhen(p.serialization.lastSync.when)}
            </dd>
          </div>
        )}
      </dl>
      <Toolbar aria-label={`${p.id} commands`} className="cc-tools-card__bar">
        <Toolbar.Group aria-label="Copy syncback commands">
          <Toolbar.Button title={p.commands.dryRun} onClick={() => void onCopy('dry-run', p.commands.dryRun)}>
            ⎘ dry-run
          </Toolbar.Button>
          <Toolbar.Button title={p.commands.apply} onClick={() => void onCopy('apply', p.commands.apply)}>
            ⎘ apply
          </Toolbar.Button>
          <Toolbar.Button title="The whole loop as a shell block" onClick={() => void onCopy('loop', loopSnippet(p))}>
            ⎘ loop
          </Toolbar.Button>
          <Toolbar.Button title={labDirPath(p)} onClick={() => void onCopy('dir path', labDirPath(p))}>
            ⎘ dir
          </Toolbar.Button>
        </Toolbar.Group>
      </Toolbar>
    </Card>
  );
}
