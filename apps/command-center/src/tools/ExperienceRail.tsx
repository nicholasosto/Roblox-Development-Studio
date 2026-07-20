// Region D's master rail — the Packages dossier idiom (.cc-dossier classes) applied to lab
// experiences. The rail always lists EVERY project: an active sync filter DIMS the
// non-matching rows rather than dropping them (with this few experiences, position memory
// beats a shrinking list, and the selection visibly survives filtering). aria-pressed is
// both the a11y state and the selected-styling hook.
import { Badge } from '@trembus/ui';
import { censusLine, syncStyle, syncTone } from '../labs';
import type { ProjectStatus } from '../labs';

export function ExperienceRail({
  projects,
  visibleIds,
  selectedId,
  onSelect,
}: {
  projects: ProjectStatus[];
  visibleIds: Set<string>;
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="cc-dossier__rail" aria-label="Lab experiences">
      <span className="cc-dossier__railcap">
        Experiences
        <span className="cc-dossier__railcount">
          {visibleIds.size < projects.length ? `${visibleIds.size} of ${projects.length}` : projects.length}
        </span>
      </span>
      {projects.map((p) => {
        const selected = p.id === selectedId;
        return (
          <button
            key={p.id}
            type="button"
            className="cc-dossier-item"
            data-dim={!visibleIds.has(p.id) || undefined}
            onClick={() => onSelect(p.id)}
            aria-pressed={selected}
            aria-current={selected ? 'true' : undefined}
            title={syncStyle(p.sync).gloss}
          >
            <span className="cc-dossier-item__head">
              <span className="cc-dossier-item__name">{p.id}</span>
              <Badge tone={syncTone(p.sync)} variant="soft" size="sm" dot>
                {syncStyle(p.sync).label}
              </Badge>
            </span>
            <span className="cc-dossier-item__sub">{censusLine(p.serialization.files)}</span>
          </button>
        );
      })}
    </nav>
  );
}
