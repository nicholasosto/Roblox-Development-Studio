// The command dock — a CommandBar over the workspace command roster (./commands), pinned to
// the foot of the Tools lens. It answers the lens's second question ("what do I run next?")
// without scrolling to find it: the testing lanes, the syncback loop, repo navigation, and
// every generator sit in one strip that stays put while the rest of the lens scrolls under
// it. (Pinning is fixed rather than sticky — see .cc-dock in styles/app.css for why.)
//
// Copy-only, like every other action in this lens — the static build must stay fully
// functional with no backend. onCommand resolves an id to its shell string and copies it;
// nothing here executes anything.
//
// Status readout: `status` is CONTROLLED rather than letting `formatStatus` echo the click,
// because what deserves announcing is the copy RESULT (the clipboard can be blocked), not
// the fact that a control was activated. It persists until the next command — this is the
// bar's own aria-live readout, not the transient 4s flash the copy buttons use, and the
// thing you just copied is exactly what you want still legible while you paste it.
import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Badge, CommandBar } from '@trembus/ui';
import type { Command } from '@trembus/ui';
import { copyText } from '../clipboard';
import { COMMAND_GROUPS, commandText } from './commands';

export function CommandDock() {
  const [status, setStatus] = useState<ReactNode>(null);
  // Bumped per activation so the readout node is REPLACED, not mutated — copying the same
  // command twice must re-announce, and an identical string in the same node would not.
  const seq = useRef(0);

  const onCommand = (command: Command) => {
    const text = commandText(command.id);
    if (!text) return; // a submenu parent — opening it is not an action
    void copyText(text).then((ok) => {
      seq.current += 1;
      setStatus(
        ok ? (
          <span key={seq.current} className="cc-dock__status">
            Copied <code className="cc-explorer__mono">{text}</code>
          </span>
        ) : (
          // The rest of the lens can say "shown on hover" — its copy controls carry the
          // command in a title attr (dossier) or inline in the table (toolbox). A CommandBar
          // command has no such field, so pointing at a hover here would name an affordance
          // the dock does not have: the readout has to BE the fallback and show the line to
          // copy by hand. .cc-dock__status already wraps a full shell line for exactly this.
          <span key={seq.current} className="cc-dock__status">
            Copy failed — <code className="cc-explorer__mono">{text}</code>
          </span>
        ),
      );
    });
  };

  return (
    <div className="cc-dock">
      <div className="cc-dock__inner">
        <CommandBar
          label="Workspace commands"
          groups={COMMAND_GROUPS}
          // Which way menus OPEN, not where the bar sits: this bar is pinned to the foot of
          // the lens, so its menus have to rise into the page or they open off-screen.
          side="top"
          align="start"
          overflow
          overflowLabel="More commands"
          showStatus
          status={status}
          onCommand={onCommand}
          meta={
            <span className="cc-dock__meta">
              <Badge tone="neutral" variant="soft" size="sm">
                paste from the space root
              </Badge>
              {/* Both testing lanes bind rojo's default port, so only one can serve at a
                  time. Stated once here rather than faked as a disabled control — copy-only
                  cannot observe which lane holds the port. */}
              <Badge tone="warning" variant="soft" size="sm" dot>
                34872 · one lane at a time
              </Badge>
            </span>
          }
        />
      </div>
    </div>
  );
}
