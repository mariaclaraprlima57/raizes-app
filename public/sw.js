const VERSAO = "raizes-pwa-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(
        chaves.filter((chave) => chave.startsWith("raizes-pwa-") && chave !== VERSAO)
          .map((chave) => caches.delete(chave)),
      ))
      .then(() => self.clients.claim()),
  );
});

// O app depende de dados atuais do Supabase. Mantemos a rede como fonte da
// verdade e evitamos um cache agressivo que impeça o recebimento de versões.
self.addEventListener("fetch", (evento) => {
  if (evento.request.method === "GET") evento.respondWith(fetch(evento.request));
});
