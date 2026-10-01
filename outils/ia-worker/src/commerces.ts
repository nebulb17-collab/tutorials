// Les infos de chaque commerce vivent ici, côté serveur : la page ne peut pas les modifier,
// et l'IA ne répond qu'à partir de ce texte. Remplacez par les vraies infos du client.

export interface Article {
  id: string;
  nom: string;
}

export interface Commerce {
  nom: string;
  whatsapp: string;
  signature: string;
  infos: string;
  /** Carte du commerce pour l'agent de commande (épisode 22). Les prix restent dans la page. */
  menu?: Article[];
}

export const COMMERCES: Record<string, Commerce> = {
  "salon-jasmin": {
    nom: "Salon Jasmin",
    whatsapp: "+213 000 000 000",
    signature: "L'équipe du Salon Jasmin",
    infos: `
Salon de coiffure et beauté pour femmes.
Adresse : 12 rue des Jasmins, Hydra, Alger. Parking gratuit devant le salon.
Horaires : du mardi au samedi de 9h à 19h, le dimanche de 10h à 16h. Fermé le lundi.
Prestations et prix :
- Brushing : 1 200 DA (30 min)
- Coupe + brushing : 2 500 DA (1 h)
- Couleur : à partir de 5 000 DA (1 h 30)
- Soin kératine : à partir de 9 000 DA (2 h)
- Manucure : 2 000 DA (1 h)
- Maquillage mariée : sur devis, essai conseillé 2 semaines avant
Réservation : en ligne 24h/24 sur le site, ou par WhatsApp.
Paiement : espèces et carte CIB/Edahabia.
Annulation : gratuite jusqu'à la veille, merci de prévenir.
`.trim(),
  },
  "le-figuier": {
    nom: "Restaurant Le Figuier",
    whatsapp: "+213 000 000 000",
    signature: "Yacine, gérant du Figuier",
    infos: `
Restaurant méditerranéen familial à Oran, cuisine maison, terrasse ombragée.
Horaires : tous les jours de 12h à 15h et de 19h à 23h.
Réservation conseillée le week-end. Livraison via WhatsApp dans un rayon de 5 km.
`.trim(),
  },
  "cafe-lumiere": {
    nom: "Café Lumière",
    whatsapp: "+213 000 000 000",
    signature: "L'équipe du Café Lumière",
    infos: `
Café de quartier, torréfaction maison, pâtisseries cuites chaque matin.
Ouvert tous les jours de 7h à 20h. Commandes à emporter, prêtes à l'heure demandée.
Ton de la marque : chaleureux, simple, gourmand, jamais pompeux.
`.trim(),
    menu: [
      { id: "espresso", nom: "Espresso" },
      { id: "cappuccino", nom: "Cappuccino" },
      { id: "latte-miel", nom: "Latte miel & cannelle" },
      { id: "latte-pistache", nom: "Latte pistache" },
      { id: "croissant", nom: "Croissant au beurre" },
      { id: "cheesecake", nom: "Cheesecake" },
      { id: "jus-orange", nom: "Jus d'orange pressé" },
    ],
  },
  "studio-nour": {
    nom: "Studio Nour",
    whatsapp: "+213 000 000 000",
    signature: "Nour, Studio Nour",
    infos: `
Photographe de mariages et d'événements basé à Alger, se déplace dans tout le pays.
Style : lumière naturelle, images spontanées, retouches douces et intemporelles.
Livraison : galerie privée en ligne sous 3 semaines, photos en haute définition.
Réservation de la date avec un acompte de 30 %, le solde le jour de l'événement.
`.trim(),
  },
};
