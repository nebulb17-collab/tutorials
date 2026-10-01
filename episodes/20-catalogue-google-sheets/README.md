# Épisode 20 · Le catalogue qui se met à jour depuis Google Sheets

**Wed 18 Nov** · Demo business: Boutique Atlas

| | |
|---|---|
| Hook A (number or question) | « Je change un chiffre dans Google Sheets… et le site se met à jour. » |
| Hook B (story or contrarian) | « "C'est encore disponible ?" La question que vous lisez toute la journée. » |
| Caption CTA | « Commentez STOCK pour le modèle » |
| Demo | [`index.html`](index.html), [`stock.gs`](stock.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Votre catalogue dans Google Sheets : produit, prix, stock, photo.
2. Publiez la feuille : votre site la lit et se met à jour tout seul.
3. Stock bas ou épuisé : « Plus que 2 » ou « Me prévenir » s'affichent automatiquement.
4. Quand le stock revient, vous recevez la liste des clientes à prévenir.

## Proof shot to record

In the « Catalogue » table, change a price, then put stock back on « Foulard soie Atlas »: the « Épuisé » badge disappears and the 2 clients to notify appear with their WhatsApp links. Then tap « Me prévenir » on the jacket.

## Make it real

Make a « Catalogue » tab (Produit, Prix, Stock, Image URL), then File → Share → Publish to the web → that tab → CSV, and paste the link into `SHEET_CSV_URL`: the page reloads it every minute and the editable table becomes read-only. Add [`stock.gs`](stock.gs) to the same spreadsheet, deploy it as a Web app for `SCRIPT_URL` (the « Me prévenir » requests), and run `installerAlerteStock()` once: when a product goes from 0 to some stock, you get the list of people to notify. Use a different spreadsheet from episode 19, since both scripts have their own `doPost`.

## Caption (draft)

```text
Je change un chiffre dans Google Sheets… et le site se met à jour. ✨

Prix, stock, « Plus que 2 », « Épuisé, me prévenir » : tout vient de votre tableau. Et quand le stock revient, vous savez exactement qui prévenir.

Fini les « c'est encore disponible ? ».
👉 Commentez STOCK pour le modèle.

#googlesheets #commerceenligne #nocode #petitscommerces #automatisation #siteweb
```
