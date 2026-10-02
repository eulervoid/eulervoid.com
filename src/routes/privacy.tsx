import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { address } from "~/data/shared";

export const Route = createFileRoute("/privacy")({
    component: Privacy,
});

const heading3 = "mb-3 mt-12";

function PrivacyGerman() {
    return (
        <>
            <h1>Datenschutzerklärung</h1>
            <p>
                Personenbezogene Daten (nachfolgend zumeist nur „Daten“ genannt) werden nur im
                Rahmen der Erforderlichkeit sowie zum Zwecke der Bereitstellung eines
                funktionsfähigen und nutzerfreundlichen Internetauftritts, inklusive seiner Inhalte
                und der dort angebotenen Leistungen, verarbeitet.
            </p>
            <p>
                Gemäß Art. 4 Ziffer 1. der Verordnung (EU) 2016/679, also der
                Datenschutz-Grundverordnung (nachfolgend nur „DSGVO“ genannt), gilt als
                „Verarbeitung“ jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführter
                Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten,
                wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die
                Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die
                Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der
                Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen
                oder die Vernichtung.
            </p>
            <p>
                Mit der nachfolgenden Datenschutzerklärung informieren wir Sie insbesondere über
                Art, Umfang, Zweck, Dauer und Rechtsgrundlage der Verarbeitung personenbezogener
                Daten, soweit wir entweder allein oder gemeinsam mit anderen über die Zwecke und
                Mittel der Verarbeitung entscheiden. Zudem informieren wir Sie nachfolgend über die
                von uns zu Optimierungszwecken sowie zur Steigerung der Nutzungsqualität
                eingesetzten Fremdkomponenten, soweit hierdurch Dritte Daten in wiederum eigener
                Verantwortung verarbeiten.
            </p>
            <p>Unsere Datenschutzerklärung ist wie folgt gegliedert:</p>
            <p>
                I. Informationen über uns als Verantwortliche
                <br />
                II. Rechte der Nutzer und Betroffenen
                <br />
                III. Informationen zur Datenverarbeitung
            </p>
            <h3 className={heading3}>I. Informationen über uns als Verantwortliche</h3>
            <p>
                Verantwortlicher Anbieter dieses Internetauftritts im datenschutzrechtlichen Sinne
                ist:
            </p>
            {address.name}
            <br />
            {address.street}
            <br />
            {`${address.postalCode} ${address.city}`}
            <p>E-Mail: {address.email}</p>
            <h3 className={heading3}>II. Rechte der Nutzer und Betroffenen</h3>
            <p>
                Mit Blick auf die nachfolgend noch näher beschriebene Datenverarbeitung haben die
                Nutzer und Betroffenen das Recht
            </p>
            <ul className="list-disc space-y-2 pl-5">
                <li>
                    auf Bestätigung, ob sie betreffende Daten verarbeitet werden, auf Auskunft über
                    die verarbeiteten Daten, auf weitere Informationen über die Datenverarbeitung
                    sowie auf Kopien der Daten (vgl. auch Art. 15 DSGVO);
                </li>
                <li>
                    auf Berichtigung oder Vervollständigung unrichtiger bzw. unvollständiger Daten
                    (vgl. auch Art. 16 DSGVO);
                </li>
                <li>
                    auf unverzügliche Löschung der sie betreffenden Daten (vgl. auch Art. 17 DSGVO),
                    oder, alternativ, soweit eine weitere Verarbeitung gemäß Art. 17 Abs. 3 DSGVO
                    erforderlich ist, auf Einschränkung der Verarbeitung nach Maßgabe von Art. 18
                    DSGVO;
                </li>
                <li>
                    auf Erhalt der sie betreffenden und von ihnen bereitgestellten Daten und auf
                    Übermittlung dieser Daten an andere Anbieter/Verantwortliche (vgl. auch Art. 20
                    DSGVO);
                </li>
                <li>
                    auf Beschwerde gegenüber der Aufsichtsbehörde, sofern sie der Ansicht sind, dass
                    die sie betreffenden Daten durch den Anbieter unter Verstoß gegen
                    datenschutzrechtliche Bestimmungen verarbeitet werden (vgl. auch Art. 77 DSGVO).
                </li>
            </ul>
            <p>
                Darüber hinaus ist der Anbieter dazu verpflichtet, alle Empfänger, denen gegenüber
                Daten durch den Anbieter offengelegt worden sind, über jedwede Berichtigung oder
                Löschung von Daten oder die Einschränkung der Verarbeitung, die aufgrund der Artikel
                16, 17 Abs. 1, 18 DSGVO erfolgt, zu unterrichten. Diese Verpflichtung besteht jedoch
                nicht, soweit diese Mitteilung unmöglich oder mit einem unverhältnismäßigen Aufwand
                verbunden ist. Unbeschadet dessen hat der Nutzer ein Recht auf Auskunft über diese
                Empfänger.
            </p>
            <p>
                <strong>
                    Ebenfalls haben die Nutzer und Betroffenen nach Art. 21 DSGVO das Recht auf
                    Widerspruch gegen die künftige Verarbeitung der sie betreffenden Daten, sofern
                    die Daten durch den Anbieter nach Maßgabe von Art. 6 Abs. 1 lit. f) DSGVO
                    verarbeitet werden. Insbesondere ist ein Widerspruch gegen die Datenverarbeitung
                    zum Zwecke der Direktwerbung statthaft.
                </strong>
            </p>
            <h3 className={heading3}>III. Informationen zur Datenverarbeitung</h3>
            <p>
                Ihre bei Nutzung unseres Internetauftritts verarbeiteten Daten werden gelöscht oder
                gesperrt, sobald der Zweck der Speicherung entfällt, der Löschung der Daten keine
                gesetzlichen Aufbewahrungspflichten entgegenstehen und nachfolgend keine
                anderslautenden Angaben zu einzelnen Verarbeitungsverfahren gemacht werden.
            </p>
            <h4 className={heading3}>Serverdaten</h4>
            <p>
                Aus technischen Gründen, insbesondere zur Gewährleistung eines sicheren und stabilen
                Internetauftritts, werden Daten durch Ihren Internet-Browser an uns bzw. an unseren
                Webspace-Provider übermittelt. Mit diesen sog. Server-Logfiles werden u.a. Typ und
                Version Ihres Internetbrowsers, das Betriebssystem, die Website, von der aus Sie auf
                unseren Internetauftritt gewechselt haben (Referrer URL), die Website(s) unseres
                Internetauftritts, die Sie besuchen, Datum und Uhrzeit des jeweiligen Zugriffs sowie
                die IP-Adresse des Internetanschlusses, von dem aus die Nutzung unseres
                Internetauftritts erfolgt, erhoben.
            </p>
            <p>
                Diese so erhobenen Daten werden vorrübergehend gespeichert, dies jedoch nicht
                gemeinsam mit anderen Daten von Ihnen.
            </p>
            <p>
                Diese Speicherung erfolgt auf der Rechtsgrundlage von Art. 6 Abs. 1 lit. f) DSGVO.
                Unser berechtigtes Interesse liegt in der Verbesserung, Stabilität, Funktionalität
                und Sicherheit unseres Internetauftritts.
            </p>
            <p>
                Die Daten werden spätestens nach sieben Tage wieder gelöscht, soweit keine weitere
                Aufbewahrung zu Beweiszwecken erforderlich ist. Andernfalls sind die Daten bis zur
                endgültigen Klärung eines Vorfalls ganz oder teilweise von der Löschung ausgenommen.
            </p>
        </>
    );
}

function PrivacyEnglish() {
    return (
        <>
            <h1>Privacy Policy</h1>
            <p>
                Personal data (usually referred to just as „data“ below) will only be processed to
                the extent necessary and for the purpose of providing a functional and user-friendly
                website, including its contents, and the services offered there.
            </p>
            <p>
                Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General Data Protection
                Regulation (hereinafter referred to as the „GDPR“), „processing“ refers to any
                operation or set of operations such as collection, recording, organization,
                structuring, storage, adaptation, alteration, retrieval, consultation, use,
                disclosure by transmission, dissemination, or otherwise making available, alignment,
                or combination, restriction, erasure, or destruction performed on personal data,
                whether by automated means or not.
            </p>
            <p>
                The following privacy policy is intended to inform you in particular about the type,
                scope, purpose, duration, and legal basis for the processing of such data either
                under our own control or in conjunction with others. We also inform you below about
                the third-party components we use to optimize our website and improve the user
                experience which may result in said third parties also processing data they collect
                and control.
            </p>
            <p>Our privacy policy is structured as follows:</p>
            <p>
                I. Information about us as controllers of your data
                <br />
                II. The rights of users and data subjects
                <br />
                III. Information about the data processing
            </p>
            <h3 className={heading3}>I. Information about us as controllers of your data</h3>
            <p>
                The party responsible for this website (the „controller“) for purposes of data
                protection law is:
            </p>
            {address.name}
            <br />
            {address.street}
            <br />
            {`${address.postalCode} ${address.city}`}
            <p>E-Mail: {address.email}</p>
            <h3 className={heading3}>II. The rights of users and data subjects</h3>
            <p>
                With regard to the data processing to be described in more detail below, users and
                data subjects have the right
            </p>
            <ul className="list-disc space-y-2 pl-5">
                <li>
                    to confirmation of whether data concerning them is being processed, information
                    about the data being processed, further information about the nature of the data
                    processing, and copies of the data (cf. also Art. 15 GDPR);
                </li>

                <li>
                    to correct or complete incorrect or incomplete data (cf. also Art. 16 GDPR);
                </li>

                <li>
                    to the immediate deletion of data concerning them (cf. also Art. 17 DSGVO), or,
                    alternatively, if further processing is necessary as stipulated in Art. 17 Para.
                    3 GDPR, to restrict said processing per Art. 18 GDPR;
                </li>

                <li>
                    to receive copies of the data concerning them and/or provided by them and to
                    have the same transmitted to other providers/controllers (cf. also Art. 20
                    GDPR);
                </li>

                <li>
                    to file complaints with the supervisory authority if they believe that data
                    concerning them is being processed by the controller in breach of data
                    protection provisions (see also Art. 77 GDPR).
                </li>
            </ul>
            <p>
                In addition, the controller is obliged to inform all recipients to whom it discloses
                data of any such corrections, deletions, or restrictions placed on processing the
                same per Art. 16, 17 Para. 1, 18 GDPR. However, this obligation does not apply if
                such notification is impossible or involves a disproportionate effort. Nevertheless,
                users have a right to information about these recipients.
            </p>
            <p>
                <strong>
                    Likewise, under Art. 21 GDPR, users and data subjects have the right to object
                    to the controller’s future processing of their data pursuant to Art. 6 Para. 1
                    lit. f) GDPR. In particular, an objection to data processing for the purpose of
                    direct advertising is permissible.
                </strong>
            </p>
            <h3 className={heading3}>III. Information about the data processing</h3>
            <p>
                Your data processed when using our website will be deleted or blocked as soon as the
                purpose for its storage ceases to apply, provided the deletion of the same is not in
                breach of any statutory storage obligations or unless otherwise stipulated below.
            </p>
            <h4 className={heading3}>Server data</h4>
            <p>
                For technical reasons, the following data sent by your internet browser to us or to
                our server provider will be collected, especially to ensure a secure and stable
                website: These server log files record the type and version of your browser,
                operating system, the website from which you came (referrer URL), the webpages on
                our site visited, the date and time of your visit, as well as the IP address from
                which you visited our site.
            </p>
            <p>
                The data thus collected will be temporarily stored, but not in association with any
                other of your data.
            </p>
            <p>
                The basis for this storage is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest
                lies in the improvement, stability, functionality, and security of our website.
            </p>
            <p>
                The data will be deleted within no more than seven days, unless continued storage is
                required for evidentiary purposes. In which case, all or part of the data will be
                excluded from deletion until the investigation of the relevant incident is finally
                resolved.
            </p>
        </>
    );
}

function Privacy() {
    const [tab, setTab] = useState<"english" | "german">("english");
    const setGerman = () => setTab("german");
    const setEnglish = () => setTab("english");

    const inactiveButton = "px-2 py-1 border cursor-pointer";
    const activeButton = "px-2 py-1 bg-white text-black cursor-pointer";

    return (
        <div className="section py-28 space-y-2">
            <div className="flex gap-4 mb-8">
                <button
                    className={tab === "english" ? activeButton : inactiveButton}
                    onClick={setEnglish}
                >
                    English
                </button>
                <button
                    className={tab === "german" ? activeButton : inactiveButton}
                    onClick={setGerman}
                >
                    German
                </button>
            </div>
            {tab === "english" ? <PrivacyEnglish /> : <PrivacyGerman />}
        </div>
    );
}
