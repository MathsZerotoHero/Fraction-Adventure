/* =====================================================================
   Service worker = the little helper that makes the app work offline.
   It keeps a copy of every file in a box called a "cache".

   IMPORTANT: whenever you change index.html, change the version number
   on the next line (v1 -> v2 -> v3...). That is what tells phones
   "there is a new version, throw the old copy away".
   ===================================================================== */
const VERSION = "fraction-adventure-v1";

/* the files that make up the app */
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

/* 1. When the app is first installed, save a copy of every file. */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* 2. When a new version installs, delete the old boxes. */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n !== VERSION).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

/* 3. Every time the app asks for a file: give the saved copy first,
      and only go to the internet if we do not have one. */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        /* save fonts and anything else we fetch, so it works offline next time */
        const copy = res.clone();
        if (res.ok && (req.url.startsWith(self.location.origin) || req.url.includes("fonts.g"))) {
          caches.open(VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => {
        /* offline and not saved: fall back to the app page */
        if (req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
