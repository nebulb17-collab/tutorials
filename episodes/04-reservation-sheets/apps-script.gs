/**
 * Automatise ça · Épisode 4 — Réservations → Google Sheets
 *
 * Installation :
 * 1. Créez un Google Sheets, puis Extensions → Apps Script.
 * 2. Collez ce fichier à la place du code par défaut et enregistrez.
 * 3. Déployer → Nouveau déploiement → Type « Application Web »
 *    - Exécuter en tant que : Moi
 *    - Qui peut accéder : Tout le monde
 * 4. Copiez l'URL /exec et collez-la dans SCRIPT_URL de index.html.
 *
 * Le même projet sert aux épisodes 5 (rappel la veille), 6 (créneaux libres) et 12 (site complet).
 */

const SHEET_NAME = "Réservations";
const HEADERS = ["Reçu le", "Nom", "Téléphone", "Email", "Prestation", "Date", "Heure", "Statut", "Rappel envoyé", "Source"];

/** Reçoit une réservation envoyée par le formulaire et ajoute une ligne. */
function doPost(e) {
  const p = e.parameter;
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // évite deux réservations écrites en même temps

  try {
    const sheet = getSheet_();

    if (isTaken_(sheet, p.date, p.heure)) {
      return json_({ ok: false, error: "Ce créneau vient d'être réservé." });
    }

    sheet.appendRow([
      new Date(),
      p.nom || "",
      // L'apostrophe garde le zéro du début (0550…) et empêche Sheets de convertir date et heure.
      "'" + (p.telephone || ""),
      p.email || "",
      p.prestation || "",
      "'" + (p.date || ""),
      "'" + (p.heure || ""),
      "Confirmé",
      "",
      p.source || "site",
    ]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Renvoie les créneaux déjà pris (épisode 6) :
 * GET <url>?action=creneaux → { occupes: [{ date: "2026-10-16", heure: "10:00" }, …] }
 */
function doGet(e) {
  if (e.parameter.action === "creneaux") {
    const occupes = readRows_(getSheet_())
      .filter((r) => r.statut !== "Annulé")
      .map((r) => ({ date: r.date, heure: r.heure }));
    return json_({ occupes: occupes });
  }
  return json_({ ok: true, message: "Salon Jasmin — API de réservation" });
}

// ---------- Outils partagés ----------

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

/** Lit toutes les réservations sous forme d'objets, avec date "aaaa-mm-jj" et heure "hh:mm". */
function readRows_(sheet) {
  const values = sheet.getDataRange().getValues().slice(1);
  const tz = Session.getScriptTimeZone();
  return values.map((v, i) => ({
    ligne: i + 2,
    nom: v[1],
    telephone: String(v[2]),
    email: v[3],
    prestation: v[4],
    date: v[5] instanceof Date ? Utilities.formatDate(v[5], tz, "yyyy-MM-dd") : String(v[5]),
    heure: v[6] instanceof Date ? Utilities.formatDate(v[6], tz, "HH:mm") : String(v[6]),
    statut: v[7],
    rappel: v[8],
  }));
}

function isTaken_(sheet, date, heure) {
  return readRows_(sheet).some((r) => r.date === date && r.heure === heure && r.statut !== "Annulé");
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
