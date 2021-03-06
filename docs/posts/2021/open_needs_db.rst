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

.. panels::
    :container: container pb-6

    .. image:: _images/PrototypeFund-P-Logo.png
       :align: center
       :width: 20%
       :target: https://prototypefund.de/en/

    ---

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

Die "Open Needs DB" ist eine Datenbank f??r Anforderungen, Spezifikationen und ??hnliche Objekte.

Sie soll bei der sauberen, umfassenden und sicheren Erstellung von Anforderungen und Co. in Projektdokumentationen
unterst??tzen.

Das Projekt soll im Rahmen des Open-Source Projektes "Sphinx-Needs" umgesetzt werden, welches sich um die Erstellung
und Verwaltung von Anforderungen in Dokumentation nach dem Docs-as-Code Ansatz k??mmert.

"Open Needs DB" soll inhaltlich bei der Erstellung unterst??tzen, indem ??hnliche Anforderungen aus anderen Projekten
als Beispiel dienen oder auf fehlende Details hingewiesen wird.
Neben einer API soll auch eine Extension f??r VSCode bereitgestellt werden.

**Welchem gesellschaftlichen Themenfeld ordnest du dein Projekt zu?**

Sicherheit

**Welche gesellschaftliche Herausforderung willst du mit dem Projekt angehen?**

Software Projekte so zu entwickeln, dass diese sicher sind, wird bei der heutigen notwendigen Komplexit??t
immer schwieriger.
Oft ist bei Themen wie Datensicherheit oder auch Sicherheit f??r Leib und Leben ein Expertenwissen notwendig,
welches h??ufig nicht zur Verf??gung steht.

Hinzu kommt die oft notwendige Dokumentation und die Erbringung von Nachweisen, dass diese Projekte nach einem
akzeptierten Standard entwickelt wurden.

Da die Dokumentation z.B. von Anforderungen zu den eher ungeliebten T??tigkeiten von SW-Entwicklern/innen geh??rt,
wird diese oft vernachl??ssigt oder bei Budget- und Zeitknappheit stark beschnitten.

Leider sind Anforderungen und ??hnliche Objekte selten durch eine API zug??nglich oder so aufbereitet,
dass diese technisch auswertbar und wiederverwendbar sind. Dadurch erschwert sich f??r diese Art von Informationen ein
offener Austausch, wie er sonst schon gelebt wird (z.B. SW-Bibliotheken).

All dies erschwert SW-Teams weltweit die sichere Entwicklung ihrer L??sungen.
Und vor allem Open-Source-Projekte leiden aufgrund der knappen Zeit ihrer Community stark darunter.

"Open Needs DB" soll es erm??glichen, dass Projekte passende Anforderungen und Co. einfach und schnell von anderen
Projekten ??bernehmen k??nnen, um einer sichere Entwicklung zu gew??hrleisten.

**Welchem technischen Themenfeld ordnest du dein Projekt zu?**

Anwendungen

**Wie willst du dein Projekt technisch umsetzen?**

Das schon vorhandene Projekt "Sphinx-Needs" stellt die Funktionen zur Erstellung von Anforderungen und f??r
deren Export in eine JSON-Datei zur Verf??gung.

"Open Needs DB" wird einen Importer f??r diese JSON-Datei anbieten, um die Daten in eine dokumentenbasierte
DB (MongoDB oder ElasticSearch) zu ??bernehmen.

Ein Full-Text-Search-Server wird diese Daten indizieren und die Suche nach Keywords oder Text-??hnlichkeiten erm??glichen.
Als technische L??sung hierf??r kann ElasticSearch oder Sphinx-Search dienen.

Eine einfache webbasierte Oberfl??che (Flask) soll eine erste Suche erm??glichen.
Flask und zugeh??rige Plugins sollen auch f??r die Bereitstellung einer REST-API dienen, die die Integration der Suche
in andere Anwendungen erm??glicht.

Als eine erste externe Integration soll ein Plugin f??r die Entwicklungsumgebung VS-Code erstellt werden,
um die Daten der "Open Needs DB" direkt bei der Erstellung von Anforderungen mit "Sphinx-Needs" nutzen zu k??nnen.

Weitere Ideen wie der Betrieb einer frei zug??nglichen "Open Needs DB" Instanz, bei der sich Projekte mit
ihren Anforderungen (needs.json urls) registrieren k??nnen, ist interessant, aber ein langfristiges Thema und
daher kein Ziel innerhalb des gef??rderten Projektzeitraumes.

**Hast du schon an der Idee gearbeitet? Wenn ja, beschreibe kurz den aktuellen Stand und
erkl??re die geplanten Neuerungen.**

F??r die Idee "Open Needs DB" wurden bis jetzt nur Konzepte skizziert und ein erster Importer f??r Daten aus
einer "needs.json" nach ElasticSearchventwickelt.

Das prozesstechnisch vorgelagerte Open-Source Projekt "Sphinx-Needs" existiert seit ??ber 4 Jahren und wurde durch
mich gegr??ndet. Auch heute noch bin ich der Haupt-Maintainer der SW.

"Sphinx-Needs" ist schon produktiv und wird weltweit eingesetzt.

??ffentlich z.B. von der Organization ONAP [1], welches ein Linux-Foundation Projekt ist.
Vor allem aber wird es von zahlreichen Unternehmen intern eingesetzt.
Namentlich sind hier Projekte von OEM- und TIER-1-Unternehmen der Automobil-Branche bekannt.

[1] https://www.onap.org/

**Link zum bestehenden Projekt (falls vorhanden)**

https://sphinxcontrib-needs.readthedocs.io/en/latest/

**Welche ??hnlichen Ans??tze gibt es schon und was wird dein Projekt anders bzw. besser machen?**

Es gibt kommerzielle Requirement-Tools, die haupts??chlich ??ber graphische User-Interfaces benutzt werden m??ssen.
Ein Ansatz, der vor allem den Docs-as-Code Ansatz verfolgt und dessen erstellte Daten frei verteilt und
wiederverwendet werden k??nnen, ist nicht bekannt.

**Wer ist die Zielgruppe und wie soll dein Projekt sie erreichen?**

Zielgruppe sind Entwickler, Projektmanager und Ingenieure, die in kommerziellen, akademischen oder ??ffentlichen
Projekten Dokumentationen f??r Anforderungen und Spezifikationen pflegen oder auch nur lesen m??ssen.

Dank der engen Verzahnung mit "Sphinx-Needs", kann auf eine existierende Community aufgebaut werden,
so dass der Kontakt zu ersten Anwendern gesichert ist.

Auch der Kontakt in die Industrie existiert, so dass "Open Needs DB" auch als unternehmensinterne Instanz
schnell zum Einsatz kommen k??nnte. Anfragen zu ??hnlichen Funktionen gab es bei "Sphinx-Needs" schon ??fters.

**An welchen Software-Projekten hast du / habt ihr bisher gearbeitet?
Bei Open-Source-Projekten bitte einen Link zum Repository angeben.**

Marco und ich sind seit 10 Jahren Tool-Entwickler und erstellen alles von Skripten f??r CI-Systeme bis zu
Web-Apps f??r Gesch??ftsdaten.

Im Open-Source-Umfeld:

| Sphinx-Needs
| https://github.com/useblocks/sphinxcontrib-needs

| Sphinx-Test-Reports
| Importiert Test-Ergebnisse und stellt diese ??ber Sphinx-Needs in Dokumentationen dar und
| macht diese verlinkbar mit z.B. Spezifikationen.
| https://github.com/useblocks/sphinx-test-reports

Ansonsten kommen immer mal wieder Bug-Reports und Bug-Fixes in diversen Open-Source Projekten vor.

**Bewerbt ihr euch als Team um die F??rderung?**

Ja

**Namen der Teammitglieder**

| Daniel Woste
| Marco Heinemann

**Wie viele Stunden willst du (bzw. will das Team) in den 6 Monaten F??rderzeitraum insgesamt an der
Umsetzung arbeiten?**

980

**Skizziere kurz die wichtigsten Meilensteine, die im F??rderzeitraum umgesetzt werden sollen.**

1) Auswahl DB f??r die needs-Dokumente und Auswahl eines Text-Search-Servers
2) Erstellung eines Importer-Skriptes
3) Festlegung und Umsetzung von zus??tzlichen Text-Klassifizierungen (z.B. Keyword-St??rke)
4) Erstellung einer REST-API
5) Umsetzung einer kleinen Web-App zur Anzeige und Suche
6) Erstellung einer VS-Code Extension
7) Erweiterung von "Sphinx-Needs" zur Einbindung einer "Open Needs Instanz"
   (f??r Need-Imports oder Need-Verlinkung) (falls die Zeit reicht)

**Wenn deine Projektidee nicht gef??rdert wird, darf sie trotzdem auf prototypefund.de und in wissenschaftlichen
Publikationen rund um das Programm ver??ffentlicht werden?**

Ja

**Wohnsitz**
Ich bin ??ber 18 Jahre alt und habe meinen Hauptwohnsitz in Deutschland.

**Datenschutzvereinbarung**

Ich habe die Datenschutzvereinbarung gelesen und stimme der Verwendung meiner Daten im Rahmen der Programmziele
des Prototype Funds zu.

**Open-Source-Lizenz**

Ich bin damit einverstanden, die Projektergebnisse unter einer Open-
Source-Lizenz (z. B. MIT Lizenz), ??ffentlich zug??nglich (z. B. ??ber GitHub
oder BitBucket) zur Verf??gung zu stellen.
