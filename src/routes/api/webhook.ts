import { createFileRoute } from "@tanstack/react-router";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function isAuthorized(request: Request) {
  const expected = process.env["WEBHOOK_TOKEN"];
  if (!expected) return false;
  const url = new URL(request.url);
  const provided =
    url.searchParams.get("k") ??
    request.headers.get("x-webhook-token") ??
    "";
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export const Route = createFileRoute("/api/webhook")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),

      GET: async ({ request }) => {
        if (!isAuthorized(request)) {
          return json({ ok: false, error: "invalid token" }, 401);
        }
        return json({
          ok: true,
          status: "webhook ativo",
          methods: ["GET", "POST"],
          timestamp: new Date().toISOString(),
        });
      },

      POST: async ({ request }) => {
        try {
          if (!isAuthorized(request)) {
            return json({ ok: false, error: "invalid token" }, 401);
          }

          const raw = await request.text();
          if (!raw || raw.trim() === "") {
            return json({ ok: false, error: "empty payload" }, 400);
          }

          let payload: unknown;
          try {
            payload = JSON.parse(raw);
          } catch {
            return json({ ok: false, error: "invalid json" }, 400);
          }

          // Log completo para descobrir o formato real do payload da Lowify.
          console.log("[lowify-webhook]", JSON.stringify(payload));

          return json({ ok: true, received: true });
        } catch (error) {
          console.error("[lowify-webhook] internal error", error);
          return json({ ok: false, error: "internal error" }, 500);
        }
      },
    },
  },
});
