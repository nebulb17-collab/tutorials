/*
 * Moteur de motion design « Automatise ça ».
 *
 * Chaque vidéo est construite en DOM (1080 × 1920) avec des animations CSS.
 * Toutes les animations sont mises en pause, puis seek(t) les place à l'instant t :
 * le rendu image par image est donc exact et reproductible (voir render.mjs).
 *
 * Types de vidéo : "episode" (tuto express), "semaine" (récap « Quelle semaine 🤯 »),
 * "intro" (générique seul) et "fin" (carte de fin seule).
 */
(() => {
  const stage = document.getElementById("stage");
  const updaters = [];
  let couverture = 1; // instant de l'image de couverture (accroche entièrement affichée)
  let accentTexts = "";

  // ---------- Outils ----------
  const el = (tag, cls, parent, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (parent) parent.append(e);
    return e;
  };
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const fmt = (n) => Math.round(n).toLocaleString("fr-FR").replace(/[  ]/g, " ");
  // Espaces insécables du français : jamais de « ? » ou de « : » seul en début de ligne.
  const fr = (s) => String(s).replace(/ ([?!:;»%])/g, " $1").replace(/« /g, "« ");

  /** Ajoute une animation CSS : début et durée en secondes, depuis le début de la vidéo. */
  function anim(e, name, start, dur, { ease = "cubic-bezier(.2,.8,.2,1)", fill = "both", iter = 1, dir = "normal" } = {}) {
    const a = `${name} ${dur}s ${ease} ${start}s ${iter === Infinity ? "infinite" : iter} ${dir} ${fill}`;
    e.style.animation = e.style.animation ? `${e.style.animation}, ${a}` : a;
    return e;
  }
  const at = (e, css) => Object.assign(e.style, css) && e;

  /** Calque de scène : entre en fondu, sort en fondu (la sortie ne remplit pas avant son début). */
  function layer(start, end, bg, { enter = "sceneIn" } = {}) {
    const s = el("div", "scene", stage);
    s.style.background = bg;
    anim(s, enter, start, 0.45);
    anim(s, "sceneOut", end - 0.3, 0.3, { fill: "forwards", ease: "ease-in" });
    return s;
  }

  /** Taches de couleur qui dérivent lentement : l'effet « vivant » des fonds. */
  function blobs(parent, colors) {
    colors.forEach(([color, x, y, size], i) => {
      const b = el("div", "blob", parent);
      at(b, { background: `radial-gradient(circle, ${color} 0%, ${color}99 30%, ${color}00 70%)`, left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px` });
      anim(b, i % 2 ? "drift2" : "drift1", 0, 5 + i, { ease: "ease-in-out", iter: Infinity, dir: "alternate" });
    });
  }

  /** Texte révélé mot à mot. *mots* = mis en valeur (couleur de marque). Renvoie la fin de l'animation. */
  function words(parent, text, start, { stagger = 0.07, dur = 0.5, name = "up" } = {}) {
    const tokens = [];
    fr(text).split(/(\*[^*]+\*)/).filter(Boolean).forEach((seg) => {
      const em = seg.startsWith("*") && seg.endsWith("*");
      (em ? seg.slice(1, -1) : seg).split(/ +/).filter(Boolean).forEach((w) => tokens.push({ w, em }));
    });
    tokens.forEach(({ w, em }, i) => {
      if (i) parent.append(" ");
      anim(el("span", "w" + (em ? " em" : ""), parent, w), name, start + i * stagger, dur);
    });
    accentTexts += text;
    return start + tokens.length * stagger + dur;
  }

  /** Texte tapé lettre à lettre entre t0 et t1. */
  function typing(e, text, t0, t1) {
    const chars = Array.from(text);
    accentTexts += text;
    updaters.push((t) => { e.textContent = chars.slice(0, Math.round(clamp((t - t0) / (t1 - t0)) * chars.length)).join(""); });
  }

  /** Nombre qui monte de 0 à value entre t0 et t1. */
  function counter(e, value, t0, t1, suffix = "") {
    updaters.push((t) => { e.textContent = fmt(value * easeOut(clamp((t - t0) / (t1 - t0)))) + suffix; });
  }

  // ---------- Scènes communes ----------
  /** Générique « Automatise ça » : disque terracotta, nom de la série, numéro d'épisode. */
  function intro(start, label) {
    const end = start + 1.7;
    const s = layer(start, end, "var(--cream)", { enter: "fadeIn" });
    const disc = el("div", "intro-disc", s);
    anim(disc, "circleGrow", start, 0.55, { ease: "cubic-bezier(.7,0,.3,1)" });
    const logo = el("div", "intro-logo", s);
    anim(el("div", "kicker", logo, "TUTO EXPRESS"), "up", start + 0.25, 0.4);
    const name = el("div", "name", logo);
    words(name, "Automatise ça", start + 0.35, { stagger: 0.1, dur: 0.45 });
    if (label) anim(el("div", "ep", logo, label), "pop", start + 0.7, 0.45);
    accentTexts += "TUTO EXPRESS" + (label || "");
    return end;
  }

  function hookScene(start, dur, { sticker, hook, sub }) {
    const end = start + dur;
    const s = layer(start, end, "var(--ink)");
    s.classList.add("on-dark");
    blobs(s, [["#CF7652", 520, 180, 620], ["#A9583A", -160, 1250, 560], ["#F2B79C", 700, 1350, 380]]);
    if (sticker) { const st = el("div", "sticker", s, fr(sticker)); anim(st, "popTilt", start + 0.15, 0.55); accentTexts += sticker; }
    const h = el("div", "hook" + (hook.replace(/\*/g, "").length > 62 ? " long" : ""), s);
    words(h, hook, start + 0.35, { stagger: 0.075 });
    if (sub) { const p = el("div", "hook-sub", s); words(p, sub, start + dur - 1.4, { stagger: 0.04 }); }
    return end;
  }

  function resultScene(start, dur, { titre, gratuit, comp }) {
    const end = start + dur;
    const s = layer(start, end, "var(--cream)");
    blobs(s, [["#F2B79C", 640, 260, 520], ["#FBEDE6", -120, 1300, 600]]);
    anim(el("div", "label", s, "LE RÉSULTAT"), "pop", start + 0.1, 0.4);
    const t = el("div", "result-title", s);
    words(t, titre, start + 0.2, { stagger: 0.05 });
    const phone = el("div", "phone", el("div", "phone-wrap", s));
    anim(phone, "upBig", start + 0.25, 0.7);
    const screen = el("div", "screen", phone);
    COMPONENTS[comp.type](screen, comp, start + 0.9, end - 0.3);
    if (gratuit) { const b = el("div", "badge-free", s, "100 %\ngratuit"); b.style.whiteSpace = "pre"; anim(b, "popTilt", start + 1.3, 0.5); }
    return end;
  }

  function stepsScene(start, dur, { titre = "En 4 étapes 👇", etapes }) {
    titre = titre || "En 4 étapes 👇";
    const end = start + dur;
    const s = layer(start, end, "var(--brand)");
    blobs(s, [["#F2B79C", 600, 120, 520], ["#A9583A", -200, 1300, 640]]);
    const h = el("div", "steps-title", s);
    words(h, titre, start + 0.15, { stagger: 0.08 });
    const top0 = 520, gap = etapes.length > 4 ? 196 : 236;
    const per = (dur - 1.4) / etapes.length;
    const rail = el("div", "rail", s);
    at(rail, { top: `${top0 + 54}px`, height: `${gap * (etapes.length - 1)}px` });
    anim(rail, "growY", start + 0.7, per * (etapes.length - 1), { ease: "linear" });
    etapes.forEach((txt, i) => {
      const row = el("div", "step", s);
      at(row, { top: `${top0 + i * gap}px` });
      const t0 = start + 0.7 + i * per;
      const num = el("div", "num", row, String(i + 1));
      anim(num, "pop", t0, 0.45);
      const tx = el("div", "txt", row, fr(txt));
      anim(tx, "slideIn", t0 + 0.08, 0.5);
      accentTexts += txt;
      if (i < etapes.length - 1) anim(row, "dim", t0 + per, 0.3, { fill: "forwards" });
    });
    return end;
  }

  function ctaScene(start, dur, cta, { follow = true } = {}) {
    const end = start + dur;
    const scene = layer(start, end, "var(--ink)");
    blobs(scene, [["#CF7652", 380, 520, 640], ["#A9583A", -200, 1400, 520]]);
    const s = el("div", "cta-col", scene);
    if (cta.type === "keyword") {
      anim(el("div", "cta-top", s, "Commentez"), "up", start + 0.1, 0.45);
      const chip = el("div", "cta-chip", s);
      const span = el("span", "", chip, cta.mot);
      // Les mots longs (PROPOSITION…) rétrécissent pour tenir dans l'écran.
      span.style.fontSize = `${cta.mot.length <= 4 ? 150 : cta.mot.length <= 6 ? 132 : cta.mot.length <= 8 ? 112 : 92}px`;
      anim(span, "pop", start + 0.35, 0.5);
      anim(span, "pulse", start + 0.9, 0.6, { ease: "ease-in-out", iter: Infinity, dir: "alternate" });
      accentTexts += "Commentez" + cta.mot;
    } else {
      const icons = { save: "📌", share: "📤", bio: "🔗" };
      anim(el("div", "cta-top", s, icons[cta.type] || "👉"), "pop", start + 0.1, 0.45);
      const chip = el("div", "cta-chip text", s);
      const span = el("span", "", chip, fr(cta.texte));
      anim(span, "pop", start + 0.3, 0.5);
      accentTexts += cta.texte;
    }
    if (cta.suite) { const p = el("div", "cta-suite", s); words(p, cta.suite, start + 0.7, { stagger: 0.05 }); }
    if (follow) {
      const f = el("div", "cta-follow", s, fr("Suivez « Automatise ça » : une automatisation par vidéo, 3 fois par semaine."));
      anim(f, "up", start + 1.2, 0.5);
      const sup = el("div", "cta-support", s, fr("Ces vidéos prennent du temps à créer : si celle-ci vous a aidé, un like ou un partage m'aide énormément 🙏"));
      anim(sup, "up", start + 1.6, 0.5);
      accentTexts += f.textContent + sup.textContent;
    }
    anim(el("div", "cta-brand", s, "AUTOMATISE ÇA · CLICKVENTE"), "fadeIn", start + 1.9, 0.5);
    return end;
  }

  // ---------- Composants dans l'écran du téléphone ----------
  const COMPONENTS = {
    /** Discussion : bulles entrantes (in), sortantes (out), système (sys/ok), avec « … » avant les réponses. */
    chat(screen, c, t0) {
      const root = el("div", "chat", screen);
      const head = el("div", "chat-head", root);
      el("div", "av", head, (c.titre || "?")[0]);
      const who = el("div", "", head);
      el("b", "", who, c.titre);
      el("small", "", who, c.statut || "en ligne");
      const body = el("div", "chat-body", root);
      c.messages.forEach((m) => {
        if (m.side === "in" && !m.direct) {
          const ty = el("div", "typing", body);
          [0, 1, 2].forEach((k) => anim(el("i", "", ty), "dots", t0 + m.t - 0.9 + k * 0.12, 0.6, { iter: 2 }));
          anim(ty, "fadeIn", t0 + m.t - 0.9, 0.2);
          anim(ty, "fadeOut", t0 + m.t - 0.05, 0.05, { fill: "forwards" });
          ty.style.position = "absolute";
          ty.style.left = "22px";
          ty.dataset.anchor = "1";
        }
        const b = el("div", "bubble " + m.side, body);
        if (m.type) { b.textContent = ""; typing(b, m.text, t0 + m.t, t0 + m.t + m.type); anim(b, "fadeIn", t0 + m.t, 0.15); }
        else { b.textContent = m.text; anim(b, "pop", t0 + m.t, 0.4); }
        accentTexts += m.text;
      });
      // Toutes les bulles gardent leur place (jamais de display: none, qui relancerait leurs animations) :
      // celles à venir sont seulement transparentes. Les « … » s'affichent à l'endroit de la bulle qui arrive.
      updaters.push(() => {
        for (const node of body.querySelectorAll("[data-anchor]")) node.style.top = `${node.nextElementSibling.offsetTop}px`;
      });
    },

    /** Écran verrouillé : horloge (qui peut passer d'une heure à l'autre) et notifications qui tombent. */
    notif(screen, c, t0) {
      const root = el("div", "lock", screen);
      const clock = el("div", "clock", root, c.heure);
      if (c.heureApres) updaters.push((t) => { clock.textContent = t >= t0 + c.change ? c.heureApres : c.heure; });
      el("div", "date", root, c.date);
      c.notifs.forEach((n, i) => {
        const card = el("div", "notif", root);
        at(card, { top: `${400 + i * 250}px` });
        const app = el("div", "app", card);
        el("span", "", app, `${n.icone} ${n.app}`);
        el("span", "", app, "maintenant");
        el("b", "", card, n.titre);
        el("p", "", card, fr(n.texte));
        anim(card, "drop", t0 + n.t, 0.6);
        accentTexts += n.icone + n.app + n.titre + n.texte;
      });
    },

    /** Tableau : lignes qui arrivent (surlignées en jaune), cellule qui change, message en bas. */
    sheet(screen, c, t0) {
      const root = el("div", "sheet", screen);
      const head = el("div", "sheet-head", root);
      el("i", "", head);
      el("span", "", head, c.titre);
      const table = el("table", "", root);
      const thr = el("tr", "", el("thead", "", table));
      c.colonnes.forEach((h) => el("th", "", thr, h));
      const tb = el("tbody", "", table);
      c.lignes.forEach((r) => {
        const tr = el("tr", "", tb);
        r.cells.forEach((v, j) => {
          const td = el("td", "", tr);
          const span = el("span", "", td, v);
          if (c.change && c.change.ligne === c.lignes.indexOf(r) && c.change.col === j) {
            updaters.push((t) => { span.textContent = t >= t0 + c.change.t ? c.change.vers : v; });
            anim(span, "cellFlash", t0 + c.change.t, 0.5);
          }
        });
        if (r.t != null) { anim(tr, "fadeIn", t0 + r.t, 0.3); anim(tr, "flash", t0 + r.t, 1.6, { fill: "none" }); }
      });
      if (c.toast) { const to = el("div", "toast", root, fr(c.toast.texte)); anim(to, "up", t0 + c.toast.t, 0.5); accentTexts += c.toast.texte; }
      accentTexts += c.titre + c.colonnes.join("") + JSON.stringify(c.lignes);
    },

    /** Cartes qui arrivent une à une : pastille (émoji ou score), titre, sous-titre, étiquette. */
    cards(screen, c, t0) {
      const root = el("div", "cards", screen);
      if (c.titre) anim(el("div", "cards-head", root, fr(c.titre)), "up", t0, 0.45);
      c.items.forEach((it, i) => {
        const card = el("div", "card", root);
        const ic = el("div", "ic", card);
        if (it.score != null) {
          ic.classList.add("score");
          ic.style.setProperty("--p", it.score);
          ic.style.setProperty("--c", { hot: "var(--hot)", warm: "var(--warm)", cold: "var(--cold)" }[it.ton] || "var(--brand)");
          el("span", "", ic, it.score);
        } else ic.textContent = it.icone;
        const tx = el("div", "tx", card);
        el("b", "", tx, fr(it.titre));
        if (it.sous) el("small", "", tx, fr(it.sous));
        const t = t0 + (it.t ?? 0.35 + i * 0.45);
        if (it.etiquette) {
          const chip = el("span", "chip " + (it.ton || ""), card, it.etiquette);
          if (it.apres) {
            const alt = el("span", "chip alt ok", card, it.apres.texte);
            anim(chip, "fadeOut", t0 + it.apres.t, 0.2, { fill: "forwards" });
            anim(alt, "pop", t0 + it.apres.t, 0.35);
            accentTexts += it.apres.texte;
          }
        }
        anim(card, "slideIn", t, 0.45);
        accentTexts += (it.icone || "") + it.titre + (it.sous || "") + (it.etiquette || "");
      });
      if (c.pied) {
        const foot = el("div", "cards-foot", root);
        if (c.pied.valeur != null) {
          const b = el("b", "", foot);
          counter(b, c.pied.valeur, t0 + c.pied.t, t0 + c.pied.t + 1.2, c.pied.suffixe || "");
          foot.append(" " + fr(c.pied.texte));
        } else foot.textContent = fr(c.pied.texte);
        anim(foot, "up", t0 + c.pied.t, 0.45);
        accentTexts += c.pied.texte;
      }
    },

    /** Document (devis, facture) : lignes, total qui se compte, tampon final. */
    doc(screen, c, t0) {
      const root = el("div", "doc", screen);
      const paper = el("div", "paper", root);
      anim(paper, "up", t0, 0.5);
      const brand = el("div", "brand", paper);
      brand.innerHTML = c.marque.replace(/(\S+)$/, "<span>$1</span>");
      el("small", "", brand, c.ref);
      el("h4", "", paper, fr(c.titre));
      [0.8, 1, 0.65].forEach((w, i) => { const l = el("div", "txtline", paper); l.style.width = `${w * 100}%`; anim(l, "growX", t0 + 0.4 + i * 0.15, 0.4); });
      c.lignes.forEach(([label, valeur], i) => {
        const ln = el("div", "ln", paper);
        el("span", "", ln, label);
        el("b", "", ln, valeur);
        anim(ln, "slideIn", t0 + 1.0 + i * 0.45, 0.4);
      });
      const tStart = t0 + 1.0 + c.lignes.length * 0.45;
      const tot = el("div", "tot", paper);
      el("span", "", tot, c.total.label);
      const v = el("span", "", tot);
      counter(v, c.total.valeur, tStart, tStart + 1.1, " DA");
      anim(tot, "fadeIn", tStart, 0.3);
      if (c.sous) {
        const sub = el("div", "sub", paper);
        el("span", "", sub, c.sous.label);
        const sv = el("span", "", sub);
        counter(sv, c.sous.valeur, tStart + 0.3, tStart + 1.3, " DA");
        anim(sub, "fadeIn", tStart + 0.3, 0.3);
      }
      const st = el("div", "stamp", paper, c.tampon);
      anim(st, "popTilt", tStart + 1.6, 0.45);
      accentTexts += c.marque + c.ref + c.titre + JSON.stringify(c.lignes) + c.total.label + (c.sous ? c.sous.label : "") + c.tampon;
    },

    /** Tableau de bord : chiffres qui montent, barres qui poussent, note finale. */
    stats(screen, c, t0) {
      const root = el("div", "stats", screen);
      anim(el("div", "stats-title", root, fr(c.titre)), "up", t0, 0.45);
      const k = el("div", "kpis", root);
      c.kpis.forEach((kp, i) => {
        const tile = el("div", "kpi", k);
        el("small", "", tile, kp.label);
        const b = el("b", "", tile);
        if (kp.texte) b.textContent = kp.texte; else counter(b, kp.valeur, t0 + 0.4 + i * 0.2, t0 + 1.8 + i * 0.2, kp.suffixe || "");
        if (kp.delta) { const d = el("i", kp.mauvais ? "bad" : "", tile, kp.delta); anim(d, "fadeIn", t0 + 1.9 + i * 0.2, 0.3); }
        anim(tile, "pop", t0 + 0.3 + i * 0.2, 0.4);
        accentTexts += kp.label + (kp.texte || "") + (kp.delta || "");
      });
      if (c.barres) {
        const bars = el("div", "bars", root);
        const max = Math.max(...c.barres.map((b) => b.valeur));
        c.barres.forEach((b, i) => {
          const row = el("div", "bar", bars);
          el("span", "", row, b.label);
          const tr = el("div", "tr", row);
          const fill = el("div", "fill", tr);
          fill.style.width = `${(b.valeur / max) * 220}px`;
          anim(fill, "growX", t0 + 1.2 + i * 0.18, 0.6);
          const v = el("span", "v", tr, b.valeur);
          anim(v, "fadeIn", t0 + 1.6 + i * 0.18, 0.3);
          accentTexts += b.label;
        });
      }
      if (c.note) { const n = el("div", "note", root, fr(c.note.texte)); anim(n, "up", t0 + c.note.t, 0.45); accentTexts += c.note.texte; }
    },

    /** Prise de rendez-vous : horloge, jours, créneaux libres, un doigt qui choisit, confirmation. */
    slots(screen, c, t0) {
      const root = el("div", "slots", screen);
      el("div", "topclock", root, `🌙 ${c.heure}`);
      el("h5", "", root, c.titre);
      el("div", "sub", root, "Seuls les créneaux libres s'affichent");
      const days = el("div", "days", root);
      c.jours.forEach((d, i) => { const dd = el("div", "day" + (i === c.jourChoisi ? " on" : ""), days); dd.append(d.split(" ")[0]); el("b", "", dd, d.split(" ")[1]); });
      const grid = el("div", "slot-grid", root);
      c.creneaux.forEach((h, i) => {
        const sl = el("div", "slot", grid, h);
        anim(sl, "pop", t0 + 0.2 + i * 0.08, 0.35);
        if (h === c.choix) {
          anim(sl, "select", t0 + c.tChoix, 0.25, { fill: "forwards" });
          const dot = el("div", "tapdot", root);
          // Les rectangles sont mesurés à l'écran (téléphone agrandi) : on revient à l'échelle de l'écran du téléphone.
          updaters.push(() => {
            const r = sl.getBoundingClientRect(), p = root.getBoundingClientRect(), k = p.width / root.offsetWidth || 1;
            at(dot, { left: `${(r.left - p.left + r.width / 2) / k - 45}px`, top: `${(r.top - p.top + r.height / 2) / k - 45}px` });
          });
          anim(dot, "tap", t0 + c.tChoix - 0.2, 0.6, { fill: "both" });
        }
      });
      const conf = el("div", "confirm", root);
      el("div", "ck", conf, "✓");
      el("b", "", conf, "C'est réservé !");
      el("p", "", conf, fr(c.confirmation));
      anim(conf, "upBig", t0 + c.tConfirm, 0.55);
      accentTexts += c.heure + c.titre + c.jours.join("") + c.confirmation + "🌙";
    },

    /** QR code qui se dessine, ligne de scan, puis WhatsApp s'ouvre avec le message écrit. */
    qr(screen, c, t0) {
      const root = el("div", "qrbox", screen);
      el("b", "", root, c.titre);
      el("small", "", root, c.sous);
      const box = el("div", "qr", root);
      const q = qrcode(0, "M");
      q.addData(c.lien);
      q.make();
      box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
      anim(box.firstChild, "reveal", t0 + 0.2, 1.0, { ease: "steps(12)" });
      const line = el("div", "scanline", box);
      anim(line, "scan", t0 + 1.4, 1.2, { ease: "ease-in-out" });
      const pop = el("div", "wa-pop", root);
      el("i", "", pop, "WhatsApp · message déjà écrit");
      pop.append(fr(c.message));
      anim(pop, "up", t0 + 2.7, 0.5);
      accentTexts += c.titre + c.sous + c.message;
    },
  };

  // ---------- Vidéos ----------
  const BUILDERS = {
    /** Tuto express : générique, accroche, résultat, 4 étapes, appel à l'action. */
    episode(v) {
      let t = intro(0, `ÉPISODE ${v.num}`);
      const hookDur = Math.min(5.2, Math.max(3.6, 1.6 + v.accroche.split(/ +/).length * 0.2));
      t = hookScene(t - 0.25, hookDur, { sticker: v.cible, hook: v.accroche });
      couverture = t - 0.45;
      t = resultScene(t - 0.25, v.dureeResultat || 6.8, { titre: v.resultat, gratuit: v.gratuit, comp: v.comp });
      t = stepsScene(t - 0.25, v.etapes.length > 4 ? 9.4 : 8.4, { titre: v.titreEtapes, etapes: v.etapes });
      t = ctaScene(t - 0.25, 5.2, v.cta);
      return t;
    },

    /** Récap « Quelle semaine 🤯 » : la liste, puis chaque épisode en une carte, puis « enregistrez ». */
    semaine(v) {
      let t = intro(0, `LA SEMAINE ${v.num}`);
      const end = t - 0.25 + 5.2;
      couverture = end - 0.5;
      const s = layer(t - 0.25, end, "var(--ink)");
      s.classList.add("on-dark");
      blobs(s, [["#CF7652", 560, 140, 600], ["#A9583A", -180, 1320, 560]]);
      const start = t - 0.25;
      const title = el("div", "week-title", s);
      words(title, "Quelle semaine 🤯", start + 0.2, { stagger: 0.12 });
      const sub = el("div", "week-sub", s);
      words(sub, v.sous, start + 0.6, { stagger: 0.04 });
      v.items.forEach((it, i) => {
        const line = el("div", "week-line", s);
        at(line, { top: `${820 + i * 140}px` });
        el("b", "", line, "—");
        el("span", "", line, fr(it.titre));
        anim(line, "slideIn", start + 1.3 + i * 0.4, 0.45);
        accentTexts += it.titre;
      });
      const all = el("div", "week-all", s);
      words(all, "Voici TOUT ce qu'il faut savoir 👇", start + 3.2, { stagger: 0.06 });
      t = end;
      v.items.forEach((it, i) => {
        const st = t - 0.25, en = st + 4.6;
        const sc = layer(st, en, "var(--cream)");
        blobs(sc, [["#F2B79C", 600, 900, 560], ["#FBEDE6", -100, 200, 500]]);
        anim(el("div", "item-n", sc, `${i + 1}/${v.items.length}`), "up", st + 0.1, 0.45);
        const ic = el("div", "item-icon", sc, it.icone);
        anim(ic, "popTilt", st + 0.3, 0.5);
        anim(el("div", "item-ep", sc, `Épisode ${it.ep} · ${it.jour}`), "fadeIn", st + 0.4, 0.4);
        const ti = el("div", "item-title", sc);
        words(ti, it.titre, st + 0.5, { stagger: 0.06 });
        const li = el("div", "item-line", sc, fr(it.ligne));
        anim(li, "up", st + 1.4, 0.5);
        const kw = el("div", "item-kw", sc);
        kw.innerHTML = it.mot ? `Commentez <b></b>` : "<b></b>";
        kw.querySelector("b").textContent = it.mot || it.action;
        anim(kw, "pop", st + 2.0, 0.45);
        accentTexts += it.icone + it.ligne + (it.mot || it.action || "") + it.jour;
        t = en;
      });
      t = ctaScene(t - 0.25, 5.0, { type: "save", texte: "Enregistrez cette vidéo pour la ressortir le jour où vous en aurez besoin" });
      return t;
    },

    intro() { intro(0, null); couverture = 1.2; return 1.4; }, // coupé avant le fondu de sortie : on enchaîne directement sur l'accroche

    fin() { couverture = 3.2; return ctaScene(0, 4.2, { type: "bio", texte: "Je construis ces automatisations pour votre commerce", suite: "Lien en bio · ClickVente" }); },
  };

  // ---------- Émojis ----------
  // Chromium n'affiche pas les polices d'émojis au format SVG : chaque émoji devient une image Twemoji.
  const EMOJI = /\p{Extended_Pictographic}\uFE0F?\p{Emoji_Modifier}?(?:\u200D\p{Extended_Pictographic}\uFE0F?\p{Emoji_Modifier}?)*/gu;
  const emojiFile = (seq) => {
    const cps = Array.from(seq.includes("\u200d") ? seq : seq.replace(/\uFE0F/g, ""));
    return `node_modules/@twemoji/svg/${cps.map((c) => c.codePointAt(0).toString(16)).join("-")}.svg`;
  };
  function emojify(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    const hasEmoji = new RegExp(EMOJI.source, "u");
    while (walker.nextNode()) if (hasEmoji.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const frag = document.createDocumentFragment();
      let last = 0;
      node.nodeValue.replace(EMOJI, (seq, i) => {
        frag.append(node.nodeValue.slice(last, i));
        const img = el("img", "emo", frag);
        img.alt = seq;
        img.src = emojiFile(seq);
        last = i + seq.length;
        return seq;
      });
      frag.append(node.nodeValue.slice(last));
      node.replaceWith(frag);
    });
    // Attend toutes les images ; un symbole sans image Twemoji (★…) redevient du texte.
    return Promise.all([...root.querySelectorAll("img.emo")].map((img) => img.complete && img.naturalWidth ? null : new Promise((ok) => {
      img.onload = ok;
      img.onerror = () => { img.replaceWith(document.createTextNode(img.alt)); ok(); };
    })));
  }

  // ---------- API utilisée par render.mjs ----------
  window.seek = (t) => {
    for (const a of document.getAnimations()) { a.pause(); a.currentTime = t * 1000; }
    for (const u of updaters) u(t);
  };

  window.prepare = async (video) => {
    stage.innerHTML = "";
    updaters.length = 0;
    accentTexts = "";
    const duree = BUILDERS[video.type](video);
    window.couverture = couverture;
    // Charge toutes les polices (et les émojis) utilisées avant la première image.
    const txt = accentTexts + stage.textContent;
    await Promise.all([
      ...["400", "500", "600", "700", "800"].map((w) => document.fonts.load(`${w} 40px Inter`, txt)),
      document.fonts.load("600 40px Fraunces", txt),
      emojify(stage),
    ]);
    await document.fonts.ready;
    window.seek(0);
    return duree;
  };

  window.DEMO = {
    type: "episode", num: 1, cible: "☕ Pour les cafés", accroche: "Vos clients vous écrivent *« c'est combien ? »* 50 fois par jour ?",
    resultat: "Chaque produit ouvre WhatsApp avec la commande déjà écrite", gratuit: true,
    comp: { type: "chat", titre: "Café Lumière", messages: [{ side: "out", text: "Bonjour ! Je voudrais commander :\n• 1 × Latte miel & cannelle (300 DA)", t: 0.4 }, { side: "in", text: "C'est noté ✅ Prêt dans 10 minutes ☕", t: 2.2 }] },
    etapes: ["Écrivez votre menu et vos prix", "Créez le lien wa.me + votre numéro", "Ajoutez le message déjà écrit", "Un bouton « Commander » par produit"],
    cta: { type: "keyword", mot: "MENU", suite: "et je vous envoie la démo" },
  };
})();
