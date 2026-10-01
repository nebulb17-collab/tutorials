/**
 * Automatise ça · Épisode 18 — La facture qui se fait toute seule
 *
 * Un Google Sheets « Factures » + un modèle Google Docs = des factures PDF numérotées,
 * envoyées par email, et suivies jusqu'au paiement.
 *
 * Installation :
 * 1. Créez un modèle Google Docs de facture avec ces repères (texte libre autour) :
 *      {{NUMERO}} {{DATE}} {{CLIENT}} {{DESCRIPTION}} {{TOTAL}} {{ACOMPTE}} {{RESTE}} {{ECHEANCE}} {{PAIEMENT}}
 *    Copiez son identifiant (la partie entre /d/ et /edit dans l'adresse) dans MODELE_ID.
 * 2. Créez un dossier Drive « Factures » et copiez son identifiant dans DOSSIER_ID.
 * 3. Dans un Google Sheets, Extensions → Apps Script → collez ce fichier, enregistrez, rechargez la feuille.
 *    Un menu « Factures » apparaît. Lancez une fois « Installer la relance des impayés ».
 * 4. Remplissez une ligne (Client, Email, Téléphone, Description, Total, Acompte) et mettez le statut « À envoyer »,
 *    puis menu Factures → « Créer et envoyer les factures ».
 */

const MODELE_ID = "ID_DU_MODELE_GOOGLE_DOCS";
const DOSSIER_ID = "ID_DU_DOSSIER_DRIVE";
const LIEN_PAIEMENT = "https://paiement.exemple/studio-nour";
const ENTREPRISE_FACTURE = "Studio Nour";
const DELAI_PAIEMENT_JOURS = 15;
const ONGLET_FACTURES = "Factures";
const ENTETES = ["Numéro", "Date", "Client", "Email", "Téléphone", "Description", "Total", "Acompte", "Reste", "Échéance", "Statut", "PDF"];
const F = { numero: 1, date: 2, client: 3, email: 4, tel: 5, description: 6, total: 7, acompte: 8, reste: 9, echeance: 10, statut: 11, pdf: 12 };

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Factures")
    .addItem("Créer et envoyer les factures", "envoyerFactures")
    .addItem("Installer la relance des impayés", "installerRelanceImpayes")
    .addToUi();
}

function installerRelanceImpayes() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "relancerImpayes")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("relancerImpayes").timeBased().everyDays(1).atHour(9).create();
}

function ongletFactures_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ONGLET_FACTURES);
  if (!sheet) {
    sheet = ss.insertSheet(ONGLET_FACTURES);
    sheet.appendRow(ENTETES);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, ENTETES.length).setFontWeight("bold");
    sheet.getRange("K2:K").setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(["À envoyer", "Envoyée", "Relancée", "Payée"]).build()
    );
  }
  return sheet;
}

/** Numéro suivant, jamais réutilisé : FA-2026-0043. */
function prochainNumero_() {
  const props = PropertiesService.getScriptProperties();
  const annee = new Date().getFullYear();
  const cle = `DERNIER_NUMERO_${annee}`;
  const n = Number(props.getProperty(cle) || 0) + 1;
  props.setProperty(cle, String(n));
  return `FA-${annee}-${String(n).padStart(4, "0")}`;
}

function envoyerFactures() {
  const sheet = ongletFactures_();
  const lignes = sheet.getDataRange().getValues();
  const tz = Session.getScriptTimeZone();
  const fmt = (n) => Number(n || 0).toLocaleString("fr-FR") + " DA";
  const dossier = DriveApp.getFolderById(DOSSIER_ID);
  let envoyees = 0;

  for (let i = 1; i < lignes.length; i++) {
    const l = lignes[i];
    if (l[F.statut - 1] !== "À envoyer" || !l[F.client - 1]) continue;

    const numero = l[F.numero - 1] || prochainNumero_();
    const date = new Date();
    const echeance = new Date(date.getTime() + DELAI_PAIEMENT_JOURS * 864e5);
    const total = Number(l[F.total - 1]) || 0;
    const acompte = Number(l[F.acompte - 1]) || 0;
    const reste = Math.max(0, total - acompte);

    // Copie du modèle, remplissage des repères, export en PDF, puis suppression de la copie.
    const copie = DriveApp.getFileById(MODELE_ID).makeCopy(`${numero} ${l[F.client - 1]}`, dossier);
    const doc = DocumentApp.openById(copie.getId());
    const remplacements = {
      NUMERO: numero, DATE: Utilities.formatDate(date, tz, "dd/MM/yyyy"), CLIENT: l[F.client - 1],
      DESCRIPTION: l[F.description - 1], TOTAL: fmt(total), ACOMPTE: fmt(acompte), RESTE: fmt(reste),
      ECHEANCE: Utilities.formatDate(echeance, tz, "dd/MM/yyyy"), PAIEMENT: LIEN_PAIEMENT,
    };
    Object.keys(remplacements).forEach((cle) => doc.getBody().replaceText(`\\{\\{${cle}\\}\\}`, String(remplacements[cle])));
    doc.saveAndClose();
    const pdf = dossier.createFile(copie.getAs(MimeType.PDF)).setName(`${numero}.pdf`);
    copie.setTrashed(true);

    if (l[F.email - 1]) {
      MailApp.sendEmail({
        to: l[F.email - 1],
        subject: `Facture ${numero} — ${ENTREPRISE_FACTURE}`,
        body: `Bonjour,\n\nVeuillez trouver ci-joint la facture ${numero}.\nReste à payer : ${fmt(reste)}, avant le ${remplacements.ECHEANCE}.\n` +
          `Paiement en ligne : ${LIEN_PAIEMENT}\n\nMerci pour votre confiance,\n${ENTREPRISE_FACTURE}`,
        attachments: [pdf.getAs(MimeType.PDF)],
        name: ENTREPRISE_FACTURE,
      });
    }

    sheet.getRange(i + 1, F.numero, 1, 1).setValue(numero);
    sheet.getRange(i + 1, F.date).setValue(date);
    sheet.getRange(i + 1, F.reste, 1, 4).setValues([[reste, echeance, reste ? "Envoyée" : "Payée", pdf.getUrl()]]);
    envoyees++;
  }
  SpreadsheetApp.getActive().toast(`${envoyees} facture(s) créée(s)`, "Factures");
}

/** Chaque matin : un rappel poli pour les factures envoyées dont l'échéance est passée. */
function relancerImpayes() {
  const sheet = ongletFactures_();
  const lignes = sheet.getDataRange().getValues();
  const maintenant = new Date();
  for (let i = 1; i < lignes.length; i++) {
    const l = lignes[i];
    const echeance = l[F.echeance - 1];
    if (l[F.statut - 1] !== "Envoyée" || !(echeance instanceof Date) || echeance > maintenant || !l[F.email - 1]) continue;
    MailApp.sendEmail({
      to: l[F.email - 1],
      subject: `Rappel : facture ${l[F.numero - 1]}`,
      body: `Bonjour,\n\nPetit rappel : la facture ${l[F.numero - 1]} (${Number(l[F.reste - 1]).toLocaleString("fr-FR")} DA) est arrivée à échéance.\n` +
        `Si le paiement est déjà parti, merci de ne pas tenir compte de ce message.\nPaiement en ligne : ${LIEN_PAIEMENT}\n\n${ENTREPRISE_FACTURE}`,
      name: ENTREPRISE_FACTURE,
    });
    sheet.getRange(i + 1, F.statut).setValue("Relancée");
  }
}
