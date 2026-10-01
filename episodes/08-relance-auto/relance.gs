/**
 * Automatise ça · Épisode 8 — La relance automatique après 2 jours sans réponse
 *
 * À ajouter dans le MÊME projet Apps Script que l'épisode 7 (il lit l'onglet « Prospects »).
 *
 * Comment ça marche :
 * - Quand un prospect vous répond, passez son statut à « Répondu » (ou Gagné / Perdu).
 * - Chaque matin, le script cherche les prospects encore « Nouveau » depuis 2 jours ou plus,
 *   leur envoie un message poli, puis passe leur statut à « Relancé » avec la date.
 * - Une seule relance par prospect : on ne harcèle personne.
 *
 * Installation : collez ce fichier, enregistrez, lancez une fois installerRelance() (bouton ▶).
 */

const JOURS_AVANT_RELANCE = 2;
const HEURE_RELANCE = 10; // vers 10h du matin, l'heure où l'on répond le plus volontiers

// Colonnes de l'onglet Prospects (épisode 7), en partant de 1.
const COL = { recu: 1, nom: 2, telephone: 3, email: 4, travaux: 5, statut: 11, relance: 12 };

function installerRelance() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "relancerProspects")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("relancerProspects").timeBased().everyDays(1).atHour(HEURE_RELANCE).create();
}

function relancerProspects() {
  const sheet = onglet_(); // défini dans apps-script.gs (épisode 7)
  const lignes = sheet.getDataRange().getValues();
  const limite = Date.now() - JOURS_AVANT_RELANCE * 24 * 3600 * 1000;
  const aRelancer = []; // prospects sans email : relance WhatsApp à faire en un clic

  for (let i = 1; i < lignes.length; i++) {
    const l = lignes[i];
    const recu = l[COL.recu - 1];
    if (l[COL.statut - 1] !== "Nouveau" || !(recu instanceof Date) || recu.getTime() > limite) continue;

    const prospect = { nom: l[COL.nom - 1], telephone: String(l[COL.telephone - 1]), email: l[COL.email - 1], travaux: l[COL.travaux - 1] };
    if (prospect.email) {
      MailApp.sendEmail({ to: prospect.email, subject: `Votre projet ${String(prospect.travaux).toLowerCase()}`, body: messageRelance_(prospect), name: ENTREPRISE });
    } else {
      aRelancer.push(prospect);
    }
    sheet.getRange(i + 1, COL.statut).setValue("Relancé");
    sheet.getRange(i + 1, COL.relance).setValue(new Date());
  }

  // Sans email, on vous envoie la liste avec des liens WhatsApp déjà écrits : 1 clic par relance.
  if (aRelancer.length) {
    const liens = aRelancer.map((p) => {
      const tel = p.telephone.replace(/\D/g, "").replace(/^0/, "213");
      return `<li>${p.nom} — <a href="https://wa.me/${tel}?text=${encodeURIComponent(messageRelance_(p))}">relancer sur WhatsApp</a></li>`;
    });
    MailApp.sendEmail({ to: ALERTE_EMAIL, subject: `⏰ ${aRelancer.length} relance(s) à envoyer aujourd'hui`, htmlBody: `<ul>${liens.join("")}</ul>` });
  }
}

function messageRelance_(p) {
  const prenom = String(p.nom).split(" ")[0];
  return (
    `Bonjour ${prenom},\n\n` +
    `Je me permets de revenir vers vous au sujet de votre projet (${String(p.travaux).toLowerCase()}).\n` +
    `Avez-vous eu le temps d'y réfléchir ? Je peux passer voir le chantier cette semaine, sans engagement.\n\n` +
    `Belle journée,\n${ENTREPRISE}`
  );
}
