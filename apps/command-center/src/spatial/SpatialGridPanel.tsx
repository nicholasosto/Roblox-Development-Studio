import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Badge, Button, Callout, Card, Input, Switch, Toolbar } from '@trembus/ui';
import {
  defaultGridSpecLoad,
  MAX_GRID_SPEC_BYTES,
  parseGridSpecText,
  type GridSpec,
} from './gridSpec';
import {
  createSpatialScene,
  SPATIAL_LAYER_KEYS,
  type SpatialLayerKey,
  type SpatialAppearanceState,
  type SpatialSceneController,
  type SpatialSelection,
  type SpatialViewMode,
} from './spatialScene';

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

function initialAppearanceState(spec: GridSpec): SpatialAppearanceState {
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

function SpatialGridWorkspace({ initialSpec }: { initialSpec: GridSpec }) {
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
  const [status, setStatus] = useState(
    'Measured X/Z draft ready · no Studio or promotion state implied',
  );

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

  const replaceSpec = (nextSpec: GridSpec, source: string): void => {
    const controller = controllerRef.current;
    if (!controller) throw new Error('The 3D scene is not ready yet');
    controller.replaceSpec(nextSpec);
    setSpec(nextSpec);
    canvasRef.current?.setAttribute(
      'aria-label',
      `${nextSpec.title}, 3D X/Z preview. ${studs(nextSpec.size[0])} by ${studs(nextSpec.size[1])} studs. North is ${nextSpec.north}. Layer names and dimensions are listed beside this preview.`,
    );
    setSelection(null);
    setSourceLabel(source);
    setStatus(`${nextSpec.title} loaded locally · nothing was uploaded or persisted`);
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
      const nextSpec = parseGridSpecText(text, file.size);
      replaceSpec(nextSpec, `Local file · ${file.name}`);
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
      replaceSpec(initialSpec, 'Bundled measured draft');
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

  const promotionEntries = Object.entries(spec.promotionGates);
  const completedGates = promotionEntries.filter(([, complete]) => complete).length;
  const innerSidewalkWidth = spec.hex.innerA - spec.hex.coreA;
  const roadWidth = spec.hex.roadOuterA - spec.hex.innerA;
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

      <dl className="cc-spatial__metrics" aria-label="Measured dimensions">
        <div>
          <dt>Measured view</dt>
          <dd>
            {studs(spec.size[0])} × {studs(spec.size[1])} studs
          </dd>
        </div>
        <div>
          <dt>Core</dt>
          <dd>{studs(spec.hex.coreA * 2)} studs flat-to-flat</dd>
        </div>
        <div>
          <dt>Ring road</dt>
          <dd>{studs(roadWidth)} studs edge-normal</dd>
        </div>
        <div>
          <dt>Sidewalk</dt>
          <dd>{studs(innerSidewalkWidth)} studs per band</dd>
        </div>
        <div>
          <dt>Approach</dt>
          <dd>
            {studs(spec.approaches.roadWidth)} road +{' '}
            {studs(spec.approaches.sidewalkWidth)} each side
          </dd>
        </div>
      </dl>

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
              <p>Separates layers visually. It does not define Roblox height.</p>
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

      <Callout tone="warning" title="Measured footprint; illustrative height">
        Y extrusion is a readability aid only. This lens does not import, save, publish, upload,
        register, or commit anything in Roblox Studio. Appearance maps are viewer-only `_BLK`
        diagnostics and do not imply Roblox asset IDs or Studio materials.{' '}
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
