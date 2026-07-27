import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Badge, Button, Callout, Card, Input, Switch, Toolbar } from '@trembus/ui';
import { defaultGridSpecLoad, MAX_GRID_SPEC_BYTES, validateGridSpec } from './gridSpec';
import { looksLikeBuildManifest, validateBuildManifest, type ManifestModel } from './buildManifest';
import {
  loadableSpecs,
  identityMismatches,
  specDocument,
  specSidecar,
  spatialSpecs,
  spatialSpecCounts,
} from './specRegistry';
import {
  anchorLabel,
  anchorOptions,
  parseAnnotationsText,
  parseAnnotationsValue,
  resolvableAnchors,
  serializeAnnotations,
  sidecarNameForTitle,
  sidecarPathFor,
  type ReviewNote,
} from './annotations';
import {
  createSpatialScene,
  SPATIAL_LAYER_KEYS,
  type SpatialLayerKey,
  type SpatialAppearanceState,
  type SpatialModel,
  type SpatialSceneController,
  type SpatialSelection,
  type SpatialViewMode,
} from './spatialScene';

/**
 * Either format, already parsed. The manifest is tried first when it declares assemblies, so a
 * build manifest never fails with a confusing "hex must be a JSON object" from the grid reader.
 */
function readSpatialValue(value: unknown): SpatialModel {
  return looksLikeBuildManifest(value) ? validateBuildManifest(value) : validateGridSpec(value);
}

/** The local-file path: size-capped, JSON-parsed, then dispatched by format. */
function parseSpatialDocument(text: string, byteLength: number): SpatialModel {
  if (byteLength > MAX_GRID_SPEC_BYTES) {
    throw new Error('Spatial document exceeds the 2 MiB local-file limit');
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON');
  }
  return readSpatialValue(parsed);
}

const LAYER_META: Record<
  SpatialLayerKey,
  { label: string; detail: string; tone: string }
> = {
  grid: { label: 'Unit grid', detail: '4 / 16 / 64 studs', tone: 'grid' },
  core: { label: 'City core', detail: 'flat-top hex', tone: 'core' },
  sidewalks: { label: 'Sidewalk rings', detail: 'inner + outer', tone: 'sidewalk' },
  road: { label: 'Ring road', detail: 'two-lane band', tone: 'road' },
  approaches: { label: 'Six approaches', detail: 'road + walks', tone: 'approach' },
  annotations: { label: 'Plan marks', detail: 'centerlines + crossings', tone: 'annotation' },
  envelope: { label: 'Declared envelope', detail: 'build bounds', tone: 'annotation' },
  assemblies: { label: 'Assembly layers', detail: 'envelope precision', tone: 'approach' },
};

const DEFAULT_LAYERS = Object.fromEntries(
  SPATIAL_LAYER_KEYS.map((key) => [key, true]),
) as Record<SpatialLayerKey, boolean>;

function studs(value: number): string {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'The grid spec could not be loaded';
}

/** The registry path whose inlined document IS this model's raw input — a module-identity join. */
function registryPathForModel(model: SpatialModel): string | undefined {
  return loadableSpecs.find((entry) => specDocument(entry.path) === model.raw)?.path;
}

function isRegistryKey(specKey: string): boolean {
  return !specKey.startsWith('local:') && !specKey.startsWith('bundled:');
}

/** The review-notes working set for one spec, plus where it came from and what parsing skipped. */
interface NotesBundle {
  notes: ReviewNote[];
  /** JSON of the notes as loaded, so "unexported changes" is a comparison, not a guess. */
  baseline: string;
  source: string;
  warnings: string[];
}

function emptyNotes(source: string): NotesBundle {
  return { notes: [], baseline: '[]', source, warnings: [] };
}

function notesForKey(specKey: string): NotesBundle {
  if (!isRegistryKey(specKey)) {
    return emptyNotes('No sidecar · notes start empty for locally picked files');
  }
  const sidecar = specSidecar(specKey);
  if (sidecar === undefined) {
    const entry = spatialSpecs.find((candidate) => candidate.path === specKey);
    if (entry?.annotations) {
      // The glob-count lesson: the registry claims a sidecar this bundle never inlined.
      return {
        ...emptyNotes('No sidecar in this build'),
        warnings: [
          `The registry lists ${entry.annotations.path}, but this build did not inline it — regenerate the registry and rebuild the app`,
        ],
      };
    }
    return emptyNotes('No sidecar beside this spec yet — exporting creates one');
  }
  const parsed = parseAnnotationsValue(sidecar);
  return {
    notes: parsed.notes,
    baseline: JSON.stringify(parsed.notes),
    source: `Sidecar · ${sidecarPathFor(specKey)}`,
    warnings: parsed.warnings,
  };
}

function initialAppearanceState(spec: SpatialModel): SpatialAppearanceState {
  if (spec.kind === 'manifest') {
    return {
      status: 'fallback',
      message:
        'Build manifests declare material tokens, not a preview appearance; using theme materials.',
      requestedMaps: 0,
      loadedMaps: 0,
      fallbackMaps: 0,
    };
  }
  if (spec.appearance) {
    return {
      status: 'loading',
      message: 'Preparing the declared bundled preview appearance…',
      requestedMaps: 0,
      loadedMaps: 0,
      fallbackMaps: 0,
    };
  }
  return {
    status: spec.appearanceWarning ? 'warning' : 'fallback',
    message:
      spec.appearanceWarning ??
      'No preview appearance is declared; using theme fallback materials.',
    requestedMaps: 0,
    loadedMaps: 0,
    fallbackMaps: 0,
  };
}

function SpatialUnavailable({ message }: { message: string }) {
  return (
    <section className="cc-section cc-spatial">
      <Callout tone="danger" title="Spatial grid unavailable">
        The bundled measured draft failed validation: {message}. The other Command Center lenses
        remain unaffected.
      </Callout>
    </section>
  );
}

/** The manifest's non-geometric review payload — parsed since the first reader, surfaced here. */
function ManifestDetails({ spec }: { spec: ManifestModel }) {
  const budgetRows = [
    { label: 'Baseparts', value: spec.budgets.baseparts },
    { label: 'Active local lights', value: spec.budgets.localLights },
    { label: 'Shadow-casting lights', value: spec.budgets.shadowCasters },
    { label: 'Particle emitters', value: spec.budgets.particleEmitters },
    { label: 'Scripts in root', value: spec.budgets.scripts },
  ].filter((row) => row.value !== undefined);
  return (
    <section className="cc-spatial__intent" aria-label="Declared build intent">
      <p className="cc-spatial__intent-head">
        <strong>Build intent</strong>
        <span>
          declared by this manifest — the review content its geometry cannot carry
        </span>
      </p>
      <div className="cc-spatial__intent-grid">
        <article>
          <h4>Material tokens · {spec.materialTokens.length}</h4>
          {spec.materialTokens.length ? (
            <ul className="cc-spatial__tokens">
              {spec.materialTokens.map((token) => (
                <li key={token.token}>
                  <span
                    className="cc-spatial__token-swatch"
                    style={token.fallbackColor ? { background: token.fallbackColor } : undefined}
                    data-declared={Boolean(token.fallbackColor)}
                    aria-hidden="true"
                  />
                  <code>{token.token}</code>
                  <span className="cc-spatial__token-material">{token.fallbackMaterial}</span>
                  <small>{token.candidate ?? 'no candidate texture'}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cc-spatial__intent-empty">none declared</p>
          )}
        </article>
        <article>
          <h4>Budget caps</h4>
          {budgetRows.length ? (
            <dl className="cc-spatial__caps">
              {budgetRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="cc-spatial__intent-empty">none declared</p>
          )}
        </article>
        <article>
          <h4>QA views · {spec.qaViews.length}</h4>
          {spec.qaViews.length ? (
            <ul className="cc-spatial__qa">
              {spec.qaViews.map((view) => (
                <li key={view}>
                  <Badge tone="info" variant="outline" size="sm">
                    {view}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cc-spatial__intent-empty">none declared</p>
          )}
        </article>
        <article>
          <h4>Preserve paths · {spec.preserve.length}</h4>
          {spec.preserve.length ? (
            <ul className="cc-spatial__preserve">
              {spec.preserve.map((path) => (
                <li key={path}>
                  <code>{path}</code>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cc-spatial__intent-empty">none declared</p>
          )}
        </article>
      </div>
    </section>
  );
}

function SpatialGridWorkspace({ initialSpec }: { initialSpec: SpatialModel }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpatialSceneController | null>(null);
  const [spec, setSpec] = useState(initialSpec);
  const [layers, setLayers] =
    useState<Record<SpatialLayerKey, boolean>>(DEFAULT_LAYERS);
  const [viewMode, setViewMode] = useState<SpatialViewMode>('perspective');
  const [yScale, setYScale] = useState(4);
  const [selection, setSelection] = useState<SpatialSelection | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneError, setSceneError] = useState<string>();
  const [fileError, setFileError] = useState<string>();
  const [appearanceState, setAppearanceState] = useState<SpatialAppearanceState>(() =>
    initialAppearanceState(initialSpec),
  );
  const [sourceLabel, setSourceLabel] = useState('Bundled measured draft');
  // Which document the notes belong to. The bundled draft joins back to its registry entry by
  // module identity, so its sidecar (and button highlight) work from the very first render.
  const [initialKey] = useState(() => registryPathForModel(initialSpec) ?? 'bundled:initial');
  const [activeSpecPath, setActiveSpecPath] = useState<string | undefined>(
    isRegistryKey(initialKey) ? initialKey : undefined,
  );
  const [status, setStatus] = useState(
    'Measured X/Z draft ready · no Studio or promotion state implied',
  );
  const [noteState, setNoteState] = useState<NotesBundle>(() => notesForKey(initialKey));
  const specKeyRef = useRef(initialKey);
  const noteStashRef = useRef(new Map<string, NotesBundle>());
  const [composeText, setComposeText] = useState('');
  const [composeAnchor, setComposeAnchor] = useState('document');
  const [noteAuthor, setNoteAuthor] = useState('');

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // StrictMode mounts, cleans up, and immediately mounts effects again in development. A canvas
    // can keep a disposed/lost WebGL context across that cycle, so each scene owns a fresh element.
    const canvas = document.createElement('canvas');
    canvas.className = 'cc-spatial__canvas';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute(
      'aria-label',
      `${initialSpec.title}, 3D X/Z preview. ${studs(initialSpec.size[0])} by ${studs(initialSpec.size[1])} studs. North is ${initialSpec.north}. Layer names and dimensions are listed beside this preview.`,
    );
    stage.prepend(canvas);
    canvasRef.current = canvas;

    try {
      const controller = createSpatialScene(canvas, stage, initialSpec, {
        onSelection: setSelection,
        onError: (message) => setSceneError(message ?? undefined),
        onAppearanceState: setAppearanceState,
      });
      controllerRef.current = controller;
      setSceneReady(true);
      setSceneError(undefined);
      return () => {
        controllerRef.current = null;
        canvasRef.current = null;
        controller.dispose();
        canvas.remove();
      };
    } catch (error) {
      canvasRef.current = null;
      canvas.remove();
      setSceneReady(false);
      setSceneError(errorMessage(error));
      return;
    }
  }, [initialSpec]);

  const setLayer = (key: SpatialLayerKey, visible: boolean): void => {
    setLayers((current) => ({ ...current, [key]: visible }));
    controllerRef.current?.setLayerVisible(key, visible);
  };

  const setView = (mode: SpatialViewMode): void => {
    setViewMode(mode);
    controllerRef.current?.setView(mode);
    setStatus(
      mode === 'top'
        ? 'Orthographic top view · north is −Z · X/Z scale remains undistorted'
        : 'Perspective orbit · drag to rotate, secondary-drag to pan, scroll to zoom',
    );
  };

  const changeYScale = (value: number): void => {
    setYScale(value);
    controllerRef.current?.setYScale(value);
  };

  const replaceSpec = (nextSpec: SpatialModel, source: string, specKey: string): void => {
    const controller = controllerRef.current;
    if (!controller) throw new Error('The 3D scene is not ready yet');
    controller.replaceSpec(nextSpec);
    setSpec(nextSpec);
    // Notes follow their spec: stash the outgoing set, restore a stashed set on the way back,
    // otherwise start from the spec's bundled sidecar. Nothing here persists past the session.
    if (specKey !== specKeyRef.current) {
      noteStashRef.current.set(specKeyRef.current, noteState);
      specKeyRef.current = specKey;
      setNoteState(noteStashRef.current.get(specKey) ?? notesForKey(specKey));
      setComposeAnchor('document');
      setComposeText('');
    }
    setActiveSpecPath(isRegistryKey(specKey) ? specKey : undefined);
    canvasRef.current?.setAttribute(
      'aria-label',
      `${nextSpec.title}, 3D X/Z preview. ${studs(nextSpec.size[0])} by ${studs(nextSpec.size[1])} studs. North is ${nextSpec.north}. Layer names and dimensions are listed beside this preview.`,
    );
    // A manifest declares real stud heights spanning tens of studs, so exaggerating them only
    // pushes the stack out of frame. The slider exists for grid specs, whose elevations are a
    // couple of studs against a several-hundred-stud plan.
    const nextYScale = nextSpec.kind === 'manifest' ? 1 : 4;
    setYScale(nextYScale);
    controller.setYScale(nextYScale);
    setSelection(null);
    setSourceLabel(source);
    setStatus(`${nextSpec.title} loaded locally · nothing was uploaded or persisted`);
  };

  // The registry half of "load specs and view saved specs easy": contents are inlined at build
  // time, so opening one is a parse, not a fetch — and works the same in the static bundle.
  const openSavedSpec = (path: string, id: string): void => {
    try {
      const document = specDocument(path);
      if (document === undefined) {
        throw new Error(`${id} is listed in the registry but was not inlined into this build`);
      }
      replaceSpec(readSpatialValue(document), `Saved spec · ${id}`, path);
      setFileError(undefined);
    } catch (error) {
      setFileError(errorMessage(error));
      setStatus('Saved spec rejected · the last valid scene is still active');
    }
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    try {
      if (file.size > MAX_GRID_SPEC_BYTES) {
        throw new Error('Grid spec exceeds the 2 MiB local-file limit');
      }
      const text = await file.text();
      const nextSpec = parseSpatialDocument(text, file.size);
      replaceSpec(nextSpec, `Local file · ${file.name}`, `local:${file.name}`);
      setFileError(undefined);
    } catch (error) {
      setFileError(errorMessage(error));
      setStatus('Local file rejected · the last valid scene is still active');
    } finally {
      input.value = '';
    }
  };

  const resetDraft = (): void => {
    try {
      replaceSpec(initialSpec, 'Bundled measured draft', initialKey);
      setLayers(DEFAULT_LAYERS);
      for (const key of SPATIAL_LAYER_KEYS) {
        controllerRef.current?.setLayerVisible(key, true);
      }
      setViewMode('perspective');
      controllerRef.current?.setView('perspective');
      setYScale(4);
      controllerRef.current?.setYScale(4);
      setFileError(undefined);
      setStatus('Bundled measured X/Z draft restored · no promotion state implied');
    } catch (error) {
      setSceneError(errorMessage(error));
    }
  };

  const anchors = useMemo(() => anchorOptions(spec), [spec]);
  const anchorSet = useMemo(() => resolvableAnchors(spec), [spec]);

  // Clicking geometry re-aims the compose anchor; the reviewer can still override it by hand.
  useEffect(() => {
    if (selection && anchorSet.has(selection.anchor)) setComposeAnchor(selection.anchor);
  }, [selection, anchorSet]);

  const addNote = (): void => {
    const text = composeText.trim();
    if (!text) return;
    const note: ReviewNote = {
      id: `note-${Date.now().toString(36)}`,
      anchor: composeAnchor,
      status: 'open',
      text,
      ...(noteAuthor.trim() ? { author: noteAuthor.trim() } : {}),
      created: new Date().toISOString().slice(0, 10),
    };
    setNoteState((current) => ({ ...current, notes: [...current.notes, note] }));
    setComposeText('');
  };

  const toggleNote = (id: string): void => {
    setNoteState((current) => ({
      ...current,
      notes: current.notes.map((note) =>
        note.id === id ? { ...note, status: note.status === 'open' ? 'resolved' : 'open' } : note,
      ),
    }));
  };

  const removeNote = (id: string): void => {
    setNoteState((current) => ({
      ...current,
      notes: current.notes.filter((note) => note.id !== id),
    }));
  };

  const exportNotes = (): void => {
    const specKey = specKeyRef.current;
    const registryKey = isRegistryKey(specKey);
    const fileName = registryKey
      ? (sidecarPathFor(specKey).split('/').pop() ?? 'annotations.json')
      : sidecarNameForTitle(spec.title);
    const blob = new Blob([serializeAnnotations(registryKey ? specKey : spec.title, noteState.notes)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    setNoteState((current) => ({ ...current, baseline: JSON.stringify(current.notes) }));
    setStatus(`Notes exported as ${fileName} · commit it beside the spec — this lens persists nothing`);
  };

  const onSidecarFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    const parsed = parseAnnotationsText(await file.text(), file.size);
    const warnings = [...parsed.warnings];
    const specKey = specKeyRef.current;
    if (parsed.targetSpec && isRegistryKey(specKey) && parsed.targetSpec !== specKey) {
      warnings.push(`This sidecar says it annotates ${parsed.targetSpec}, not the loaded spec`);
    }
    setNoteState({
      notes: parsed.notes,
      baseline: JSON.stringify(parsed.notes),
      source: `Local sidecar · ${file.name}`,
      warnings,
    });
    input.value = '';
  };

  const openNoteCount = noteState.notes.filter((note) => note.status === 'open').length;
  const orphanedNoteCount = noteState.notes.filter((note) => !anchorSet.has(note.anchor)).length;
  const notesDirty = JSON.stringify(noteState.notes) !== noteState.baseline;

  const promotionEntries = Object.entries(spec.promotionGates);
  const completedGates = promotionEntries.filter(([, complete]) => complete).length;
  const elevationDeclared = spec.kind === 'grid' && spec.elevation != null;
  // Each format gets the metrics it can actually state. A manifest has no bands or approaches;
  // what it does declare is an envelope, a layer stack, and a part budget.
  const metrics: { label: string; value: string }[] =
    spec.kind === 'grid'
      ? [
          { label: 'Measured view', value: `${studs(spec.size[0])} × ${studs(spec.size[1])} studs` },
          { label: 'Core', value: `${studs(spec.hex.coreA * 2)} studs flat-to-flat` },
          { label: 'Ring road', value: `${studs(spec.hex.roadOuterA - spec.hex.innerA)} studs edge-normal` },
          { label: 'Sidewalk', value: `${studs(spec.hex.innerA - spec.hex.coreA)} studs per band` },
          {
            label: 'Approach',
            value: `${studs(spec.approaches.roadWidth)} road + ${studs(spec.approaches.sidewalkWidth)} each side`,
          },
        ]
      : [
          {
            label: 'Declared envelope',
            value: `${studs(spec.envelope[0])} × ${studs(spec.envelope[1])} × ${studs(spec.envelope[2])} studs`,
          },
          { label: 'Layers', value: `${spec.layers.length} declared` },
          { label: 'Assemblies', value: `${spec.assemblyCount} across those layers` },
          {
            label: 'Vertical span',
            value: `${studs(spec.layers[0].y)} → ${studs(spec.layers[spec.layers.length - 1].y)} studs`,
          },
          {
            label: 'Part budget',
            value: spec.budgets.baseparts ? `${spec.budgets.baseparts} baseparts max` : 'not declared',
          },
        ];
  const appearanceBadge =
    appearanceState.status === 'ready'
      ? `appearance ${appearanceState.loadedMaps}/${appearanceState.requestedMaps}`
      : appearanceState.status === 'loading'
        ? 'appearance loading'
        : appearanceState.status === 'warning'
          ? 'appearance warning'
          : 'appearance fallback';
  const appearanceTone =
    appearanceState.status === 'ready'
      ? 'success'
      : appearanceState.status === 'loading'
        ? 'info'
        : appearanceState.status === 'warning'
          ? 'warning'
          : 'neutral';

  return (
    <section className="cc-section cc-spatial">
      <div className="cc-spatial__intro">
        <div className="cc-spatial__heading">
          <p className="cc-spatial__eyebrow">Spatial grid laboratory</p>
          <h2>{spec.title}</h2>
          <p>
            A live 3D reading of the measured X/Z contract. Horizontal renderer units map
            one-to-one to Roblox studs.
          </p>
        </div>
        <div className="cc-spatial__badges" aria-label="Grid status">
          <Badge tone="warning" variant="soft" dot>
            {spec.status}
          </Badge>
          <Badge tone="info" variant="outline">
            1 unit = 1 stud
          </Badge>
          <Badge tone="neutral" variant="outline">
            local only
          </Badge>
          <Badge tone={appearanceTone} variant="outline">
            {appearanceBadge}
          </Badge>
        </div>
      </div>

      <dl className="cc-spatial__metrics" aria-label="Declared dimensions">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className="cc-spatial__library" aria-label="Saved spatial specs">
        <p className="cc-spatial__library-head">
          <strong>Saved specs</strong>
          <span>
            {spatialSpecCounts.specs} found · {spatialSpecCounts.loadable} this lens can open ·
            registry, not a file picker
            {spatialSpecCounts.openNotes
              ? ` · ${spatialSpecCounts.openNotes} open review note(s) in sidecars`
              : ''}
          </span>
        </p>
        <Toolbar aria-label="Open a saved spec">
          {loadableSpecs.map((entry) => (
            <Button
              key={entry.id}
              type="button"
              size="sm"
              variant={entry.path === activeSpecPath ? 'solid' : 'outline'}
              tone={entry.path === activeSpecPath ? 'accent' : 'neutral'}
              onPress={() => openSavedSpec(entry.path, entry.id)}
            >
              {`${entry.title} · ${entry.precision === 'exact' ? 'measured' : 'envelope'}${
                entry.annotations ? ` · ${entry.annotations.notes} note(s)` : ''
              }`}
            </Button>
          ))}
        </Toolbar>
        {identityMismatches.length ? (
          <p className="cc-spatial__library-warn" role="status">
            {identityMismatches.length} portable copy/copies have drifted from their canonical spec —
            byte-identity is reported here, never enforced.
          </p>
        ) : null}
      </div>

      <div className="cc-spatial__commandbar">
        <Input
          type="file"
          accept="application/json,.json"
          label="Load another grid spec"
          description="Read locally while this lens is open; only bundled appearance keys resolve."
          error={fileError}
          onChange={(event) => void onFileChange(event)}
          containerClassName="cc-spatial__file"
        />
        <div className="cc-spatial__camera">
          <span className="cc-spatial__control-label">Camera</span>
          <Toolbar aria-label="Camera view" className="cc-spatial__camera-toolbar">
            <Toolbar.Group>
              <Toolbar.Button
                type="button"
                tone={viewMode === 'perspective' ? 'accent' : 'neutral'}
                aria-pressed={viewMode === 'perspective'}
                onClick={() => setView('perspective')}
              >
                Perspective
              </Toolbar.Button>
              <Toolbar.Button
                type="button"
                tone={viewMode === 'top' ? 'accent' : 'neutral'}
                aria-pressed={viewMode === 'top'}
                onClick={() => setView('top')}
              >
                Top · north-up
              </Toolbar.Button>
            </Toolbar.Group>
          </Toolbar>
        </div>
        <Button
          type="button"
          variant="outline"
          tone="neutral"
          size="sm"
          onPress={resetDraft}
          className="cc-spatial__reset"
        >
          Reset measured draft
        </Button>
      </div>

      <Card className="cc-spatial__card">
        <Card.Header className="cc-spatial__cardhead">
          <div>
            <span className="cc-spatial__source">{sourceLabel}</span>
            <span className="cc-spatial__revision">
              rev {spec.revision} · {spec.date}
            </span>
          </div>
          <span className="cc-spatial__authority" title={spec.authority}>
            X/Z authority · {spec.north} north
          </span>
        </Card.Header>

        <Card.Body className="cc-spatial__cardbody">
          <aside className="cc-spatial__controls" aria-label="Spatial layers">
            <fieldset>
              <legend>Layers</legend>
              {SPATIAL_LAYER_KEYS.map((key) => {
                const meta = LAYER_META[key];
                return (
                  <Switch
                    key={key}
                    id={`spatial-layer-${key}`}
                    checked={layers[key]}
                    onChange={(event) => setLayer(key, event.currentTarget.checked)}
                    label={
                      <span className="cc-spatial__switch-label">
                        <span
                          className="cc-spatial__swatch"
                          data-tone={meta.tone}
                          aria-hidden="true"
                        />
                        <span>
                          <strong>{meta.label}</strong>
                          <small>{meta.detail}</small>
                        </span>
                      </span>
                    }
                  />
                );
              })}
            </fieldset>

            <div className="cc-spatial__height">
              <label htmlFor="spatial-y-scale">
                Illustrative Y <output htmlFor="spatial-y-scale">×{yScale}</output>
              </label>
              <input
                id="spatial-y-scale"
                type="range"
                min="1"
                max="8"
                step="1"
                value={yScale}
                onChange={(event) => changeYScale(Number(event.currentTarget.value))}
              />
              <p>
                {elevationDeclared
                  ? 'Multiplies the contract’s declared elevations. ×1 is true vertical scale.'
                  : 'Separates layers visually. It does not define Roblox height.'}
              </p>
            </div>
          </aside>

          <div
            ref={stageRef}
            className="cc-spatial__stage"
            data-ready={sceneReady && !sceneError}
          >
            <div className="cc-spatial__compass" aria-hidden="true">
              <span>N · −Z</span>
              <span>+X →</span>
            </div>
            {!sceneReady && !sceneError ? (
              <div className="cc-spatial__stage-message" role="status">
                Preparing spatial renderer…
              </div>
            ) : null}
            {sceneError ? (
              <div className="cc-spatial__stage-message" role="alert">
                <strong>3D view unavailable</strong>
                <span>{sceneError}</span>
              </div>
            ) : null}
          </div>
        </Card.Body>

        <Card.Footer className="cc-spatial__cardfoot">
          <p className="cc-spatial__selection" aria-live="polite">
            <strong>{selection?.detail ?? 'Select a visible plan layer'}</strong>
            <span>
              {selection
                ? ' · horizontal renderer units remain Roblox studs'
                : ' · click geometry for its measured role'}
            </span>
          </p>
          <p className="cc-spatial__gesture">
            {viewMode === 'top'
              ? 'Drag to pan · scroll to zoom'
              : 'Drag to orbit · secondary-drag to pan · scroll to zoom'}
          </p>
        </Card.Footer>
      </Card>

      <p
        className={sceneError || fileError ? 'cc-spatial__status is-error' : 'cc-spatial__status'}
        aria-live="polite"
      >
        {status}
      </p>
      <p className="cc-spatial__status" aria-live="polite">
        Appearance · {appearanceState.message}
      </p>

      {spec.kind === 'manifest' ? <ManifestDetails spec={spec} /> : null}

      <section className="cc-spatial__notes" aria-label="Review notes">
        <div className="cc-spatial__notes-head">
          <div>
            <p className="cc-spatial__notes-title">Review notes</p>
            <p className="cc-spatial__notes-source">{noteState.source}</p>
          </div>
          <div className="cc-spatial__notes-meta">
            <Badge tone={openNoteCount ? 'warning' : 'success'} variant="soft" size="sm">
              {noteState.notes.length} note(s) · {openNoteCount} open
            </Badge>
            {orphanedNoteCount ? (
              <Badge tone="danger" variant="soft" size="sm">
                {orphanedNoteCount} orphaned
              </Badge>
            ) : null}
            {notesDirty ? (
              <Badge tone="info" variant="soft" size="sm">
                unexported changes
              </Badge>
            ) : null}
            <Button
              type="button"
              size="sm"
              variant="outline"
              tone="neutral"
              disabled={!noteState.notes.length}
              onPress={exportNotes}
            >
              Export sidecar
            </Button>
          </div>
        </div>

        {noteState.warnings.length ? (
          <ul className="cc-spatial__notes-warnings" role="status">
            {noteState.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        ) : null}

        {noteState.notes.length ? (
          <ul className="cc-spatial__notes-list">
            {noteState.notes.map((note) => {
              const orphaned = !anchorSet.has(note.anchor);
              return (
                <li key={note.id} data-status={note.status}>
                  <div className="cc-spatial__note-anchor">
                    <code>{anchorLabel(note.anchor, spec)}</code>
                    <Badge tone={note.status === 'open' ? 'warning' : 'success'} variant="outline" size="sm">
                      {note.status}
                    </Badge>
                    {orphaned ? (
                      <Badge tone="danger" variant="soft" size="sm">
                        orphaned · written against “{note.anchor}”
                      </Badge>
                    ) : null}
                  </div>
                  <p className="cc-spatial__note-text">{note.text}</p>
                  <div className="cc-spatial__note-foot">
                    <small>{[note.author, note.created].filter(Boolean).join(' · ') || 'unattributed'}</small>
                    <span>
                      <Button type="button" size="sm" variant="ghost" tone="neutral" onPress={() => toggleNote(note.id)}>
                        {note.status === 'open' ? 'Resolve' : 'Reopen'}
                      </Button>
                      <Button type="button" size="sm" variant="ghost" tone="danger" onPress={() => removeNote(note.id)}>
                        Remove
                      </Button>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="cc-spatial__notes-empty">
            No notes yet — click geometry to aim the anchor, or write against the whole document.
          </p>
        )}

        <div className="cc-spatial__compose">
          <label className="cc-spatial__compose-anchor">
            <span>Anchor</span>
            <select
              value={composeAnchor}
              onChange={(event) => setComposeAnchor(event.currentTarget.value)}
            >
              {anchors.map((option) => (
                <option key={option.anchor} value={option.anchor}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="cc-spatial__compose-text">
            <span>Note</span>
            <textarea
              rows={2}
              value={composeText}
              placeholder="What should change, stay, or be checked before the next build pass?"
              onChange={(event) => setComposeText(event.currentTarget.value)}
            />
          </label>
          <label className="cc-spatial__compose-author">
            <span>Author</span>
            <input
              type="text"
              value={noteAuthor}
              placeholder="optional"
              onChange={(event) => setNoteAuthor(event.currentTarget.value)}
            />
          </label>
          <Button
            type="button"
            size="sm"
            tone="accent"
            disabled={!composeText.trim()}
            onPress={addNote}
          >
            Add note
          </Button>
        </div>

        <Input
          type="file"
          accept="application/json,.json"
          label="Load an annotations sidecar"
          description="Replaces the notes above for this spec · read locally, never uploaded."
          onChange={(event) => void onSidecarFileChange(event)}
          containerClassName="cc-spatial__file"
        />
        <p className="cc-spatial__notes-honesty">
          Notes live in this lens session until exported — the sidecar is a download you commit
          beside the spec, where it diffs in git and can be handed to a builder.
        </p>
      </section>

      <Callout
        tone="warning"
        title={
          elevationDeclared
            ? 'Measured footprint and measured height; the Y slider still exaggerates'
            : 'Measured footprint; illustrative height'
        }
      >
        {elevationDeclared
          ? `Surface heights come from this contract's elevation block and are real studs. The Y
            slider multiplies them for readability, so nothing on screen is at true vertical scale
            unless it reads ×1.`
          : `Y extrusion is a readability aid only — this contract declares no elevations.`}{' '}
        This lens does not import, save, publish, upload, register, or commit anything in Roblox
        Studio. Appearance maps are viewer-only `_BLK` diagnostics and do not imply Roblox asset
        IDs or Studio materials.{' '}
        {promotionEntries.length
          ? `${completedGates} of ${promotionEntries.length} recorded promotion gates are complete.`
          : 'This loaded file declares no promotion gates.'}
      </Callout>
    </section>
  );
}

export default function SpatialGridPanel() {
  if (!defaultGridSpecLoad.ok) {
    return <SpatialUnavailable message={defaultGridSpecLoad.message} />;
  }
  return <SpatialGridWorkspace initialSpec={defaultGridSpecLoad.spec} />;
}
