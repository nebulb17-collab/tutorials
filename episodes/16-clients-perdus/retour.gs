/**
 * Automatise ça · Épisode 16 — Le message qui fait revenir les clientes perdues
 *
 * À ajouter dans le MÊME projet Apps Script que l'épisode 4 (onglet « Réservations »).
 * Chaque lundi matin, le script :
 *   1. regroupe les rendez-vous par numéro de téléphone (une ligne = une visite) ;
 *   2. garde les clientes dont la dernière visite date d'au moins 60 jours ;
 *   3. vous envoie UN email avec, pour chacune, un lien WhatsApp et son message personnalisé déjà écrit.
 * Une cliente déjà proposée n'est pas reproposée pendant 60 jours (onglet « Relances clientes »).
 *
 * Installation : collez ce fichier, mettez votre email dans EMAIL_GERANTE, puis lancez
 * une fois installerRetour() (bouton ▶).
 */

const EMAIL_GERANTE = "vous@exemple.com";
const JOURS_ABSENCE = 60;
const SIGNATURE_RETOUR = "Sonia, Salon Jasmin";
const CONSEILS = {
  "Couleur": "Vos racines doivent commencer à se voir : c'est le bon moment pour une retouche.",
  "Coupe + brushing": "Une coupe d'entretien et vos pointes vous diront merci.",
  "Soin kératine": "Pour garder l'effet lisse, on conseille un soin d'entretien tous les 3 mois.",
  "Manucure": "Vos mains méritent une pause : on vous refait une jolie manucure ?",
  "Brushing": "Un événement à venir ? Un brushing et vous êtes prête.",
};

function installerRetour() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "listerClientesPerdues")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("listerClientesPerdues").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(9).create();
}

function listerClientesPerdues() {
  const tz = Session.getScriptTimeZone();
  const aujourdhui = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd");

  // 1. Dernière visite passée de chaque cliente (readRows_ vient de apps-script.gs, épisode 4).
  const clientes = {};
  readRows_(getSheet_())
    .filter((r) => r.statut !== "Annulé" && r.date && r.date <= aujourdhui)
    .forEach((r) => {
      const tel = String(r.telephone).replace(/\D/g, "");
      if (!tel) return;
      const c = clientes[tel] || (clientes[tel] = { tel: tel, nom: r.nom, visites: 0, date: "", prestation: "" });
      c.visites++;
      if (r.date >= c.date) Object.assign(c, { nom: r.nom, date: r.date, prestation: r.prestation });
    });

  // 2. Absentes depuis JOURS_ABSENCE jours, pas proposées récemment.
  const suivi = ongletSuivi_();
  const dejaProposees = {};
  suivi.getDataRange().getValues().slice(1).forEach((l) => (dejaProposees[String(l[0])] = l[2]));
  const maintenant = Date.now();
  const jours = (iso) => Math.floor((maintenant - new Date(iso + "T12:00:00").getTime()) / 864e5);
  const cibles = Object.values(clientes)
    .filter((c) => jours(c.date) >= JOURS_ABSENCE)
    .filter((c) => !(dejaProposees[c.tel] instanceof Date) || maintenant - dejaProposees[c.tel].getTime() > JOURS_ABSENCE * 864e5)
    .sort((a, b) => b.visites - a.visites);
  if (!cibles.length) return;

  // 3. Un email, un lien WhatsApp par cliente, déjà écrit.
  const lignes = cibles.map((c) => {
    const message = messageRetour_(c, jours(c.date));
    const numero = c.tel.replace(/^0/, "213");
    suivi.appendRow(["'" + c.tel, c.nom, new Date()]);
    return `<li><b>${c.nom}</b> · ${c.prestation} · il y a ${jours(c.date)} jours · ${c.visites} visite(s) — ` +
      `<a href="https://wa.me/${numero}?text=${encodeURIComponent(message)}">envoyer sur WhatsApp</a></li>`;
  });
  MailApp.sendEmail({
    to: EMAIL_GERANTE,
    subject: `💌 ${cibles.length} cliente(s) à faire revenir cette semaine`,
    htmlBody: `<p>Un geste par cliente : le message est déjà écrit.</p><ul>${lignes.join("")}</ul>`,
  });
}

function messageRetour_(c, jours) {
  const prenom = String(c.nom).split(" ")[0];
  const conseil = CONSEILS[c.prestation] || "On serait ravies de vous revoir.";
  return `Bonjour ${prenom} 🌸\nÇa fait ${Math.round(jours / 7)} semaines depuis votre ${String(c.prestation).toLowerCase()} ! ${conseil}\n` +
    `Je vous garde un créneau cette semaine ? Répondez simplement à ce message.\n${SIGNATURE_RETOUR}`;
}

function ongletSuivi_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Relances clientes");
  if (!sheet) {
    sheet = ss.insertSheet("Relances clientes");
    sheet.appendRow(["Téléphone", "Nom", "Proposée le"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
