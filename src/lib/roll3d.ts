// Quality rolls in 3D (three.js, loaded on demand): a pull request as a roll of discs,
// one disc per quality criterion, pie pieces per part, coloured by score.
// Used by QualityRoll.astro (one big roll) and QualityNetwork.astro (many small ones).
import type * as Three from 'three';

export type Disc = { name: string; parts: { name: string; v: number }[] };
export const COLORS = { good: '#2A9D8F', fair: '#E0A43A', bad: '#D7381E' };
export const band = (v: number) => (v >= 80 ? 'good' : v >= 60 ? 'fair' : 'bad');
export const ink = () => getComputedStyle(document.documentElement).getPropertyValue('--outline').trim() || '#1B1A22';
export const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export const loadThree = async () => ({
  THREE: await import('three'),
  OrbitControls: (await import('three/addons/controls/OrbitControls.js')).OrbitControls,
  ...(await import('three/addons/renderers/CSS2DRenderer.js')),
});

/** Builds a roll lying along the x axis. Each disc sits in its own holder, which moves when the roll opens. */
export function buildRoll(THREE: typeof Three, discs: Disc[], opts: { R?: number; T?: number; edges?: boolean } = {}) {
  const R = opts.R ?? 1, T = opts.T ?? 0.36, PIE_GAP = 0.025;
  const group = new THREE.Group();
  const pickable: Three.Mesh[] = [];
  const line = new THREE.LineBasicMaterial({ color: ink() });
  const mats = Object.fromEntries(Object.entries(COLORS).map(([k, c]) => [k, new THREE.MeshLambertMaterial({ color: c })]));
  const holders = discs.map((d) => {
    const disc = new THREE.Group();
    disc.rotation.y = Math.PI / 2;
    const step = (Math.PI * 2) / d.parts.length;
    d.parts.forEach((p, k) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.absarc(0, 0, R, k * step + PIE_GAP / 2, (k + 1) * step - PIE_GAP / 2, false);
      shape.lineTo(0, 0);
      const geo = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false, curveSegments: R < 0.6 ? 12 : 24 });
      geo.translate(0, 0, -T / 2);
      const mesh = new THREE.Mesh(geo, mats[band(p.v)]);
      mesh.userData = { disc: d.name, part: p.name, v: p.v };
      if (opts.edges !== false) mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), line));
      disc.add(mesh);
      pickable.push(mesh);
    });
    const holder = new THREE.Group();
    holder.add(disc);
    group.add(holder);
    return holder;
  });
  const offset = (i: number, gap: number) => (i - (discs.length - 1) / 2) * (T + gap);
  holders.forEach((h, i) => (h.position.x = offset(i, 0.025 * R)));
  return { group, pickable, holders, offset, R, T };
}

/** Puts the tooltip next to the pointer, inside the stage. */
export function placeTip(tip: HTMLElement, stage: HTMLElement, e: PointerEvent) {
  tip.hidden = false;
  const r = stage.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  tip.style.left = `${x + 14 + tip.offsetWidth > r.width ? Math.max(4, x - 14 - tip.offsetWidth) : x + 14}px`;
  tip.style.top = `${y + 14 + tip.offsetHeight > r.height ? y - 14 - tip.offsetHeight : y + 14}px`;
}

/** Calls `onClick` for a click that is not the end of a drag. */
export function onTap(el: HTMLElement, onClick: (e: PointerEvent) => void, signal?: AbortSignal) {
  let down: { x: number; y: number } | null = null;
  el.addEventListener('pointerdown', (e) => (down = { x: e.clientX, y: e.clientY }), { signal });
  el.addEventListener('pointerup', (e) => {
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 5) onClick(e);
    down = null;
  }, { signal });
}

/**
 * Mounts one big roll into a QualityRoll figure (.stage, .tip, .toggle inside it).
 * Drag turns it, a click on the roll or the button pulls it apart. Returns a function that removes it again.
 */
export async function mountRoll(fig: HTMLElement, discs: Disc[]) {
  const { THREE, OrbitControls, CSS2DRenderer, CSS2DObject } = await loadThree();
  const stage = fig.querySelector<HTMLElement>('.stage')!;
  const tip = fig.querySelector<HTMLElement>('.tip')!;
  const toggle = fig.querySelector<HTMLButtonElement>('.toggle')!;
  const calm = still();
  const abort = new AbortController();
  const { signal } = abort;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  stage.prepend(renderer.domElement);
  const labels = new CSS2DRenderer();
  labels.domElement.className = 'labels';
  stage.append(labels.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 100);
  camera.position.set(6, 4.6, 10.6);
  scene.add(new THREE.AmbientLight('#ffffff', 1.6));
  const sun = new THREE.DirectionalLight('#ffffff', 2.2);
  sun.position.set(4, 6, 5);
  scene.add(sun);

  const roll = buildRoll(THREE, discs);
  scene.add(roll.group);
  const GAP = 0.9, SEAM = 0.025;
  roll.holders.forEach((holder, i) => {
    const el = document.createElement('span');
    el.className = 'label';
    el.textContent = discs[i].name;
    const label = new CSS2DObject(el);
    // alternate above and below, so neighbouring labels do not overlap
    label.position.set(0, i % 2 ? -roll.R - 0.3 : roll.R + 0.3, 0);
    holder.add(label);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = !calm;
  controls.autoRotateSpeed = 1.2;
  controls.addEventListener('start', () => (controls.autoRotate = false));
  // vertical swipes keep scrolling the page on touch screens, horizontal ones turn the roll
  renderer.domElement.style.touchAction = 'pan-y';

  let open = false;
  let flyUntil = 0;
  // on opening, the camera swings to a view onto the disc faces, where the discs line up side by side
  const front = new THREE.Vector3();
  let dist = camera.position.length();
  const fit = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    labels.setSize(w, h);
    camera.aspect = w / h;
    // narrow screens: the roll stands upright and opens downwards, labels alternate left and right
    const upright = w < 560;
    roll.group.rotation.z = upright ? -Math.PI / 2 : 0;
    front.set(1.1, 0.45, 1).normalize();
    if (upright) front.set(0.6, 1.1, 1.3).normalize();
    const long = upright ? 1 / camera.aspect : camera.aspect;
    dist = (open ? (upright ? 19 : 15) : 9.6) * Math.max(1, 1.78 / long);
    camera.updateProjectionMatrix();
  };
  const resize = new ResizeObserver(fit);
  resize.observe(stage);

  const setOpen = (v: boolean) => {
    open = v;
    if (open) flyUntil = performance.now() + 1200;
    fig.classList.toggle('open', open);
    toggle.textContent = open ? fig.dataset.join! : fig.dataset.explode!;
    fit();
  };
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(!open), { signal });

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hit = (e: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(roll.pickable, false)[0];
  };
  onTap(renderer.domElement, (e) => hit(e) && setOpen(!open), signal);
  renderer.domElement.addEventListener('pointermove', (e) => {
    const h = hit(e);
    renderer.domElement.style.cursor = h ? 'pointer' : 'grab';
    if (!h) return void (tip.hidden = true);
    const { disc, part, v } = h.object.userData;
    tip.textContent = `${disc} · ${part}: ${v}`;
    tip.className = `tip ${band(v)}`;
    placeTip(tip, stage, e);
  }, { signal });
  renderer.domElement.addEventListener('pointerleave', () => (tip.hidden = true), { signal });

  let visible = false;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(stage);
  fit();
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    const k = calm ? 1 : 0.12;
    roll.holders.forEach((h, i) => (h.position.x += (roll.offset(i, open ? GAP : SEAM) - h.position.x) * k));
    if (performance.now() < flyUntil) camera.position.lerp(front.clone().multiplyScalar(dist), calm ? 1 : 0.08);
    const len = camera.position.length();
    camera.position.multiplyScalar(1 + ((dist - len) / len) * k);
    controls.update();
    renderer.render(scene, camera);
    labels.render(scene, camera);
  });

  return () => {
    abort.abort();
    io.disconnect();
    resize.disconnect();
    controls.dispose();
    renderer.setAnimationLoop(null);
    scene.traverse((o) => (o as Three.Mesh).geometry?.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    labels.domElement.remove();
    tip.hidden = true;
    fig.classList.remove('open');
  };
}
