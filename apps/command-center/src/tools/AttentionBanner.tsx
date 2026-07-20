// Region B — the attention banner. Callouts render ONLY when something is wrong; a healthy
// lab renders nothing here and the status strip shows "all clear" instead (silence-as-health).
// deriveAttention is a pure function of the probe so ToolsPanel can share the predicate with
// the strip without a second source of truth. Danger sorts before warning.
import type { ReactNode } from 'react';
import { Button, Callout, Tooltip } from '@trembus/ui';
import { counts, labs, toolchain } from '../labs';
import { useCopyFlash } from './useCopyFlash';

export interface AttentionItem {
  id: string;
  tone: 'danger' | 'warning';
  title: string;
  body: ReactNode;
  /** Copy-ready fix (copy-only ethos — never runs anything). */
  command?: string;
  commandLabel?: string;
  /** 'filter' → the "Show them" affordance (wired by ToolsPanel to the sync filter). */
  action?: 'filter';
}

/** Resolved rojo drifting from the labs pin — syncback lives in 7.7+, and a stale shim
 *  quietly falls back to an older binary (the one toolchain failure worth shouting about). */
export const rojoDrift = (): boolean => {
  const want = toolchain.rojoPinLabs?.split('@')[1];
  return Boolean(want && toolchain.rojoResolved && !toolchain.rojoResolved.includes(want));
};

export function deriveAttention(): AttentionItem[] {
  const items: AttentionItem[] = [];
  if (!toolchain.syncbackAvailable) {
    items.push({
      id: 'syncback-missing',
      tone: 'danger',
      title: 'Syncback missing',
      body: 'No syncback-capable rojo resolves in the labs repo — the serialization loop cannot run.',
      command: `cd ${labs.path} && rokit install`,
      commandLabel: 'rokit install',
    });
  }
  if (rojoDrift()) {
    items.push({
      id: 'rojo-drift',
      tone: 'warning',
      title: 'Toolchain drift',
      body: `The rojo resolving inside the labs repo (${toolchain.rojoResolved}) does not match its rokit pin (${toolchain.rojoPinLabs}).`,
      command: `cd ${labs.path} && rokit install`,
      commandLabel: 'rokit install',
    });
  }
  if (counts.syncbackDue > 0) {
    items.push({
      id: 'syncback-due',
      tone: 'warning',
      title: `Syncback due — ${counts.syncbackDue} experience${counts.syncbackDue === 1 ? '' : 's'}`,
      body: 'Snapshots saved after the last serialization commit. Dry-run, review, apply, commit.',
      action: 'filter',
    });
  }
  if (counts.dirty > 0) {
    items.push({
      id: 'dirty',
      tone: 'warning',
      title: `${counts.dirty} dirty file${counts.dirty === 1 ? '' : 's'} in ${labs.name}`,
      body: 'Uncommitted changes in the labs repo — review and commit before the next syncback.',
      command: `cd ${labs.path} && git status`,
      commandLabel: 'git status',
    });
  }
  return items.sort((a, b) => (a.tone === b.tone ? 0 : a.tone === 'danger' ? -1 : 1));
}

export function AttentionBanner({
  items,
  onShowSyncbackDue,
}: {
  items: AttentionItem[];
  onShowSyncbackDue: () => void;
}) {
  const { flash, copy } = useCopyFlash();
  if (items.length === 0) return null;
  return (
    <div className="cc-tools-banner">
      {items.map((it) => (
        <Callout key={it.id} tone={it.tone} title={it.title}>
          {it.body}{' '}
          {it.command && (
            <Tooltip content={<code>{it.command}</code>} openDelay={300}>
              <Button
                size="sm"
                variant="ghost"
                onPress={() => void copy(it.commandLabel ?? 'command', it.command ?? '')}
              >
                ⎘ {it.commandLabel}
              </Button>
            </Tooltip>
          )}
          {it.action === 'filter' && (
            <Button size="sm" variant="outline" onPress={onShowSyncbackDue}>
              Show them
            </Button>
          )}
        </Callout>
      ))}
      {flash && (
        <span className="cc-explorer__flash" role="status">
          {flash}
        </span>
      )}
    </div>
  );
}
