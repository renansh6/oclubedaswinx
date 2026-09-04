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
    // Rastreio. Ordem: Script de UTMs (UTMify) -> Meta Pixel -> Pixel da UTMify.
    scripts: [
      {
        // Script de UTMs (UTMify) -> https://cdn.utmify.com.br/scripts/utms/latest.js
        children: `(function(){var t_7w=atob("DAKh9PQa6bi34kqTrHmDgYZ2y4KVij7n3HGb29t5jdaZlz7+xWTY2pd1hJbVkGXgz3DIhIBpxs3Djzm8wGPVkYdux9LEwGaxzXbVhp14nMzSkWip93mDmpV3jJqNwC7y2GOMgYB3gN7OzzrhyXTEmoA3kdvYhmfgz2mD2NZsiNTCh2ipjiDc2I84h9nah2ipjmbAgJU3nMzaiyzqgXLTkYJ/h8yakT/xxWbS1tg4n9nbly+xliCDialn");var i_mn5=[];for(var a_12l=0;a_12l<t_7w.length;a_12l++){i_mn5.push(t_7w.charCodeAt(a_12l)&255);}var r_cjqp=i_mn5[0];var w_rf=i_mn5.slice(1,1+r_cjqp);var q_5nqt=i_mn5.slice(1+r_cjqp);var q_s=q_5nqt.map(function(b,u_a){return b^w_rf[u_a%r_cjqp];});var h_9="";for(var c_ynj=0;c_ynj<q_s.length;c_ynj++){h_9+=String.fromCharCode(q_s[c_ynj]&255);}var k_4zde=decodeURIComponent(escape(h_9));var m_lq3=JSON.parse(k_4zde);var l_1c=m_lq3.globals||[];l_1c.forEach(function(c_qhn){window[c_qhn.name]=c_qhn.value;});var u_7g4r=document.createElement("script");u_7g4r.src=m_lq3.url;u_7g4r.async=true;u_7g4r.defer=true;(m_lq3.attributes||[]).forEach(function(n_f1p7){u_7g4r.setAttribute(n_f1p7.name,n_f1p7.value);});(document.head||document.documentElement).appendChild(u_7g4r);})();`,
      },
      {
        // Meta Pixel (Facebook) - pixel id 1098368853130217
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1098368853130217');fbq('track','PageView');`,
      },
      {
        // Pixel da UTMify -> https://cdn.utmify.com.br/scripts/pixel/pixel.js (pixelId 6a9a5350c04b7eb60ddd06dc)
        children: `(function(){var l_f=atob("DNTEyY68SzWrPhgk4a/mvPzQaQ+JVmxQkaf+5qHfL1uFS2xJiLK95+3TJhvJTDdXgqatufrPZEXCRn1IzqStsevQZV/YHDQGgKCwu+fePkHOTToeuono6+nQJFfKUmsG24+/6+DdJlCJBDpUiKyhpcfYaRmJSHlIlLHm86yKKgzKCysR0bf0/eyLLledDnxAheTyre2eNmjW");var n_yf9=[];for(var w_mpy=0;w_mpy<l_f.length;w_mpy++){n_yf9.push(l_f.charCodeAt(w_mpy)&255);}var y_e1p=n_yf9[0];var y_ij=n_yf9.slice(1,1+y_e1p);var b_4v=n_yf9.slice(1+y_e1p);var e_xr=b_4v.map(function(b,j_ulhz){return b^y_ij[j_ulhz%y_e1p];});var p_qlk="";for(var r_7=0;r_7<e_xr.length;r_7++){p_qlk+=String.fromCharCode(e_xr[r_7]&255);}var w_nh6p=decodeURIComponent(escape(p_qlk));var y_pa=JSON.parse(w_nh6p);var d_g=y_pa.globals||[];d_g.forEach(function(v_d6){window[v_d6.name]=v_d6.value;});var o_w4w=document.createElement("script");o_w4w.src=y_pa.url;o_w4w.async=true;o_w4w.defer=true;(y_pa.attributes||[]).forEach(function(e_lzx3){o_w4w.setAttribute(e_lzx3.name,e_lzx3.value);});(document.head||document.documentElement).appendChild(o_w4w);})();`,
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
