/**
 * Récaps de la semaine, au format « Quelle semaine 🤯 » inspiré de @drcintas
 * (« What a crazy week in AI 🤯 … Here's EVERYTHING you need to know »).
 * À poster le samedi ou le dimanche : la liste, puis chaque épisode en une carte, puis « enregistrez ».
 */
export const semaines = [
  { nom: "semaine-1-commandes-whatsapp", num: 1, sous: "3 automatisations WhatsApp à copier pour votre commerce", items: [
    { ep: 1, jour: "lundi", icone: "☕", titre: "Le bouton « Commander sur WhatsApp »", ligne: "Chaque produit ouvre WhatsApp avec la commande déjà écrite.", mot: "MENU" },
    { ep: 2, jour: "mercredi", icone: "🛍️", titre: "La commande complète en un message", ligne: "Taille, couleur, quantité et adresse, sans 10 allers-retours.", action: "📌 Enregistrez-la" },
    { ep: 3, jour: "vendredi", icone: "📱", titre: "Le QR code WhatsApp en vitrine", ligne: "Le client scanne : son message est déjà écrit.", mot: "QR" },
  ] },
  { nom: "semaine-2-reservations", num: 2, sous: "3 automatisations pour ne plus gérer l'agenda à la main", items: [
    { ep: 4, jour: "lundi", icone: "📅", titre: "Les réservations qui remplissent Google Sheets", ligne: "Chaque réservation devient une ligne, toute seule.", mot: "AGENDA" },
    { ep: 5, jour: "mercredi", icone: "⏰", titre: "Le rappel automatique la veille", ligne: "À 18h, la veille, sans y penser.", action: "📤 Partagez-la à un salon" },
    { ep: 6, jour: "vendredi", icone: "🌙", titre: "Les créneaux en ligne", ligne: "Le client réserve à 23h, la confirmation part tout de suite.", mot: "RDV" },
  ] },
  { nom: "semaine-3-prospects-relances", num: 3, sous: "3 automatisations pour ne plus perdre un client", items: [
    { ep: 7, jour: "lundi", icone: "🔔", titre: "Le devis avec alerte instantanée", ligne: "Vous rappelez en 5 minutes, pas en 2 jours.", mot: "DEVIS" },
    { ep: 8, jour: "mercredi", icone: "🔁", titre: "La relance après 2 jours", ligne: "Une relance polie, une seule fois, automatique.", action: "📌 Enregistrez-la" },
    { ep: 9, jour: "vendredi", icone: "📊", titre: "D'où viennent vos clients", ligne: "Chaque formulaire note sa source, le tableau compte.", mot: "CLIENTS" },
  ] },
  { nom: "semaine-4-ia-site-complet", num: 4, sous: "L'IA au service de votre commerce, et le site qui rassemble tout", items: [
    { ep: 10, jour: "lundi", icone: "🤖", titre: "Le chatbot qui répond aux questions", ligne: "Horaires, prix, adresse : en 2 secondes, avec vos infos.", mot: "IA" },
    { ep: 11, jour: "mercredi", icone: "⭐", titre: "L'IA qui prépare vos réponses aux avis", ligne: "Elle écrit, vous relisez, vous validez.", action: "📌 Enregistrez-la" },
    { ep: 12, jour: "vendredi", icone: "🚀", titre: "Le site complet, de A à Z", ligne: "Réservation, rappel, Sheets, assistant et WhatsApp.", action: "🔗 Lien en bio" },
  ] },
  { nom: "semaine-5-ia-au-travail", num: 5, sous: "3 automatisations où l'IA fait le premier jet", items: [
    { ep: 13, jour: "lundi", icone: "📝", titre: "Le devis personnalisé en 60 secondes", ligne: "6 champs, l'IA écrit, vous envoyez.", mot: "PROPOSITION" },
    { ep: 14, jour: "mercredi", icone: "🔥", titre: "Le tri des demandes : chaud, tiède, froid", ligne: "Vous rappelez les bons clients d'abord.", mot: "TRI" },
    { ep: 15, jour: "vendredi", icone: "📸", titre: "Une photo, une semaine de posts", ligne: "Post, stories, statut, Google et Reel.", mot: "POST" },
  ] },
  { nom: "semaine-6-fichier-clients", num: 6, sous: "L'argent qui dort dans votre fichier clients", items: [
    { ep: 16, jour: "lundi", icone: "💌", titre: "Le message aux clientes perdues", ligne: "Un message personnel, un geste par cliente.", mot: "RETOUR" },
    { ep: 17, jour: "mercredi", icone: "⭐", titre: "La demande d'avis automatique", ligne: "2 heures après le rendez-vous, avec le lien.", mot: "AVIS" },
    { ep: 18, jour: "vendredi", icone: "🧾", titre: "La facture qui se fait toute seule", ligne: "Numérotée, envoyée, suivie jusqu'au paiement.", mot: "FACTURE" },
  ] },
  { nom: "semaine-7-black-friday", num: 7, sous: "Spécial Black Friday et commandes de fin d'année", items: [
    { ep: 19, jour: "lundi", icone: "🖤", titre: "La liste d'attente Black Friday", ligne: "Vos inscrites sont prévenues en premier.", mot: "BLACK" },
    { ep: 20, jour: "mercredi", icone: "🛍️", titre: "Le catalogue depuis Google Sheets", ligne: "Vous changez le stock, le site suit.", mot: "STOCK" },
    { ep: 21, jour: "vendredi", icone: "🎁", titre: "50 entreprises à contacter", ligne: "Pour vos commandes de fin d'année.", mot: "PROSPECT" },
  ] },
  { nom: "semaine-8-employe-ia", num: 8, sous: "Votre premier employé IA, et les 5 automatisations à garder", items: [
    { ep: 22, jour: "lundi", icone: "🤖", titre: "L'agent IA qui prend les commandes", ligne: "Il comprend, il demande, il envoie.", mot: "AGENT" },
    { ep: 23, jour: "mercredi", icone: "📊", titre: "Le rapport du lundi matin", ligne: "Votre semaine en un message.", mot: "LUNDI" },
    { ep: 24, jour: "vendredi", icone: "🧠", titre: "Les 5 automatisations à mettre en place", ligne: "Faites le diagnostic gratuit en 6 questions.", action: "🔗 Lien en bio" },
  ] },
];
