import { createFileRoute } from "@tanstack/react-router";

/**
 * Qualquer subcaminho abaixo de /escola também redireciona 301 para o site
 * próprio da DAMA Escola.
 */
const DESTINO = "https://escoladama.com.br/";

export const Route = createFileRoute("/escola_/$")({
  server: {
    handlers: {
      GET: () =>
        new Response(null, {
          status: 301,
          headers: {
            Location: DESTINO,
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
