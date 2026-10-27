// Link preview cards (Open Graph / Twitter Card images), 1200×630 PNG.
// The same look as the profile banners and repo previews from the brain
// (danwos/30_outputs/social/): deep blue → teal gradient, faint stripes,
// stripe band at the bottom, the picture on the right.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Paths from the project root: the build runs there, and the bundled module no longer sits in src/lib.
const root = (p: string) => resolve(process.cwd(), p);
const font = (p: string) => readFileSync(root(`node_modules/@fontsource/${p}`));
const fonts = [
  { name: 'Bricolage', data: font('bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff'), weight: 800 as const },
  { name: 'Inter', data: font('inter/files/inter-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Inter', data: font('inter/files/inter-latin-600-normal.woff'), weight: 600 as const },
];
const monogram = `data:image/svg+xml;base64,${readFileSync(root('public/favicon.svg')).toString('base64')}`;

const INK = '#E8EDF3';
const TEAL = '#14B8A6';
const STRIPE = 'repeating-linear-gradient(-35deg, #14B8A6 0px, #14B8A6 18px, #E2725B 18px, #E2725B 30px, #D8C3A5 30px, #D8C3A5 40px)';

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Node =>
  ({ type, props: { style, children: children.length === 1 ? children[0] : children } });
const img = (src: string, style: Record<string, unknown>): Node => ({ type: 'img', props: { src, style } });

/** A picture as PNG data URI, at most `max` px wide (trimmed if asked), and whether it is cut out. */
export async function picture(file: string, max = 900, trim = false) {
  const im = trim ? sharp(await sharp(file).trim().toBuffer()) : sharp(file);
  // cut out = a real share of transparent pixels; a photo with a few clear edge pixels gets a frame
  const { channels } = await im.stats();
  const cutout = channels.length === 4 && channels[3].mean < 240;
  const buf = await im.resize({ width: max, withoutEnlargement: true }).png().toBuffer();
  const { width = 1, height = 1 } = await sharp(buf).metadata();
  return { src: `data:image/png;base64,${buf.toString('base64')}`, cutout, width, height };
}

type Picture = Awaited<ReturnType<typeof picture>>;

function frame(children: Node[]) {
  return h('div', {
    width: OG_WIDTH, height: OG_HEIGHT, display: 'flex', position: 'relative', fontFamily: 'Inter',
    backgroundColor: '#0D1B2A',
    backgroundImage: 'linear-gradient(105deg, #0D1B2A 0%, #0D1B2A 34%, #0E3A44 66%, #0F766E 100%)',
  },
  // glow behind the picture and the faint stripes
  h('div', { position: 'absolute', left: 0, top: 0, width: OG_WIDTH, height: OG_HEIGHT, display: 'flex',
    backgroundImage: 'radial-gradient(circle at 78% 60%, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0) 45%)' }),
  h('div', { position: 'absolute', left: 0, top: 0, width: OG_WIDTH, height: OG_HEIGHT, display: 'flex',
    backgroundImage: 'repeating-linear-gradient(-35deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 18px, rgba(255,255,255,0) 18px, rgba(255,255,255,0) 40px)' }),
  ...children,
  h('div', { position: 'absolute', left: 0, bottom: 0, width: OG_WIDTH, height: 14, display: 'flex', backgroundImage: STRIPE }));
}

function text(label: string, title: string, sub: string | undefined, width: number) {
  const size = title.length <= 28 ? 72 : title.length <= 48 ? 60 : title.length <= 72 ? 50 : 42;
  return h('div', { position: 'absolute', left: 72, top: 0, bottom: 14, width, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    h('div', { display: 'flex', alignItems: 'center', fontSize: 28, fontFamily: 'Bricolage', fontWeight: 800, color: INK },
      img(monogram, { height: 42, width: 30, marginRight: 12 }), label),
    h('div', { display: 'flex', fontFamily: 'Bricolage', fontWeight: 800, fontSize: size, lineHeight: 1.06, color: INK, marginTop: 26, letterSpacing: '-0.01em' }, title),
    sub ? h('div', { display: 'flex', fontSize: 26, lineHeight: 1.4, color: 'rgba(232,237,243,0.85)', marginTop: 22 }, sub) : '');
}

/** The picture on the right: cut-outs stand free on the bottom, photos sit in a rounded frame. */
function art(p: Picture) {
  if (p.cutout) {
    return h('div', { position: 'absolute', right: 48, top: 40, bottom: 26, width: 470, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' },
      img(p.src, { maxWidth: 470, maxHeight: 564, objectFit: 'contain', width: p.width, height: p.height }));
  }
  // photos and screenshots keep their aspect ratio, so text in them stays readable
  const w = Math.min(460, (420 * p.width) / p.height);
  const hgt = (w * p.height) / p.width;
  return h('div', { position: 'absolute', right: 56, top: (OG_HEIGHT - 14 - hgt) / 2, width: w, height: hgt, display: 'flex',
    borderRadius: 20, overflow: 'hidden', border: '3px solid #1B1A22', boxShadow: '6px 6px 0 #1B1A22' },
    img(p.src, { width: w, height: hgt }));
}

async function png(node: Node) {
  const svg = await satori(node as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/** Card for one page: label ("danwos · Blog"), title, optional sub line, picture. */
export async function card(label: string, title: string, sub: string | undefined, pic: Picture) {
  return png(frame([text(label, title, sub, 600), art(pic)]));
}

/** Default card: eyebrow, tagline and the crew. */
export async function crewCard(eyebrow: string, tagline: string, crew: Record<string, Picture>) {
  // positions as in the profile banners, crew box 520×340 scaled by 1.2
  const k = 1.2;
  const at = (p: Picture, left: number, bottom: number, height: number, z: number, flip = false) =>
    img(p.src, { position: 'absolute', left: 600 + left * k, bottom: 14 + bottom * k, height: height * k,
      width: (p.width / p.height) * height * k, zIndex: z, transform: flip ? 'scaleX(-1)' : undefined });
  return png(frame([
    h('div', { position: 'absolute', left: 72, top: 0, bottom: 14, width: 560, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
      h('div', { display: 'flex', alignItems: 'center', fontSize: 28, fontFamily: 'Bricolage', fontWeight: 800, color: INK },
        img(monogram, { height: 42, width: 30, marginRight: 12 }), 'danwos'),
      h('div', { display: 'flex', fontSize: 20, fontWeight: 600, letterSpacing: '0.1em', color: TEAL, marginTop: 30 }, eyebrow.toUpperCase()),
      h('div', { display: 'flex', fontFamily: 'Bricolage', fontWeight: 800, fontSize: 58, lineHeight: 1.08, color: INK, marginTop: 12 }, tagline)),
    at(crew.monsterbrain, 30, 60, 236, 1),
    at(crew.deciwa, 270, 58, 232, 1, true),
    at(crew.quawa, 0, 0, 168, 2),
    at(crew.faktwerk, 280, 0, 176, 2),
    at(crew.danwos, 132, 0, 330, 3),
  ]));
}
