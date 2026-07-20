// Region C — the sync pipeline as a control surface. The Funnel's top stage is ALL lab
// projects (so every per-stage readout is an honest "share of projects" — the component
// sizes bars against the max and reads conversion against the top stage), followed by the
// four sync states in loop order. Clicking a state stage toggles the rail filter; clicking
// the top stage clears it. The Stat row carries the same counts as drill-ins: Syncback-due
// filters, Lab projects resets, Dirty jumps to the repo card in region F.
import { Badge, Funnel, Stat } from '@trembus/ui';
import type { FunnelContract } from '@trembus/ui';
import { SYNC_ORDER, bySync, counts, syncStyle } from '../labs';

const ALL_STAGE = 'all';

const FUNNEL: FunnelContract = {
  view: 'funnel',
  unit: '',
  stages: [
    {
      id: ALL_STAGE,
      label: 'Lab projects',
      value: counts.projects,
      tone: 'accent',
      note: 'Every discovered Rojo project (any top-level directory with a default.project.json). Select to clear the filter.',
    },
    ...SYNC_ORDER.map((s) => ({
      id: s,
      label: syncStyle(s).label,
      value: bySync[s] ?? 0,
      tone: syncStyle(s).tone,
      note: `${syncStyle(s).gloss} — select to filter the experiences below.`,
    })),
  ],
};

export function SyncFunnel({
  syncFilter,
  onToggle,
  onClear,
  onJumpToRepo,
}: {
  syncFilter: string | null;
  onToggle: (state: string) => void;
  onClear: () => void;
  onJumpToRepo: () => void;
}) {
  return (
    <div className="cc-tools-pipeline">
      <div className="cc-tools-pipeline__funnel">
        <Funnel
          data={FUNNEL}
          selectedId={syncFilter ?? ALL_STAGE}
          onSelect={(id) => (id === ALL_STAGE ? onClear() : onToggle(id))}
        />
      </div>
      <div className="cc-tools-pipeline__stats">
        <Stat
          strap="loop"
          label="Lab projects"
          value={counts.projects}
          tone="neutral"
          target="select to clear the filter"
          onSelect={onClear}
        />
        <Stat
          strap="loop"
          label="Syncback due"
          value={counts.syncbackDue}
          tone={counts.syncbackDue > 0 ? 'warning' : 'success'}
          badge={
            counts.syncbackDue > 0 ? (
              <Badge tone="warning" variant="soft" size="sm" dot>
                act
              </Badge>
            ) : undefined
          }
          onSelect={() => onToggle('syncback-due')}
        />
        <Stat
          strap="census"
          label="Luau modules"
          value={counts.luau}
          tone="info"
          target={`${counts.modelJson} model.json · ${counts.metaJson} meta.json`}
        />
        <Stat strap="census" label="Instance models" value={counts.rbxm} tone="accent" />
        <Stat
          strap="repo"
          label="Dirty files"
          value={counts.dirty}
          tone={counts.dirty > 0 ? 'warning' : 'neutral'}
          // Only a drill-in when there is somewhere to drill — a zero renders as a plain tile.
          onSelect={counts.dirty > 0 ? onJumpToRepo : undefined}
          target={counts.dirty > 0 ? 'select to jump to the repo card' : undefined}
        />
      </div>
    </div>
  );
}
