/* Camino Português da Costa 2026 – app-logik (router + visninger + kort). */
(function () {
  "use strict";

  const view = document.getElementById("view");
  const backBtn = document.getElementById("backBtn");
  const tabbar = document.getElementById("tabbar");
  const OSRM = "https://routing.openstreetmap.de/routed-foot/route/v1/foot/";
  const FOOT_COLOR = "#e65100", TRANSPORT_COLOR = "#546e7a";
  const NARROW = window.matchMedia("(max-width:640px)").matches;
  let currentMap = null;

  /* ---------- hjælpere ---------- */
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const ic = (id, cls) => `<svg class="${cls || "icon"}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const totalKm = 165; // omtrentlig sum af gå-etaperne
  const mapsUrl = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  // Direkte yr.no-vejrudsigt pr. overnatningsby (sted-ID slået op og verificeret mod koordinater).
  const YR_ID = {
    "Vila do Conde": "2-2732649",
    "Esposende": "2-2739848",
    "Castelo do Neiva": "2-2740999",
    "Viana do Castelo": "2-2732773",
    "Vila Praia de Âncora": "2-2732516",
    "Oia": "2-3114702",
    "Baiona": "2-3128462",
    "Nigrán": "2-3115463",
    "Redondela": "2-3112154",
    "Arcade": "2-3129782",
    "Pontevedra": "2-3113209"
  };
  const weatherUrl = (d) => {
    const id = YR_ID[d.to];
    return id ? "https://www.yr.no/en/forecast/daily-table/" + id : null;
  };

  // Land pr. dag: 11.–15. juli Portugal, 16. juli grænseovergang, derefter Spanien
  const dayCountry = (i) => i <= 4 ? "pt" : i === 5 ? "cross" : "es";
  const badgeClass = (d, i) => d.depart ? "depart" : d.rest ? "rest" : dayCountry(i);
  const countryTag = (i, d) => d.depart ? "HJEM" : dayCountry(i) === "pt" ? "PT" : dayCountry(i) === "cross" ? "PT–ES" : "ES";
  const countryLabel = (i, d) => d.depart ? "Hjemrejse" : dayCountry(i) === "pt" ? "Portugal" : dayCountry(i) === "cross" ? "Portugal → Spanien" : "Spanien";

  function dayNumBadge(d, i) {
    const parts = d.short.split("/");
    return `<span class="daynum ${badgeClass(d, i)}"><span class="d">${esc(parts[0])}</span><span class="m">JUL</span></span>`;
  }

  /* ---------- afkrydsning (huskes i localStorage) ---------- */
  const hashStr = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const checkKey = (sectionKey, text) => "cm:" + sectionKey + ":" + hashStr(text);
  const lsGet = (k) => { try { return localStorage.getItem(k) === "1"; } catch (e) { return false; } };
  const lsSet = (k, v) => { try { v ? localStorage.setItem(k, "1") : localStorage.removeItem(k); } catch (e) {} };
  function sectionCheckKeys(g) {
    const keys = [];
    (g.blocks || []).forEach((b) => { if (b.type === "checklist") b.items.forEach((x) => keys.push(checkKey(g.key, x))); });
    return keys;
  }
  function updateProgress(sectionKey) {
    const g = GENERAL.find((x) => x.key === sectionKey); if (!g) return;
    const keys = sectionCheckKeys(g), done = keys.filter(lsGet).length;
    const bar = document.getElementById("progbar"), txt = document.getElementById("progtext");
    if (bar) bar.style.width = (keys.length ? Math.round(done / keys.length * 100) : 0) + "%";
    if (txt) txt.textContent = done + " / " + keys.length + " afkrydset";
  }

  /* ---------- kort ---------- */
  function poiColor(t) { return t === "start" ? "#2e7d32" : t === "end" ? "#c62828" : "#1565c0"; }

  function newMap(el) {
    const map = L.map(el, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map);
    return map;
  }
  function addMarkers(map, pois, bounds, forceTap) {
    pois.forEach((p) => {
      const m = L.circleMarker([p.lat, p.lon], {
        radius: p.t === "sight" ? 6 : 8, color: "#fff", weight: 2,
        fillColor: poiColor(p.t), fillOpacity: 1
      }).addTo(map);
      const cls = "poi " + (p.t === "start" ? "start" : p.t === "end" ? "end" : "");
      const permanent = (p.t !== "sight") ? true : (!NARROW && !forceTap);
      m.bindTooltip(p.n, permanent
        ? { permanent: true, direction: "right", className: cls }
        : { direction: "top", className: cls });
      bounds.push([p.lat, p.lon]);
    });
  }
  function drawStraight(map, via, color) {
    const pts = via.map((c) => [c[1], c[0]]);
    L.polyline(pts, { color, weight: 3, opacity: .9, dashArray: "8,8", lineJoin: "round" }).addTo(map);
  }
  async function drawFoot(map, via, bounds) {
    const coords = via.map((c) => c[0] + "," + c[1]).join(";");
    try {
      const r = await fetch(OSRM + coords + "?overview=full&geometries=geojson");
      const j = await r.json();
      if (currentMap !== map) return; // navigeret væk mens vi ventede på OSRM
      if (j.code !== "Ok" || !j.routes || !j.routes.length) throw new Error("no route");
      const pts = j.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);
      L.polyline(pts, { color: FOOT_COLOR, weight: 4, opacity: .9, lineJoin: "round" }).addTo(map);
      pts.forEach((pt) => bounds.push(pt));
    } catch (e) {
      if (currentMap !== map) return;
      const pts = via.map((c) => [c[1], c[0]]);
      L.polyline(pts, { color: FOOT_COLOR, weight: 4, opacity: .6, dashArray: "4,6", lineJoin: "round" }).addTo(map);
      pts.forEach((pt) => bounds.push(pt));
    }
    if (currentMap === map && bounds.length) map.fitBounds(bounds, { padding: [35, 35] });
  }
  function addFsControl(map, mapEl) {
    const Ctrl = L.Control.extend({
      options: { position: "topright" },
      onAdd: function () {
        const b = L.DomUtil.create("button", "fs-btn");
        b.type = "button"; b.title = "Fuld skærm"; b.innerHTML = "⛶";
        L.DomEvent.disableClickPropagation(b);
        L.DomEvent.on(b, "click", L.DomEvent.stop);
        L.DomEvent.on(b, "click", () => toggleFs(map, mapEl));
        map._fsBtn = b;
        return b;
      }
    });
    map.addControl(new Ctrl());
  }
  function setFs(map, mapEl, on) {
    mapEl.classList.toggle("fs", on);
    document.body.classList.toggle("fs-lock", on);
    if (map._fsBtn) map._fsBtn.innerHTML = on ? "✕" : "⛶";
    [60, 260, 520].forEach((t) => setTimeout(() => map.invalidateSize(), t));
  }
  function toggleFs(map, mapEl) { setFs(map, mapEl, !mapEl.classList.contains("fs")); }

  function clearMap() {
    if (currentMap) { currentMap.remove(); currentMap = null; }
    document.body.classList.remove("fs-lock");
  }

  /* ---------- Rute-download: GPX + KML (til Maps.me / Organic Maps) ---------- */
  const dayHasFoot = (i) => ((ROUTES[i] || {}).legs || []).some((l) => l.mode === "foot");
  const xmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  async function osrmFoot(via) {
    const coords = via.map((c) => c[0] + "," + c[1]).join(";");
    try {
      const r = await fetch(OSRM + coords + "?overview=full&geometries=geojson");
      const j = await r.json();
      if (j.code !== "Ok" || !j.routes || !j.routes.length) return null;
      return j.routes[0].geometry.coordinates; // [[lon,lat],…]
    } catch (e) { return null; }
  }

  // Rå geometri for én dag: foot-ben via OSRM, transport-ben som rette segmenter.
  async function buildDayGeom(i) {
    const day = DAYS[i], route = ROUTES[i] || { pois: [], legs: [] };
    const legs = [];
    for (const leg of (route.legs || [])) {
      let coords = leg.mode === "foot" ? await osrmFoot(leg.via) : null;
      if (!coords) coords = leg.via;
      if (coords && coords.length) legs.push(coords);
    }
    return { name: `${day.date} – ${day.from} → ${day.to}`, legs, pois: (route.pois || []) };
  }

  /* GPX-serialisering (alle <wpt> før <trk> – GPX 1.1-schema). */
  const gpxWpt = (p) => `<wpt lat="${p.lat.toFixed(6)}" lon="${p.lon.toFixed(6)}"><name>${xmlEsc(p.n)}</name></wpt>`;
  const gpxTrk = (name, legs) => {
    const segs = legs.map((c) => `<trkseg>${c.map((x) => `<trkpt lat="${x[1].toFixed(6)}" lon="${x[0].toFixed(6)}"></trkpt>`).join("")}</trkseg>`).join("");
    return segs ? `<trk><name>${xmlEsc(name)}</name>${segs}</trk>` : "";
  };
  const gpxDoc = (name, body) =>
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<gpx version="1.1" creator="Engmussen Camino 2026" xmlns="http://www.topografix.com/GPX/1/1">\n` +
    `<metadata><name>${xmlEsc(name)}</name></metadata>\n${body}\n</gpx>\n`;

  /* KML-serialisering (Maps.me læser KML, ikke GPX). */
  const kmlPoint = (p) => `<Placemark><name>${xmlEsc(p.n)}</name><Point><coordinates>${p.lon.toFixed(6)},${p.lat.toFixed(6)},0</coordinates></Point></Placemark>`;
  const kmlLine = (name, legs) => legs.map((c) =>
    `<Placemark><name>${xmlEsc(name)}</name>` +
    `<Style><LineStyle><color>ff16451e</color><width>4</width></LineStyle></Style>` +
    `<LineString><tessellate>1</tessellate><coordinates>${c.map((x) => `${x[0].toFixed(6)},${x[1].toFixed(6)},0`).join(" ")}</coordinates></LineString></Placemark>`).join("");
  const kmlDoc = (name, body) =>
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<kml xmlns="http://www.opengis.net/kml/2.2">\n<Document>\n<name>${xmlEsc(name)}</name>\n${body}\n</Document>\n</kml>\n`;

  function saveFile(text, filename, mime) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }

  async function handleDownload(btn) {
    const val = btn.getAttribute("data-dl");                       // "0".."13" | "all"
    const fmt = btn.getAttribute("data-fmt") === "kml" ? "kml" : "gpx";
    const span = btn.querySelector("span"), orig = span ? span.textContent : "";
    if (btn.disabled) return;
    btn.disabled = true;
    try {
      const geoms = [];
      if (val === "all") {
        for (let i = 0; i < DAYS.length; i++) {
          if (span) span.textContent = `Henter ${i + 1}/${DAYS.length}…`;
          geoms.push(await buildDayGeom(i));
        }
      } else {
        if (span) span.textContent = "Henter…";
        geoms.push(await buildDayGeom(Number(val)));
      }
      // Dedupér waypoints på navn (også på tværs af dage for hele turen).
      const seen = new Set(), pois = [];
      geoms.forEach((g) => g.pois.forEach((p) => { if (!seen.has(p.n)) { seen.add(p.n); pois.push(p); } }));
      const docName = val === "all"
        ? "Camino Português da Costa 2026 – hele turen"
        : `Camino ${DAYS[Number(val)].date} – ${DAYS[Number(val)].to}`;
      const base = val === "all"
        ? "Camino2026-11-24_Juli"
        : `Camino2026-${DAYS[Number(val)].short.split("/")[0]}_Juli`;

      let text, mime;
      if (fmt === "kml") {
        text = kmlDoc(docName, pois.map(kmlPoint).join("") + geoms.map((g) => kmlLine(g.name, g.legs)).join(""));
        mime = "application/vnd.google-earth.kml+xml";
      } else {
        text = gpxDoc(docName, pois.map(gpxWpt).join("") + geoms.map((g) => gpxTrk(g.name, g.legs)).join(""));
        mime = "application/gpx+xml";
      }
      saveFile(text, `${base}.${fmt}`, mime);
    } catch (e) {
      alert("Kunne ikke hente ruten. Tjek internetforbindelsen og prøv igen.");
    } finally {
      btn.disabled = false; if (span) span.textContent = orig;
    }
  }

  /* ---------- Rute-knapper (KML + GPX) + import-hjælp (modal) ---------- */
  function gpxRow(attr) {
    return `<div class="gpxwrap">
      <div class="gpxcap">${ic("ic-download")}Download rute – KML til Maps.me · GPX til Organic Maps m.fl.</div>
      <div class="gpxrow">
        <button class="gpxbtn" data-dl="${attr}" data-fmt="kml"><span>KML</span></button>
        <button class="gpxbtn ghost" data-dl="${attr}" data-fmt="gpx"><span>GPX</span></button>
        <button class="gpxinfo" data-modal="gpxhelp" title="Sådan får du ruten på kortet" aria-label="Vejledning: importér ruten">${ic("ic-info")}</button>
      </div>
    </div>`;
  }

  const GPX_HELP_HTML = `
    <div class="modal-head">
      <h3><span class="ic">${ic("ic-map")}</span>Sådan får du ruten på kortet</h3>
      <button class="modal-close" data-modal-close aria-label="Luk">✕</button>
    </div>
    <p class="modal-intro">Til <b>Maps.me</b>: brug <b>KML</b>-knappen – Maps.me kan ikke læse GPX. Gør det gerne hjemmefra på wi-fi.</p>
    <ol class="modal-steps">
      <li><b>Installér Maps.me</b> fra Google Play og hent offline-kortene: menu → “Download maps” → <b>Portugal (Norte)</b> + <b>Spanien (Galicia)</b>.</li>
      <li><b>Download KML-filen</b> her i appen. Den lander i mappen <b>Downloads</b> (fx <b>Camino2026-16_Juli.kml</b>).</li>
      <li><b>Åbn den:</b> gå i <b>Downloads</b> eller din filhåndtering → tryk på KML-filen → <b>Åbn med → Maps.me</b>. Nu dukker Maps.me op, fordi den genkender KML (i modsætning til GPX).</li>
      <li>Maps.me svarer <b>“Bookmarks loaded successfully”</b>. Find ruten via <b>bogmærke-/stjerne-ikonet</b> → den importerede liste.</li>
    </ol>
    <p class="modal-note"><b>Vil I importere inde fra selve appen?</b> Det kan Maps.me ikke – filen skal åbnes udefra (trin 3). Alternativet er <b>Organic Maps</b> (gratis, reklamefri, samme kort): åbn appen → bogmærke-ikonet → <b>Import Bookmarks and Tracks</b> → vælg <b>Download</b>-mappen. Organic Maps læser <b>GPX</b> direkte – brug GPX-knappen der. Download kræver internet; bagefter virker alt offline.</p>`;

  function closeModal() {
    const m = document.getElementById("modal");
    if (m) m.remove();
    document.body.classList.remove("modal-open");
  }
  function openModal(html) {
    closeModal();
    const o = document.createElement("div");
    o.id = "modal"; o.className = "modal-overlay";
    o.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
    document.body.appendChild(o);
    document.body.classList.add("modal-open");
  }

  const legendHtml = `<div class="legend">
      <span><i class="dot start"></i>Start</span>
      <span><i class="dot end"></i>Slut</span>
      <span><i class="dot sight"></i>Seværdighed</span>
      <span><i class="line-solid"></i>Vandrerute</span>
      <span><i class="line-dash"></i>Transport</span>
    </div>`;

  async function renderDayMap(day, route) {
    const el = document.getElementById("mapv");
    if (!el) return;
    const map = newMap(el); currentMap = map;
    addFsControl(map, el);
    const bounds = [];
    addMarkers(map, route.pois, bounds);
    if (bounds.length) map.fitBounds(bounds, { padding: [35, 35] });
    (route.legs || []).forEach((leg) => { if (leg.mode !== "foot") drawStraight(map, leg.via, TRANSPORT_COLOR); });
    for (const leg of (route.legs || [])) {
      if (currentMap !== map) return; // brugeren har navigeret væk
      if (leg.mode === "foot") { await drawFoot(map, leg.via, bounds); await new Promise((r) => setTimeout(r, 200)); }
    }
  }

  function renderOverviewMap() {
    const el = document.getElementById("mapv");
    if (!el) return;
    const map = newMap(el); currentMap = map;
    addFsControl(map, el);
    const bounds = [];
    L.polyline(OVERVIEW_PTS.map((p) => [p.lat, p.lon]),
      { color: FOOT_COLOR, weight: 3, opacity: .85, lineJoin: "round" }).addTo(map);
    addMarkers(map, OVERVIEW_PTS, bounds, true);
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  /* ---------- visninger ---------- */
  function viewHome() {
    const tiles = [
      { href: "#/rute", ic: "ic-route", t: "Ruten på kort", s: "Hele turen fra Porto til Pontevedra" },
      { href: "#/oversigt", ic: "ic-table", t: "Oversigtstabel", s: "Alle dage, etaper og overnatning" },
      { href: "#/info", ic: "ic-info", t: "Generel information", s: "Pakkeliste, vejr, pilgrimspas m.m." }
    ];
    return `
      <section class="fadein">
        <div class="hero">
          <svg class="shellwatermark"><use href="#ic-shell"/></svg>
          <span class="chip">${ic("ic-shell")} Familietur · 11.–24. juli 2026</span>
          <h2>Engmussen</h2>
          <p class="fam">Engblom &times; Rasmussen</p>
          <div class="stats">
            <div class="stat"><b>14</b><span>dage</span></div>
            <div class="stat"><b>~${totalKm} km</b><span>til fods</span></div>
            <div class="stat"><b>2</b><span>lande</span></div>
            <div class="stat"><b>PT → ES</b><span>Porto → Pontevedra</span></div>
          </div>
          <svg class="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path fill="#f4ede0" d="M0,32 C240,62 420,4 720,22 C1010,40 1220,64 1440,26 L1440,60 L0,60 Z"/></svg>
        </div>

        <div class="section-label">Vælg en dag</div>
        <div class="daygrid">
          ${DAYS.map((d, i) => `
            <button class="daycard ${badgeClass(d, i)}" data-go="#/dag/${i}">
              ${dayNumBadge(d, i)}
              <span class="info">
                <span class="t">${esc(d.to)}</span>
                <span class="m"><span class="ctag">${countryTag(i, d)}</span><span class="dist">${esc(d.dist)}</span></span>
              </span>
            </button>`).join("")}
        </div>

        <div class="section-label">Hele turen</div>
        <div class="menu">
          ${tiles.map((x) => `
            <button class="tile wide" data-go="${x.href}">
              <span class="badge">${ic(x.ic)}</span>
              <span class="txt"><b>${x.t}</b><span>${x.s}</span></span>
              <span class="chev">${ic("ic-chevron")}</span>
            </button>`).join("")}
        </div>
      </section>`;
  }

  function transportIcon(day) {
    // vælg et passende ikon ud fra dagens transport
    if (!day.transport) return "ic-walk";
    const t = (day.transport.title || "").toLowerCase();
    if (t.includes("båd")) return "ic-boat";
    if (t.includes("flixbus") || t.includes("bus")) return "ic-bus";
    if (t.includes("vigo") || t.includes("taxi") || t.includes("kedelige")) return "ic-taxi";
    return "ic-walk";
  }

  function viewDay(i, tab) {
    const day = DAYS[i]; const route = ROUTES[i];
    if (!day) return viewHome();
    const isMap = tab === "kort";
    const pills = [];
    pills.push(`<span class="pill flagpill">${esc(countryLabel(i, day))}</span>`);
    pills.push(`<span class="pill">${ic("ic-ruler")}${esc(day.dist)}</span>`);
    pills.push(`<span class="pill">${ic("ic-terrain")}${esc(day.terrain)}</span>`);
    if (day.breakfast && day.breakfast !== "–" && day.breakfast !== "")
      pills.push(`<span class="pill">${ic("ic-coffee")}Morgenmad: ${esc(day.breakfast)}</span>`);
    if (day.washer === "Ja")
      pills.push(`<span class="pill">${ic("ic-check")}Vaskemaskine</span>`);

    let body;
    if (isMap) {
      body = `
        <div class="map" id="mapv"></div>
        ${legendHtml}
        <div class="maphint">Gå-ruterne hentes live fra OpenStreetMaps fodgænger-ruteberegner og følger de faktiske stier (kræver internet første gang). Tryk ⛶ for fuld skærm.</div>`;
    } else {
      let html = "";
      if (day.transport) {
        html += `<div class="transport">
          <h3><span class="ic">${ic(transportIcon(day))}</span>${esc(day.transport.title)}</h3>
          <ul>${day.transport.lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        </div>`;
      }
      html += `<div class="card"><h3><span class="ic">${ic("ic-walk")}</span>Om etapen</h3><p>${esc(day.desc)}</p></div>`;
      if (day.highlights && day.highlights.length) {
        html += `<div class="card"><h3><span class="ic">${ic("ic-star")}</span>Højdepunkter</h3>
          ${day.highlights.map((h) => `<div class="hl">
            <span class="pin">${ic("ic-pin")}</span>
            <span class="tx"><b>${esc(h.n)}</b><div>${esc(h.d)}</div></span></div>`).join("")}
        </div>`;
      }
      if (day.tips && day.tips.length) {
        html += `<div class="card"><h3><span class="ic">${ic("ic-info")}</span>Tips &amp; tricks</h3>
          <ul class="tips">${day.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
      }
      if (typeof PAUSESTOP !== "undefined" && PAUSESTOP[i] && PAUSESTOP[i].length) {
        html += `<div class="card"><h3><span class="ic">${ic("ic-coffee")}</span>Mad- og pausestop</h3>
          <ul class="tips">${PAUSESTOP[i].map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
      }
      if (day.lodging) {
        html += `<div class="card"><h3><span class="ic">${ic("ic-bed")}</span>Overnatning</h3>
          <div class="lodging"><span class="ic">${ic("ic-bed")}</span>
            <div><b>${esc(day.lodging)}</b>
              <div class="addr">${esc(day.address)}</div>
              <a class="maplink" href="${esc(mapsUrl(day.address))}" target="_blank" rel="noopener">${ic("ic-map")}Åbn i kort</a>
            </div></div></div>`;
      }
      body = html;
    }

    return `
      <section class="fadein">
        <div class="crumbs"><button data-go="#/">${ic("ic-home")}Forside</button> ${ic("ic-chevron")} <span>${esc(day.date)}</span></div>
        <div class="dayhero ${badgeClass(day, i)}">
          <div class="top">
            ${dayNumBadge(day, i)}
            <div><h2>${esc(day.title)}</h2>
              <div class="route">${esc(day.weekday)} ${esc(day.date)} · ${esc(day.from)} → ${esc(day.to)}</div></div>
          </div>
          <div class="pillrow">${pills.join("")}</div>
        </div>
        <div class="segment">
          <button class="${!isMap ? "active" : ""}" data-go="#/dag/${i}">${ic("ic-info")}Al info</button>
          <button class="${isMap ? "active" : ""}" data-go="#/dag/${i}/kort">${ic("ic-map")}Kort &amp; rute</button>
        </div>
        ${isMap && dayHasFoot(i) ? gpxRow(i) : ""}
        ${body}
        ${day.lodging && weatherUrl(day) ? `<a class="weatherlink" href="${esc(weatherUrl(day))}" target="_blank" rel="noopener">${ic("ic-sun")}Vejrudsigt for ${esc(day.to)}<span class="src">yr.no</span></a>` : ""}
      </section>`;
  }

  function viewRoute() {
    return `
      <section class="fadein">
        <div class="pagehead"><h2>Ruten på kort</h2><p>Porto-kysten → Pontevedra · 14 dage · ~${totalKm} km til fods.</p></div>
        <div class="map" id="mapv"></div>
        ${legendHtml}
        <div class="maphint">Linjen er en forenklet oversigt mellem overnatningsbyerne. Vælg en enkelt dag på forsiden for den detaljerede rute. Tryk ⛶ for fuld skærm.</div>
        ${gpxRow("all")}
        <div class="maphint">GPX-filen indeholder alle etaper som spor + seværdigheder som waypoints. Åbn/del filen med <b>Maps.me</b> for at importere ruten – gør det gerne hjemmefra med wi-fi. Enkelte dage kan hentes hver for sig under den pågældende dag.</div>
      </section>`;
  }

  function viewOverview() {
    const rows = DAYS.map((d, i) => {
      const bf = d.breakfast === "Ja" ? `<span class="yes">Ja</span>` :
        (d.breakfast === "Nej" ? `<span class="no">Nej</span>` : `<span class="no">–</span>`);
      const w = d.washer === "Ja" ? `<span class="yes">Ja</span>` : `<span class="no">–</span>`;
      return `<tr class="rowclick ${badgeClass(d, i)} ${d.rest ? "rest" : ""}" data-go="#/dag/${i}">
        <td class="dt">${esc(d.short)}</td>
        <td><span class="ctag">${countryTag(i, d)}</span>${esc(d.from)} → ${esc(d.to)}</td>
        <td>${esc(d.dist)}</td>
        <td>${d.lodging ? esc(d.lodging) : "<span class='no'>–</span>"}</td>
        <td>${bf}</td>
        <td>${w}</td>
      </tr>`;
    }).join("");
    return `
      <section class="fadein">
        <div class="pagehead"><h2>Oversigt</h2><p>Alle dage, etaper og overnatning. Tryk på en række for detaljer.</p></div>
        <div class="tablewrap">
          <table class="overview">
            <thead><tr><th>Dato</th><th>Etape</th><th>Distance</th><th>Overnatning</th><th>Morgenmad</th><th>Vask</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`;
  }

  function viewInfoIndex() {
    return `
      <section class="fadein">
        <div class="pagehead"><h2>Generel information</h2><p>Praktisk guide til hele turen.</p></div>
        <div class="infogrid">
          ${GENERAL.map((g) => `
            <button class="infocard" data-go="#/info/${g.key}">
              <span class="ic">${ic("ic-" + g.icon)}</span>
              <b>${esc(g.title)}</b>
            </button>`).join("")}
        </div>
      </section>`;
  }

  function renderBlocks(blocks, sectionKey) {
    return blocks.map((b) => {
      if (b.type === "p") return `<p>${esc(b.text)}</p>`;
      if (b.type === "sub") return `<h3 class="gsub">${esc(b.text)}</h3>`;
      if (b.type === "subhead") return `<h4>${esc(b.text)}</h4>`;
      if (b.type === "list") return `<ul class="plain">${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
      if (b.type === "checklist") return `<ul class="checks">${b.items.map((x) => {
        const key = checkKey(sectionKey, x), on = lsGet(key);
        return `<li class="${on ? "on" : ""}"><label class="check">
          <input type="checkbox" data-check="${esc(key)}" data-section="${esc(sectionKey)}" ${on ? "checked" : ""}>
          <span class="box">${ic("ic-check")}</span><span class="lbl">${esc(x)}</span></label></li>`;
      }).join("")}</ul>`;
      if (b.type === "table") return `<div class="mini-table"><table>
        <thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table></div>`;
      return "";
    }).join("");
  }

  function viewInfoSection(key) {
    const g = GENERAL.find((x) => x.key === key);
    if (!g) return viewInfoIndex();
    const keys = sectionCheckKeys(g);
    let progress = "";
    if (keys.length) {
      const done = keys.filter(lsGet).length, pct = Math.round(done / keys.length * 100);
      progress = `<div class="progress">
        <div class="bar"><span id="progbar" style="width:${pct}%"></span></div>
        <div class="progmeta"><span id="progtext">${done} / ${keys.length} afkrydset</span>
          <button class="resetbtn" data-reset="${esc(g.key)}">Nulstil</button></div>
      </div>`;
    }
    return `
      <section class="fadein">
        <div class="crumbs"><button data-go="#/info">${ic("ic-info")}Generel info</button> ${ic("ic-chevron")} <span>${esc(g.title)}</span></div>
        <div class="pagehead"><h2>${esc(g.title)}</h2>${keys.length ? `<p>Kryds af undervejs – appen husker det.</p>` : ""}</div>
        ${progress}
        <div class="card prose">${renderBlocks(g.blocks, g.key)}</div>
      </section>`;
  }

  /* ---------- bundnavigation ---------- */
  const TABS = [
    { href: "#/", ic: "ic-home", label: "Hjem", match: (r) => r.name === "home" || r.name === "day" },
    { href: "#/rute", ic: "ic-route", label: "Rute", match: (r) => r.name === "route" },
    { href: "#/oversigt", ic: "ic-table", label: "Oversigt", match: (r) => r.name === "overview" },
    { href: "#/info", ic: "ic-info", label: "Guide", match: (r) => r.name === "info" || r.name === "infoSection" }
  ];
  function renderTabbar(route) {
    tabbar.innerHTML = TABS.map((t) =>
      `<button class="${t.match(route) ? "active" : ""}" data-go="${t.href}">${ic(t.ic)}<span>${t.label}</span></button>`
    ).join("");
  }

  /* ---------- router ---------- */
  function parseRoute() {
    const h = (location.hash || "#/").replace(/^#/, "");
    const parts = h.split("/").filter(Boolean); // ["dag","3","kort"]
    if (!parts.length) return { name: "home" };
    if (parts[0] === "dag") return { name: "day", i: Number(parts[1]) || 0, tab: parts[2] === "kort" ? "kort" : "info" };
    if (parts[0] === "rute") return { name: "route" };
    if (parts[0] === "oversigt") return { name: "overview" };
    if (parts[0] === "info") return parts[1] ? { name: "infoSection", key: parts[1] } : { name: "info" };
    return { name: "home" };
  }

  function render() {
    clearMap();
    closeModal();
    const route = parseRoute();
    let html, showBack = false;
    switch (route.name) {
      case "day": html = viewDay(route.i, route.tab); showBack = true; break;
      case "route": html = viewRoute(); break;
      case "overview": html = viewOverview(); break;
      case "info": html = viewInfoIndex(); break;
      case "infoSection": html = viewInfoSection(route.key); showBack = true; break;
      default: html = viewHome();
    }
    view.innerHTML = html;
    backBtn.style.display = showBack ? "inline-flex" : "none";
    renderTabbar(route);
    window.scrollTo({ top: 0 });

    // initialiser kort efter DOM er sat
    if (route.name === "day" && route.tab === "kort") renderDayMap(DAYS[route.i], ROUTES[route.i]);
    else if (route.name === "route") renderOverviewMap();
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-modal-close]") || (e.target.classList && e.target.classList.contains("modal-overlay"))) {
      e.preventDefault(); closeModal(); return;
    }
    if (e.target.closest("[data-modal]")) { e.preventDefault(); openModal(GPX_HELP_HTML); return; }
    const dl = e.target.closest("[data-dl]");
    if (dl) { e.preventDefault(); handleDownload(dl); return; }
    const reset = e.target.closest("[data-reset]");
    if (reset) {
      e.preventDefault();
      const g = GENERAL.find((x) => x.key === reset.getAttribute("data-reset"));
      if (g) { sectionCheckKeys(g).forEach((k) => lsSet(k, false)); render(); }
      return;
    }
    const el = e.target.closest("[data-go]");
    if (el) { e.preventDefault(); location.hash = el.getAttribute("data-go"); }
  });
  document.addEventListener("change", (e) => {
    const cb = e.target.closest("input[data-check]");
    if (!cb) return;
    lsSet(cb.getAttribute("data-check"), cb.checked);
    const li = cb.closest("li"); if (li) li.classList.toggle("on", cb.checked);
    updateProgress(cb.getAttribute("data-section"));
  });
  backBtn.addEventListener("click", () => {
    const r = parseRoute();
    if (r.name === "infoSection") location.hash = "#/info";
    else location.hash = "#/";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (document.getElementById("modal")) { closeModal(); return; }
      const mapEl = document.getElementById("mapv");
      if (mapEl && currentMap && mapEl.classList.contains("fs")) setFs(currentMap, mapEl, false);
    }
  });
  window.addEventListener("hashchange", render);

  /* ---------- PWA ---------- */
  let deferredPrompt = null;
  const installBtn = document.getElementById("installBtn");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); deferredPrompt = e;
    installBtn.style.display = "inline-flex";
    installBtn.onclick = () => { installBtn.style.display = "none"; deferredPrompt.prompt(); deferredPrompt = null; };
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }

  render();
})();
