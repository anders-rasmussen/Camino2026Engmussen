// Service worker – offline-cache for Camino-appen
const CACHE = "camino-2026-v2";
// Kernefiler der skal caches ved installation. Bemærk: markdown-dokumentet
// caches ikke her, da det ikke ligger i denne mappe – det caches ved brug,
// hvis/når det er tilgængeligt ved siden af index.html ved udrulning.
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./Kort%20-%20dag%20for%20dag.html"
];

// Værter/filer vi cacher ved brug (kort-fliser, biblioteker, ruter, dokumentet)
const RUNTIME_HOSTS = [
  "tile.openstreetmap.org",
  "cdnjs.cloudflare.com",
  "unpkg.com",
  "routing.openstreetmap.de"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // Cache hver fil individuelt, så en enkelt manglende fil ikke bryder alt.
      Promise.allSettled(CORE.map((u) => c.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const runtime = RUNTIME_HOSTS.some((h) => url.hostname.endsWith(h));
  if (!sameOrigin && !runtime) return;

  // Cache-first for både app-filer, dokument, kort-fliser og biblioteker.
  e.respondWith(
    caches.match(req).then((hit) =>
      hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit)
    )
  );
});
