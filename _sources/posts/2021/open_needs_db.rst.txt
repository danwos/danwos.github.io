:author: Daniel Woste
:tags: openneeds, requirements, sphinx
:date: 2021-11-29

Open-Needs-DB gets funded
=========================

.. image:: _images/post_icons/open_needs_funded.png
   :align: center

The `Prototype Fund <https://prototypefund.de/>`_ supports and finances Open-Needs-DB from March to September 2022.

The `Federal Ministry of Education and Research <https://www.bmbf.de/bmbf/en/home/home_node.html>`_ created this program
to support developers in Germany during the creation of digital prototypes for topics in the area of
Civic Tech, Data Literacy, IT Security and Software Infrastructure.

.. grid::

   .. grid-item-card::

      .. image:: _images/PrototypeFund-P-Logo.png
         :align: center
         :width: 20%
         :target: https://prototypefund.de/en/

   .. grid-item-card::

      .. image:: _images/bmbf_logo_en.svg
         :align: center
         :width: 70%
         :target: https://www.bmbf.de/bmbf/en/

``Open-Neeeds-DB`` shall be a REST based database for requirements and co..
It does not provide a single graphical user interface, instead it shall support the creation of interfaces in
different tools and areas. Currently planned are:

* **WebApp**: Simply React based application to create and show elements of the database.
* **Sphinx-Needs**: Read needs from or import them to a Sphinx project from an Open-Needs DB.
* **VS Code Plugin**: Get information of existing needs during the creation of needs-based content in Sphinx and other
  documentation projects.

The goal of ``Open-Needs-DB`` is to share requirements and co. between different projects and
to provide suggestions and proposals based on a comparison between a target project and several related other projects.

The development of ``Open-Needs-DB`` may start a little bit earlier as March 2022. Mainly because there is a high
need in the ``Sphinx-Needs`` community to have a central service to store and maintain requirements and co.
in bigger projects.

It is planed to use the following technologies for ``Open-Needs-DB``:

* `FastAPI <https://fastapi.tiangolo.com/>`_
* `SQLModel <https://sqlmodel.tiangolo.com/>`_
* `ReactJS <https://reactjs.org/>`_
* `Python Language Server <https://github.com/palantir/python-language-server>`_


Open Needs DB Application
-------------------------
If anyone wants  to know, how our application has looked like, here it is.
Unfortunately the content is in german and I'm too lazy to translate it. :)

**Projekttitel**: Open Needs DB

**Beschreibe dein Projekt kurz.**

Die "Open Needs DB" ist eine Datenbank für Anforderungen, Spezifikationen und ähnliche Objekte.

Sie soll bei der sauberen, umfassenden und sicheren Erstellung von Anforderungen und Co. in Projektdokumentationen
unterstützen.

Das Projekt soll im Rahmen des Open-Source Projektes "Sphinx-Needs" umgesetzt werden, welches sich um die Erstellung
und Verwaltung von Anforderungen in Dokumentation nach dem Docs-as-Code Ansatz kümmert.

"Open Needs DB" soll inhaltlich bei der Erstellung unterstützen, indem ähnliche Anforderungen aus anderen Projekten
als Beispiel dienen oder auf fehlende Details hingewiesen wird.
Neben einer API soll auch eine Extension für VSCode bereitgestellt werden.

**Welchem gesellschaftlichen Themenfeld ordnest du dein Projekt zu?**

Sicherheit

**Welche gesellschaftliche Herausforderung willst du mit dem Projekt angehen?**

Software Projekte so zu entwickeln, dass diese sicher sind, wird bei der heutigen notwendigen Komplexität
immer schwieriger.
Oft ist bei Themen wie Datensicherheit oder auch Sicherheit für Leib und Leben ein Expertenwissen notwendig,
welches häufig nicht zur Verfügung steht.

Hinzu kommt die oft notwendige Dokumentation und die Erbringung von Nachweisen, dass diese Projekte nach einem
akzeptierten Standard entwickelt wurden.

Da die Dokumentation z.B. von Anforderungen zu den eher ungeliebten Tätigkeiten von SW-Entwicklern/innen gehört,
wird diese oft vernachlässigt oder bei Budget- und Zeitknappheit stark beschnitten.

Leider sind Anforderungen und ähnliche Objekte selten durch eine API zugänglich oder so aufbereitet,
dass diese technisch auswertbar und wiederverwendbar sind. Dadurch erschwert sich für diese Art von Informationen ein
offener Austausch, wie er sonst schon gelebt wird (z.B. SW-Bibliotheken).

All dies erschwert SW-Teams weltweit die sichere Entwicklung ihrer Lösungen.
Und vor allem Open-Source-Projekte leiden aufgrund der knappen Zeit ihrer Community stark darunter.

"Open Needs DB" soll es ermöglichen, dass Projekte passende Anforderungen und Co. einfach und schnell von anderen
Projekten übernehmen können, um einer sichere Entwicklung zu gewährleisten.

**Welchem technischen Themenfeld ordnest du dein Projekt zu?**

Anwendungen

**Wie willst du dein Projekt technisch umsetzen?**

Das schon vorhandene Projekt "Sphinx-Needs" stellt die Funktionen zur Erstellung von Anforderungen und für
deren Export in eine JSON-Datei zur Verfügung.

"Open Needs DB" wird einen Importer für diese JSON-Datei anbieten, um die Daten in eine dokumentenbasierte
DB (MongoDB oder ElasticSearch) zu übernehmen.

Ein Full-Text-Search-Server wird diese Daten indizieren und die Suche nach Keywords oder Text-Ähnlichkeiten ermöglichen.
Als technische Lösung hierfür kann ElasticSearch oder Sphinx-Search dienen.

Eine einfache webbasierte Oberfläche (Flask) soll eine erste Suche ermöglichen.
Flask und zugehörige Plugins sollen auch für die Bereitstellung einer REST-API dienen, die die Integration der Suche
in andere Anwendungen ermöglicht.

Als eine erste externe Integration soll ein Plugin für die Entwicklungsumgebung VS-Code erstellt werden,
um die Daten der "Open Needs DB" direkt bei der Erstellung von Anforderungen mit "Sphinx-Needs" nutzen zu können.

Weitere Ideen wie der Betrieb einer frei zugänglichen "Open Needs DB" Instanz, bei der sich Projekte mit
ihren Anforderungen (needs.json urls) registrieren können, ist interessant, aber ein langfristiges Thema und
daher kein Ziel innerhalb des geförderten Projektzeitraumes.

**Hast du schon an der Idee gearbeitet? Wenn ja, beschreibe kurz den aktuellen Stand und
erkläre die geplanten Neuerungen.**

Für die Idee "Open Needs DB" wurden bis jetzt nur Konzepte skizziert und ein erster Importer für Daten aus
einer "needs.json" nach ElasticSearchventwickelt.

Das prozesstechnisch vorgelagerte Open-Source Projekt "Sphinx-Needs" existiert seit über 4 Jahren und wurde durch
mich gegründet. Auch heute noch bin ich der Haupt-Maintainer der SW.

"Sphinx-Needs" ist schon produktiv und wird weltweit eingesetzt.

Öffentlich z.B. von der Organization ONAP [1], welches ein Linux-Foundation Projekt ist.
Vor allem aber wird es von zahlreichen Unternehmen intern eingesetzt.
Namentlich sind hier Projekte von OEM- und TIER-1-Unternehmen der Automobil-Branche bekannt.

[1] https://www.onap.org/

**Link zum bestehenden Projekt (falls vorhanden)**

https://sphinxcontrib-needs.readthedocs.io/en/latest/

**Welche ähnlichen Ansätze gibt es schon und was wird dein Projekt anders bzw. besser machen?**

Es gibt kommerzielle Requirement-Tools, die hauptsächlich über graphische User-Interfaces benutzt werden müssen.
Ein Ansatz, der vor allem den Docs-as-Code Ansatz verfolgt und dessen erstellte Daten frei verteilt und
wiederverwendet werden können, ist nicht bekannt.

**Wer ist die Zielgruppe und wie soll dein Projekt sie erreichen?**

Zielgruppe sind Entwickler, Projektmanager und Ingenieure, die in kommerziellen, akademischen oder öffentlichen
Projekten Dokumentationen für Anforderungen und Spezifikationen pflegen oder auch nur lesen müssen.

Dank der engen Verzahnung mit "Sphinx-Needs", kann auf eine existierende Community aufgebaut werden,
so dass der Kontakt zu ersten Anwendern gesichert ist.

Auch der Kontakt in die Industrie existiert, so dass "Open Needs DB" auch als unternehmensinterne Instanz
schnell zum Einsatz kommen könnte. Anfragen zu ähnlichen Funktionen gab es bei "Sphinx-Needs" schon öfters.

**An welchen Software-Projekten hast du / habt ihr bisher gearbeitet?
Bei Open-Source-Projekten bitte einen Link zum Repository angeben.**

Marco und ich sind seit 10 Jahren Tool-Entwickler und erstellen alles von Skripten für CI-Systeme bis zu
Web-Apps für Geschäftsdaten.

Im Open-Source-Umfeld:

| Sphinx-Needs
| https://github.com/useblocks/sphinxcontrib-needs

| Sphinx-Test-Reports
| Importiert Test-Ergebnisse und stellt diese über Sphinx-Needs in Dokumentationen dar und
| macht diese verlinkbar mit z.B. Spezifikationen.
| https://github.com/useblocks/sphinx-test-reports

Ansonsten kommen immer mal wieder Bug-Reports und Bug-Fixes in diversen Open-Source Projekten vor.

**Bewerbt ihr euch als Team um die Förderung?**

Ja

**Namen der Teammitglieder**

| Daniel Woste
| Marco Heinemann

**Wie viele Stunden willst du (bzw. will das Team) in den 6 Monaten Förderzeitraum insgesamt an der
Umsetzung arbeiten?**

980

**Skizziere kurz die wichtigsten Meilensteine, die im Förderzeitraum umgesetzt werden sollen.**

1) Auswahl DB für die needs-Dokumente und Auswahl eines Text-Search-Servers
2) Erstellung eines Importer-Skriptes
3) Festlegung und Umsetzung von zusätzlichen Text-Klassifizierungen (z.B. Keyword-Stärke)
4) Erstellung einer REST-API
5) Umsetzung einer kleinen Web-App zur Anzeige und Suche
6) Erstellung einer VS-Code Extension
7) Erweiterung von "Sphinx-Needs" zur Einbindung einer "Open Needs Instanz"
   (für Need-Imports oder Need-Verlinkung) (falls die Zeit reicht)

**Wenn deine Projektidee nicht gefördert wird, darf sie trotzdem auf prototypefund.de und in wissenschaftlichen
Publikationen rund um das Programm veröffentlicht werden?**

Ja

**Wohnsitz**
Ich bin über 18 Jahre alt und habe meinen Hauptwohnsitz in Deutschland.

**Datenschutzvereinbarung**

Ich habe die Datenschutzvereinbarung gelesen und stimme der Verwendung meiner Daten im Rahmen der Programmziele
des Prototype Funds zu.

**Open-Source-Lizenz**

Ich bin damit einverstanden, die Projektergebnisse unter einer Open-
Source-Lizenz (z. B. MIT Lizenz), öffentlich zugänglich (z. B. über GitHub
oder BitBucket) zur Verfügung zu stellen.
