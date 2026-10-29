// Example maturity data for the views page: the danwos@1 model (areas × levels × measures) and
// six tools with their results. Shown by MaturityRings and MaturityRoom; all numbers are made up.
// The model has 1–3 measures per cell; the further measures here only show the range of a column.
import type { Lang } from '../i18n';
import { random } from './quality';

type Name = [en: string, de: string];
export const areas: Name[] = [
  ['Requirements', 'Requirements'], ['Documentation', 'Dokumentation'], ['Testing', 'Tests'], ['Code health', 'Codequalität'],
  ['Security', 'Security'], ['Legal', 'Legal'], ['Product & UX', 'Produkt & UX'], ['Build & release', 'Build & Release'],
];

// per area and level the measures that level adds
const model: Name[][][] = [
  [[['feature descriptions', 'Feature-Beschreibungen'], ['main features listed', 'Hauptfeatures gelistet']],
    [['all features described', 'alle Features beschrieben'], ['user stories linked', 'User Stories verlinkt'], ['glossary', 'Glossar']],
    [['traceability', 'Traceability'], ['stable requirement IDs', 'stabile Requirement-IDs'], ['tests per requirement', 'Tests je Requirement'], ['review comments resolved', 'Review-Kommentare erledigt']],
    [['acceptance criteria', 'Abnahmekriterien'], ['criteria verified', 'Kriterien geprüft'], ['decisions logged', 'Entscheidungen festgehalten'], ['non-functional reqs', 'nichtfunktionale Anforderungen'], ['change history', 'Änderungshistorie']],
    [['review & approval', 'Review & Freigabe'], ['change impact', 'Änderungsauswirkung'], ['external sign-off', 'externe Abnahme']]],
  [[['README', 'README'], ['start steps', 'Startschritte']],
    [['developer docs', 'Entwicklerdoku'], ['setup guide', 'Setup-Anleitung'], ['structure', 'Struktur'], ['docs build clean', 'Doku baut ohne Warnungen']],
    [['covers every feature', 'deckt jedes Feature ab'], ['AI rating ≥ 70', 'KI-Bewertung ≥ 70'], ['screenshots current', 'Screenshots aktuell'], ['links valid', 'Links gültig'], ['changelog readable', 'Changelog lesbar'], ['FAQ', 'FAQ']],
    [['architecture', 'Architektur'], ['decisions', 'Entscheidungen'], ['API reference', 'API-Referenz'], ['diagrams current', 'Diagramme aktuell']],
    [['tested with users', 'mit Nutzern getestet'], ['examples executed', 'Beispiele ausgeführt'], ['translations', 'Übersetzungen']]],
  [[['smoke test', 'Smoke-Test'], ['--help runs', '--help läuft']],
    [['unit tests', 'Unit-Tests'], ['coverage ≥ 30 %', 'Abdeckung ≥ 30 %'], ['tests in CI', 'Tests in der CI']],
    [['integration', 'Integration'], ['E2E', 'E2E'], ['coverage ≥ 60 %', 'Abdeckung ≥ 60 %'], ['test data managed', 'Testdaten verwaltet'], ['contract tests', 'Contract-Tests']],
    [['mutation ≥ 60 %', 'Mutation ≥ 60 %'], ['coverage ≥ 80 %', 'Abdeckung ≥ 80 %'], ['flake rate < 2 %', 'Flake-Rate < 2 %'], ['property tests', 'Property-Tests'], ['error paths', 'Fehlerpfade'], ['fuzzing', 'Fuzzing'], ['test speed', 'Testdauer']],
    [['all platforms', 'alle Plattformen'], ['performance baseline', 'Performance-Baseline'], ['mutation ≥ 80 %', 'Mutation ≥ 80 %'], ['load test', 'Lasttest'], ['soak test', 'Dauertest']]],
  [[['formatter', 'Formatter']],
    [['lint', 'Lint'], ['type check', 'Typprüfung'], ['no dead code', 'kein toter Code']],
    [['complexity', 'Komplexität'], ['duplication', 'Duplikate'], ['file size', 'Dateigröße'], ['naming rules', 'Namensregeln']],
    [['static analysis', 'statische Analyse'], ['dependency rules', 'Abhängigkeitsregeln'], ['layer rules', 'Schichtregeln'], ['TODO debt', 'TODO-Schulden'], ['API stability', 'API-Stabilität']],
    [['every change reviewed', 'jede Änderung reviewt'], ['second agent review', 'Review durch zweiten Agenten']]],
  [[['no secrets', 'keine Secrets']],
    [['dependencies', 'Abhängigkeiten'], ['lockfile', 'Lockfile'], ['pinned actions', 'gepinnte Actions']],
    [['SAST', 'SAST'], ['input validation', 'Eingabeprüfung'], ['auth checks', 'Auth-Prüfungen'], ['security headers', 'Security-Header']],
    [['threat model', 'Bedrohungsmodell'], ['update process', 'Update-Prozess'], ['secret rotation', 'Secret-Rotation'], ['minimal permissions', 'minimale Rechte'], ['signed commits', 'signierte Commits'], ['SBOM scan', 'SBOM-Scan']],
    [['external audit', 'externes Audit'], ['pen test', 'Pentest']]],
  [[['own licence', 'eigene Lizenz'], ['SPDX headers', 'SPDX-Header']],
    [['licence inventory', 'Lizenzinventar']],
    [['licence rules', 'Lizenzregeln'], ['notices complete', 'Hinweise vollständig']],
    [['SBOM', 'SBOM'], ['third-party notices', 'Drittanbieter-Hinweise'], ['data inventory', 'Datenverzeichnis'], ['GDPR notes', 'DSGVO-Hinweise']],
    [['legal review', 'rechtliche Prüfung']]],
  [[['version number', 'Versionsnummer'], ['help dialog', 'Hilfedialog'], ['start page', 'Startseite'], ['shortcuts', 'Shortcuts']],
    [['branding defined', 'Branding festgelegt'], ['branding checked', 'Branding geprüft'], ['icons', 'Icons'], ['colour tokens', 'Farb-Tokens']],
    [['WCAG automatic', 'WCAG automatisch'], ['translations', 'Übersetzungen'], ['keyboard use', 'Tastaturbedienung'], ['empty states', 'leere Zustände'], ['error messages', 'Fehlermeldungen'], ['dark mode', 'Dark Mode'], ['responsive', 'responsiv']],
    [['UX rating ≥ 70', 'UX-Bewertung ≥ 70'], ['brand feel ≥ 70', 'Markengefühl ≥ 70'], ['manual a11y check', 'manuelle Barrierefreiheitsprüfung']],
    [['user test', 'Nutzertest'], ['findings handled', 'Befunde bearbeitet']]],
  [[['clean build', 'sauberer Build'], ['README steps work', 'README-Schritte funktionieren']],
    [['version number', 'Versionsnummer'], ['changelog', 'Changelog'], ['one command', 'ein Befehl']],
    [['release automated', 'Release automatisiert'], ['artefacts per platform', 'Artefakte je Plattform'], ['release notes', 'Release Notes']],
    [['signed builds', 'signierte Builds'], ['reproducible', 'reproduzierbar'], ['update path', 'Update-Pfad'], ['rollback tested', 'Rollback getestet']],
    [['crash reporting', 'Absturzberichte'], ['rollback', 'Rollback'], ['support process', 'Support-Prozess']]],
];

/** score 0–100, 'nd' = defined, no result; 'ud' = not defined yet; 'err' = the check could not run */
export type Value = number | 'nd' | 'ud' | 'err';
export type Measure = { name: string; v: Value; regression?: boolean };
export type Tool = { name: string; img?: string; target: number; final: number; levels: string[]; areas: string[]; results: Measure[][][] };
type Raw = Value | { v: Value; regression?: boolean };

const lix = (lang: Lang) => (lang === 'en' ? 0 : 1);

function results(lang: Lang, values: Raw[][][]): Measure[][][] {
  return model.map((area, a) => area.map((names, l) => names.map((name, j) => {
    const raw = values[a]?.[l]?.[j] ?? 'ud';
    return { name: name[lix(lang)], ...(typeof raw === 'object' ? raw : { v: raw }) };
  })));
}

/** Invented but plausible results: every area reaches its level, the next one is in progress, above it mostly grey. */
function generate(seed: number, reach: number[], final: number): Raw[][][] {
  const rnd = random(seed);
  return model.map((area, a) => area.map((names, l) => names.map((_, j): Raw => {
    const lvl = l + 1;
    if (lvl <= reach[a]) return 100;
    if (lvl === reach[a] + 1) return j === 0 || rnd() < 0.4 ? Math.round(45 + rnd() * 50) : 100;
    if (lvl > final) return 'ud';
    const r = rnd();
    if (lvl === reach[a] + 2) return r < 0.3 ? Math.round(55 + rnd() * 45) : r < 0.7 ? 'nd' : r < 0.78 ? 'err' : 'ud';
    return r < 0.1 ? Math.round(60 + rnd() * 40) : r < 0.35 ? 'nd' : 'ud';
  })));
}

const U = 'ud';
// deciwa: the example of the blog post "How Immature Is Your Software?", one regression added
const deciwa: Raw[][][] = [
  [[100, 100], [80, 40, 60], ['nd', 'nd', 'nd', 'nd'], [], []],
  [[100, 100], [30, 40, 25, { v: 20, regression: true }], ['nd', 'nd', 'nd', 'nd', 'nd', 'nd'], [], []],
  [[100, 100], [100, 100, 100], [], [100, 'nd', 72, 100, 90, 'nd', 85], []],
  [[100], [100, 100, 100], [90, 80, 100, 70], ['nd', U, 'nd'], []],
  [[100], [100, 100, 100], [100, 100, 100, 100], [100, 100, 100, 100, 100, 100], []],
  [[100, 100], [100], [100, 100], ['nd', U, 'nd'], []],
  [[100, 100, 100, 100], [70, 60, 100, 80], [40, 95, 60, 100, 'nd', 30, 85], [], []],
  [[100, 100], [100, 100, 100], [100, 100, 100], ['err', 'err', 'err', 'err'], []],
];

const tools: { name: string; img?: string; target: number; final: number; values: Raw[][][]; plan?: [string, string][] }[] = [
  { name: 'deciwa', img: 'deciwa', target: 2, final: 4, values: deciwa,
    plan: [['', ''], ['current target', 'aktuelles Ziel'], ['from 2027-03', 'ab 2027-03'], ['from release 1.0', 'ab Release 1.0'], ['not targeted', 'nicht angestrebt']] },
  { name: 'monsterbrain', img: 'monsterbrain', target: 3, final: 4, values: generate(7, [3, 3, 3, 4, 3, 3, 3, 3], 4) },
  { name: 'quawa', img: 'quawa', target: 2, final: 4, values: generate(11, [1, 1, 2, 2, 1, 1, 1, 1], 4) },
  { name: 'faktwerk', img: 'faktwerk', target: 1, final: 3, values: generate(23, [1, 0, 0, 1, 1, 1, 1, 0], 3) },
  { name: 'Horus', target: 2, final: 3, values: generate(31, [1, 1, 1, 2, 1, 2, 2, 1], 3) },
  { name: 'danwos.dev', img: 'danwos', target: 3, final: 5, values: generate(43, [2, 3, 1, 2, 3, 3, 4, 3], 5) },
];

/** The tools in one language; `img` maps the monster name to its built image URL. */
export const toolsFor = (lang: Lang, img: Record<string, string>): Tool[] =>
  tools.map((t) => ({
    name: t.name, img: t.img && img[t.img], target: t.target, final: t.final,
    levels: [1, 2, 3, 4, 5].map((l) => {
      const p = t.plan?.[l - 1]?.[lix(lang)];
      return p ? `L${l} · ${p}` : `L${l}`;
    }),
    areas: areas.map((n) => n[lix(lang)]),
    results: results(lang, t.values),
  }));

/** Highest level whose measures and all below are at 100. */
export function reachedLevel(tool: Tool, a: number) {
  let k = 0;
  for (let l = 0; l < Math.min(5, tool.final); l++) {
    if (tool.results[a][l].every((m) => m.v === 100)) k = l + 1; else break;
  }
  return k;
}

/** Segment of one level: mean of its measures, open or broken ones count 0; grey/hatched only without any result. */
export function aggregate(ms: Measure[]): { kind: 'score' | 'nd' | 'ud' | 'err'; v?: number } {
  const nums = ms.map((m) => m.v).filter((v): v is number => typeof v === 'number');
  if (nums.length) return { kind: 'score', v: Math.round(nums.reduce((a, b) => a + b, 0) / ms.length) };
  const k = ms.map((m) => m.v);
  return { kind: k.includes('err') ? 'err' : k.includes('nd') ? 'nd' : 'ud' };
}

/** Overall level of a tool: the weakest area. */
export const overall = (tool: Tool) => Math.min(...tool.areas.map((_, a) => reachedLevel(tool, a)));
