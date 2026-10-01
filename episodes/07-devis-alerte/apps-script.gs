/**
 * Automatise ça · Épisode 7 — Formulaire de devis + alerte instantanée
 *
 * Installation :
 * 1. Nouveau Google Sheets → Extensions → Apps Script → collez ce fichier.
 * 2. Mettez votre email dans ALERTE_EMAIL.
 * 3. Déployer → Application Web (Exécuter en tant que : Moi · Accès : Tout le monde).
 * 4. Collez l'URL /exec dans SCRIPT_URL de index.html.
 *
 * Chaque demande : 1 ligne dans l'onglet « Prospects » + 1 email d'alerte immédiat.
 * Installez l'app Gmail sur votre téléphone et activez les notifications : l'alerte sonne en quelques secondes.
 * Les épisodes 8 (relance) et 9 (tableau des sources) réutilisent ce même onglet.
 */

const ALERTE_EMAIL = "vous@exemple.com";
const ENTREPRISE = "Rénov' Express";
const ONGLET = "Prospects";
const COLONNES = ["Reçu le", "Nom", "Téléphone", "Email", "Travaux", "Surface (m²)", "Budget", "Délai", "Détails", "Source", "Statut", "Relancé le"];

function doPost(e) {
  const p = e.parameter;
  const sheet = onglet_();

  sheet.appendRow([
    new Date(), p.nom || "", "'" + (p.telephone || ""), p.email || "",
    p.travaux || "", p.surface || "", p.budget || "", p.delai || "", p.details || "",
    p.source || "inconnue", "Nouveau", "",
  ]);

  const tel = String(p.telephone || "").replace(/\D/g, "").replace(/^0/, "213");
  MailApp.sendEmail({
    to: ALERTE_EMAIL,
    subject: `🔔 Nouveau devis : ${p.travaux} — ${p.nom}`,
    htmlBody:
      `<h2>Nouvelle demande de devis</h2>` +
      `<p><b>${esc_(p.nom)}</b> · ${esc_(p.telephone)} · ${esc_(p.email)}</p>` +
      `<p><b>Travaux :</b> ${esc_(p.travaux)}<br><b>Surface :</b> ${esc_(p.surface)} m²<br>` +
      `<b>Budget :</b> ${esc_(p.budget)}<br><b>Délai :</b> ${esc_(p.delai)}<br><b>Source :</b> ${esc_(p.source)}</p>` +
      `<p>${esc_(p.details)}</p>` +
      `<p><a href="https://wa.me/${tel}">Répondre sur WhatsApp maintenant</a></p>`,
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function onglet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ONGLET);
  if (!sheet) {
    sheet = ss.insertSheet(ONGLET);
    sheet.appendRow(COLONNES);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLONNES.length).setFontWeight("bold");
    // Liste déroulante pour suivre chaque prospect (utilisée par l'épisode 8).
    sheet.getRange("K2:K").setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(["Nouveau", "Relancé", "Répondu", "Gagné", "Perdu"]).build()
    );
  }
  return sheet;
}

function esc_(s) {
  return String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
