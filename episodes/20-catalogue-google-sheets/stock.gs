/**
 * Automatise ça · Épisode 20 — Le catalogue qui se met à jour depuis Google Sheets
 *
 * La feuille « Catalogue » (A Produit, B Prix, C Stock, D Image) alimente le site :
 *   Fichier → Partager → Publier sur le Web → feuille « Catalogue » → CSV, et collez le lien
 *   dans SHEET_CSV_URL de index.html. Le site relit la feuille chaque minute.
 *
 * Ce script ajoute deux choses :
 *   1. doPost : enregistre les demandes « Me prévenir » dans l'onglet « Alertes stock ».
 *   2. Quand vous remettez du stock sur un produit épuisé (0 → 5), vous recevez un email avec
 *      un lien WhatsApp déjà écrit pour chaque cliente qui attendait ce produit.
 *
 * Installation : Extensions → Apps Script → collez ce fichier, mettez votre email, déployez en
 * Application Web (Moi · Tout le monde) pour SCRIPT_URL, puis lancez une fois installerAlerteStock().
 */

const EMAIL_STOCK = "vous@exemple.com";
const ONGLET_CATALOGUE = "Catalogue";
const ONGLET_ALERTES = "Alertes stock";

function doPost(e) {
  const p = e.parameter;
  if (p.consentement !== "oui" || !p.produit || !p.prenom || String(p.whatsapp || "").replace(/\D/g, "").length < 9) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
  ongletAlertes_().appendRow([new Date(), String(p.produit).slice(0, 80), String(p.prenom).slice(0, 40), "'" + p.whatsapp, ""]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

/** onEdit installable : il peut envoyer des emails, contrairement au onEdit simple. */
function installerAlerteStock() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "surModificationStock")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("surModificationStock").forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
}

function surModificationStock(e) {
  const range = e.range;
  if (range.getSheet().getName() !== ONGLET_CATALOGUE || range.getColumn() !== 3 || range.getRow() < 2 || range.getNumRows() > 1) return;
  const avant = Number(e.oldValue || 0);
  const apres = Number(e.value || 0);
  if (avant > 0 || apres <= 0) return; // on ne prévient que lorsqu'un produit épuisé revient

  const produit = String(range.getSheet().getRange(range.getRow(), 1).getValue());
  const prix = range.getSheet().getRange(range.getRow(), 2).getValue();
  const alertes = ongletAlertes_();
  const lignes = alertes.getDataRange().getValues();
  const liens = [];
  for (let i = 1; i < lignes.length; i++) {
    const [, prod, prenom, tel, prevenue] = lignes[i];
    if (prod !== produit || prevenue) continue;
    const numero = String(tel).replace(/\D/g, "").replace(/^0/, "213");
    const message = `Bonjour ${prenom} ! Bonne nouvelle : « ${produit} » est de retour chez Boutique Atlas (${Number(prix).toLocaleString("fr-FR")} DA). On vous en met un de côté ? 🛍️`;
    liens.push(`<li>${prenom} — <a href="https://wa.me/${numero}?text=${encodeURIComponent(message)}">prévenir sur WhatsApp</a></li>`);
    alertes.getRange(i + 1, 5).setValue(new Date());
  }
  if (!liens.length) return;
  MailApp.sendEmail({
    to: EMAIL_STOCK,
    subject: `🔔 ${produit} est de retour : ${liens.length} cliente(s) à prévenir`,
    htmlBody: `<p>Le message est déjà écrit, un geste par cliente :</p><ul>${liens.join("")}</ul>`,
  });
}

function ongletAlertes_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ONGLET_ALERTES);
  if (!sheet) {
    sheet = ss.insertSheet(ONGLET_ALERTES);
    sheet.appendRow(["Demandée le", "Produit", "Prénom", "WhatsApp", "Prévenue le"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
