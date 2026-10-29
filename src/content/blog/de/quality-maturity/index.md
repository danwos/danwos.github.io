---
title: "Wie roh ist deine Software? Qualitätsreife sichtbar machen"
date: 2026-10-29
summary: "Grün oder rot reicht nicht, wenn Software grob über das Ganze wächst. Ich will auf einen Blick sehen, wo ein Tool steht, wo es hin will und woran schon gedacht ist – als Ringe um sein Logo."
tags: [ai, vibe-coding, quality, tools]
cover: ../../../../assets/blog/quality-maturity/danwos-rings.webp
---

Ein Bildhauer sieht jederzeit, wo seine Figur noch roh ist. Bei Software sehe ich das nicht. Ein Feature, das eine AI in einer Stunde gebaut hat, sieht fertig aus. Die Tests laufen grün. Und trotzdem weiß ich nicht, ob da schon jemand anderes weiterbauen kann, ob die Lizenzen der Abhängigkeiten passen oder ob die Tests überhaupt etwas prüfen.

Wer [wie ein Bildhauer](/de/blog/sculpting-software/) baut – erst das Ganze grob, dann Runde für Runde feiner –, braucht dafür einen Blick, den der klassische Build nicht liefert.

## Grün und rot sind zu wenig

Die meisten Qualitätsprüfungen kennen zwei Zustände: bestanden oder nicht. Das passt, wenn ein Produkt fertig sein soll. Am Anfang eines Tools ist dagegen fast alles rot. Es gibt noch keine Integrationstests, keine Architekturdoku, keine Lizenzprüfung – und das ist auch völlig in Ordnung, denn niemand verlangt das in Woche zwei.

Ein rotes Signal, das sowieso jeder erwartet, ignoriert man nach drei Tagen. Oder man schaltet die Prüfung ab, bis „es so weit ist“. Beides heißt: Ich sehe nicht mehr, wo ich stehe.

Ich will deshalb immer alles messen, auch das, was heute noch niemand fordert. Eine Lücke ist dabei eine Information, kein kaputter Build. Entscheidend ist der Abstand zum Ziel, das ich mir für jetzt gesetzt habe – und wie er sich mit der Zeit verändert.

## Fünf Reifegrade

Einzelne Tests reichen dafür nicht. Am Ende habe ich Hunderte Ergebnisse – Unit-Tests, Lizenzen, Linting, Doku, Security – und keines davon sagt mir, wie weit das Tool insgesamt ist. Stufen fassen all das in einer Aussage zusammen: „Dokumentation steht bei 1, Security bei 4.“

Stufen zeigen auch, dass ich nicht alles auf einmal brauche. Für ein frühes Tool genügt die erste, die nächsten kommen, wenn sie dran sind. Gleichzeitig halten sie mich an, eine Stufe wirklich fertig zu machen – mit allen Details –, statt schon an der nächsten zu basteln, während unten noch Lücken sind.

Die Stufen beschreiben einen Zustand, keinen Arbeitsschritt:

| Stufe | Zustand |
|---|---|
| 0 Vibe code | was eben da ist |
| 1 Sketched | grob da – man sieht, was es werden soll |
| 2 Shaped | die Form steht und hält |
| 3 Solid | trägt Last, bereit für echte Nutzer |
| 4 Refined | im Detail durchgearbeitet, auch an den schwierigen Stellen |
| 5 Audited | von außen bestätigt |

Bewusst steht da nicht „getestet“ oder „dokumentiert“. Jeder Bereich füllt eine Stufe mit eigenen Messungen. „Solid“ heißt beim Testen: Integrations- und End-to-End-Tests laufen. Bei Lizenzen heißt es: Alle Abhängigkeiten sind gegen meine Regeln geprüft. Ein Wort wie „getestet“ würde nur zu einem der beiden passen.

Acht Bereiche teilen sich das Bild: Anforderungen, Dokumentation, Tests, Code-Qualität, Security, Recht, Produkt und UX sowie Build und Release. Jede Stufe bringt pro Bereich neue Messungen dazu, und eine Stufe gilt erst als erreicht, wenn auch alle darunter erfüllt sind.

## Der Stand auf einen Blick

![Reifegrad-Ringe von deciwa](../../../../assets/blog/quality-maturity/rings-front.png)

So könnte das für deciwa aussehen, mein Review-Tool. Die Werte sind ein ausgedachtes Beispiel, keine echte Messung – sie zeigen alle Zustände auf einmal. In der Mitte steht das Tool, um es herum ein Ring pro Stufe, von innen nach außen. Jedes Tortenstück ist ein Bereich.

- **Der dicke Block** von der Mitte nach außen zeigt, was erreicht ist. Security steht bei Stufe 4, Recht bei 3, Dokumentation erst bei 1. Das Bild bekommt Berge und Täler, und ich sehe sofort, wo das Tool schwach ist.
- **Darüber** zeigt jede weitere Stufe ihren eigenen Stand: rot, wenn die Messungen weit weg sind, orange, wenn es knapp wird. Auch Stufen weit über dem Ziel werden gemessen – die Mutationstests auf Stufe 4 laufen schon, obwohl auf Stufe 3 noch etwas fehlt.
- **Grau** zeigt, woran schon gedacht ist. Dunkelgrau heißt, die Messung ist festgelegt, aber es gibt noch kein Ergebnis. Hellgrau gestrichelt heißt, das Modell fordert etwas, aber im Projekt ist noch nicht beschrieben, wie es gemessen wird. Rot schraffiert heißt, die Messung selbst ist kaputt.
- **Die Linien** zeigen das Ziel: Die dicke Linie markiert, was heute gilt, die gestrichelte, wohin das Projekt am Ende will. Was dazwischen liegt, ist geplant – mit Datum oder Release: „Stufe 3 ab März 2027, Stufe 4 ab Version 1.0“. Stufe 5 ist bei deciwa gar nicht vorgesehen und bleibt ein gepunkteter Rand.

Ein Bild beantwortet damit drei Fragen: Wo steht das Tool? Wo will es hin? Und worüber habe ich mir schon Gedanken gemacht?

![Legende](../../../../assets/blog/quality-maturity/rings-legend.png)

## Vergleichbar bleiben

Jedes Projekt legt selbst fest, wie es misst. Dürfte es auch bestimmen, *was* auf welcher Stufe gemessen wird, hätte jedes Tool seine eigene „Stufe 3“ – und die Ringe zweier Tools ließen sich nicht mehr vergleichen.

Deshalb gibt es ein festes danwos-Modell. Es legt fest, was ab welcher Stufe gemessen wird, zum Beispiel Linting und Unit-Tests ab Stufe 2. Das Projekt sagt nur noch, *woher* die Messungen kommen: welcher Testlauf, welcher Report, welches Werkzeug. Strenger darf es sein, eigene Messungen darf es dazunehmen. Schwächer nicht.

Wer sich daran hält, bekommt die danwos-Farben – Terrakotta bis Petrol. Wer abweicht, bekommt ein ganz normales Rot-Grün. Die Farbe wird so zu einem kleinen Siegel: Sie zeigt, dass die Stufen nach denselben Regeln entstanden sind.

![Gleiche Ergebnisse, zwei Konfigurationen](../../../../assets/blog/quality-maturity/rings-compare.png)

## Weniger ist manchmal mehr

Nicht überall ist Platz für das ganze Bild. Für eine Karte oder ein Badge im README gibt es zwei schlanke Varianten. Die eine zeigt nur, was erreicht ist – die Berge und Täler. Die andere zeigt alles bis zum heutigen Ziel und schneidet den Rest ab. Sie beantwortet die Frage: Was schulde ich heute?

![Volle Ansicht und zwei schlanke Varianten](../../../../assets/blog/quality-maturity/rings-variants.png)

## Gegen grüne Haken ohne Inhalt

Sobald AI-Agents auf grüne Ringe hinarbeiten, schreiben sie Tests, die nichts prüfen, und Dokumentation, die nur existiert. Deshalb gehören Prüfungen, die genau das aufdecken, fest ins Modell: Mutationstests zeigen, ob Tests wirklich testen, und AI-gestützte Bewertungen zeigen, ob die Doku jedes Feature abdeckt. Beides steht auf den höheren Stufen – und wird trotzdem von Anfang an gemessen.

## Wie es weitergeht

Das Modell wandert in [quawa](/de/tools/quawa/). quawa liest pro Repository, woher die Messungen kommen und welche Stufe ab wann gilt, führt die Prüfungen aus und zeichnet die Ringe. Das erste Tool, das sich daran messen lässt, ist [deciwa](/de/tools/deciwa/) – es ist öffentlich, also soll jeder sehen können, wie reif es ist. Danach folgen quawa selbst – ein Tool, das Reife misst, sollte seine eigene zeigen können – und monsterbrain.
