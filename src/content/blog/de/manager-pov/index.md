---
title: "Aus Sicht des Managements: Was bringt Docs-as-Code?"
date: 2024-01-02
summary: "Ein erdachtes Gespräch mit dem Projektleiter eines Automotive-Softwareprojekts mit 500 Leuten: warum die Qualität der Dokumentation in Expertentools leidet und wie Docs-as-Code hilft."
tags: [docs-as-code, management, automotive]
cover: ../../../../assets/blog/manager-pov/02_manager_pov.png
original: en
legacy: posts/2024/manager_pov
---

In den letzten zwei, drei Jahren bestand ein großer Teil meiner Arbeit darin, Leute vom Docs-as-Code-Ansatz für ihre Softwareprojekte zu überzeugen. Schwierig sind dabei nicht die Entwicklerinnen und Entwickler – viele arbeiten längst so. Schwierig sind Teamleitungen und Management. Ihnen geht es selten um einzelne Features, sondern um Prozesse, Compliance und die Integration in die Toolchain. Und natürlich um die Frage aller Fragen: Was bringt es finanziell?

Wenn du also CEO, Manager oder Teamleitung bist oder einfach das große Ganze verstehen willst: Hol dir einen Kaffee oder Tee, lehn dich zurück, und ich erkläre dir, wie Docs-as-Code Geld spart und trotzdem die Qualität des Produkts erhöht.

Dafür nehme ich ein erdachtes, gekürztes Gespräch zwischen einem Projektleiter und mir. So kannst du einzelne Fragen leicht überspringen und den Text später als Nachschlagewerk für Argumente in eigenen Diskussionen nutzen.

Der Inhalt beruht auf Gesprächen, die ich mit mehreren Softwareteams geführt habe.

**Das Szenario:** Ein deutscher Automobilzulieferer (Tier 1: liefert direkt an mehrere Autohersteller, die OEMs) entwickelt Embedded Software für ein Steuergerät (ECU). Das Team umfasst **rund 500 Software Engineers** an **3 Standorten** (Deutschland, Indien, USA).

Mein Gesprächspartner ist Peter Heinzel, der Projektleiter. Er verantwortet die pünktliche Lieferung, das Budget und die Einhaltung der gesetzlichen Vorgaben für eine solche Softwareentwicklung.

---

**Ich:** Herr Heinzel, danke für die Einladung und die Gelegenheit, mit Ihnen über Docs-as-Code zu sprechen. Ich bin gespannt auf Ihr Projekt und seine besonderen Anforderungen.

**Herr Heinzel:** Danke, dass Sie da sind. Unser Projekt ist recht komplex: 500 Software Engineers an 3 Standorten in 3 Zeitzonen. Zum Glück nutzen alle dieselbe technische Infrastruktur. Einige meiner Kernentwickler haben gefragt, ob wir unsere Softwareprojekte mit Docs-as-Code dokumentieren und steuern könnten. Ehrlich gesagt habe ich davon vorher noch nie gehört.

**Ich:** Ich gebe Ihnen gleich eine kurze Einführung. Damit ich weiß, worauf ich den Fokus lege, erst ein, zwei Fragen. **Ihr Unternehmen hat vermutlich schon Lösungen für Dokumentation und Projektsteuerung. Warum der Wechsel?**

**Herr Heinzel:** Sagen wir es so: Das Vorgängerprojekt lief nicht gut. Wir haben alle gesetzlichen Vorgaben erfüllt, aber mit viel Nacharbeit am Projektende – um die nötige Dokumentation zu erstellen oder Qualitätsprobleme in den vorhandenen Daten zu beheben. Das hat uns einige zusätzliche Wochen und mehrere interne und externe Audits gekostet, bis alle zumindest mit dem Mindestmaß an Compliance zufrieden waren.

**Ich:** Lag das daran, dass **die falschen Tools im Einsatz waren, die die nötigen Features nicht hatten?**

**Herr Heinzel:** Oh nein, wir haben **viel Geld für Lizenzen ausgegeben, um das Beste vom Besten zu bekommen.** Bei den meisten Expertentools hatten wir Lösungen von Marktführern, die alle nötigen Features boten. Aber die Datenqualität in diesen Tools war schlecht. Das klingt nach einem Problem auf unserer Seite – wir waren ja dafür verantwortlich, die Daten einzupflegen. Und ja, offenbar hat das niemand oft genug getan. Wir haben Prozesse geändert und mehr Leute auf die Pflege gesetzt. Das hat ein bisschen geholfen, aber Budget für so lange, ungeplante Maßnahmen zu bekommen, war auch nicht leicht. Und ehrlich gesagt sehe ich nicht, **was ein Tool-Wechsel daran ändern soll.**

**Ich:** Genau hier kann Docs-as-Code helfen. Aber zuerst: **Ihnen haben nicht Features gefehlt, sondern Benutzbarkeit und Attraktivität.** Die meisten Expertentools sind genau das: Tools für Experten. Gebaut für den täglichen Einsatz und für Leute, die die Oberfläche genau kennen. Sie bieten Lösungen für jede denkbare Anforderung, auch für solche, die ein Projekt gar nicht braucht. Für Leute, die eigentlich für etwas anderes zuständig sind, ist das schwer. Darf ich fragen: **Wer schreibt die Software-Anforderungen, und wie sieht der Änderungsprozess aus?**

**Herr Heinzel:** Wir haben Anforderungen auf mehreren Ebenen. Für die Systemanforderungen ist ein Requirements Engineer zuständig. Sie oder er legt die Anforderung in unserem Expertentool an und markiert die Softwarekomponenten, die etwas umsetzen müssen. Die Komponentenleitungen werden informiert, und ihr Team muss die Systemanforderung herunterbrechen und die interne Architektur der Komponente beschreiben. Diese Komponentenanforderungen und jede Änderung prüft der System Engineer erneut und muss sie freigeben. Danach plant das Team die Umsetzung in unserem Ticketsystem.

**Ich:** Das heißt, jemand, der kein Anforderungsexperte ist, muss im Expertentool eines Requirements Engineers arbeiten. Und Anforderungen einer Softwarekomponente ändern sich nicht so oft – vielleicht drei- bis viermal im Monat. Gibt es im Komponententeam meist eine Person, die die Anforderungen pflegt, **oder muss jedes Teammitglied Anforderungen selbst ändern können?**

**Herr Heinzel:** Da es in einem Komponententeam Spezialisten für einzelne Bereiche gibt, müssen diese ihre Anforderungen selbst pflegen.

**Ich:** Ehrlich gesagt gefällt mir das. Aber es bedeutet, dass jede einzelne Entwicklerin und jeder Entwickler das Anforderungstool, seinen Prozess und seine Oberfläche kennen muss. **Und das zusätzlich zu allem, was sie für ihre eigenen Tools und Prozesse wissen müssen.**

**Herr Heinzel:** **Sie meinen, sie leben in zwei Welten, in denen die Daten zusammenhängen, die Tools und Prozesse aber nicht?**

**Ich:** Genau. Ich nenne das den „Tool- und Prozessbruch“: Man muss Daten unbequem in Tool A pflegen, nur damit sie später in Tool B genutzt werden. Entsprechend gering ist die Motivation, diese Daten zu pflegen – und entsprechend schlecht die Datenqualität. Genau das ist in Ihrem letzten Projekt passiert.

**Herr Heinzel:** **Dann müssen wir also unseren Prozess so ändern, dass jede Rolle nur noch ihr eigenes Expertentool braucht?**

**Ich:** Schön wär's, aber das geht nicht. Entwickler zum Beispiel haben Fachwissen für ihren Bereich und kümmern sich um alles darin: von der ersten Idee über Architektur und Umsetzung bis zu den Tests und vielleicht der Kundendokumentation. Das lässt sich nicht aufteilen – aber sie sollten nicht für jeden Schritt ein anderes Tool benutzen müssen.

**Herr Heinzel:** **Wir brauchen also ein neues Tool, das alles vereint? Anforderungen, Architektur, Code, Tests …?**

**Ich:** Warum nicht eines der vorhandenen Tools nehmen? Für Entwickler ist das ihr Editor – ihre **IDE**, die **I**ntegrated **D**evelopment **E**nvironment. **Und genau hier kommt Docs-as-Code ins Spiel.**

**Herr Heinzel:** Sie meinen, weil die Dokumentation wie Code behandelt wird, **können wir den Code-Editor nutzen, den wir schon haben?**

**Ich:** Ja, und nicht nur den Editor. Die meisten Tools, Prozesse und Workflows lassen sich weiterverwenden.

Nehmen Sie ein Code-Review. Weil die Doku im selben Repository liegt wie der Code, prüfen Sie beides im selben Schritt. Ein Feature wurde umgesetzt, aber der Change Request enthält nur Quellcode – keine Tests, keine Doku? Abgelehnt.

Die CI führt ohnehin die Tests aus – warum nicht auch die Doku prüfen und ob alle Verweise noch stimmen?

Sie können sogar Teile des Quellcodes in der Dokumentation wiederverwenden. Eine API müssen Sie nicht zweimal erklären, einmal im Code und einmal im Handbuch. Mit Docs-as-Code folgen Sie leicht dem Prinzip „Single Source of Truth“.

**Herr Heinzel:** Und das geht? Alle nötigen Features im Editor?

**Ich:** Ja. Wir nutzen zum Beispiel den Dokumentationsgenerator Sphinx. Er erzeugt aus derselben Quelle HTML-Seiten, PDFs und andere Formate. Es gibt über 600 Erweiterungen und Themes für neue Features und Layouts. Und das Beste: Das meiste davon ist Open Source, also ohne Lizenzkosten.

**Herr Heinzel:** Für Endanwender-Dokumentation, die einmal geschrieben und selten geändert wird, kann ich mir das vorstellen. Aber was ist mit Projektdokumentation, also Anforderungen und Testergebnissen? Und denken Sie an Traceability und die Einhaltung gängiger Standards. Geht das auch im Editor?

**Ich:** Ja. Die Erweiterung [Sphinx-Needs](https://sphinx-needs.com) etwa erlaubt es, verschiedene Arten von Objekten anzulegen, zu konfigurieren und zu verlinken. Sie läuft bereits in Automotive-Softwareprojekten mit über 40.000 Anforderungen plus Spezifikationen und Testfällen – insgesamt rund 150.000 Objekten. Alle sind miteinander verlinkt und lassen sich in Tabellen, Flussdiagrammen und vielem mehr darstellen. Docs-as-Code kann Sie also auch bei einer lebendigen Projektdokumentation unterstützen.

**Herr Heinzel:** Klingt gut, aber **ich kann nicht glauben, dass sich alle Features von Expertentools mit Docs-as-Code umsetzen lassen** – oder in diesem Fall mit Sphinx.

**Ich:** Stimmt, nicht alles geht. Vor allem historische Daten auszuwerten ist nicht einfach, aber machbar. Mit Docs-as-Code arbeiten Sie normalerweise auf einem ausgecheckten Branch des Repositorys, also mit den Daten eines bestimmten Zeitpunkts. Die Docs-as-Code-Tools sehen nur diese Daten; von älteren Ständen oder parallelen Branches wissen sie nichts. Das ist ein Expertenfeature – aber Erweiterungen wie Sphinx-Needs arbeiten bereits daran.

Für den Moment muss ich leider sagen: **Fortsetzung folgt …**
