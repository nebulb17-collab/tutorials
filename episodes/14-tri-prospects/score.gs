/**
 * Automatise ça · Épisode 14 — Le tri automatique des demandes : chaud, tiède, froid
 *
 * À ajouter dans le MÊME projet Apps Script que l'épisode 7 (onglet « Prospects »).
 * Toutes les 5 minutes, chaque nouvelle demande reçoit :
 *   - une note sur 100 (colonne M) et sa priorité (colonne N) ;
 *   - une couleur de ligne : orange = chaud, jaune = tiède, bleu = froid ;
 *   - si elle est chaude, un email « à rappeler maintenant ».
 *
 * Installation : collez ce fichier, enregistrez, lancez une fois installerTri() (bouton ▶).
 * Adaptez la GRILLE à votre métier : les réponses doivent être les mêmes que dans votre formulaire.
 */

const SEUIL_CHAUD = 70;
const SEUIL_FROID = 40;
const ALERTE_CHAUD = true;

const GRILLE = {
  budget: { "Plus de 1 500 000 DA": 30, "500 000 – 1 500 000 DA": 25, "150 000 – 500 000 DA": 15, "Moins de 150 000 DA": 5 },
  delai: { "Dès que possible": 25, "Dans le mois": 20, "Dans 3 mois": 10, "Je me renseigne": 0 },
  source: { "Bouche-à-oreille": 10, "Google": 8, "Instagram": 5, "Facebook": 5, "TikTok": 3 },
};
const COULEURS = { "🔥 Chaud": "#FFEDD5", "🌤️ Tiède": "#FEF3C7", "❄️ Froid": "#E3ECF6" };

// Colonnes de l'onglet Prospects (épisode 7), en partant de 1.
const P = { nom: 2, telephone: 3, email: 4, travaux: 5, surface: 6, budget: 7, delai: 8, details: 9, source: 10, score: 13, priorite: 14 };

function installerTri() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "noterProspects")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("noterProspects").timeBased().everyMinutes(5).create();
}

function noterProspects() {
  const sheet = onglet_(); // défini dans apps-script.gs (épisode 7)
  sheet.getRange(1, P.score, 1, 2).setValues([["Score", "Priorité"]]).setFontWeight("bold");
  const lignes = sheet.getDataRange().getValues();

  for (let i = 1; i < lignes.length; i++) {
    const l = lignes[i];
    if (!l[P.nom - 1] || l[P.score - 1] !== "") continue; // déjà notée ou ligne vide

    const score = noter_(l);
    const priorite = score >= SEUIL_CHAUD ? "🔥 Chaud" : score < SEUIL_FROID ? "❄️ Froid" : "🌤️ Tiède";
    sheet.getRange(i + 1, P.score, 1, 2).setValues([[score, priorite]]);
    sheet.getRange(i + 1, 1, 1, P.priorite).setBackground(COULEURS[priorite]);

    if (ALERTE_CHAUD && priorite === "🔥 Chaud") {
      const tel = String(l[P.telephone - 1]).replace(/\D/g, "").replace(/^0/, "213");
      MailApp.sendEmail({
        to: ALERTE_EMAIL, // défini dans apps-script.gs (épisode 7)
        subject: `🔥 À rappeler maintenant : ${l[P.nom - 1]} (${score}/100)`,
        htmlBody: `<p><b>${esc_(l[P.nom - 1])}</b> · ${esc_(l[P.travaux - 1])} · ${esc_(l[P.budget - 1])} · ${esc_(l[P.delai - 1])}</p>` +
          (tel ? `<p><a href="tel:+${tel}">Appeler</a> · <a href="https://wa.me/${tel}">WhatsApp</a></p>` : ""),
      });
    }
  }
}

/** Note sur 100 : budget 30, délai 25, surface 15, coordonnées 10, description 10, source 10. */
function noter_(l) {
  const surface = Number(l[P.surface - 1]) || 0;
  const tel = String(l[P.telephone - 1]).trim();
  const email = String(l[P.email - 1]).trim();
  const details = String(l[P.details - 1]).trim();
  return (
    (GRILLE.budget[l[P.budget - 1]] || 0) +
    (GRILLE.delai[l[P.delai - 1]] || 0) +
    (surface >= 30 ? 15 : surface >= 10 ? 10 : 5) +
    (tel && email ? 10 : tel ? 7 : email ? 3 : 0) +
    (details.length >= 60 ? 10 : details.length >= 20 ? 5 : 0) +
    (GRILLE.source[l[P.source - 1]] || 0)
  );
}
