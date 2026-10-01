/**
 * Automatise ça · Épisode 5 — Le rappel automatique la veille du rendez-vous
 *
 * À ajouter dans le MÊME projet Apps Script que l'épisode 4 (fichier → + → Script).
 * Il réutilise getSheet_() et readRows_() de apps-script.gs.
 *
 * Installation :
 * 1. Collez ce fichier, enregistrez.
 * 2. Choisissez le canal :
 *    - Email (gratuit, rien à configurer) : le client doit laisser son email.
 *    - WhatsApp : renseignez WA_TOKEN et WA_PHONE_ID (API WhatsApp Cloud de Meta) et créez
 *      un modèle de message « rappel_rdv » approuvé par Meta, avec 4 variables :
 *      {{1}} prénom, {{2}} prestation, {{3}} date, {{4}} heure.
 * 3. Lancez une fois installerDeclencheur() (bouton ▶) et acceptez les autorisations.
 *    Le script tournera ensuite tout seul chaque jour vers 18h.
 */

const SALON = "Salon Jasmin";
const HEURE_RAPPEL = 18; // le rappel part la veille, vers 18h
const INDICATIF = "213"; // pour transformer 0550… en 213550…

// WA_TOKEN et WA_PHONE_ID se remplissent via Projet → Paramètres → Propriétés du script
// (ne collez jamais le jeton dans le code).
function waConfig_() {
  const props = PropertiesService.getScriptProperties();
  return { token: props.getProperty("WA_TOKEN"), phoneId: props.getProperty("WA_PHONE_ID") };
}

/** À lancer une seule fois : crée le déclencheur quotidien. */
function installerDeclencheur() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "envoyerRappels")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("envoyerRappels").timeBased().everyDays(1).atHour(HEURE_RAPPEL).create();
}

/** Envoie un rappel à chaque client qui a rendez-vous demain. */
function envoyerRappels() {
  const sheet = getSheet_();
  const tz = Session.getScriptTimeZone();
  const demain = Utilities.formatDate(new Date(Date.now() + 24 * 3600 * 1000), tz, "yyyy-MM-dd");
  const wa = waConfig_();

  readRows_(sheet)
    .filter((r) => r.date === demain && r.statut !== "Annulé" && !r.rappel)
    .forEach((r) => {
      const envoye = wa.token && wa.phoneId ? envoyerWhatsApp_(r, wa) : envoyerEmail_(r);
      if (envoye) sheet.getRange(r.ligne, 9).setValue(new Date()); // colonne I : « Rappel envoyé »
    });
}

function texteRappel_(r) {
  const prenom = String(r.nom).split(" ")[0];
  return (
    `Bonjour ${prenom} 👋\n` +
    `Petit rappel : votre rendez-vous « ${r.prestation} » chez ${SALON} est demain à ${r.heure}.\n` +
    `Un empêchement ? Répondez simplement à ce message pour le déplacer.\nÀ demain !`
  );
}

function envoyerEmail_(r) {
  if (!r.email) return false;
  MailApp.sendEmail({ to: r.email, subject: `Rappel : votre rendez-vous demain à ${r.heure}`, body: texteRappel_(r), name: SALON });
  return true;
}

function envoyerWhatsApp_(r, wa) {
  const numero = String(r.telephone).replace(/\D/g, "").replace(/^0/, INDICATIF);
  const reponse = UrlFetchApp.fetch(`https://graph.facebook.com/v21.0/${wa.phoneId}/messages`, {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${wa.token}` },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      messaging_product: "whatsapp",
      to: numero,
      type: "template",
      template: {
        name: "rappel_rdv",
        language: { code: "fr" },
        components: [{
          type: "body",
          parameters: [String(r.nom).split(" ")[0], r.prestation, r.date.split("-").reverse().join("/"), r.heure]
            .map((text) => ({ type: "text", text: String(text) })),
        }],
      },
    }),
  });
  if (reponse.getResponseCode() >= 300) {
    console.error(`WhatsApp a refusé le rappel pour la ligne ${r.ligne} : ${reponse.getContentText()}`);
    return false;
  }
  return true;
}
