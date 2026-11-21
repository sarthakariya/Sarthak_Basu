import * as THREE from 'three';

export type SculptureFinish = 'aurora' | 'cobalt' | 'emerald';

interface FinishPalette {
  core: number;
  coreEmissive: number;
  ringA: number;
  ringB: number;
  ringC: number;
  accent: number;
}

const FINISH_PALETTES: Record<SculptureFinish, FinishPalette> = {
  aurora: {
    core: 0x38bdf8,
    coreEmissive: 0x1d4ed8,
    ringA: 0x38bdf8,
    ringB: 0xa78bfa,
    ringC: 0x34d399,
    accent: 0xfbbf24,
  },
  cobalt: {
    core: 0x60a5fa,
    coreEmissive: 0x1e40af,
    ringA: 0x38bdf8,
    ringB: 0x818cf8,
    ringC: 0x22d3ee,
    accent: 0xe0f2fe,
  },
  emerald: {
    core: 0x34d399,
    coreEmissive: 0x065f46,
    ringA: 0x34d399,
    ringB: 0x2dd4bf,
    ringC: 0x38bdf8,
    accent: 0xfde047,
  },
};

function createDialTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;

    // Outer calibrated rings
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 232, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 192, 0, Math.PI * 2);
    ctx.stroke();

    // Precision degree ticks
    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2;
      const major = i % 6 === 0;
      const r1 = major ? 204 : 216;
      const r2 = 228;
      ctx.strokeStyle = major
        ? 'rgba(167, 139, 250, 0.85)'
        : 'rgba(148, 163, 184, 0.32)';
      ctx.lineWidth = major ? 2.5 : 1.2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
      ctx.stroke();
    }

    // Subtle cardinal crosshair
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 170, cy);
    ctx.lineTo(cx + 170, cy);
    ctx.moveTo(cx, cy - 170);
    ctx.lineTo(cx, cy + 170);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      10,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
    grad.addColorStop(0.5, 'rgba(6, 7, 13, 0.35)');
    grad.addColorStop(1, 'rgba(6, 7, 13, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export interface DeveloperSculptureHandle {
  root: THREE.Group;
  setFinish: (finish: SculptureFinish) => void;
  update: (elapsed: number, delta: number, targetExplode: number) => void;
  dispose: () => void;
}

export function createDeveloperSculpture(
  isSoftwareGl: boolean,
  maxAnisotropy: number
): DeveloperSculptureHandle {
  const root = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const palette = FINISH_PALETTES.aurora;

  // 1. Soft radial contact shadow plane seated flush at ground y = 0.004
  const shadowTex = createContactShadowTexture();
  const shadowGeo = new THREE.PlaneGeometry(5.6, 5.6);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.72,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.004;
  root.add(shadowMesh);
  disposables.push(shadowTex, shadowGeo, shadowMat);

  // 2. Bevelled Octagonal Base Plinth (ExtrudeGeometry, pivoted flush at y = 0)
  const octShape = new THREE.Shape();
  const octRadius = 1.65;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const x = Math.cos(a) * octRadius;
    const y = Math.sin(a) * octRadius;
    if (i === 0) octShape.moveTo(x, y);
    else octShape.lineTo(x, y);
  }
  octShape.closePath();

  const plinthGeo = new THREE.ExtrudeGeometry(octShape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  });
  plinthGeo.rotateX(-Math.PI / 2);
  plinthGeo.translate(0, 0.05, 0);
  const plinthMat = new THREE.MeshPhysicalMaterial({
    color: 0x111726,
    metalness: 0.82,
    roughness: 0.36,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
  });
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.castShadow = !isSoftwareGl;
  plinthMesh.receiveShadow = !isSoftwareGl;
  root.add(plinthMesh);
  disposables.push(plinthGeo, plinthMat);

  // 3. Lathe-Turned Brushed Titanium Pedestal Collar
  const lathePoints = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(1.22, 0.0),
    new THREE.Vector2(1.16, 0.09),
    new THREE.Vector2(0.95, 0.14),
    new THREE.Vector2(0.9, 0.24),
    new THREE.Vector2(0.62, 0.28),
    new THREE.Vector2(0.55, 0.18),
    new THREE.Vector2(0.0, 0.18),
  ];
  const collarGeo = new THREE.LatheGeometry(lathePoints, 48);
  const collarMat = new THREE.MeshPhysicalMaterial({
    color: 0x1f293d,
    metalness: 0.94,
    roughness: 0.18,
    anisotropy: 0.75,
  });
  const collarMesh = new THREE.Mesh(collarGeo, collarMat);
  collarMesh.position.y = 0.28;
  collarMesh.castShadow = !isSoftwareGl;
  collarMesh.receiveShadow = !isSoftwareGl;
  root.add(collarMesh);
  disposables.push(collarGeo, collarMat);

  // 4. Procedural Etched Coordinate Dial Plate (polygonOffset to prevent Z-fighting)
  const dialTex = createDialTexture(maxAnisotropy);
  const dialGeo = new THREE.CircleGeometry(1.14, 48);
  const dialMat = new THREE.MeshBasicMaterial({
    map: dialTex,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const dialMesh = new THREE.Mesh(dialGeo, dialMat);
  dialMesh.rotation.x = -Math.PI / 2;
  dialMesh.position.y = 0.345;
  root.add(dialMesh);
  disposables.push(dialTex, dialGeo, dialMat);

  // 5. Floating Sculpture Assembly Group (for vertical hover + exploded separation)
  const assemblyGroup = new THREE.Group();
  assemblyGroup.position.y = 1.92;
  root.add(assemblyGroup);

  // 5a. Inner Sapphire-Glass Faceted Core (MeshPhysicalMaterial)
  const coreGeo = new THREE.IcosahedronGeometry(0.62, 0);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: palette.core,
    emissive: palette.coreEmissive,
    emissiveIntensity: 0.42,
    metalness: 0.12,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    ior: 1.75,
    transmission: isSoftwareGl ? 0 : 0.78,
    thickness: 1.2,
    transparent: isSoftwareGl,
    opacity: isSoftwareGl ? 0.78 : 1.0,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.castShadow = !isSoftwareGl;
  assemblyGroup.add(coreMesh);
  disposables.push(coreGeo, coreMat);

  // 5b. Inner Glowing Nucleus
  const nucleusGeo = new THREE.OctahedronGeometry(0.28, 0);
  const nucleusMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: palette.ringA,
    emissiveIntensity: 1.2,
    roughness: 0.15,
    metalness: 0.4,
  });
  const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
  assemblyGroup.add(nucleusMesh);
  disposables.push(nucleusGeo, nucleusMat);

  // 5c. Milled Meridian Edge Lattice Shell
  const cageGeo = new THREE.IcosahedronGeometry(0.84, 0);
  const cageEdgesGeo = new THREE.EdgesGeometry(cageGeo, 1);
  const cageMat = new THREE.LineBasicMaterial({
    color: 0xcbd5e1,
    transparent: true,
    opacity: 0.52,
  });
  const cageLines = new THREE.LineSegments(cageEdgesGeo, cageMat);
  assemblyGroup.add(cageLines);
  disposables.push(cageGeo, cageEdgesGeo, cageMat);

  // 6, 7, 8. Three Anodized Orbital Gimbal Rings (varied metalness & roughness)
  const ringAGeo = new THREE.TorusGeometry(1.16, 0.042, 20, 96);
  const ringAMat = new THREE.MeshPhysicalMaterial({
    color: palette.ringA,
    metalness: 0.92,
    roughness: 0.16,
    clearcoat: 0.8,
  });
  const ringAMesh = new THREE.Mesh(ringAGeo, ringAMat);
  ringAMesh.rotation.set(Math.PI / 3.2, 0.3, 0);
  ringAMesh.castShadow = !isSoftwareGl;
  assemblyGroup.add(ringAMesh);
  disposables.push(ringAGeo, ringAMat);

  const ringBGeo = new THREE.TorusGeometry(1.42, 0.036, 20, 96);
  const ringBMat = new THREE.MeshPhysicalMaterial({
    color: palette.ringB,
    metalness: 0.88,
    roughness: 0.24,
    clearcoat: 0.6,
  });
  const ringBMesh = new THREE.Mesh(ringBGeo, ringBMat);
  ringBMesh.rotation.set(-Math.PI / 3.6, -0.5, Math.PI / 5);
  ringBMesh.castShadow = !isSoftwareGl;
  assemblyGroup.add(ringBMesh);
  disposables.push(ringBGeo, ringBMat);

  const ringCGeo = new THREE.TorusGeometry(1.66, 0.028, 18, 96);
  const ringCMat = new THREE.MeshPhysicalMaterial({
    color: palette.ringC,
    metalness: 0.86,
    roughness: 0.28,
  });
  const ringCMesh = new THREE.Mesh(ringCGeo, ringCMat);
  ringCMesh.rotation.set(Math.PI / 2.2, 0.65, -Math.PI / 6);
  assemblyGroup.add(ringCMesh);
  disposables.push(ringCGeo, ringCMat);

  // 9. Sculptural Bevelled Satellite Nodes riding on the rings (3 parts via ExtrudeGeometry)
  const satShape = new THREE.Shape();
  satShape.moveTo(0, 0.13);
  satShape.lineTo(0.09, 0);
  satShape.lineTo(0, -0.13);
  satShape.lineTo(-0.09, 0);
  satShape.closePath();

  const satGeo = new THREE.ExtrudeGeometry(satShape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  satGeo.center();
  const satMat = new THREE.MeshPhysicalMaterial({
    color: palette.accent,
    emissive: palette.accent,
    emissiveIntensity: 0.25,
    metalness: 0.9,
    roughness: 0.18,
  });
  const satellites: THREE.Mesh[] = [];
  const satRadii = [1.16, 1.42, 1.66];
  const satParents = [ringAMesh, ringBMesh, ringCMesh];
  for (let i = 0; i < 3; i++) {
    const sat = new THREE.Mesh(satGeo, satMat);
    const angle = (i / 3) * Math.PI * 2;
    sat.position.set(
      Math.cos(angle) * satRadii[i],
      Math.sin(angle) * satRadii[i],
      0
    );
    satParents[i].add(sat);
    satellites.push(sat);
  }
  disposables.push(satGeo, satMat);

  // 10. InstancedMesh Constellation (56 floating data crystals with scale & tint variation)
  const nodeCount = 56;
  const nodeGeo = new THREE.OctahedronGeometry(0.045, 0);
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.7,
    emissive: 0x1e293b,
    emissiveIntensity: 0.35,
  });
  const nodesInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
  const dummy = new THREE.Object3D();
  const tintColors = [
    new THREE.Color(0x38bdf8),
    new THREE.Color(0xa78bfa),
    new THREE.Color(0x34d399),
    new THREE.Color(0xfbbf24),
  ];

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const radius = 2.15 + (i % 5) * 0.22;
    dummy.position.set(
      Math.sin(phi) * Math.cos(theta) * radius,
      Math.cos(phi) * radius * 0.68,
      Math.sin(phi) * Math.sin(theta) * radius
    );
    dummy.rotation.set(i * 0.5, i * 0.7, 0);
    const scale = 0.85 + ((i * 37) % 30) / 100; // ±15% scale variation
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    nodesInstanced.setMatrixAt(i, dummy.matrix);
    nodesInstanced.setColorAt(i, tintColors[i % tintColors.length]);
  }
  nodesInstanced.instanceMatrix.needsUpdate = true;
  if (nodesInstanced.instanceColor) {
    nodesInstanced.instanceColor.needsUpdate = true;
  }
  nodesInstanced.computeBoundingSphere();
  assemblyGroup.add(nodesInstanced);
  disposables.push(nodeGeo, nodeMat);

  let currentExplode = 0;

  function setFinish(finish: SculptureFinish) {
    const next = FINISH_PALETTES[finish];
    coreMat.color.setHex(next.core);
    coreMat.emissive.setHex(next.coreEmissive);
    nucleusMat.emissive.setHex(next.ringA);
    ringAMat.color.setHex(next.ringA);
    ringBMat.color.setHex(next.ringB);
    ringCMat.color.setHex(next.ringC);
    satMat.color.setHex(next.accent);
    satMat.emissive.setHex(next.accent);
  }

  function update(elapsed: number, delta: number, targetExplode: number) {
    currentExplode = THREE.MathUtils.damp(
      currentExplode,
      targetExplode,
      6.5,
      Math.min(delta, 0.1)
    );

    // Smooth vertical hover + exploded separation
    const hover = Math.sin(elapsed * 1.15) * 0.08;
    assemblyGroup.position.y = 1.92 + hover + currentExplode * 0.45;
    collarMesh.position.y = 0.28 + currentExplode * 0.18;
    dialMesh.position.y = 0.345 + currentExplode * 0.18;

    // Core & lattice rotation
    coreMesh.rotation.y = elapsed * 0.38;
    coreMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.24;
    nucleusMesh.rotation.y = -elapsed * 0.85;
    nucleusMesh.rotation.z = elapsed * 0.45;

    const cageScale = 1 + currentExplode * 0.32;
    cageLines.scale.setScalar(cageScale);
    cageLines.rotation.y = -elapsed * 0.22;
    cageLines.rotation.x = elapsed * 0.14;

    // Orbital ring kinematics + exploded expansion
    ringAMesh.rotation.z = elapsed * 0.42;
    ringAMesh.scale.setScalar(1 + currentExplode * 0.14);

    ringBMesh.rotation.z = -elapsed * 0.31;
    ringBMesh.scale.setScalar(1 + currentExplode * 0.22);

    ringCMesh.rotation.z = elapsed * 0.21;
    ringCMesh.scale.setScalar(1 + currentExplode * 0.3);

    nodesInstanced.rotation.y = elapsed * 0.09;
    nodesInstanced.scale.setScalar(1 + currentExplode * 0.24);

    for (let i = 0; i < satellites.length; i++) {
      satellites[i].rotation.z = elapsed * 1.4 + i;
    }
  }

  function dispose() {
    for (const item of disposables) {
      item.dispose();
    }
  }

  return { root, setFinish, update, dispose };
}
