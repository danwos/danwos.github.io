---
title: "imwa"
subtitle: "impact watcher"
summary: "Zeigt mir jeden Tag, wie weit meine Arbeit reicht – Sterne, Besucher und woher sie kommen."
era: "internal"
status: "prototype"
monster: "imwa"
role: [created]
order: 10
---

## Warum imwa

Ich schreibe Blogposts, veröffentliche Doku und Code auf GitHub. Ob davon
etwas ankommt, verteilt sich auf viele Stellen: Sterne und Traffic bei GitHub,
Besucher in GoatCounter, Reaktionen auf LinkedIn. Jede Stelle zeigt ihren
eigenen Ausschnitt, und GitHub vergisst seinen Traffic nach zwei Wochen.

imwa sammelt das einmal am Tag ein und hebt es auf. So sehe ich auch nach
Monaten noch, ob ein Post die Besuche der Doku nach oben gezogen hat und
woher die Leute kommen.

## Wie es funktioniert

- **Jeden Morgen um acht** holt ein kleiner Sammler in Python die Zahlen:
  Sterne, Forks und Traffic der danwos-Repositories, Besucher und Herkunft von
  danwos.dev und den Tool-Dokus. War der Rechner aus, holt er das nach.
- **Die Daten liegen in meinem [monsterbrain](/de/tools/monsterbrain/)**, als
  JSON Lines, eine Datei pro Quelle und Monat, und werden committet. Die
  Historie bleibt lesbar und versioniert.
- **Datasette** macht daraus Diagramme und Tabellen; SQLite dient nur als
  Zwischenspeicher.
- **Agenten** fragen dieselben Zahlen über einen Skill ab: „Wie viele Besucher
  hatte die deciwa-Doku seit dem Post?“

## Warum es intern bleibt

imwa ist genau auf danwos zugeschnitten: auf meine Accounts, meine Seiten und
mein monsterbrain. Es läuft lokal, ohne Server und ohne Gebühren. Als Produkt
für andere taugt es so nicht – und das muss es auch nicht.

## Was noch fehlt

LinkedIn, mit Profil und Firmenseite, und die Google Search Console kommen
als Nächstes. npm und PyPI folgen, sobald das erste Paket veröffentlicht ist.
