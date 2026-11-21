import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import {
  createDeveloperSculpture,
  type DeveloperSculptureHandle,
  type SculptureFinish,
} from '../three/createDeveloperSculpture';

type CameraPreset = 'hero' | 'top' | 'close';

const CAMERA_PRESETS: Record<
  CameraPreset,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  hero: { pos: [4.6, 2.75, 5.1], target: [0, 1.55, 0] },
  top: { pos: [0.4, 6.2, 2.6], target: [0, 1.45, 0] },
  close: { pos: [2.6, 2.2, 2.9], target: [0, 1.85, 0] },
};

// Module-scope pre-allocated scratch vectors (zero GC in render loop)
const _camGoalPos = new THREE.Vector3();
const _camGoalTarget = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return true;
  const gl = document.createElement('canvas').getContext('webgl2');
  if (!gl) return true;
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
  const gpu = String(gl.getParameter(param));
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
}

interface ThreeHeroSceneProps {
  className?: string;
}

export function ThreeHeroScene({ className = '' }: ThreeHeroSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sculptureRef = useRef<DeveloperSculptureHandle | null>(null);
  const explodeRef = useRef<number>(0);
  const presetGoalRef = useRef<CameraPreset | null>(null);

  const [finish, setFinish] = useState<SculptureFinish>('aurora');
  const [activePreset, setActivePreset] = useState<CameraPreset>('hero');
  const [explode, setExplode] = useState<number>(0);
  const [dockOpen, setDockOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Sync finish & explode into mutable refs without re-creating WebGL context
  useEffect(() => {
    sculptureRef.current?.setFinish(finish);
  }, [finish]);

  useEffect(() => {
    explodeRef.current = explode;
  }, [explode]);

  // Keyboard shortcut H to toggle dock in fullscreen studio mode
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (
        e.key.toLowerCase() === 'h' &&
        isFullscreen &&
        !(e.target instanceof HTMLInputElement)
      ) {
        setDockOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  // Trigger resize calculation when fullscreen toggles
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 30);
    return () => window.clearTimeout(id);
  }, [isFullscreen]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 260);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070d);
    scene.fog = new THREE.FogExp2(0x06070d, 0.052);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    camera.position.set(...CAMERA_PRESETS.hero.pos);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Mandatory RoomEnvironment reflections on every device
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // Balanced 3-Point Warm/Cool Studio Rig (<= 3 shadow casters)
    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x0b1020, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 1.9);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 22;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa78bfa, 1.15);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Ground reflection stage plane
    const floorGeo = new THREE.CircleGeometry(14, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x080b14,
      roughness: 0.72,
      metalness: 0.25,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.02;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // Build 10-part Procedural Composite Sculpture
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const sculpture = createDeveloperSculpture(isSoftwareGl, maxAnisotropy);
    sculptureRef.current = sculpture;
    scene.add(sculpture.root);

    // OrbitControls with exponential damping on GPU
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.hero.target);
    controls.enablePan = false;
    controls.minDistance = 2.6;
    controls.maxDistance = 10.5;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.update();

    const cancelPreset = () => {
      presetGoalRef.current = null;
    };
    controls.addEventListener('start', cancelPreset);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // ResizeObserver for crisp container fitting
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = Math.max(mountRef.current.clientWidth, 260);
      const h = Math.max(mountRef.current.clientHeight, 220);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Continuous paced render loop (afterDraw fenceSync on software WebGL)
    let disposed = false;
    let frameId = 0;
    const startMs = performance.now();
    let prevMs = startMs;

    function afterDraw(cb: () => void) {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const nowMs = performance.now();
      const delta = Math.min((nowMs - prevMs) / 1000, 0.1);
      prevMs = nowMs;
      const elapsed = (nowMs - startMs) / 1000;

      sculpture.update(elapsed, delta, explodeRef.current);

      // Smooth damped camera preset glide
      if (presetGoalRef.current) {
        const cfg = CAMERA_PRESETS[presetGoalRef.current];
        _camGoalPos.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
        _camGoalTarget.set(cfg.target[0], cfg.target[1], cfg.target[2]);
        const alpha = 1 - Math.exp(-5.5 * delta);
        camera.position.lerp(_camGoalPos, alpha);
        controls.target.lerp(_camGoalTarget, alpha);
        if (
          camera.position.distanceTo(_camGoalPos) < 0.03 &&
          controls.target.distanceTo(_camGoalTarget) < 0.03
        ) {
          presetGoalRef.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.removeEventListener('start', cancelPreset);
      controls.dispose();
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      sculpture.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      sculptureRef.current = null;
    };
  }, []);

  function selectPreset(preset: CameraPreset) {
    setActivePreset(preset);
    presetGoalRef.current = preset;
  }

  function handleReset() {
    setFinish('aurora');
    setExplode(0);
    selectPreset('hero');
  }

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#06070D]'
          : `relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#06070D] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95)] ${className}`
      }
    >
      {/* Isolated WebGL Mount Container — zero sibling blur overlays */}
      <div
        ref={mountRef}
        aria-label="Interactive 3D orbital neural core sculpture"
        className={isFullscreen ? 'h-screen w-screen cursor-grab active:cursor-grabbing' : 'h-[310px] w-full cursor-grab active:cursor-grabbing sm:h-[360px]'}
      />

      {/* Minimal Top Spec Label (solid rgba surface, no backdrop-filter over WebGL) */}
      <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0B0F1A]/90 px-2.5 py-1">
        <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-sky-300 uppercase">
          3D Artifact
        </span>
        <span className="hidden font-mono text-[10px] text-slate-400 sm:inline">
          · Drag to orbit
        </span>
      </div>

      {/* Expand / Collapse Fullscreen Studio Button */}
      <button
        type="button"
        onClick={() => {
          setIsFullscreen((prev) => {
            const next = !prev;
            setDockOpen(next);
            return next;
          });
        }}
        aria-label={isFullscreen ? 'Exit fullscreen 3D studio' : 'Expand 3D studio fullscreen'}
        className="absolute top-3 right-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/15 bg-[#0B0F1A]/92 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-slate-200 transition-colors hover:border-sky-400/50 hover:text-sky-300"
      >
        {isFullscreen ? (
          <>
            <Minimize2 className="h-3.5 w-3.5" />
            <span>Exit</span>
          </>
        ) : (
          <>
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Expand</span>
          </>
        )}
      </button>

      {/* Unified Collapsible Bottom Control Dock (solid rgba, NO backdrop-blur over WebGL) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex flex-col items-center px-3">
        <button
          type="button"
          onClick={() => setDockOpen((prev) => !prev)}
          className="pointer-events-auto mb-1.5 inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/15 bg-[#0B0F1A]/92 px-3 py-1 font-mono text-[10px] font-medium text-slate-300 transition-colors hover:border-sky-400/45 hover:text-white"
        >
          {dockOpen ? (
            <>
              <ChevronDown className="h-3 w-3" />
              <span>Hide Controls</span>
            </>
          ) : (
            <>
              <ChevronUp className="h-3 w-3" />
              <span>3D Controls</span>
            </>
          )}
        </button>

        {dockOpen && (
          <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-xl border border-white/15 bg-[#0B0F1A]/95 px-3.5 py-2 shadow-xl">
            {/* Explode Assembly Slider */}
            <label className="flex items-center gap-2 font-mono text-[10px] text-slate-300">
              <span>Explode</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={explode}
                onChange={(e) => setExplode(parseFloat(e.target.value))}
                aria-label="Explode 3D sculpture rings"
                className="h-1.5 w-20 cursor-pointer accent-sky-400"
              />
            </label>

            <span className="hidden h-3.5 w-px bg-white/15 sm:inline-block" />

            {/* Finish Swatches */}
            <div className="flex items-center gap-1.5">
              {(
                [
                  { id: 'aurora', label: 'Aurora', swatch: 'bg-violet-400' },
                  { id: 'cobalt', label: 'Cobalt', swatch: 'bg-sky-400' },
                  { id: 'emerald', label: 'Emerald', swatch: 'bg-emerald-400' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFinish(item.id)}
                  className={`inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] transition-colors ${
                    finish === item.id
                      ? 'bg-white/15 font-semibold text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${item.swatch}`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <span className="hidden h-3.5 w-px bg-white/15 sm:inline-block" />

            {/* Camera Views */}
            <div className="flex items-center gap-1">
              {(['hero', 'top', 'close'] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => selectPreset(preset)}
                  className={`cursor-pointer rounded-md px-2 py-1 font-mono text-[10px] capitalize transition-colors ${
                    activePreset === preset
                      ? 'bg-sky-400/20 font-semibold text-sky-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
              <button
                type="button"
                onClick={handleReset}
                title="Reset 3D view"
                aria-label="Reset 3D view"
                className="ml-0.5 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
