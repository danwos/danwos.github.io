import type { ImageMetadata } from 'astro';

// Cut-out monsters, downscaled from the masters in the brain
// (danwos/50_assets/branding/monsters/).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/monsters/*.webp', { eager: true });

export const monsters: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace('.webp', ''), mod.default]),
);

export function monster(name: string): ImageMetadata {
  const img = monsters[name];
  if (!img) throw new Error(`Unknown monster "${name}" – add src/assets/monsters/${name}.webp`);
  return img;
}
