// The workspace command roster — the data model behind the Tools lens's command dock
// (./CommandDock). Every command in this space that a human runs by hand lives here once:
// the two code-first testing lanes, the syncback loop per discovered project, repo
// navigation, and the dashboard generators.
//
// Two shapes come out of one source, deliberately:
//   commandGroups()  → CommandBar's `groups` model — pure, JSON-serializable, no closures
//   commandText(id)  → the shell string that id stands for
// The dock never sees a command string until onCommand looks one up by id. That indirection
// is not ceremony: it is the seam a future local executor slots into (POST {id}, server owns
// an allowlisted roster, no shell string ever crosses the wire). Tier 0 copies; the model
// does not change when it stops copying.
//
// Cwd contract: EVERY command here pastes from the space root (the planning root), matching
// the copy snippets the rest of the lens already emits. Commands that must run inside a repo
// carry their own `cd` through external-locations/ — cd-ing through the symlink lands the
// shell in the real repo, which is what the rojo pins and npm scripts resolve against.
import type { Command, CommandGroup } from '@trembus/ui';
import { COLLECTOR_CMD, built as labsBuilt, labs, loopSnippet, projects, universe } from '../labs';
import type { LabsRepo } from '../labs';
import { latestReceivedAt } from '../catalog';
import { built as packagesBuilt } from '../packages';
import { hub } from '../contract';

/** The code-first testing repo (CLAUDE.md's rojo-lane table) — not covered by the labs
 *  probe, which only walks the two SYNCBACK repos, so its path is a constant here. */
export const TESTING_REPO = 'external-locations/code/roblox-testing-environment';

// ── id → shell string registry ────────────────────────────────────────────────
// Populated as the groups are built, so a command and its text can never drift apart.
const TEXT = new Map<string, string>();

/** Register one command + the shell it stands for. */
function cmd(
  id: string,
  label: string,
  text: string,
  opts: { glyph?: string; tone?: Command['tone']; hint?: string; showLabel?: boolean } = {},
): Command {
  TEXT.set(id, text);
  return { id, label, ...opts };
}

/** A command that only opens a submenu — no shell of its own.
 *  `showLabel` is on for every TOP-LEVEL command in this dock: glyph-only is the component's
 *  default and reads fine for a familiar editor toolbar, but this bar's verbs ("Dry-run" vs
 *  "Apply", four near-identical generators) are not guessable from a glyph. Submenu leaves
 *  need no flag — menu items always render their label. */
const menu = (id: string, label: string, glyph: string, commands: Command[]): Command => ({
  id,
  label,
  glyph,
  showLabel: true,
  commands,
});

/** The shell string an id stands for; undefined for submenu parents (nothing to copy). */
export const commandText = (id: string): string | undefined => TEXT.get(id);

/** Run `inner` with the shell parked in `repo` first — one pasteable line. */
const inRepo = (repo: string, inner: string): string => `cd ${repo} && ${inner}`;

// ── The dashboard generators ──────────────────────────────────────────────────
// Shared with the Workbench toolbox table (./WorkbenchRunbook), which pairs each row with
// the freshness of the artifact it produces. The command strings live HERE; the table reads
// them, so the dock and the table can never disagree about what to run.
export interface GeneratorRow {
  id: string;
  label: string;
  command: string;
  output: string;
  /** ISO stamp of the artifact this tool last produced; absent → no freshness badge. */
  freshIso?: string;
  freshLabel?: string;
}

export const GENERATORS: GeneratorRow[] = [
  {
    id: 'gen.labs',
    label: 'Labs status probe',
    command: 'node tools/build-labs-status.mjs',
    output: 'labs-status.json',
    freshIso: labsBuilt,
  },
  {
    id: 'gen.packages',
    label: 'Packages registry',
    command: 'node tools/build-packages-registry.mjs',
    output: 'packages.json',
    freshIso: packagesBuilt,
  },
  {
    id: 'gen.hub',
    label: 'Hub render',
    command: 'node .project-system/tools/render-hub.mjs',
    output: 'roblox-development-studio-{graph,hub}.json',
    freshIso: (hub as { updated?: string }).updated,
  },
  {
    id: 'gen.collector',
    label: 'Telemetry collector',
    command: COLLECTOR_CMD,
    output: 'ui-catalog.json + /live',
    freshIso: latestReceivedAt,
    freshLabel: 'last envelope',
  },
  {
    id: 'gen.bundle',
    label: 'Explorer rebuild',
    command: 'pnpm --dir apps/command-center build',
    output: 'previews/app/',
  },
];

// ── The two code-first testing lanes ──────────────────────────────────────────
// Both rojo projects in roblox-testing-environment bind the same default port, so they are
// mutually exclusive at runtime. Copy-only cannot KNOW which one holds the port, so the
// constraint is stated once in the bar's `meta` rather than faked as a disabled state — a
// greyed-out control the dock cannot actually verify would be a lie about machine state.
interface Lane {
  id: string;
  /** The rojo project's `name` — what shows in Studio's Rojo plugin on connect. */
  label: string;
  serve: string;
  watch: string;
  build: string;
}

const LANES: Lane[] = [
  {
    id: 'default',
    label: 'TrembusUITesting',
    serve: 'npm run serve',
    watch: 'npm run watch',
    build: 'npm run build',
  },
  {
    id: 'slotable',
    label: 'SlotableItemsTest',
    serve: 'npm run serve:slotable',
    watch: 'npm run watch:slotable',
    build: 'npm run build:slotable',
  },
];

/** Per-lane submenu for one npm script family. */
const laneMenu = (verb: keyof Pick<Lane, 'serve' | 'watch' | 'build'>): Command[] =>
  LANES.map((lane) =>
    cmd(`lane.${verb}.${lane.id}`, lane.label, inRepo(TESTING_REPO, lane[verb]), {
      tone: verb === 'serve' ? 'accent' : 'neutral',
    }),
  );

// ── Group builders ────────────────────────────────────────────────────────────
// Nesting caps at TWO levels (menu → submenu); every builder below stays inside that, so a
// group's commands either act directly or open exactly one submenu of leaves.

const testingGroup = (): CommandGroup => ({
  id: 'testing',
  label: 'Testing lanes',
  commands: [
    menu('lane.serve', 'Serve', 'play', laneMenu('serve')),
    menu('lane.watch', 'Watch', 'zap', laneMenu('watch')),
    menu('lane.build', 'Build', 'wrench', laneMenu('build')),
  ],
});

/** The syncback loop, one submenu entry per discovered project. The probe already emits
 *  each project's dry-run/apply lines — they are copied verbatim, never re-derived here. */
const syncbackGroup = (): CommandGroup | undefined => {
  if (projects.length === 0) return undefined;
  const per = (verb: 'dryRun' | 'apply', tone?: Command['tone']) =>
    projects.map((p) =>
      cmd(`sync.${verb}.${p.id}`, p.id, inRepo(p.repo?.path ?? labs.path, p.commands[verb]), { tone }),
    );
  return {
    id: 'syncback',
    label: 'Syncback',
    commands: [
      menu('sync.dryRun', 'Dry-run', 'search', per('dryRun')),
      menu('sync.apply', 'Apply', 'cloud', per('apply', 'danger')),
      menu(
        'sync.loop',
        'Full loop',
        'queue',
        projects.map((p) => cmd(`sync.loop.${p.id}`, p.id, loopSnippet(p))),
      ),
    ],
  };
};

/** Repo navigation — the three wrapped repos a human actually cd's into by hand. */
const repoGroup = (): CommandGroup => {
  const repos: { id: string; name: string; path: string }[] = [
    { id: 'labs', name: labs.name, path: labs.path },
    ...(universe ? [{ id: 'universe', name: universe.name, path: (universe as LabsRepo).path }] : []),
    { id: 'testing', name: 'roblox-testing-environment', path: TESTING_REPO },
  ];
  return {
    id: 'repos',
    label: 'Repos',
    commands: [
      menu(
        'repo.cd',
        'cd',
        'folder',
        repos.map((r) => cmd(`repo.cd.${r.id}`, r.name, `cd ${r.path}`)),
      ),
      menu(
        'repo.status',
        'git status',
        'file',
        repos.map((r) => cmd(`repo.status.${r.id}`, r.name, `git -C ${r.path} status`)),
      ),
    ],
  };
};

const generatorGroup = (): CommandGroup => ({
  id: 'generators',
  label: 'Generators',
  commands: GENERATORS.map((g) =>
    cmd(g.id, g.label, g.command, {
      glyph: g.id === 'gen.collector' ? 'network' : 'terminal',
      showLabel: true,
    }),
  ),
});

/** The dock's whole model. Built once at module load — every input is build-time static
 *  (the probe is a snapshot), so there is nothing to recompute per render. */
export const COMMAND_GROUPS: CommandGroup[] = [
  testingGroup(),
  syncbackGroup(),
  repoGroup(),
  generatorGroup(),
].filter((g): g is CommandGroup => g !== undefined);
