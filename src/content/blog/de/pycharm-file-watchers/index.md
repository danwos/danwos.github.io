---
title: "PyCharm File Watchers für Sphinx-Projekte"
date: 2021-11-05
summary: "Die Sphinx-Doku so schnell wie möglich sehen: Ein File Watcher in PyCharm baut das HTML bei jeder Änderung neu – mit allen Erweiterungen und deinem gewohnten Build-Befehl."
tags: [sphinx, pycharm, automation]
original: en
legacy: posts/2021/pycharm_file_watchers
---

Ich will meine Dokumentation oft so schnell wie möglich sehen.

Es gibt Preview-Erweiterungen für IDEs, die genau das versprechen. Aber alle haben eines dieser Probleme:

- Sie unterstützen oft nur Standard-rst, also keine Sphinx-Erweiterungen.
- Ihr Vorschaufenster lässt sich nicht so platzieren, wie ich es brauche.
- Sie erzwingen oft einen kompletten Build, weil ihr Build-Befehl ein anderer ist als meiner.
- Ich will das Ergebnis in einem normalen Browserfenster sehen und die Seite dort debuggen können, etwa um CSS zu prüfen.

Meine Lösung: die eingebauten File Watchers von PyCharm.

Öffne *File → Settings → File Watchers*.

![Der Bereich File Watchers in den Einstellungen](../../../../assets/blog/pycharm-file-watchers/1_general_settings.png)

Leg einen neuen Watcher an (Plus-Zeichen) und wähle `<custom>`.

![Auswahl der Vorlage für den File Watcher](../../../../assets/blog/pycharm-file-watchers/2_select_custom.png)

Setz `File Type` auf `All`.

Konfigurier den `Scope` des Projekts. Er legt fest, wann der Watcher auslöst.

Wähle deinen Ordner `docs` und klick auf `Include recursively`.

Wähle dann den Ordner `_build` innerhalb von `docs` und schließ ihn mit `Exclude recursively` aus. Das ist wichtig: Sonst hängt der Watcher in einer Schleife, weil er Dateien unter `_build` ändert und sich damit selbst wieder auslöst.

![Festlegen des Scopes](../../../../assets/blog/pycharm-file-watchers/3_project_scope.png)

Zurück zur Konfiguration des File Watchers.

Wähle unter `Program` den Befehl `sphinx-build` aus deiner Python-Umgebung.

Setz als Argumente `-b html . _build/html` und als `Working Directory` den Ordner `docs/`.

Wähle unter `Advanced Options` bei `Show console` den Wert `Always`. So siehst du das Ergebnis jedes Builds.

![Die fertigen Einstellungen](../../../../assets/blog/pycharm-file-watchers/4_final_settings.png)

Nach dem Speichern mit `OK` fragt ein kleines Popup unten rechts, ob du den File Watchers des Projekts vertraust.

![File Watchers vertrauen?](../../../../assets/blog/pycharm-file-watchers/5_trust_watchers.png)

Das war's. Die erzeugte Seite musst du natürlich trotzdem selbst im Browser öffnen.
