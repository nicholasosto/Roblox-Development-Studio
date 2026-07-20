// Region D's detail — one experience, answered in action order: what do I do NEXT (the
// derived next-action Callout leads), then the copy bar, then the census Meter, then the
// facts. The parent keys this component by project id so switching experiences resets the
// copy flash. Toolbar buttons carry their full command in the native title attr — NOT a
// Tooltip wrap, which would fight the Toolbar's roving tabindex.
import { Badge, Button, Callout, Card, Meter, Toolbar, Tooltip } from '@trembus/ui';
import {
  censusSegments,
  fmtBytes,
  fmtWhen,
  labDirPath,
  loopSnippet,
  nextAction,
  syncStyle,
} from '../labs';
import type { ProjectStatus } from '../labs';
import { fmtAgo } from '../time';
import { useCopyFlash } from './useCopyFlash';

export function ExperienceDossier({ project: p, now }: { project: ProjectStatus; now: number }) {
  const { flash, copy } = useCopyFlash();
  const style = syncStyle(p.sync);
  const act = nextAction(p);
  const segments = censusSegments(p.serialization.files);
  const totalFiles = segments.reduce((n, s) => n + s.value, 0);

  return (
    <Card className="cc-tools-dossier">
      <Card.Header className="cc-tools-dossier__head">
        <span className="cc-pkg-card__head">
          <span className="cc-pkg-card__name">{p.id}</span>
          <Badge tone={style.tone} variant="soft" size="sm" dot>
            {style.label}
          </Badge>
        </span>
        <code className="cc-explorer__mono">{labDirPath(p)}</code>
      </Card.Header>
      <Card.Body className="cc-tools-dossier__body">
        <Callout tone={act.tone} title={act.title}>
          {act.instruction}{' '}
          {act.command && (
            <Tooltip content={<code>{act.command}</code>} openDelay={300}>
              <Button
                size="sm"
                variant="outline"
                tone="accent"
                onPress={() => void copy(act.commandLabel ?? 'command', act.command ?? '')}
              >
                ⎘ {act.commandLabel}
              </Button>
            </Tooltip>
          )}
        </Callout>

        {totalFiles > 0 && (
          <Meter
            variant="stacked"
            size="md"
            max={totalFiles}
            segments={segments}
            label={`Serialized files — ${totalFiles} total`}
          />
        )}

        <dl className="cc-explorer__facts">
          <div>
            <dt>Snapshot</dt>
            <dd>
              {p.snapshot.present ? (
                <>
                  {fmtBytes(p.snapshot.bytes)} ·{' '}
                  <span title={fmtWhen(p.snapshot.savedAt)}>saved {fmtAgo(p.snapshot.savedAt, now)}</span>
                </>
              ) : (
                <>none — save from Studio</>
              )}
            </dd>
          </div>
          {p.serialization.lastSync && (
            <div className="cc-tools-card__lastsync">
              <dt>Last sync</dt>
              <dd title={`${p.serialization.lastSync.subject} — ${fmtWhen(p.serialization.lastSync.when)}`}>
                <code className="cc-explorer__mono">{p.serialization.lastSync.sha}</code> ·{' '}
                {fmtAgo(p.serialization.lastSync.when, now)}
                <span className="cc-tools-card__subject">{p.serialization.lastSync.subject}</span>
              </dd>
            </div>
          )}
        </dl>
      </Card.Body>
      <Card.Footer className="cc-explorer__footerbar cc-tools-card__bar">
        <Toolbar aria-label={`${p.id} commands`}>
          <Toolbar.Group aria-label="Copy syncback commands">
            <Toolbar.Button title={p.commands.dryRun} onClick={() => void copy('dry-run', p.commands.dryRun)}>
              ⎘ dry-run
            </Toolbar.Button>
            <Toolbar.Button title={p.commands.apply} onClick={() => void copy('apply', p.commands.apply)}>
              ⎘ apply
            </Toolbar.Button>
            <Toolbar.Button title="The whole loop as a shell block" onClick={() => void copy('loop', loopSnippet(p))}>
              ⎘ loop
            </Toolbar.Button>
            <Toolbar.Button title={labDirPath(p)} onClick={() => void copy('dir path', labDirPath(p))}>
              ⎘ dir
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar>
        {flash && (
          <span className="cc-explorer__flash" role="status">
            {flash}
          </span>
        )}
      </Card.Footer>
    </Card>
  );
}
