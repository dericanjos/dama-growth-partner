import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";



function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-[var(--navy)]">404</h1>
        <h2 className="mt-4 font-serif text-xl text-[var(--text-primary)]">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-[var(--navy)] transition-colors hover:bg-[var(--gold-light)]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Grupo DAMA | Solução Completa para Médicos" },
      {
        name: "description",
        content:
          "O Grupo DAMA integra time comercial, growth marketing e marketing 360 para médicos que querem crescer com previsibilidade. 16+ estados, 90+ médicos parceiros.",
      },
      { name: "author", content: "Grupo DAMA" },
      { name: "theme-color", content: "#0D1B2A" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Grupo DAMA" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Grupo DAMA | Solução Completa para Médicos" },
      { name: "twitter:title", content: "Grupo DAMA | Solução Completa para Médicos" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/31b1d445-4e56-411d-ab3f-2948c07f7b3b/id-preview-0bff959b--2e798cd7-2d1d-4ad2-916f-065fb6ba88f2.lovable.app-1776559781456.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/31b1d445-4e56-411d-ab3f-2948c07f7b3b/id-preview-0bff959b--2e798cd7-2d1d-4ad2-916f-065fb6ba88f2.lovable.app-1776559781456.png" },
      { name: "description", content: "Grupo DAMA oferece operação comercial estratégica para médicos no Brasil." },
      { property: "og:description", content: "Grupo DAMA oferece operação comercial estratégica para médicos no Brasil." },
      { name: "twitter:description", content: "Grupo DAMA oferece operação comercial estratégica para médicos no Brasil." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
