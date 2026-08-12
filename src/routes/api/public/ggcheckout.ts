import { createFileRoute } from "@tanstack/react-router";

type AnyRecord = Record<string, unknown>;

const UTMIFY_URL = "https://api.utmify.com.br/api-credentials/orders";

function pick(obj: AnyRecord | undefined, ...keys: string[]): unknown {
  if (!obj) return undefined;
  for (const k of keys) {
    const v = obj[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function toCents(value: unknown): number {
  const n = typeof value === "string" ? Number(value) : (value as number);
  if (!Number.isFinite(n)) return 0;
  // heurística: valores inteiros grandes já vêm em centavos
  return Number.isInteger(n) && n >= 1000 ? n : Math.round(n * 100);
}

function utcDate(value: unknown): string | null {
  const d = value ? new Date(value as string) : new Date();
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().replace("T", " ").slice(0, 19);
}

function mapStatus(raw: unknown): "waiting_payment" | "paid" | "refused" | "refunded" | "chargedback" {
  const s = String(raw ?? "").toLowerCase();
  if (/(paid|approved|aprovad|pago|complete)/.test(s)) return "paid";
  if (/(refund|estorn)/.test(s)) return "refunded";
  if (/(chargeback|charged_back)/.test(s)) return "chargedback";
  if (/(refus|fail|denied|cancel|expired)/.test(s)) return "refused";
  return "waiting_payment";
}

function mapPaymentMethod(raw: unknown): "pix" | "credit_card" | "boleto" {
  const s = String(raw ?? "").toLowerCase();
  if (s.includes("pix")) return "pix";
  if (s.includes("boleto")) return "boleto";
  return "credit_card";
}

export const Route = createFileRoute("/api/public/ggcheckout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiToken = process.env["UTMIFY_API_TOKEN"];
        if (!apiToken) {
          return new Response("Missing UTMIFY_API_TOKEN", { status: 500 });
        }

        const secret = process.env["GGCHECKOUT_WEBHOOK_SECRET"];
        if (secret) {
          const sent =
            request.headers.get("x-webhook-secret") ??
            request.headers.get("x-secret") ??
            request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
            new URL(request.url).searchParams.get("secret");
          if (sent !== secret) return new Response("Invalid secret", { status: 401 });
        }

        let body: AnyRecord;
        try {
          body = (await request.json()) as AnyRecord;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const data = ((body["data"] as AnyRecord) ?? body) as AnyRecord;
        const customer = (pick(data, "customer", "client", "buyer") as AnyRecord) ?? {};
        const tracking =
          ((pick(data, "trackingParameters", "tracking", "utm", "utms") as AnyRecord) ?? {}) as AnyRecord;

        const amountCents = toCents(
          pick(data, "amount", "value", "total", "totalValue", "price", "totalPrice"),
        );
        const status = mapStatus(pick(data, "status", "event", "type", "paymentStatus"));
        const createdAt = utcDate(pick(data, "createdAt", "created_at", "date"));
        const approvedDate = status === "paid" ? utcDate(pick(data, "paidAt", "approvedAt") ?? new Date()) : null;

        const productName = String(
          pick(data, "productName", "product_name") ??
            ((pick(data, "product") as AnyRecord)?.["name"] as string) ??
            "Acervo O Clube das Winx",
        );
        const productId = String(
          pick(data, "productId", "product_id", "offerId", "checkoutId") ?? productName,
        );

        const payload = {
          orderId: String(pick(data, "id", "orderId", "transactionId", "transaction_id") ?? crypto.randomUUID()),
          platform: "GGCheckout",
          paymentMethod: mapPaymentMethod(pick(data, "paymentMethod", "payment_method", "method")),
          status,
          createdAt,
          approvedDate,
          refundedAt: status === "refunded" ? utcDate(new Date()) : null,
          customer: {
            name: String(pick(customer, "name", "fullName") ?? "Cliente"),
            email: String(pick(customer, "email") ?? "sememail@naoinformado.com"),
            phone: (pick(customer, "phone", "phoneNumber") as string) ?? null,
            document: (pick(customer, "document", "cpf") as string) ?? null,
            country: "BR",
            ip: (pick(data, "ip") as string) ?? null,
          },
          products: [
            {
              id: productId,
              name: productName,
              planId: null,
              planName: null,
              quantity: 1,
              priceInCents: amountCents,
            },
          ],
          trackingParameters: {
            src: (pick(tracking, "src") as string) ?? null,
            sck: (pick(tracking, "sck") as string) ?? null,
            utm_source: (pick(tracking, "utm_source", "utmSource") as string) ?? null,
            utm_campaign: (pick(tracking, "utm_campaign", "utmCampaign") as string) ?? null,
            utm_medium: (pick(tracking, "utm_medium", "utmMedium") as string) ?? null,
            utm_content: (pick(tracking, "utm_content", "utmContent") as string) ?? null,
            utm_term: (pick(tracking, "utm_term", "utmTerm") as string) ?? null,
          },
          commission: {
            totalPriceInCents: amountCents,
            gatewayFeeInCents: 0,
            userCommissionInCents: amountCents,
          },
          isTest: Boolean(pick(data, "isTest", "test")),
        };

        const res = await fetch(UTMIFY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-token": apiToken },
          body: JSON.stringify(payload),
        });

        const text = await res.text();
        if (!res.ok) {
          console.error("Utmify rejeitou o pedido:", res.status, text);
          return new Response(JSON.stringify({ ok: false, status: res.status, body: text }), {
            status: 502,
            headers: { "content-type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "content-type": "application/json" },
        });
      },
      GET: async () => new Response("ok"),
    },
  },
});
