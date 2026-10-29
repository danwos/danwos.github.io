// Maturity rings in 3D (three.js, loaded on demand): one tool as five level rings around its monster.
// Every segment (area × level) is a solid block; a click pulls the levels apart and every block grows
// into a column – its head block in front, the measures of that level behind it as slices.
// Used by MaturityRings.astro (one tool) and MaturityRoom.astro (six tools in one room).
import type * as Three from 'three';
import { aggregate, reachedLevel, overall, type Tool } from './maturity';
import { loadThree, onTap, placeTip, still } from './roll3d';

export type Strings = { pull: string; join: string; back: string; nd: string; ud: string; err: string; off: string;
  reached: string; mean: string; regression: string; target: string };

const SCALE: [number, string][] = [[0, '#A8322A'], [35, '#E2725B'], [60, '#E2A93B'], [80, '#8A9A5B'], [100, '#14958B']];
const GREY_DEFINED = '#8B857D', GREY_OPEN = '#ECE8E1', ERROR = '#C0262D', INK = '#1B1A22';

/** Colour of a score on the danwos scale, as CSS hex. */
export function scoreHex(v: number) {
  const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  for (let i = 1; i < SCALE.length; i++) {
    const [s1, c1] = SCALE[i], [s0, c0] = SCALE[i - 1];
    if (v <= s1) {
      const t = (v - s0) / (s1 - s0), a = hex(c0), b = hex(c1);
      return '#' + a.map((x, k) => Math.round(x + (b[k] - x) * t).toString(16).padStart(2, '0')).join('');
    }
  }
  return SCALE[SCALE.length - 1][1];
}

// ---------- geometry ----------
const R0 = 1.0, W = 0.44, G = 0.07;          // logo radius, ring width, gap between rings
const DSEG = 0.42, DREACH = 0.26, DM = 0.2;   // head block depth, extra depth of a reached block, slice depth
const SEAM = 0.05, HEAD_GAP = 0.16, LEVEL_GAP = 0.75;
const WEDGE = (30 * Math.PI) / 180, AREA_GAP = (1.6 * Math.PI) / 180, AREAS = 8;
const inner = (l: number) => R0 + G * 2 + l * (W + G);
const outer = (l: number) => inner(l) + W;
const span = (Math.PI * 2 - WEDGE) / AREAS;
const angles = (a: number) => {
  const a1 = Math.PI / 2 - WEDGE / 2 - a * span;
  return [a1 - span + AREA_GAP / 2, a1 - AREA_GAP / 2];
};

type Labels = { CSS2DObject: new (el: HTMLElement) => Three.Object3D };
export type Model = { group: Three.Group; pickable: Three.Mesh[]; labelObjs: Three.Object3D[]; depth: number; step: (target: number, k?: number) => number };

/** Builds the 3D rings of one tool. `step(target)` moves every part towards 0 (joined) or 1 (pulled apart). */
export function buildMaturity(THREE: typeof Three, tool: Tool, labels?: Labels): Model {
  const group = new THREE.Group();
  const pickable: Three.Mesh[] = [];
  const pulsing: Three.Mesh[] = [];
  const labelObjs: Three.Object3D[] = [];
  const reached = tool.areas.map((_, a) => reachedLevel(tool, a));

  const sector = (l: number, a: number, depth: number, z0: number) => {
    const [s, e] = angles(a);
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outer(l), s, e, false);
    shape.absarc(0, 0, inner(l), e, s, true);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth, curveSegments: 10, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.02, bevelSegments: 2 });
    geo.translate(0, 0, z0);
    return geo;
  };

  const hatch = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d')!;
    g.fillStyle = '#F7DCD8'; g.fillRect(0, 0, 64, 64);
    g.strokeStyle = ERROR; g.lineWidth = 9;
    for (let i = -64; i < 128; i += 22) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 64, 64); g.stroke(); }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 3);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const material = (kind: string, v: number | undefined, off: boolean) => {
    if (off) return new THREE.MeshLambertMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.12, depthWrite: false });
    if (kind === 'score') return new THREE.MeshLambertMaterial({ color: scoreHex(v!) });
    if (kind === 'nd') return new THREE.MeshLambertMaterial({ color: GREY_DEFINED });
    if (kind === 'err') return new THREE.MeshLambertMaterial({ map: hatch });
    return new THREE.MeshLambertMaterial({ color: GREY_OPEN, transparent: true, opacity: 0.55, depthWrite: false });
  };
  const edges = (geo: Three.BufferGeometry, kind: string, off: boolean) => {
    const eg = new THREE.EdgesGeometry(geo, 30);
    if (off || kind === 'ud') {
      const line = new THREE.LineSegments(eg, new THREE.LineDashedMaterial({
        color: off ? '#9A948C' : '#A39C93', dashSize: off ? 0.03 : 0.08, gapSize: off ? 0.06 : 0.05, transparent: true, opacity: off ? 0.6 : 1 }));
      line.computeLineDistances();
      return line;
    }
    return new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: INK }));
  };
  const circle = (r: number, z: number, style: 'bold' | 'dash' | 'dot') => {
    if (style === 'bold') return new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 8, 128), new THREE.MeshBasicMaterial({ color: INK })).translateZ(z);
    const pts = Array.from({ length: 129 }, (_, i) => {
      const t = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, z);
    });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({
      color: INK, dashSize: style === 'dash' ? 0.16 : 0.03, gapSize: 0.07, transparent: true, opacity: style === 'dash' ? 0.9 : 0.5 }));
    line.computeLineDistances();
    return line;
  };
  const logoTexture = () => {
    if (tool.img) {
      const t = new THREE.TextureLoader().load(tool.img);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }
    // a tool without a monster gets its initial
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d')!;
    g.fillStyle = '#0F766E'; g.font = '700 150px "Bricolage Grotesque Variable", Inter, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(tool.name[0].toUpperCase(), 128, 140);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  // the monster on a white disc in front
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(R0, R0, 0.4, 64), new THREE.MeshLambertMaterial({ color: '#FFFFFF' }));
  disc.rotation.x = Math.PI / 2;
  disc.position.z = 0.05;
  disc.add(new THREE.LineSegments(new THREE.EdgesGeometry(disc.geometry, 30), new THREE.LineBasicMaterial({ color: INK })));
  group.add(disc);
  const face = new THREE.Mesh(new THREE.CircleGeometry(R0 * 0.92, 64), new THREE.MeshBasicMaterial({ map: logoTexture(), transparent: true }));
  face.position.z = 0.26;
  group.add(face, circle(R0 + 0.03, 0.25, 'bold'));

  // depth of each opened level: head block + its longest column; a level not targeted has no column
  const levelDepth = [0, 1, 2, 3, 4].map((l) => (l + 1 > tool.final ? DSEG
    : DSEG + HEAD_GAP + Math.max(...tool.results.map((area) => area[l].length)) * DM));
  const openZ = levelDepth.map((_, l) => -levelDepth.slice(0, l).reduce((s, d) => s + d + LEVEL_GAP, 0));

  const levels = levelDepth.map((_, l) => {
    const off = l + 1 > tool.final;
    const lg = new THREE.Group();
    group.add(lg);
    const columns = tool.areas.map((area, a) => {
      const ms = tool.results[a][l];
      const seg = aggregate(ms);
      const isReached = l < reached[a];
      // reached blocks stand out to the front: the thick block of the 2D picture becomes a plateau
      const geo = sector(l, a, DSEG + (isReached ? DREACH : 0), -DSEG);
      const head = new THREE.Mesh(geo, material(seg.kind, seg.v, off));
      head.add(edges(geo, seg.kind, off));
      head.userData = { tool: tool.name, level: l + 1, area, kind: seg.kind, v: seg.v, reached: isReached, off, n: ms.length };
      lg.add(head);
      pickable.push(head);
      if (ms.some((m) => m.regression)) pulsing.push(head);

      // the slices sit in one holder that is squeezed to nothing when the rings are joined
      const holder = new THREE.Group();
      holder.position.z = -DSEG;
      if (!off) ms.forEach((m, j) => {
        const kind = typeof m.v === 'number' ? 'score' : m.v;
        const sg = sector(l, a, DM - SEAM, -HEAD_GAP - (j + 1) * DM + SEAM);
        const s = new THREE.Mesh(sg, material(kind, typeof m.v === 'number' ? m.v : undefined, false));
        s.add(edges(sg, kind, false));
        s.userData = { tool: tool.name, level: l + 1, area, measure: m.name, kind, v: m.v, regression: m.regression };
        holder.add(s);
        pickable.push(s);
        if (m.regression) pulsing.push(s);
      });
      lg.add(holder);
      return holder;
    });

    // target lines on the front of their ring
    if (l + 1 === tool.target) lg.add(circle(outer(l) + G / 2, 0.02, 'bold'));
    else if (l + 1 === tool.final) lg.add(circle(outer(l) + G / 2, 0.02, 'dash'));
    else if (off) lg.add(circle(outer(l) + G / 2, 0.02, 'dot'));

    // level label in the free wedge at the top
    if (labels) {
      const el = document.createElement('span');
      el.className = 'mlabel' + (off ? ' off' : l + 1 > tool.target ? ' sched' : '');
      el.textContent = tool.levels[l];
      const o = new labels.CSS2DObject(el);
      o.position.set(0, (inner(l) + outer(l)) / 2, 0.1);
      labelObjs.push(o);
      lg.add(o);
    }
    return { group: lg, columns };
  });

  // area labels around the outermost ring
  if (labels) tool.areas.forEach((area, a) => {
    const [s, e] = angles(a);
    const t = (s + e) / 2, r = outer(4) + 0.55;
    const el = document.createElement('span');
    el.className = 'alabel';
    el.textContent = area;
    const o = new labels.CSS2DObject(el);
    o.position.set(Math.cos(t) * r, Math.sin(t) * r, 0);
    labelObjs.push(o);
    levels[4].group.add(o);
  });

  let open01 = 0;
  const step = (target: number, k = 0.1) => {
    open01 += (target - open01) * k;
    if (Math.abs(target - open01) < 0.001) open01 = target;
    const e = open01 * open01 * (3 - 2 * open01);
    levels.forEach((lv, l) => {
      lv.group.position.z = openZ[l] * e;
      lv.columns.forEach((h) => {
        h.scale.z = Math.max(0.001, e);
        h.visible = e > 0.02;
      });
    });
    // a regression is the only real alarm: it pulses
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 260);
    pulsing.forEach((m) => (m.material as Three.MeshLambertMaterial).emissive.setRGB(0.55 * pulse, 0.05 * pulse, 0.05 * pulse));
    return e;
  };
  step(0, 1);
  return { group, pickable, labelObjs, depth: -openZ[4] + levelDepth[4], step };
}

/** Renderer, label layer, camera, light and controls inside a figure's .stage. */
async function setup(fig: HTMLElement, fov: number) {
  const { THREE, OrbitControls, CSS2DRenderer, CSS2DObject } = await loadThree();
  const stage = fig.querySelector<HTMLElement>('.stage')!;
  const tip = fig.querySelector<HTMLElement>('.tip')!;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  stage.prepend(renderer.domElement);
  const labels = new CSS2DRenderer();
  labels.domElement.className = 'labels';
  stage.append(labels.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 16 / 9, 0.1, 400);
  scene.add(new THREE.AmbientLight('#ffffff', 1.5));
  const sun = new THREE.DirectionalLight('#ffffff', 2.3);
  sun.position.set(4, 7, 6);
  const rim = new THREE.DirectionalLight('#ffffff', 0.7);
  rim.position.set(-6, -2, -8);
  scene.add(sun, rim);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  // vertical swipes keep scrolling the page on touch screens
  renderer.domElement.style.touchAction = 'pan-y';
  const fit = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    labels.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(fit).observe(stage);
  fit();
  // render only while the stage is on screen (measured every frame, an observer can miss the first state)
  const isVisible = () => {
    const r = stage.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight && r.width > 0;
  };
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const hit = (e: PointerEvent, objs: Three.Object3D[]) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(objs, false)[0];
  };
  renderer.domElement.addEventListener('pointerleave', () => (tip.hidden = true));
  // widen the view on narrow screens, so the model keeps its size relative to the width
  const widen = (soft = 1) => Math.max(1, 1.78 / camera.aspect) ** soft;
  const render = () => { renderer.render(scene, camera); labels.render(scene, camera); };
  return { THREE, CSS2DObject, stage, tip, renderer, scene, camera, controls, hit, widen, render, isVisible };
}

function showTip(tip: HTMLElement, stage: HTMLElement, e: PointerEvent, d: Record<string, any>, s: Strings, prefix = '') {
  const where = `${prefix}${d.area} · L${d.level}${d.measure ? ' · ' + d.measure : ''}`;
  const score = d.kind === 'score' && !d.off;
  const what = d.regression ? s.regression : d.off ? s.off : score
    ? [d.reached && s.reached, d.n > 1 && s.mean.replace('{n}', d.n)].filter(Boolean).join(' · ') : s[d.kind as 'nd' | 'ud' | 'err'];
  tip.replaceChildren(`${where}${score ? ': ' + d.v : ''}`);
  if (what) {
    const small = document.createElement('small');
    small.textContent = what;
    tip.append(small);
  }
  tip.style.borderLeftColor = d.off ? '#D8D2C9' : score ? scoreHex(d.v) : d.kind === 'err' ? ERROR : d.kind === 'nd' ? GREY_DEFINED : GREY_OPEN;
  placeTip(tip, stage, e);
}

/** One tool, swinging slowly; a click on the rings or the button pulls the levels apart. */
export async function mountRings(fig: HTMLElement, tool: Tool, s: Strings) {
  const v = await setup(fig, 24);
  const { THREE } = v;
  const toggle = fig.querySelector<HTMLButtonElement>('.toggle')!;
  const calm = still();
  const pivot = new THREE.Group();
  v.scene.add(pivot);
  const model = buildMaturity(THREE, tool, { CSS2DObject: v.CSS2DObject });
  pivot.add(model.group);
  v.camera.position.set(0, 3.6, 18);

  let open = false, turned = false;
  const setOpen = (o: boolean) => {
    open = o;
    fig.classList.toggle('open', open);
    toggle.textContent = open ? s.join : s.pull;
  };
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(!open));
  v.controls.addEventListener('start', () => (turned = true));
  onTap(v.renderer.domElement, (e) => v.hit(e, model.pickable) && setOpen(!open));
  v.renderer.domElement.addEventListener('pointermove', (e) => {
    const h = v.hit(e, model.pickable);
    v.renderer.domElement.style.cursor = h ? 'pointer' : 'grab';
    if (!h) return void (v.tip.hidden = true);
    showTip(v.tip, v.stage, e, h.object.userData, s);
  });

  let swing = 0, last = performance.now();
  v.renderer.setAnimationLoop((now: number) => {
    const dt = (now - last) / 1000;
    last = now;
    if (!v.isVisible()) return;
    const e = model.step(open ? 1 : 0, calm ? 1 : 0.06);
    // the middle of the model stays in the centre while it grows to the back
    model.group.position.z = (model.depth / 2) * e;
    if (!turned && !calm) swing += dt;
    // a slow swing instead of a full turn: the front stays readable, the depth shows on both sides
    pivot.rotation.y = -0.55 * (0.35 + e) + Math.sin(swing * 0.35) * 0.5;
    pivot.rotation.x = 0.12 + Math.sin(swing * 0.21) * 0.06;
    const dist = (18 + e * model.depth * 0.95) * v.widen();
    const len = v.camera.position.length();
    v.camera.position.multiplyScalar(1 + ((dist - len) / len) * (calm ? 1 : 0.08));
    v.controls.update();
    v.render();
  });
}

/** Several tools on an arc in one room; a click flies to a tool and pulls it apart in place. */
export async function mountRoom(fig: HTMLElement, tools: Tool[], s: Strings) {
  const v = await setup(fig, 30);
  const { THREE } = v;
  const back = fig.querySelector<HTMLButtonElement>('.back')!;
  const calm = still();
  const R = 24;
  let focus: (i: number) => void = () => {};
  const items = tools.map((tool, i) => {
    const m = buildMaturity(THREE, tool, { CSS2DObject: v.CSS2DObject });
    const holder = new THREE.Group(), pivot = new THREE.Group();
    // a shallow arc that faces the viewer, back and front row alternate
    const th = ((-40 + i * (80 / Math.max(1, tools.length - 1))) * Math.PI) / 180;
    holder.position.set(Math.sin(th) * R, i % 2 ? 2.6 : -1.8, -Math.cos(th) * R + R - (i % 2 ? 7 : 0));
    holder.lookAt(0, 0, R + 12);
    holder.add(pivot);
    pivot.add(m.group);
    v.scene.add(holder);
    m.labelObjs.forEach((o) => (o.visible = false));
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'tag';
    el.textContent = `${tool.name} `;
    const small = document.createElement('small');
    small.textContent = `L${overall(tool)} · ${s.target} L${tool.target}`;
    el.append(small);
    el.addEventListener('click', () => focus(i));
    const tag = new v.CSS2DObject(el);
    tag.position.set(0, i % 2 ? 5.2 : -5.2, 0);
    holder.add(tag);
    m.pickable.forEach((p) => (p.userData.item = i));
    return { m, holder, pivot, tag, phase: i * 1.3 };
  });
  const all = items.flatMap((it) => it.m.pickable);

  // a light floor gives the room its depth
  const line = getComputedStyle(fig).getPropertyValue('--line').trim() || '#E1E6EC';
  const floor = new THREE.GridHelper(120, 60, line, line);
  floor.position.y = -7.5;
  v.scene.add(floor);

  const home = { pos: new THREE.Vector3(0, 11, 48), target: new THREE.Vector3(0, -0.5, -2) };
  const want = { pos: home.pos.clone(), target: home.target.clone() };
  v.camera.position.copy(home.pos);
  v.controls.target.copy(home.target);
  let focused = -1, flyUntil = 0;
  focus = (i) => {
    focused = i;
    flyUntil = performance.now() + 1800;
    back.hidden = i < 0;
    fig.classList.toggle('open', i >= 0);
    items.forEach((it, j) => {
      it.m.labelObjs.forEach((o) => (o.visible = j === i));
      it.tag.visible = i < 0;
    });
    if (i < 0) {
      want.pos.copy(home.pos).multiplyScalar(v.widen(0.55));
      want.target.copy(home.target);
      return;
    }
    const h = items[i].holder;
    const centre = new THREE.Vector3(0, 0, -items[i].m.depth / 2).applyMatrix4(h.matrixWorld);
    // a three-quarter view onto the opened tool, from its front left
    const side = new THREE.Vector3(-0.75, 0.35, 1).normalize().transformDirection(h.matrixWorld);
    want.target.copy(centre);
    want.pos.copy(centre).addScaledVector(side, (15 + items[i].m.depth) * v.widen());
  };
  back.addEventListener('click', () => focus(-1));
  onTap(v.renderer.domElement, (e) => {
    const h = v.hit(e, all);
    if (h) focus(h.object.userData.item === focused ? -1 : h.object.userData.item);
    else if (focused >= 0) focus(-1);
  });
  v.renderer.domElement.addEventListener('pointermove', (e) => {
    const h = v.hit(e, all);
    v.renderer.domElement.style.cursor = h ? 'pointer' : 'grab';
    if (!h) return void (v.tip.hidden = true);
    showTip(v.tip, v.stage, e, h.object.userData, s, `${h.object.userData.tool} · `);
  });

  let fitted = 0;
  const start = performance.now();
  v.renderer.setAnimationLoop((now: number) => {
    if (!v.isVisible()) return;
    // the first view of the room adapts to the width of the stage
    // on a phone the room is shown closer; the outer tools may leave the frame, a drag brings them in
    if (fitted !== v.widen(0.55) && focused < 0) {
      fitted = v.widen(0.55);
      v.camera.position.copy(home.pos).multiplyScalar(fitted);
      want.pos.copy(v.camera.position);
    }
    const t = calm ? 0 : (now - start) / 1000;
    items.forEach((it, i) => {
      const e = it.m.step(i === focused ? 1 : 0, calm ? 1 : 0.05);
      // every tool turns on its own, a bit out of step with the others; the opened one turns calmer
      it.pivot.rotation.y = Math.sin(t * 0.3 + it.phase) * (0.55 - 0.35 * e);
      it.pivot.rotation.x = 0.1 + Math.sin(t * 0.2 + it.phase) * 0.05;
    });
    if (performance.now() < flyUntil) {
      v.camera.position.lerp(want.pos, calm ? 1 : 0.05);
      v.controls.target.lerp(want.target, calm ? 1 : 0.05);
    }
    v.controls.update();
    v.render();
  });
}
