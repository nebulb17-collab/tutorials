/**
 * Automatise ça · Épisode 23 — Le rapport du lundi matin
 *
 * À ajouter dans le MÊME projet Apps Script que l'épisode 4 (onglet « Réservations »).
 * Chaque lundi vers 8h, vous recevez un email avec la semaine écoulée (du lundi au dimanche) :
 * rendez-vous, chiffre d'affaires, absences, nouvelles clientes, et la comparaison avec la semaine d'avant.
 *
 * Pour compter les absences, passez le statut d'une réservation à « Absente » quand la cliente
 * ne vient pas. Le chiffre est calculé avec les prix ci-dessous (rendez-vous non annulés et non absents).
 *
 * Installation : collez ce fichier, mettez votre email, puis lancez une fois installerRapport() (bouton ▶).
 */

const EMAIL_RAPPORT = "vous@exemple.com";
const PRIX_PRESTATIONS = { "Coupe + brushing": 2500, "Brushing": 1200, "Couleur": 5000, "Soin kératine": 9000, "Manucure": 2000 };

function installerRapport() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "envoyerRapport")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("envoyerRapport").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(8).create();
}

function envoyerRapport() {
  const tz = Session.getScriptTimeZone();
  const jour = (d) => Utilities.formatDate(d, tz, "yyyy-MM-dd");
  const aujourdhui = new Date();
  const lundi = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate() - ((aujourdhui.getDay() + 6) % 7));
  const semaine = (decalage) => {
    const debut = new Date(lundi.getTime() - decalage * 7 * 864e5);
    return { debut: jour(debut), fin: jour(new Date(debut.getTime() + 6 * 864e5)) };
  };
  const s1 = semaine(1), s2 = semaine(2);

  const toutes = readRows_(getSheet_()); // apps-script.gs, épisode 4
  const premiereVisite = {};
  toutes.filter((r) => r.statut !== "Annulé").forEach((r) => {
    const tel = String(r.telephone).replace(/\D/g, "");
    if (tel && (!premiereVisite[tel] || r.date < premiereVisite[tel])) premiereVisite[tel] = r.date;
  });

  const compter = (s) => {
    const rdv = toutes.filter((r) => r.date >= s.debut && r.date <= s.fin && r.statut !== "Annulé");
    const venues = rdv.filter((r) => r.statut !== "Absente");
    const nouvelles = rdv.filter((r) => premiereVisite[String(r.telephone).replace(/\D/g, "")] === r.date);
    const services = {};
    venues.forEach((r) => (services[r.prestation] = (services[r.prestation] || 0) + 1));
    const top = Object.entries(services).sort((a, b) => b[1] - a[1])[0];
    return {
      rdv: rdv.length,
      ca: venues.reduce((t, r) => t + (PRIX_PRESTATIONS[r.prestation] || 0), 0),
      absences: rdv.length - venues.length,
      nouvelles: nouvelles.length,
      top: top ? `${top[0]} (${top[1]})` : "—",
    };
  };
  const a = compter(s1), b = compter(s2);

  const evolution = (x, y, hausseBonne = true) => {
    if (!y) return "";
    const pct = Math.round(((x - y) / y) * 100);
    if (!pct) return " (stable)";
    const couleur = (pct > 0) === hausseBonne ? "#1E7A42" : "#B3261E";
    return ` <span style="color:${couleur}">(${pct > 0 ? "▲" : "▼"} ${Math.abs(pct)} %)</span>`;
  };
  const fmt = (n) => Number(n).toLocaleString("fr-FR");
  const conseil = a.absences >= 3 && a.absences > b.absences
    ? `${a.absences} absences cette semaine : vérifiez que le rappel de la veille (épisode 5) est bien actif.`
    : a.nouvelles < b.nouvelles
      ? "Moins de nouvelles clientes que la semaine d'avant : relancez vos clientes perdues (épisode 16)."
      : `Belle semaine ! Prestation n°1 : ${a.top}. Mettez-la en avant dans votre prochain post.`;

  MailApp.sendEmail({
    to: EMAIL_RAPPORT,
    subject: `📊 Votre semaine : ${a.rdv} rendez-vous, ${fmt(a.ca)} DA`,
    htmlBody:
      `<h2>Votre semaine du ${s1.debut.split("-").reverse().join("/")} au ${s1.fin.split("-").reverse().join("/")}</h2>` +
      `<ul>` +
      `<li><b>Rendez-vous :</b> ${a.rdv}${evolution(a.rdv, b.rdv)}</li>` +
      `<li><b>Chiffre d'affaires :</b> ${fmt(a.ca)} DA${evolution(a.ca, b.ca)}</li>` +
      `<li><b>Absences :</b> ${a.absences}${evolution(a.absences, b.absences, false)}</li>` +
      `<li><b>Nouvelles clientes :</b> ${a.nouvelles}${evolution(a.nouvelles, b.nouvelles)}</li>` +
      `<li><b>Prestation n°1 :</b> ${a.top}</li>` +
      `</ul><p><b>Une action pour cette semaine :</b> ${conseil}</p>`,
  });
}
