import { spawn } from 'node:child_process';
import { realpathSync, watch, type FSWatcher } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '../..'); // the Roblox-Development-Studio space root (holds previews/ and tools/)

// Honor a harness-assigned port (PORT env, set when launch.json runs with autoPort) so the
// server never collides with another chat's instance; fall back to 5176 for manual runs.
const PORT = Number(process.env.PORT) || 5176;

// Resolve a path through realpath (chokidar needs REAL paths to watch through the
// external-locations symlinks); fall back to the un-real path so config load never throws
// when a symlink is missing.
const real = (p: string): string => {
  try {
    return realpathSync(p);
  } catch {
    return p;
  }
};

// ── Live registry (dev only) ──────────────────────────────────────────────────────────
// The app imports previews/dashboards/packages.json statically (src/packages.ts), so Vite's
// dev server already reloads the page whenever that JSON changes. The missing half is
// regenerating it from its sources: the monorepo's per-package manifests and the two consumer
// repos' package.json. This plugin watches those manifests (through fs.realpathSync — the
// space reaches them via external-locations symlinks, and chokidar needs real paths) and
// re-runs the zero-dep registry builder as a single-flight subprocess — exactly a human
// `node tools/build-packages-registry.mjs`. `apply: 'serve'` scopes it to `vite dev` only,
// so `vite build` / `vite preview` keep reading the committed JSON.
function livePackages(): Plugin {
  const CODE_ROOT = resolve(REPO_ROOT, 'external-locations/code');
  const MONO_PACKAGES = real(resolve(CODE_ROOT, 'roblox-packages-mono/packages'));
  const CONSUMER_MANIFESTS = [
    real(resolve(CODE_ROOT, 'soul-steel-official/package.json')),
    real(resolve(CODE_ROOT, 'roblox-testing-environment/package.json')),
  ];
  const GENERATOR = resolve(REPO_ROOT, 'tools/build-packages-registry.mjs');
  return {
    name: 'rds:live-packages',
    apply: 'serve',
    configureServer(server) {
      const log = (msg: string) => server.config.logger.info(`[live-packages] ${msg}`, { timestamp: true });
      let debounce: ReturnType<typeof setTimeout> | null = null;
      let running = false; // a generator subprocess is in flight
      let pending = false; // an edit arrived mid-run; coalesce into one re-run after it
      // chokidar replays an `add` for every existing file when we start watching a populated
      // tree; swallow that initial burst so merely starting the dev server doesn't regenerate.
      let warm = false;
      setTimeout(() => {
        warm = true;
      }, 400);

      const regenerate = () => {
        if (running) {
          pending = true;
          return;
        }
        running = true;
        let stderr = '';
        const child = spawn(process.execPath, [GENERATOR], { cwd: REPO_ROOT });
        child.stderr?.on('data', (d) => {
          stderr += d;
        });
        child.on('error', (e) => {
          running = false;
          log(`could not run build-packages-registry — ${e.message}`);
        });
        child.on('close', (code) => {
          running = false;
          if (code === 0) log('packages registry regenerated → reloading');
          else log(`build-packages-registry exited ${code}${stderr ? `\n${stderr.trim()}` : ''}`);
          if (pending) {
            pending = false;
            regenerate();
          }
        });
      };

      const onChange = (file: string) => {
        // Triggers: any packages/<id>/package.json in the monorepo, or a consumer repo's root
        // package.json — the exact inputs the registry derives from. (CLAUDE.md drift is
        // re-derived on the same run; a CLAUDE.md edit still needs a manual regenerate.)
        const isMonoManifest =
          file.endsWith('/package.json') && file.startsWith(`${MONO_PACKAGES}/`);
        const isConsumerManifest = CONSUMER_MANIFESTS.includes(file);
        if (!warm || !(isMonoManifest || isConsumerManifest)) return;
        if (debounce) clearTimeout(debounce);
        debounce = setTimeout(regenerate, 120);
      };

      server.watcher.add(MONO_PACKAGES);
      for (const m of CONSUMER_MANIFESTS) server.watcher.add(m);
      for (const ev of ['add', 'change', 'unlink'] as const) server.watcher.on(ev, onChange);
      log('watching packages/*/package.json + consumer manifests — edits regenerate packages.json');
    },
  };
}

// ── Live labs status (dev only) ───────────────────────────────────────────────────────
// livePackages' sibling for the Tools lens: the app inlines previews/dashboards/labs-status.json
// (src/labs.ts), so the dev server already reloads when that JSON changes; this plugin
// regenerates it whenever the labs repo does — a Studio save (places/*.rbxl), the serialized
// trees, */default.project.json, rokit.toml, or git state (the commit that flips
// syncback-due → in-sync and dirty → clean).
//
// It watches with a plugin-local recursive fs.watch (FSEvents-backed on darwin), NOT
// server.watcher: Vite's chokidar hard-ignores **/.git/** and the ignored option only appends,
// so commit-driven refreshes could never arrive through it. fs.watch also replays no initial
// add-burst, so livePackages' warm guard is unnecessary here. Under .git/ only HEAD,
// packed-refs, and refs/** count — .git/index is excluded because the probe's own `git status`
// opportunistically refreshes it, which would self-trigger a regenerate loop. The probe stamps
// `built` every run, so each trigger reloads the page (StudioNow remounts into its "checking…"
// state). Generator self-edits are not watched, same as livePackages. Read-only observation of
// external-locations; the probe writes only previews/dashboards/. Linux caveat: recursive
// fs.watch throws there — caught, logged, and the plugin degrades to manual probe runs.
function liveLabs(): Plugin {
  const CODE_ROOT = resolve(REPO_ROOT, 'external-locations/code');
  const LABS_REAL = real(resolve(CODE_ROOT, 'roblox-labs'));
  const MONO_ROKIT = real(resolve(CODE_ROOT, 'roblox-packages-mono/rokit.toml'));
  const GENERATOR = resolve(REPO_ROOT, 'tools/build-labs-status.mjs');

  // Git STATE only under .git/; in the working tree everything feeds the probe (dirty count,
  // census, mtimes) except editor/Studio noise like the places/*.rbxl.lock files.
  const relevant = (rel: string): boolean => {
    const p = rel.split('\\').join('/');
    if (p === '.git' || p.startsWith('.git/')) {
      return p === '.git/HEAD' || p === '.git/packed-refs' || p.startsWith('.git/refs/');
    }
    const base = p.split('/').pop() ?? p;
    return !(p.endsWith('.lock') || p.endsWith('.tmp') || p.endsWith('~') || base === '.DS_Store');
  };

  return {
    name: 'rds:live-labs',
    apply: 'serve',
    configureServer(server) {
      const log = (msg: string) => server.config.logger.info(`[live-labs] ${msg}`, { timestamp: true });
      let debounce: ReturnType<typeof setTimeout> | null = null;
      let running = false; // a probe subprocess is in flight
      let pending = false; // an edit arrived mid-run; coalesce into one re-run after it

      const regenerate = () => {
        if (running) {
          pending = true;
          return;
        }
        running = true;
        let stderr = '';
        const child = spawn(process.execPath, [GENERATOR], { cwd: REPO_ROOT });
        child.stderr?.on('data', (d) => {
          stderr += d;
        });
        child.on('error', (e) => {
          running = false;
          log(`could not run build-labs-status — ${e.message}`);
        });
        child.on('close', (code) => {
          running = false;
          if (code === 0) log('labs status regenerated → reloading');
          else log(`build-labs-status exited ${code}${stderr ? `\n${stderr.trim()}` : ''}`);
          if (pending) {
            pending = false;
            regenerate();
          }
        });
      };

      const schedule = () => {
        if (debounce) clearTimeout(debounce);
        debounce = setTimeout(regenerate, 120);
      };

      let fsw: FSWatcher | undefined;
      try {
        fsw = watch(LABS_REAL, { recursive: true }, (_event, filename) => {
          // null filename → the platform couldn't say what changed; schedule conservatively.
          if (filename === null || relevant(filename)) schedule();
        });
        fsw.on('error', (e) => log(`labs watcher error — ${e.message}`));
        server.httpServer?.once('close', () => fsw?.close());
        log(`watching ${LABS_REAL} — lab edits, saves, and commits regenerate labs-status.json`);
      } catch (e) {
        log(
          `labs repo not watchable (${(e as Error).message}) — run node tools/build-labs-status.mjs manually`,
        );
      }

      // The mono rokit pin is a plain file outside any .git, so chokidar handles it; listening
      // to 'change' only means chokidar's initial add replay can't fire it (no warm guard).
      server.watcher.add(MONO_ROKIT);
      server.watcher.on('change', (file) => {
        if (file === MONO_ROKIT) schedule();
      });
    },
  };
}

// The Trembus packages (@trembus/ui · @trembus/viz · their transitive @trembus/tokens) are
// installed from the npm registry — no aliases needed. `dedupe` still pins a single React
// instance so a dependency can't pull a second copy (the null-dispatcher useState crash).
export default defineConfig({
  // Relative base so the built bundle serves from a subfolder (previews/app/) under the static
  // previews site — every asset/chunk URL resolves relative to index.html, mount-point-agnostic.
  base: './',
  plugins: [react(), livePackages(), liveLabs()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: PORT,
    // Allow the dev server to read the emitted contracts in REPO_ROOT/previews (outside the app root).
    fs: { allow: [REPO_ROOT] },
  },
  preview: { port: PORT },
  // Build the self-contained SPA straight into the previews site (previews/app/) so a plain
  // `pnpm build` refreshes the launchable static bundle. outDir is outside the app root, so
  // emptyOutDir must be explicit.
  build: { target: 'es2022', outDir: resolve(REPO_ROOT, 'previews/app'), emptyOutDir: true },
});
