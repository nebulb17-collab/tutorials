# Épisode 18 · La facture qui se fait toute seule

**Fri 13 Nov** · Demo business: Studio Nour

| | |
|---|---|
| Hook A (number or question) | « Une facture propre, numérotée et envoyée en 30 secondes. » |
| Hook B (story or contrarian) | « Encore une soirée à faire vos factures sur Word ? » |
| Caption CTA | « Commentez FACTURE pour le modèle » |
| Demo | [`index.html`](index.html), [`facture.gs`](facture.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Une fois pour toutes : votre modèle de facture et vos prestations avec leurs prix.
2. Choisissez le client et les prestations : numéro, dates et totaux se remplissent seuls.
3. Le PDF part par email ou WhatsApp, avec le lien de paiement.
4. Le tableau suit chaque facture : en attente, payée, ou relancée automatiquement.

## Proof shot to record

Pick Sarah & Yanis, keep Signature + album, tap « Créer la facture »: number, totals, deposit and payment QR code appear, and the log shows the new invoice « En attente ». Tap « Payée ✓ », then end on the hours calculator.

## Make it real

[`facture.gs`](facture.gs) runs in its own Google Sheets with a Google Docs template (placeholders `{{NUMERO}}`, `{{DATE}}`, `{{CLIENT}}`, `{{DESCRIPTION}}`, `{{TOTAL}}`, `{{ACOMPTE}}`, `{{RESTE}}`, `{{ECHEANCE}}`, `{{PAIEMENT}}`) and a Drive folder. Set `MODELE_ID` and `DOSSIER_ID`, reload the sheet and use the « Factures » menu. Numbers never repeat (one counter per year), the PDF is emailed with the payment link, and `installerRelanceImpayes()` sends one polite reminder after the due date. Legal mentions and taxes depend on the country and the business status: add them to the template. The payment link can come from any provider that works where the client sells (Stripe, Chargily, PayPal…).

## Caption (draft)

```text
Encore une soirée à faire vos factures sur Word ? 🧾

Choisissez le client et les prestations : numéro, totaux, échéance et lien de paiement se remplissent seuls. Le PDF part par email ou WhatsApp, et le tableau suit chaque facture jusqu'au paiement.

👉 Commentez FACTURE pour le modèle.

#automatisation #facturation #entrepreneur #freelance #nocode #digitalisation
```
