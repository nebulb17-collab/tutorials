/**
 * Automatise ça · Épisode 21 — 50 entreprises à contacter pour vos commandes de fin d'année
 *
 * Remplit l'onglet « Prospects B2B » avec l'API officielle Google Places (Text Search) :
 * nom, adresse, téléphone, site web, note et lien Google Maps. Pas de « scraping ».
 *
 * Installation :
 * 1. Dans Google Cloud, activez « Places API (New) » et créez une clé API (restreignez-la à cette API).
 *    L'API est payante au-delà du crédit mensuel offert par Google : vérifiez la grille tarifaire.
 * 2. Nouveau Google Sheets → Extensions → Apps Script → collez ce fichier.
 * 3. Projet → Paramètres → Propriétés du script : ajoutez PLACES_API_KEY = votre clé.
 * 4. Rechargez la feuille : menu « Prospects » → « Chercher des entreprises… »
 *    et tapez par exemple « agences immobilières à Oran ».
 *
 * Avant d'appeler : présentez-vous, et retirez de la liste toute entreprise qui le demande.
 * Pour les emails ou SMS commerciaux, vérifiez les règles de votre pays.
 */

const ONGLET_PROSPECTS_B2B = "Prospects B2B";
const COLONNES_B2B = ["Nom", "Activité", "Adresse", "Téléphone", "Site web", "Note", "Avis", "Google Maps", "Recherche", "Statut", "Notes d'appel", "Ajouté le", "ID Google"];
const PAGES_MAX = 3; // 20 résultats par page, 60 au maximum par recherche

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Prospects").addItem("Chercher des entreprises…", "chercherEntreprises").addToUi();
}

function chercherEntreprises() {
  const ui = SpreadsheetApp.getUi();
  const reponse = ui.prompt("Chercher des entreprises", "Exemple : agences immobilières à Oran", ui.ButtonSet.OK_CANCEL);
  if (reponse.getSelectedButton() !== ui.Button.OK || !reponse.getResponseText().trim()) return;
  const ajoutees = ajouterResultats_(reponse.getResponseText().trim());
  ui.alert(`${ajoutees} nouvelle(s) entreprise(s) ajoutée(s).`);
}

/** Interroge Places API (New) et ajoute les entreprises qui ne sont pas déjà dans la liste. */
function ajouterResultats_(recherche) {
  const cle = PropertiesService.getScriptProperties().getProperty("PLACES_API_KEY");
  if (!cle) throw new Error("Ajoutez PLACES_API_KEY dans les propriétés du script.");

  const sheet = ongletB2B_();
  const dejaLa = new Set(sheet.getDataRange().getValues().slice(1).map((l) => l[12]));
  const lignes = [];
  let pageToken = "";

  for (let page = 0; page < PAGES_MAX; page++) {
    const corps = { textQuery: recherche, languageCode: "fr" };
    if (pageToken) corps.pageToken = pageToken;
    const res = UrlFetchApp.fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "post",
      contentType: "application/json",
      headers: {
        "X-Goog-Api-Key": cle,
        // Ne demandez que les champs utiles : la facturation dépend des champs demandés.
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber," +
          "places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.primaryTypeDisplayName,nextPageToken",
      },
      payload: JSON.stringify(corps),
      muteHttpExceptions: true,
    });
    if (res.getResponseCode() !== 200) {
      if (page === 0) throw new Error(`Google Places a répondu ${res.getResponseCode()} : ${res.getContentText().slice(0, 300)}`);
      break; // on garde les pages déjà reçues
    }
    const data = JSON.parse(res.getContentText());
    (data.places || []).forEach((p) => {
      if (dejaLa.has(p.id)) return;
      dejaLa.add(p.id);
      lignes.push([
        p.displayName ? p.displayName.text : "", p.primaryTypeDisplayName ? p.primaryTypeDisplayName.text : "",
        p.formattedAddress || "", p.nationalPhoneNumber ? "'" + p.nationalPhoneNumber : "", p.websiteUri || "",
        p.rating || "", p.userRatingCount || "", p.googleMapsUri || "", recherche, "À appeler", "", new Date(), p.id,
      ]);
    });
    pageToken = data.nextPageToken;
    if (!pageToken) break;
    Utilities.sleep(1500); // laisse le temps à la page suivante d'être prête
  }

  if (lignes.length) sheet.getRange(sheet.getLastRow() + 1, 1, lignes.length, COLONNES_B2B.length).setValues(lignes);
  return lignes.length;
}

function ongletB2B_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ONGLET_PROSPECTS_B2B);
  if (!sheet) {
    sheet = ss.insertSheet(ONGLET_PROSPECTS_B2B);
    sheet.appendRow(COLONNES_B2B);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLONNES_B2B.length).setFontWeight("bold");
    sheet.getRange("J2:J").setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(["À appeler", "Appelée", "Intéressée", "Pas intéressée", "Ne plus contacter"]).build()
    );
  }
  return sheet;
}
