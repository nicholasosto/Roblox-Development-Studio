---
title: "TGL grand-package model and satellite naming"
status: accepted
updated: 2026-07-24
---

# TGL grand-package model and satellite naming

> **Status:** accepted (2026-07-24)

## Context

A live Studio probe (2026-07-24, hub place `102596975485791`) found that TGL is not what the
planning docs recorded. The actual package — `Workspace.Trembus-Game-Library`, PackageLink intact,
`rbxassetid://119571962868471`, at v15, ~7k instances — already spans **six content families**
(Effects, Props, Rigs, Accessories, Animations, Environment) plus a `00-Subpackages` folder
holding two *nested* packages (`Part-Texture-Testing-Lab`, `Beamaract`). The "effects half /
props-rigs half" model in [[0011-tgl-package-vs-syncback-boundary]] described **satellites**, not
the package:

- `soul-steel-universe/crystal-sanctum` `ServerStorage.TrembusGameLibrary` (un-hyphenated, no
  PackageLink, script-built by the v2 normalization pass) is a **staging area** — the 99
  normalized effects live there and are *not yet in the package* (package Blood domain is empty;
  staging holds 7 blood effects). Folding them in is what v16 *is*.
- `roblox-testing-environment`'s `ServerStorage.TrembusGameLibrary` is a **git-built projection**
  (rojo composes it from `assets/library/`) — it can never be a package copy, since a linked
  insert inside a code-first place would fight git-as-master.

Two names that differ only by hyphens denote different instances (`Trembus-Game-Library` = the
package; `TrembusGameLibrary` = satellites) — an accidental pun inviting real confusion: the
operator deleted a redundant ServerStorage backup copy of the package this same day to reduce
ambiguity. ADR 0011 §4 deferred this namespace overload; the hub discovery forces it.

## Decision

**1 · The grand package is blessed.** TGL is *one* package — the Roblox-side distribution of the
master Assets library. Its families mirror the library's family folders; a version bump is a
**library release** ("the library changed", not "effects changed"). It is the packaged tier of
the [[0008-studio-native-lab-lane]] promotion ladder: outputs only, never a workbench.

**2 · Subpackage rule.** Content families live as plain folders inside TGL. Anything needing an
independent version stream nests as its own package under `00-Subpackages`. (Whether the two
current residents belong there is an open item, below.)

**3 · The package alone owns the library name.** Satellites are renamed so no plain folder ever
reads as the package:
- `roblox-testing-environment` projection → **`TGL-Preview`** (applied in `default.project.json`
  with this decision — git-side rename, takes effect on next rojo build/serve)
- `crystal-sanctum` staging folder → **`TGL-Staging`** (a Studio rename, pending — do it next time
  that place is open; its git record follows on the next syncback)

**4 · Named stations of the flow.** Workbench (V2-style) → **staging** (`TGL-Staging`) → fold
into the package home copy (hub `Workspace`) → **Publish Package vN** → consumers via
PackageLink + AutoUpdate. The published asset's version history is the backup; in-place backup
copies are noise (deleted).

**5 · Boundary re-aim (amends 0011 §1).** The syncback ignore rule protects the package
**wherever a linked copy actually lives** — today that is the **hub**: `hub/default.project.json`
gets `syncbackRules.ignoreTrees: ["Workspace/Trembus-Game-Library"]` before the hub's next
syncback (which would otherwise flatten ~7k instances — the hub's git record predates the
insert). Crystal-sanctum's folder is staging, not the package: it legitimately **stays** in the
syncback record while its contents await fold-in, and retires after v16 lands.

**Open items — (a) resolved 2026-07-24:** `00-Subpackages` is deliberate: it is the
**incubation shelf** — packages still under conceptual development (very dynamic test/sandboxes)
park there while they evolve. `Part-Texture-Testing-Lab` is the environment for testing
materials, textures, and Studio-MCP-based building design. Its UI counterpart
(`User-Interface-Development-Lab`) is the same kind of sandbox but lives in `StarterGui` because
it is a UI-based instance — placement follows what the content needs to render. Incubating
sandboxes are the one sanctioned workbench-shaped exception to "package the outputs": packaging
gives them version history while they churn. Still open: (b) confirm `Beamaract`'s identity
(presumably another incubating sandbox); (c) the promotion gate (master Assets
`effects/<domain>/` exports before packaging) from v2 pipeline step 4.

## Consequences

- **Easier:** the name pun is gone — one glance distinguishes package, staging, and preview; the
  hub is protected from a 7k-instance flatten; staging stays honestly in git as the workbench
  record; "v16" has clear semantics (library release = staged effects folded in + published).
- **Harder / cost:** the hub's git record will not carry the package contents (by design — the
  record is the asset version history plus master-Assets exports, per
  [[0011-tgl-package-vs-syncback-boundary]]); the crystal-sanctum rename waits on a Studio
  session, so the pun persists there until then; consumers of the testing-env harness must use
  the new `TGL-Preview` path after the next build.

## Options considered

- **Split TGL into per-family packages** — rejected: the grand package already exists and works
  (v15, six families); staging isolates in-progress churn, and the subpackage rule provides
  granular version streams where genuinely needed. Splitting adds insert/publish ritual per
  family for no present gain.
- **Bless the hyphen convention without renaming** — rejected: "hyphens = package" is too subtle
  to survive six months; the same-day backup-copy confusion is the evidence.
- **One grand package including the projection as a package copy** — rejected: a linked copy
  inside a code-first place fights rojo git-as-master; the projection must stay a plain rojo-built
  tree, which is exactly why it needs a non-package name.

## Cites

- [[0011-tgl-package-vs-syncback-boundary]] (boundary decision; §1 re-aimed, §4 resolved here)
- [[0008-studio-native-lab-lane]] (promotion ladder) · [[0009-soul-steel-universe-topology]] (hub/place ids)
- pipeline [[v2-effects-library-normalization]] (staging contents; v16 fold-in; step 4 promotion)
- session [[2026-07-22-current-status-report]] ("package the outputs, not the workbench")
- Live probe 2026-07-24: hub `102596975485791`, package `rbxassetid://119571962868471` v15,
  family census, `00-Subpackages` residents; hub git record has no `Workspace` Trembus entry

## Re-open if

TGL splits into per-domain packages (tripping the subpackage rule's scope), the package's home
copy moves out of the hub, a rojo release preserves PackageLink through syncback (removing the
ignore-rule need), or Roblox changes nested-package semantics.
