/**
 * Automatise ça · Épisode 19 — La liste d'attente Black Friday sur WhatsApp
 *
 * Installation :
 * 1. Nouveau Google Sheets → Extensions → Apps Script → collez ce fichier.
 * 2. Mettez votre email dans EMAIL_BOUTIQUE et la date de votre Black Friday dans JOUR_J.
 * 3. Déployer → Application Web (Exécuter en tant que : Moi · Accès : Tout le monde),
 *    puis collez l'URL /exec dans SCRIPT_URL de index.html.
 * 4. Lancez une fois installerJourJ() (bouton ▶) : le matin du jour J, vous recevez la liste
 *    avec un lien WhatsApp déjà écrit pour chaque inscrite.
 *
 * Seules les personnes qui ont coché la case d'accord sont enregistrées : c'est leur consentement
 * à recevoir ce message. Notez les « STOP » dans la colonne Désinscrite.
 */

const EMAIL_BOUTIQUE = "vous@exemple.com";
const JOUR_J = new Date(2026, 10, 27, 7, 0, 0); // vendredi 27 novembre 2026, 7h : 2 h avant l'ouverture
const ONGLET_ATTENTE = "Liste d'attente";

function doPost(e) {
  const p = e.parameter;
  if (p.consentement !== "oui" || !p.prenom || String(p.whatsapp || "").replace(/\D/g, "").length < 9) {
    return sortie_({ ok: false });
  }
  const sheet = ongletAttente_();
  const tel = String(p.whatsapp).replace(/\D/g, "");
  const deja = sheet.getDataRange().getValues().slice(1).some((l) => String(l[2]).replace(/\D/g, "") === tel);
  if (!deja) sheet.appendRow([new Date(), String(p.prenom).slice(0, 40), "'" + p.whatsapp, "oui", p.source || "page", ""]);
  return sortie_({ ok: true });
}

/** GET ?action=compte → { inscrites: 128 } pour le compteur de la page. */
function doGet(e) {
  if (e.parameter.action === "compte") return sortie_({ inscrites: Math.max(0, ongletAttente_().getLastRow() - 1) });
  return sortie_({ ok: true });
}

function installerJourJ() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "listeJourJ")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("listeJourJ").timeBased().at(JOUR_J).create();
}

/** Le matin du jour J : un email avec un lien WhatsApp déjà écrit par inscrite. */
function listeJourJ() {
  const inscrites = ongletAttente_().getDataRange().getValues().slice(1).filter((l) => l[3] === "oui" && !l[5]);
  const liens = inscrites.map((l) => {
    const numero = String(l[2]).replace(/\D/g, "").replace(/^0/, "213");
    const message = `Bonjour ${l[1]} 🖤 C'est le Black Friday chez Boutique Atlas !\n` +
      `Comme promis, vous avez 2 heures d'avance : -30 % sur toute la boutique jusqu'à 11h, rien que pour les inscrites.\n` +
      `Répondez à ce message pour réserver vos pièces.\n(Répondez STOP pour ne plus recevoir de messages.)`;
    return `<li>${l[1]} — <a href="https://wa.me/${numero}?text=${encodeURIComponent(message)}">envoyer</a></li>`;
  });
  MailApp.sendEmail({
    to: EMAIL_BOUTIQUE,
    subject: `🖤 Jour J : ${inscrites.length} inscrites à prévenir`,
    htmlBody: `<p>Un geste par inscrite, le message est déjà écrit :</p><ol>${liens.join("")}</ol>`,
  });
}

function ongletAttente_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ONGLET_ATTENTE);
  if (!sheet) {
    sheet = ss.insertSheet(ONGLET_ATTENTE);
    sheet.appendRow(["Inscrite le", "Prénom", "WhatsApp", "Accord", "Source", "Désinscrite"]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  }
  return sheet;
}

function sortie_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
