import { createMiddleware, createStart } from "@tanstack/react-start";

/**
 * Cabeçalhos de segurança aplicados a toda resposta servida pelo runtime.
 * O arquivo public/_headers não é honrado pelo host, então a política vive aqui.
 * CSP restrita apenas a frame-ancestors: nada de CSP completa enquanto não
 * houver script de terceiro, para não quebrar o site.
 */
const SECURITY_HEADERS: Array<[string, string]> = [
  ["X-Frame-Options", "SAMEORIGIN"],
  ["Content-Security-Policy", "frame-ancestors 'self'"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  [
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), midi=(), serial=(), bluetooth=(), magnetometer=(), gyroscope=(), accelerometer=()",
  ],
];

const securityHeadersMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    const result = await next();
    for (const [name, value] of SECURITY_HEADERS) {
      result.response.headers.set(name, value);
    }
    return result;
  },
);

/**
 * Normalização de barra final como 301 permanente.
 * O roteador faz essa normalização com 307 (temporário), o que desperdiça
 * sinal de SEO. Aqui a resposta é reescrita para 301.
 */
const permanentTrailingSlashMiddleware = createMiddleware({
  type: "request",
}).server(async ({ next, request }) => {
  const url = new URL(request.url);
  const isTrailing = url.pathname.length > 1 && url.pathname.endsWith("/");

  const result = await next();

  if (isTrailing && result.response.status === 307) {
    const location = result.response.headers.get("location");
    if (location) {
      const headers = new Headers(result.response.headers);
      return {
        ...result,
        response: new Response(null, { status: 301, headers }),
      };
    }
  }

  return result;
});

export const startInstance = createStart(() => ({
  requestMiddleware: [
    permanentTrailingSlashMiddleware,
    securityHeadersMiddleware,
  ],
}));

