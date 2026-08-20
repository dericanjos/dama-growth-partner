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

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeadersMiddleware],
}));
