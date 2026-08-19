import { createFileRoute } from "@tanstack/react-router";

/**
 * Página descontinuada em 19/08/2026. O conteúdo passou a viver em /solucao,
 * que virou a visão geral das três verticais. Mantida apenas como
 * redirecionamento permanente (301).
 */
const DESTINO = "https://grupodamahealth.com.br/solucao";

export const Route = createFileRoute("/ecossistema")({
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
