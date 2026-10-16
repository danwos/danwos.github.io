import { defineToolbarApp } from 'astro/toolbar';

type Item = {
  id: number; status: 'open' | 'done'; path: string; selector: string;
  section?: string; heading?: string; text?: string; comment: string;
  viewport?: number; theme?: string; created?: string;
};

/** A CSS path that finds the element again: #id where possible, else nth-of-type steps. */
function selectorFor(el: Element): string {
  const parts: string[] = [];
  for (let e: Element | null = el; e && e !== document.body; e = e.parentElement) {
    if (e.id) { parts.unshift(`#${CSS.escape(e.id)}`); break; }
    const same = e.parentElement ? [...e.parentElement.children].filter((c) => c.tagName === e!.tagName) : [];
    parts.unshift(same.length > 1 ? `${e.tagName.toLowerCase()}:nth-of-type(${same.indexOf(e) + 1})` : e.tagName.toLowerCase());
  }
  return parts.join(' > ');
}

function context(el: Element) {
  const section = el.closest('section[id]')?.id;
  let heading: string | undefined;
  for (let e: Element | null = el; e && !heading; e = e.parentElement) {
    heading = e.querySelector('h1, h2, h3')?.textContent?.trim();
  }
  const img = el.closest('img') as HTMLImageElement | null;
  const text = img ? `[image] ${img.alt || img.currentSrc.split('/').pop()}` : (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 160);
  return { section, heading, text };
}

export default defineToolbarApp({
  init(canvas, app, server) {
    let active = false;
    let items: Item[] = [];
    let target: Element | null = null;

    canvas.innerHTML = `
      <style>
        :host { --c: #E2725B }
        .hl { position: fixed; pointer-events: none; outline: 2px dashed var(--c); outline-offset: 2px; background: #E2725B14; z-index: 2147483000; display: none; border-radius: 4px }
        .form, .bubble { position: fixed; z-index: 2147483001; background: #fff; color: #1B1A22; border: 2px solid #1B1A22; box-shadow: 3px 3px 0 #1B1A22;
          border-radius: 10px; padding: 10px; width: 300px; font: 14px/1.4 system-ui, sans-serif; display: none }
        .form textarea { width: 100%; box-sizing: border-box; min-height: 80px; font: inherit; border: 2px solid #E1E6EC; border-radius: 8px; padding: 6px }
        .row { display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px }
        button { font: 600 13px system-ui; border: 2px solid #1B1A22; border-radius: 8px; padding: 4px 10px; cursor: pointer; background: #fff }
        button.primary { background: #0F766E; color: #fff }
        .ctx { color: #5B6472; font-size: 12px; margin-bottom: 6px; max-height: 3em; overflow: hidden }
        .pin { position: fixed; z-index: 2147482999; width: 24px; height: 24px; border-radius: 50%; background: var(--c); color: #fff; border: 2px solid #1B1A22;
          font: 700 12px system-ui; display: flex; align-items: center; justify-content: center; cursor: pointer; transform: translate(-50%, -50%) }
        .hint { position: fixed; top: 12px; left: 50%; transform: translateX(-50%); z-index: 2147483001; background: #1B1A22; color: #fff; padding: 6px 12px; border-radius: 8px; font: 13px system-ui; display: none }
      </style>
      <div class="hint">Feedback-Modus: Element anklicken · Esc beendet</div>
      <div class="hl"></div>
      <div class="form"><div class="ctx"></div><textarea placeholder="Was soll sich ändern?"></textarea>
        <div class="row"><button class="cancel">Abbrechen</button><button class="primary save">Speichern</button></div></div>
      <div class="bubble"><div class="ctx"></div><div class="txt"></div>
        <div class="row"><button class="close">Schließen</button><button class="primary done">Erledigt</button></div></div>
      <div class="pins"></div>`;

    const $ = <T extends Element>(s: string) => canvas.querySelector(s) as T;
    const hl = $<HTMLDivElement>('.hl'), form = $<HTMLDivElement>('.form'), bubble = $<HTMLDivElement>('.bubble');
    const hint = $<HTMLDivElement>('.hint'), pins = $<HTMLDivElement>('.pins'), area = $<HTMLTextAreaElement>('textarea');
    let bubbleId = 0;

    const place = (box: HTMLElement, x: number, y: number) => {
      box.style.display = 'block';
      box.style.left = `${Math.min(x, innerWidth - 320)}px`;
      box.style.top = `${Math.min(y + 12, innerHeight - box.offsetHeight - 12)}px`;
    };

    function drawPins() {
      pins.innerHTML = '';
      if (!active) return;
      items.filter((i) => i.status === 'open' && i.path === location.pathname).forEach((i) => {
        const el = document.querySelector(i.selector);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const pin = document.createElement('div');
        pin.className = 'pin'; pin.textContent = String(i.id);
        pin.style.left = `${Math.max(14, r.left)}px`; pin.style.top = `${Math.max(14, r.top)}px`;
        pin.onclick = (e) => {
          e.stopPropagation(); bubbleId = i.id;
          (bubble.querySelector('.ctx') as HTMLElement).textContent = i.heading ? `${i.heading} – ${i.text ?? ''}` : (i.text ?? '');
          (bubble.querySelector('.txt') as HTMLElement).textContent = i.comment;
          place(bubble, r.left, r.top);
        };
        pins.appendChild(pin);
      });
    }

    const isOwn = (e: Event) => e.composedPath().some((n) => n === canvas.host || (n as Element).tagName === 'ASTRO-DEV-TOOLBAR');

    function onMove(e: MouseEvent) {
      if (form.style.display === 'block' || isOwn(e)) return;
      const el = e.target as Element;
      const r = el.getBoundingClientRect();
      Object.assign(hl.style, { display: 'block', left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
    }
    function onClick(e: MouseEvent) {
      if (isOwn(e)) return;
      e.preventDefault(); e.stopPropagation();
      if (form.style.display === 'block') return;
      target = e.target as Element;
      const c = context(target);
      (form.querySelector('.ctx') as HTMLElement).textContent = c.heading ? `${c.heading} – ${c.text}` : c.text;
      area.value = '';
      place(form, e.clientX, e.clientY);
      area.focus();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { if (form.style.display === 'block') form.style.display = 'none'; else app.toggleState({ state: false }); }
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && form.style.display === 'block') saveIt();
    }
    function saveIt() {
      const comment = area.value.trim();
      if (!comment || !target) return;
      server.send('feedback:add', {
        path: location.pathname, selector: selectorFor(target), ...context(target), comment,
        viewport: innerWidth, theme: document.documentElement.dataset.theme
          ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
      });
      form.style.display = 'none'; target = null;
    }

    $<HTMLButtonElement>('.save').onclick = saveIt;
    $<HTMLButtonElement>('.cancel').onclick = () => { form.style.display = 'none'; };
    $<HTMLButtonElement>('.close').onclick = () => { bubble.style.display = 'none'; };
    $<HTMLButtonElement>('.done').onclick = () => { server.send('feedback:done', { id: bubbleId }); bubble.style.display = 'none'; };

    server.on<Item[]>('feedback:list', (list) => {
      items = list;
      const open = items.filter((i) => i.status === 'open').length;
      app.toggleNotification(open ? { state: true, level: 'info' } : { state: false });
      drawPins();
    });
    server.send('feedback:get', {});
    addEventListener('scroll', drawPins, { passive: true });
    addEventListener('resize', drawPins);

    app.onToggled(({ state }) => {
      active = state;
      hint.style.display = state ? 'block' : 'none';
      hl.style.display = 'none'; form.style.display = 'none'; bubble.style.display = 'none';
      const m = state ? addEventListener : removeEventListener;
      m('mousemove', onMove as EventListener, true);
      m('click', onClick as EventListener, true);
      m('keydown', onKey as EventListener, true);
      drawPins();
    });
  },
});
