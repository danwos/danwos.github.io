// Example quality data for the views page: the criteria of a pull request with their parts
// and a score from 0 to 100 each. Shown by QualityRoll and QualityNetwork; all numbers are made up.
import type { Lang } from '../i18n';
import type { Disc } from './roll3d';

type Part = { de: string; en: string; v: number };
export const criteria: { de: string; en: string; parts: Part[] }[] = [
  { de: 'Tests', en: 'Tests', parts: [
    { de: 'Unit', en: 'Unit', v: 92 }, { de: 'Integration', en: 'Integration', v: 81 }, { de: 'System', en: 'System', v: 64 } ] },
  { de: 'Docs', en: 'Docs', parts: [
    { de: 'API', en: 'API', v: 88 }, { de: 'Handbuch', en: 'User guide', v: 72 }, { de: 'Changelog', en: 'Changelog', v: 95 } ] },
  { de: 'Requirements', en: 'Requirements', parts: [
    { de: 'Abdeckung', en: 'Coverage', v: 86 }, { de: 'Drift', en: 'Drift', v: 68 }, { de: 'Traceability', en: 'Traceability', v: 91 } ] },
  { de: 'Codequalität', en: 'Code quality', parts: [
    { de: 'Komplexität', en: 'Complexity', v: 82 }, { de: 'Duplikate', en: 'Duplication', v: 90 }, { de: 'Stil', en: 'Style', v: 97 } ] },
  { de: 'Wartbarkeit', en: 'Maintainability', parts: [
    { de: 'Kopplung', en: 'Coupling', v: 76 }, { de: 'Abhängigkeiten', en: 'Dependencies', v: 84 } ] },
  { de: 'UI & UX', en: 'UI & UX', parts: [
    { de: 'Barrierefreiheit', en: 'Accessibility', v: 63 }, { de: 'Konsistenz', en: 'Consistency', v: 85 }, { de: 'Markenfarben', en: 'Brand colors', v: 93 } ] },
  { de: 'Security', en: 'Security', parts: [
    { de: 'Schwachstellen', en: 'Vulnerabilities', v: 89 }, { de: 'Secrets', en: 'Secrets', v: 100 }, { de: 'Statische Analyse', en: 'Static analysis', v: 79 } ] },
  { de: 'Legal', en: 'Legal', parts: [
    { de: 'Lizenzen', en: 'Licenses', v: 34 }, { de: 'Copyright-Hinweise', en: 'Copyright notices', v: 90 } ] },
];

/** The criteria in one language; `score` replaces the example scores (disc index, part index). */
export const discsFor = (lang: Lang, score?: (d: number, p: number) => number): Disc[] =>
  criteria.map((c, d) => ({ name: c[lang], parts: c.parts.map((p, k) => ({ name: p[lang], v: score ? score(d, k) : p.v })) }));

/** Fixed pseudo-random numbers, so every build shows the same picture. */
export function random(seed: number) {
  return () => (seed = (seed * 48271) % 2147483647) / 2147483647;
}
