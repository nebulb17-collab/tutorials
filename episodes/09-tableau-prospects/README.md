# Épisode 9 · D'où viennent vos clients ? Le tableau de bord des prospects

**Fri 23 Oct** · Demo business: Rénov' Express

| | |
|---|---|
| Hook (first 3 s) | « Instagram, Google ou bouche-à-oreille : vous savez ce qui marche ? » |
| Caption CTA | « Vous voulez ce tableau ? Écrivez CLIENTS » |
| Demo | [`index.html`](index.html) |

## On-screen steps

1. Ajoutez la question « Comment nous avez-vous connus ? » à chaque formulaire.
2. Utilisez un lien différent par plateforme : …?source=instagram, …?source=google.
3. Chaque prospect arrive dans votre tableau avec sa source.
4. Un tableau de bord compte les prospects par canal : vous savez où investir.

## Proof shot to record

Switch « 7 jours / 30 jours / Tout » and « Prospects / Clients », then add a prospect from TikTok and watch its bar grow. Open the page with `?source=google` at the end of the address to show the source filling itself in.

## Make it real

The page uses sample data. On the real « Prospects » tab from episode 7, add a « Tableau » tab with (French-locale Sheets uses `;`):

```text
=QUERY(Prospects!A:L; "select J, count(B) where B is not null group by J order by count(B) desc label J 'Canal', count(B) 'Prospects'"; 1)
```

Clients signed per channel: `=COUNTIFS(Prospects!J:J; "Instagram"; Prospects!K:K; "Gagné")`. Then **Insert → Chart** on the result. Use one tracked link per platform (`…?source=instagram` in your Instagram bio, `…?source=google` on Google Business): the episode 7 form pre-selects the source from the link.

## Caption (draft)

```text
Instagram, Google ou bouche-à-oreille : vous savez vraiment ce qui vous amène des clients ? 🤔

Chaque formulaire note sa source, et un tableau compte tout seul. Vous savez enfin où mettre votre temps, et votre budget pub.

Vous voulez ce tableau ? Écrivez CLIENTS 👇

#automatisation #entrepreneur #digitalisation #astucebusiness #nocode #siteweb
```
