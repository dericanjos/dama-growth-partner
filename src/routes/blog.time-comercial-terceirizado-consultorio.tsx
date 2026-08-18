import { createFileRoute } from "@tanstack/react-router";

/**
 * Slug antigo do post, mantido apenas como redirecionamento permanente (301)
 * para /blog/operacao-comercial-terceirizada-consultorio.
 */
const DESTINO = "https://grupodamahealth.com.br/blog/operacao-comercial-terceirizada-consultorio";

export const Route = createFileRoute("/blog/time-comercial-terceirizado-consultorio")({
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
