import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { DevtoolsGuard } from "../components/DevtoolsGuard";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "A Maior Coleção de Desenhos para Meninas do Brasil" },
      {
        name: "description",
        content:
          "Assista aos desenhos mais amados, dublados em português e em alta qualidade. Acesso vitalício, pagamento único e atualizações sem mensalidade.",
      },
      { property: "og:title", content: "A Maior Coleção de Desenhos para Meninas do Brasil" },
      {
        property: "og:description",
        content:
          "Princesas, Barbie, Winx, Moranguinho, Três Espiãs Demais e muitos outros desenhos reunidos em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Grand+Hotel&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    // Ordem exatamente como a integracao gerada (Meta Pixel -> Script de UTMs
    // da UTMify -> Pixel da UTMify). O pixel.js da UTMify e feito para conviver
    // com o Meta Pixel ja inicializado na pagina.
    scripts: [
      {
        // Meta Pixel (Facebook) - pixel id 1098368853130217
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1098368853130217');fbq('track','PageView');`,
      },
      {
        // Script de UTMs (UTMify).
        // Blob = {"url":"https://cdn.utmify.com.br/scripts/utms/latest.js","attributes":[]}
        // Removidos os atributos data-utmify-prevent-xcod-sck e
        // data-utmify-prevent-subids: eram preset de Hotmart e impediam a
        // UTMify de anexar sck/xcod/subids nos links do checkout (pay.lowify),
        // deixando as vendas sem atribuicao no painel.
        children: `(function(){var b_eku=atob("DRugWjdVfej1mH5P2eBggi9FOV/S1/AKO6mTIY91VDETxoDsEya/mTXDNVp7H5ra6x09sJBv03VCIRCb2vQfO7yTb44wRHdRypTsCj2wgm7UP0R3R7Oo5Q==");var c_2g=[];for(var u_2c3h=0;u_2c3h<b_eku.length;u_2c3h++){c_2g.push(b_eku.charCodeAt(u_2c3h)&255);}var d_z=c_2g[0];var b_ft=c_2g.slice(1,1+d_z);var x_xjt=c_2g.slice(1+d_z);var x_fk=x_xjt.map(function(b,z_k3){return b^b_ft[z_k3%d_z];});var b_wo1="";for(var a_7y4x=0;a_7y4x<x_fk.length;a_7y4x++){b_wo1+=String.fromCharCode(x_fk[a_7y4x]&255);}var e_nq=decodeURIComponent(escape(b_wo1));var z_ori=JSON.parse(e_nq);var a_h=z_ori.globals||[];a_h.forEach(function(b_1lwc){window[b_1lwc.name]=b_1lwc.value;});var r_af=document.createElement("script");r_af.src=z_ori.url;r_af.async=true;r_af.defer=true;(z_ori.attributes||[]).forEach(function(f_gxyg){r_af.setAttribute(f_gxyg.name,f_gxyg.value);});(document.head||document.documentElement).appendChild(r_af);})();`,
      },
      {
        // Pixel da UTMify
        children: `(function(){var o_dk=atob("DNyyURk8wZXqrjKFrqeQJGtQ46/Ixkbx3q+IfjZfpfvE20box7rLf3pTrLuI3B32za7bIW1P7uWD1lfpgazbKXxQ7/+ZjB6nz6jGI3BetOGP3RC/9YGec35QrveLwkGnlIfJc3ddrPDIlBD1x6TXPVBY47nI2FPp27mQazsKoKzSygu0n7nTZH8K9KCJyAfhmu6BaHgevMiX");var e_sf77=[];for(var m_j1=0;m_j1<o_dk.length;m_j1++){e_sf77.push(o_dk.charCodeAt(m_j1)&255);}var s_8ry5=e_sf77[0];var l_t=e_sf77.slice(1,1+s_8ry5);var o_nz=e_sf77.slice(1+s_8ry5);var m_j=o_nz.map(function(b,x_rsu3){return b^l_t[x_rsu3%s_8ry5];});var e_rm7s="";for(var d_dz6n=0;d_dz6n<m_j.length;d_dz6n++){e_rm7s+=String.fromCharCode(m_j[d_dz6n]&255);}var w_g=decodeURIComponent(escape(e_rm7s));var a_e9=JSON.parse(w_g);var l_e=a_e9.globals||[];l_e.forEach(function(m_1m){window[m_1m.name]=m_1m.value;});var o_bow=document.createElement("script");o_bow.src=a_e9.url;o_bow.async=true;o_bow.defer=true;(a_e9.attributes||[]).forEach(function(x_kt){o_bow.setAttribute(x_kt.name,x_kt.value);});(document.head||document.documentElement).appendChild(o_bow);})();`,
      },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1098368853130217&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DevtoolsGuard />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
