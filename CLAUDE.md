# Camino 2026 "Engmussen" — projekt- og opdateringsguide

Dette er en **PWA** (Progressive Web App) med rejseplan, kort og guide til
familien **Engblom × Rasmussen**'s ("Engmussen") Camino Português da Costa,
11.–24. juli 2026. Appen serveres **offentligt** via GitHub Pages.

- **Live:** https://anders-rasmussen.github.io/Camino2026Engmussen/
- **Repo:** github.com/anders-rasmussen/Camino2026Engmussen (branch `main`, SSH remote)

---

## ⚠️ PRIVATLIV — læs FØR du rører indhold

Siden er **offentlig** (og har `noindex`). Indholdet stammer fra et **privat
Google-dokument** (`porto2026/Portugal 2026.md`). Når du kopierer indhold ind i
appen, må du **ALDRIG** committe hemmelig data. Følgende findes i dokumentet og
skal fjernes (læs dokumentet for de konkrete værdier — de nævnes bevidst IKKE her,
da denne fil selv ligger i det offentlige repo):

- **Booking-/reservationsnumre:** bådens reservationskode (afsnit 16. juli) og
  FlixBus-bookingnummeret (afsnit 24. juli). Skriv fx "Booket med Xacobeo Transfer"
  / "Booket med FlixBus" uden nummeret.
- **Betalte priser og betalingsmetode** (fx bådens pris, Stripe). Offentlige
  standardpriser (fx "6 € pr. person online") er OK.
- **Booking-URL'er med tracking** (`booking.com/…?label=…&sid=…&aid=…`, Airbnb-links). Udelad links.
- **De fire rejsendes fornavne** (afsnit 24. juli).
- **Filnavne på de private PDF'er** (boardingpas, kvittering, bådbooking).

**Tilladt:** overnatningsstedernes navne og **fulde adresser** (brugerens
eksplicitte valg), transporttider og -operatører, rutebeskrivelser, seværdigheder,
generel praktisk info.

**Kør altid denne strukturelle scanning før commit** (fanger mønstrene uden at
nævne værdierne):
```bash
grep -rniE "reservationsnummer|bookingnr|booking\.com/[^ )\"]*[?&](label|sid|aid)=|airbnb\.[a-z.]+/rooms|Stripe|Boarding[- ]?Pass|\.pdf\b|[0-9]{3} [0-9]{3} [0-9]{4}|\bC[0-9]{4}-[0-9]" index.html app.js data.js styles.css
```
Skal give **tomt** output. ("Engblom"/"Rasmussen" som familie-branding er OK.)
Kryds desuden af mod dokumentet, at ingen af de fire fornavne er kommet med.

---

## Indholdskilde vs. app-kode

- **Rejse-indholdet** stammer fra Google-dokumentet **`porto2026/Portugal 2026.md`**
  (samt rute-koordinater fra `porto2026/Kort - dag for dag.html`). `porto2026` er
  et **gitignoreret symlink** til Google Drive — det følger aldrig med i git.
- **`data.js`** i repoet er en *kurateret, hemmelighedsfri* gengivelse af dokumentet.
  Det er appens datakilde.
- **Repoet er source of truth for app-KODEN.** Rediger her, ikke i Google Drive.
  (Den gamle `AndroidApp/`-mappe i Drive er slettet.)

Kort sagt: **brugeren redigerer markdown-dokumentet → du re-synkroniserer `data.js`.**

---

## 🔁 KERNE-WORKFLOW: opdatér appen når markdown-dokumentet ændres

Når brugeren siger "jeg har opdateret dokumentet" (eller ændrer rejseplanen):

1. **Læs kilden på ny:**
   - `porto2026/Portugal 2026.md` (hele rejseguiden — dage, transport, generel info)
   - `porto2026/Kort - dag for dag.html` findes typisk ikke længere; rute-data ligger
     nu i `data.js` (`ROUTES`). Ændrer dokumentet byer/etaper, opdatér også `ROUTES`.
   - Hvis `/mnt/g` ikke er mountet (symlinket peger i tomhed), se "WSL & Google Drive".

2. **Diff mod `data.js`** og opdatér de relevante felter, så appen matcher dokumentet.
   Bevar strukturen (se "Datamodel" nedenfor). Skriv **fuldt** indhold — ikke resuméer;
   brugeren vil have *alt* med fra dokumentet.

3. **Fjern hemmelig data** (se Privatliv). Kør grep-scanningen.

4. **Forhåndsvis + verificér** (se nedenfor). 0 konsol-fejl.

5. **Commit + push** til `main` → auto-deploy (se Deploy).

---

## Datamodel (`data.js`)

Tre globale konstanter + hjælpe-arrays:

### `DAYS` — array, ét objekt pr. dag (rækkefølge = dagnummer, index 0 = 11. juli)
```js
{
  date:"16. juli", short:"16/7", weekday:"Torsdag",
  title:"Vila Praia de Âncora → Oia (grænseovergang)",
  from:"Vila Praia de Âncora", to:"Oia",
  dist:"~20 km", terrain:"…",
  rest:true|false,        // hviledag (0 km) — valgfrit
  depart:true|false,      // hjemrejsedag — valgfrit
  lodging:"Casa Picota"|null,
  address:"Calle la Palma 5, 36794 Oia (Spanien)"|null,
  breakfast:"Ja"|"Nej"|"–"|"", washer:"Ja"|"",
  desc:"fuld beskrivelse …",
  transport:{ title:"…", lines:["…","…"] },  // valgfrit (metro/båd/taxi/bus)
  highlights:[ {n:"Navn", d:"beskrivelse"} , … ],
  tips:[ "…", "…" ]
}
```

### `ROUTES` — array parallelt med `DAYS` (samme index), kort-geometri
```js
{ pois:[ {n,lat,lon,t:"start"|"end"|"sight"}, … ],
  legs:[ {mode:"foot"|"boat"|"taxi"|"bus", via:[[lon,lat],…]}, … ] }
```
`foot`-ben tegnes via OSRM fodgænger-ruter; øvrige tegnes som stiplede linjer.

### `OVERVIEW_PTS` — punkter til oversigtskortet (overnatningsbyer i rækkefølge).

### `GENERAL` — array af guide-sektioner
```js
{ key:"pakkeliste", icon:"backpack", title:"Pakkeliste", blocks:[ … ] }
```
`icon` = et af `#ic-…`-symbolerne i `index.html` (fx `backpack`, `sun`, `passport`,
`phone`, `star`, `coffee`, `shield`, `compass`, `check`, `info`).

**Block-typer** (i `blocks`):
- `{type:"p", text}` — afsnit
- `{type:"subhead", text}` — underoverskrift
- `{type:"list", items:[…]}` — punktliste (statisk)
- `{type:"checklist", items:[…]}` — **afkrydselig** liste (se nedenfor)
- `{type:"table", head:[…], rows:[[…],…]}` — tabel

**Afkrydselige lister:** `pakkeliste` og `checkliste` (afrejsecheckliste) bruger
`type:"checklist"`. De renderes som checkbokse med fremgangsbar + Nulstil-knap.
Afkrydsning gemmes i `localStorage` under nøglen `cm:<sektion-key>:<hash(tekst)>`
(hash af selve tekstlinjen). Derfor: **ændrer du ordlyden af et checklist-punkt,
nulstilles netop det punkt** hos brugeren — men omrokering bevarer afkrydsninger.

---

## App-arkitektur

| Fil | Rolle |
|---|---|
| `index.html` | Skal + inline SVG-ikonsæt (`#ic-…`, inkl. `#ic-shell` = Camino-muslingeskal) |
| `styles.css` | Alt design |
| `data.js` | Al rejsedata (`DAYS`, `ROUTES`, `OVERVIEW_PTS`, `GENERAL`) |
| `app.js` | Hash-router + visninger + Leaflet-kort + afkrydsnings-logik |
| `sw.js` | Service worker (offline-cache) |
| `manifest.webmanifest` | PWA-manifest (`name:"Engmussen · Camino 2026"`) |
| `icon.svg` | App-/hjemskærms-ikon (gylden segmenteret muslingeskal) |
| `serve.sh` | Lokal forhåndsvisning |
| `.github/workflows/deploy.yml` | Auto-deploy til Pages |

**Ruter (hash):** `#/` forside · `#/dag/<i>` (dag-info) · `#/dag/<i>/kort` · `#/rute`
(hele ruten) · `#/oversigt` (tabel) · `#/info` (guide-index) · `#/info/<key>` (sektion).

**Leaflet + kort-fliser** hentes fra CDN (cdnjs) / OSM-fliser / OSRM-ruter. Disse
værter caches runtime af service workeren, så kortet virker offline efter første brug.

**GPX-download:** appen genererer GPX **på stedet** (ingen gemte filer). `handleGpx()`
i `app.js` bygger track (foot-ben via OSRM-geometri, transport-ben som rette
segmenter) + waypoints (POI'er) og downloader via Blob. Knap pr. gå-dag
(`data-gpx="<i>"`) og "hele turen" på `#/rute` (`data-gpx="all"`). Kræver internet
på download-tidspunktet (gøres typisk hjemmefra før import i Maps.me). Ændrer du
`ROUTES`, opdateres GPX automatisk — intet at regenerere.

---

## Kør lokalt / forhåndsvis

```bash
./serve.sh          # starter webserver + åbner Windows-Chrome på localhost:8000
```
Service worker/PWA virker på `localhost` (sikker kontekst). Ser du ikke ændringer
lokalt: DevTools → Application → Service Workers → "Update on reload".

---

## Verificér ændringer (headless browser)

Der er Playwright + Chrome på maskinen. Kør appen headless mod `serve.sh` og bekræft
at alle visninger renderer **uden konsol-fejl**. Praktisk opsæt der virker her:

- Chrome: `executablePath: '/usr/bin/google-chrome-stable'`
- Playwright-modul: findes under `~/.npm/_npx/*/node_modules/playwright` (eller
  `~/git/ace/ui/node_modules/playwright`) — importér via absolut sti med `createRequire`.
- Tjek: forside = 14 dagkort; `#/dag/5` = transport-blok + højdepunkter + overnatning;
  `#/dag/5/kort` = Leaflet-kort med rute-polylinjer; `#/oversigt` = 14 rækker;
  `#/info` = 15 kort; checklister persisterer over reload.

Ignorér 404 på `/favicon.ico` og Chrome-devtools-probe — ikke app-fejl.

---

## Deploy (automatisk cache-busting)

Push til `main` → **GitHub Actions** (`.github/workflows/deploy.yml`) stempler
commit-SHA'en ind i `sw.js`'s `CACHE`-navn og deployer til Pages. Derfor får hver
udrulning et unikt cache, og brugerne får automatisk den nye version.

- Den committede `sw.js` beholder placeholderen `camino-2026-v2` — stemplingen sker
  kun i CI's ephemeral checkout. **Rør ikke ved den manuelt.**
- Verificér efter deploy:
  ```bash
  gh run watch $(gh run list -R anders-rasmussen/Camino2026Engmussen -L1 --json databaseId --jq '.[0].databaseId') -R anders-rasmussen/Camino2026Engmussen --exit-status
  curl -s https://anders-rasmussen.github.io/Camino2026Engmussen/sw.js | grep CACHE   # skal vise commit-SHA
  ```
- Commit/push kun når brugeren beder om det. Slut commit-beskeder med:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

---

## Design & branding

- **Branding:** "Engmussen" (Engblom × Rasmussen) i topbar, hero og manifest.
- **Palet:** solnedgang (orange `#f4801f` / koral `#e5512b`) møder ocean (teal `#0e7f8c`).
- **Portugal/Spanien-farvekodning:** dag 0–4 Portugal (orange), dag 5 grænseovergang
  (orange→teal), dag 6–13 Spanien (teal). Hviledage grønne, hjemrejse blå. Se
  `dayCountry()`/`badgeClass()` i `app.js`. Land vises som tekst-tag "PT"/"ES"/"PT–ES".
- **Logo:** segmenteret Camino-muslingeskal. Ét motiv (`#ic-shell` i `index.html` +
  `icon.svg`) — opdatér begge steder hvis skallen ændres.

---

## Gotchas (lært undervejs)

- **Grid-overløb:** brug `grid-template-columns:repeat(N,minmax(0,1fr))` — bart `1fr`
  lader spor vokse ud over viewporten (klip via `minmax(0,…)`).
- **Ingen flag-emoji:** 🇵🇹/🇪🇸 render inkonsistent (bogstaver på Windows, tofu på Linux).
  Brug tekst-tags i stedet.
- **LF→CRLF-advarsler** fra git er harmløse (WSL/Windows). Repoet serveres som LF.
- **Gitignoreret:** `porto2026` (Drive-symlink), `.claude/`, `desktop.ini`.
- **Pages-kilde:** `build_type=workflow` (Actions), ikke legacy branch-build. Uden
  Actions kørte Pages filerne gennem Jekyll og serverede forkert → `.nojekyll` findes
  også som sikkerhed.

---

## WSL & Google Drive

Google Drive (`G:` via File Stream) er mountet i WSL på `/mnt/g` (permanent via
`/etc/fstab`). `porto2026` → `/mnt/g/My Drive/Familie Dokumenter/Porto 2026`.
Er `/mnt/g` tom, kører Google Drive ikke på Windows, eller mountet mangler — mount/
fstab kræver `sudo`, som agenten ikke kan køre: bed brugeren om det.
