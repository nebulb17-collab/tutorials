/**
 * Automatise ça · Épisode 17 — La demande d'avis qui part toute seule
 *
 * À ajouter dans le MÊME projet Apps Script que l'épisode 4 (onglet « Réservations »).
 *   - Toutes les heures : les clientes qui ont laissé un email reçoivent le merci et le lien
 *     vers votre avis Google, DELAI_HEURES après le début de leur rendez-vous.
 *   - Chaque soir à 19h : vous recevez un email avec les liens WhatsApp déjà écrits pour
 *     les clientes du jour sans email (un geste par cliente).
 * La colonne K « Avis demandé » garde la date : personne n'est sollicité deux fois.
 *
 * Le même message part à TOUTES les clientes : Google interdit de ne solliciter que les clients satisfaits.
 *
 * Installation : mettez votre Place ID (https://developers.google.com/maps/documentation/places/web-service/place-id)
 * et votre email, puis lancez une fois installerAvis() (bouton ▶).
 */

const PLACE_ID = "VOTRE_PLACE_ID";
const EMAIL_AVIS_GERANTE = "vous@exemple.com";
const DELAI_HEURES = 2;
const COL_AVIS = 11; // colonne K de l'onglet Réservations

function installerAvis() {
  ScriptApp.getProjectTriggers()
    .filter((t) => ["demanderAvis", "resumeAvisWhatsApp"].includes(t.getHandlerFunction()))
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("demanderAvis").timeBased().everyHours(1).create();
  ScriptApp.newTrigger("resumeAvisWhatsApp").timeBased().everyDays(1).atHour(19).create();
}

function lienAvis_() {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(PLACE_ID)}`;
}

function messageAvis_(r) {
  const prenom = String(r.nom).split(" ")[0];
  return `Merci ${prenom} pour votre visite aujourd'hui 🌸 Si vous avez 30 secondes, votre avis nous aide énormément :\n` +
    `${lienAvis_()}\n\nUn souci ? Répondez simplement à ce message.`;
}

/** Rendez-vous d'aujourd'hui, commencés depuis au moins DELAI_HEURES, sans demande d'avis. */
function aDemander_(sheet) {
  if (sheet.getRange(1, COL_AVIS).getValue() === "") sheet.getRange(1, COL_AVIS).setValue("Avis demandé").setFontWeight("bold");
  const tz = Session.getScriptTimeZone();
  const aujourdhui = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd");
  const avis = sheet.getDataRange().getValues().map((l) => l[COL_AVIS - 1]);
  return readRows_(sheet).filter((r) => {
    if (r.date !== aujourdhui || r.statut === "Annulé" || avis[r.ligne - 1]) return false;
    const [h, m] = r.heure.split(":").map(Number);
    const debut = new Date();
    debut.setHours(h, m, 0, 0);
    return Date.now() - debut.getTime() >= DELAI_HEURES * 3600 * 1000;
  });
}

function demanderAvis() {
  const sheet = getSheet_();
  aDemander_(sheet)
    .filter((r) => r.email)
    .forEach((r) => {
      MailApp.sendEmail({ to: r.email, subject: "Merci pour votre visite 🌸", body: messageAvis_(r), name: "Salon Jasmin" });
      sheet.getRange(r.ligne, COL_AVIS).setValue(new Date());
    });
}

function resumeAvisWhatsApp() {
  const sheet = getSheet_();
  const sansEmail = aDemander_(sheet).filter((r) => !r.email);
  if (!sansEmail.length) return;
  const liens = sansEmail.map((r) => {
    const numero = String(r.telephone).replace(/\D/g, "").replace(/^0/, "213");
    sheet.getRange(r.ligne, COL_AVIS).setValue(new Date());
    return `<li>${r.nom} (${r.heure}, ${r.prestation}) — <a href="https://wa.me/${numero}?text=${encodeURIComponent(messageAvis_(r))}">envoyer le merci sur WhatsApp</a></li>`;
  });
  MailApp.sendEmail({
    to: EMAIL_AVIS_GERANTE,
    subject: `⭐ ${sansEmail.length} demande(s) d'avis à envoyer sur WhatsApp`,
    htmlBody: `<p>Le message est déjà écrit, un geste par cliente :</p><ul>${liens.join("")}</ul>`,
  });
}
