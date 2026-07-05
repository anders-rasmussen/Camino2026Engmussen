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

  function dayNumBadge(d, i) {
    const cls = d.depart ? "depart" : d.rest ? "rest" : "";
    const parts = d.short.split("/");
    return `<span class="daynum ${cls}"><span class="d">${esc(parts[0])}</span><span class="m">JUL</span></span>`;
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
      if (j.code !== "Ok" || !j.routes || !j.routes.length) throw new Error("no route");
      const pts = j.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);
      L.polyline(pts, { color: FOOT_COLOR, weight: 4, opacity: .9, lineJoin: "round" }).addTo(map);
      pts.forEach((pt) => bounds.push(pt));
    } catch (e) {
      const pts = via.map((c) => [c[1], c[0]]);
      L.polyline(pts, { color: FOOT_COLOR, weight: 4, opacity: .6, dashArray: "4,6", lineJoin: "round" }).addTo(map);
      pts.forEach((pt) => bounds.push(pt));
    }
    if (bounds.length) map.fitBounds(bounds, { padding: [35, 35] });
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
          <h2>Camino Português da Costa</h2>
          <p>Familietur langs Atlanterhavskysten – Porto til Pontevedra, juli 2026.</p>
          <div class="stats">
            <div class="stat"><b>14</b><span>dage</span></div>
            <div class="stat"><b>~${totalKm} km</b><span>til fods</span></div>
            <div class="stat"><b>2</b><span>lande</span></div>
          </div>
        </div>

        <div class="section-label">Vælg en dag</div>
        <div class="daygrid">
          ${DAYS.map((d, i) => `
            <button class="daycard ${d.rest ? "rest" : ""} ${d.depart ? "depart" : ""}" data-go="#/dag/${i}">
              ${dayNumBadge(d, i)}
              <span class="info">
                <span class="t">${esc(d.to)}</span>
                <span class="m">${esc(d.dist)}</span>
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
        <div class="dayhero">
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
        ${body}
      </section>`;
  }

  function viewRoute() {
    return `
      <section class="fadein">
        <div class="pagehead"><h2>Ruten på kort</h2><p>Porto-kysten → Pontevedra · 14 dage · ~${totalKm} km til fods.</p></div>
        <div class="map" id="mapv"></div>
        ${legendHtml}
        <div class="maphint">Linjen er en forenklet oversigt mellem overnatningsbyerne. Vælg en enkelt dag på forsiden for den detaljerede rute. Tryk ⛶ for fuld skærm.</div>
      </section>`;
  }

  function viewOverview() {
    const rows = DAYS.map((d, i) => {
      const bf = d.breakfast === "Ja" ? `<span class="yes">Ja</span>` :
        (d.breakfast === "Nej" ? `<span class="no">Nej</span>` : `<span class="no">–</span>`);
      const w = d.washer === "Ja" ? `<span class="yes">Ja</span>` : `<span class="no">–</span>`;
      return `<tr class="rowclick ${d.rest ? "rest" : ""}" data-go="#/dag/${i}">
        <td class="dt">${esc(d.short)}</td>
        <td>${esc(d.from)} → ${esc(d.to)}</td>
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

  function renderBlocks(blocks) {
    return blocks.map((b) => {
      if (b.type === "p") return `<p>${esc(b.text)}</p>`;
      if (b.type === "subhead") return `<h4>${esc(b.text)}</h4>`;
      if (b.type === "list") return `<ul class="plain">${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
      if (b.type === "checklist") return `<ul class="checks">${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
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
    return `
      <section class="fadein">
        <div class="crumbs"><button data-go="#/info">${ic("ic-info")}Generel info</button> ${ic("ic-chevron")} <span>${esc(g.title)}</span></div>
        <div class="pagehead"><h2>${esc(g.title)}</h2></div>
        <div class="card prose">${renderBlocks(g.blocks)}</div>
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
    const el = e.target.closest("[data-go]");
    if (el) { e.preventDefault(); location.hash = el.getAttribute("data-go"); }
  });
  backBtn.addEventListener("click", () => {
    const r = parseRoute();
    if (r.name === "infoSection") location.hash = "#/info";
    else location.hash = "#/";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
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
