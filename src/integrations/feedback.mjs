// Dev-only feedback tool: an Astro dev toolbar app to click any element on the
// page and leave a comment. Comments are stored in .feedback/feedback.json
// (git-ignored) so an agent can read and work through them.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(new URL('../../.feedback/feedback.json', import.meta.url));

async function load() {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch { return []; }
}
async function save(items) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(items, null, 2) + '\n');
}

export function feedback() {
  return {
    name: 'danwos-feedback',
    hooks: {
      'astro:config:setup': ({ addDevToolbarApp, command }) => {
        if (command !== 'dev') return;
        addDevToolbarApp({
          id: 'danwos-feedback',
          name: 'Feedback',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
          entrypoint: fileURLToPath(new URL('./feedback-app.ts', import.meta.url)),
        });
      },
      'astro:server:setup': ({ toolbar, logger }) => {
        const broadcast = async () => toolbar.send('feedback:list', await load());
        toolbar.on('feedback:get', broadcast);
        toolbar.on('feedback:add', async (item) => {
          const items = await load();
          const id = Math.max(0, ...items.map((i) => i.id)) + 1;
          items.push({ id, status: 'open', created: new Date().toISOString(), ...item });
          await save(items);
          logger.info(`feedback #${id} on ${item.path}: ${item.comment}`);
          broadcast();
        });
        toolbar.on('feedback:done', async ({ id }) => {
          const items = await load();
          const it = items.find((i) => i.id === id);
          if (it) { it.status = 'done'; it.done = new Date().toISOString(); await save(items); }
          broadcast();
        });
      },
    },
  };
}
