# Épisode 21 · 50 entreprises à contacter pour vos commandes de fin d'année

**Fri 20 Nov** · Demo business: Pâtisserie Les Délices (fictional pastry shop selling corporate gift boxes)

| | |
|---|---|
| Hook A (number or question) | « 50 entreprises à contacter pour vos commandes de fin d'année. Trouvées en 5 minutes. » |
| Hook B (story or contrarian) | « Vous attendez les commandes de fin d'année ? Les autres vont les chercher. » |
| Caption CTA | « Commentez PROSPECT pour le script » |
| Demo | [`index.html`](index.html), [`prospects.gs`](prospects.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Choisissez vos cibles : quelles entreprises offrent des cadeaux en fin d'année ?
2. Une recherche Google Maps par type et par ville remplit votre tableau.
3. Chaque entreprise reçoit son script d'appel personnalisé.
4. Vous appelez, vous notez le résultat : la liste vous dit qui rappeler.

## Proof shot to record

Tap the 3 suggestions one after the other: the counter climbs to 50 companies with a phone number. Open a « Script », set one company to « Intéressée », then « Exporter ».

## Make it real

[`prospects.gs`](prospects.gs) uses Google's official Places API (New), not scraping. Create an API key restricted to Places API (New), add it as `PLACES_API_KEY` in Script properties, reload the sheet and use the « Prospects » menu. Each search returns up to 60 companies (3 pages of 20), de-duplicated by Google ID, with a status drop-down that includes « Ne plus contacter ». The API is paid beyond Google's monthly credit, so check the pricing before heavy use. The page uses sample data. Calls and visits are fine; for emails or SMS, check the rules in your country (GDPR in France and Belgium, CASL in Canada).

## Caption (draft)

```text
50 entreprises à contacter pour vos commandes de fin d'année. Trouvées en 5 minutes. 🎁

Une recherche Google Maps par type d'entreprise et par ville : nom, téléphone, note, site web. Et pour chacune, un script d'appel personnalisé.

Les commandes de fin d'année, ça se va chercher maintenant.
👉 Commentez PROSPECT pour le script.

#prospection #entrepreneur #b2b #automatisation #astucebusiness #digitalisation
```
