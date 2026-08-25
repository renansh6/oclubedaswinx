import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroAsset from "@/assets/winx-banner.png.asset.json";
import p1 from "@/assets/p-b0f0984490591b39f5f716d9eeb7777a.jpg.asset.json";
import p2 from "@/assets/p-c89e421ad752787e42b5e438c94a1220.jpg.asset.json";
import p3 from "@/assets/p-e0dfbe3ead389b80337081bc741c9545.jpg.asset.json";
import p4 from "@/assets/p-6e0e8d735aecbad446150d34e955de3c.jpg.asset.json";
import p5 from "@/assets/p-94ab5b7ef6368f63ce05a34046de0a2b.jpg.asset.json";
import p6 from "@/assets/p-5388f1ba2629e6450df7bdea32f1545e.jpg.asset.json";
import p7 from "@/assets/p-a742f020551d38a4766a417861ae3255.jpg.asset.json";
import { PosterCarousel } from "@/components/PosterCarousel";
import { CARTOONS, TOP_CARTOONS } from "@/data/cartoons";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Maior Acervo de Desenhos de Meninas do Brasil | Tudo Dublado" },
      {
        name: "description",
        content:
          "21 desenhos em um só lugar: Princesas Disney, Barbie, Winx, Superpoderosas, Frozen, Sailor Moon, Ladybug e muito mais — dublados, Full HD e acesso vitalício por R$6,90.",
      },
      { property: "og:title", content: "O Maior Acervo de Desenhos de Meninas do Brasil" },
      {
        property: "og:description",
        content:
          "Princesas Disney, Barbie, Winx, Frozen, Sailor Moon, Ladybug e mais 15 desenhos dublados, em Full HD e com acesso vitalício por apenas R$6,90.",
      },

      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CHECKOUT = "https://pay.lowify.com.br/checkout?product_id=Ng0Xva";
const CHECKOUT_VIP = "https://pay.lowify.com.br/checkout?product_id=dL194r";

// Mantém os parâmetros de rastreio (UTMs/subids) presentes na URL da LP
function withTracking(url: string) {
  try {
    const search = window.location.search.replace(/^\?/, "");
    if (!search) return url;
    const target = new URL(url);
    new URLSearchParams(search).forEach((v, k) => {
      if (!target.searchParams.has(k)) target.searchParams.set(k, v);
    });
    return target.toString();
  } catch {
    return url;
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function goToCheckout(url: string, value: number, label: string, el?: HTMLAnchorElement | null) {
  try {
    window.fbq?.("track", "InitiateCheckout", {
      value,
      currency: "BRL",
      content_name: label,
    });
  } catch {
    /* noop */
  }
  return el?.href && el.href.includes("pay.lowify.com.br") ? el.href : withTracking(url);
}







const BENEFITS: { ic: string; html: React.ReactNode; bonus?: boolean }[] = [
  { ic: "✅", html: <>Acervo com <b>21 desenhos de meninas completos</b>, todos dublados em português</> },
  {
    ic: "👑",
    html: (
      <>
        <b>Princesas Disney</b> — Ariel, Bela, Cinderela, Rapunzel, Jasmine, Aurora e Branca de Neve
      </>
    ),
  },
  { ic: "🎀", html: <><b>Barbie, Polly Pocket, Moranguinho e Hello Kitty</b> — filmes e séries clássicas</> },
  {
    ic: "🧚",
    html: (
      <>
        <b>Winx Club, W.I.T.C.H., Sailor Moon e Ever After High</b> — todas as temporadas de magia
      </>
    ),
  },
  {
    ic: "💥",
    html: <><b>Meninas Superpoderosas, Kim Possible, She-Ra e Três Espiãs Demais</b> — pura ação</>,
  },
  { ic: "❄️", html: <><b>Frozen, Ladybug, My Little Pony, Monster High e Bratz</b> completos</> },
  { ic: "🐷", html: <><b>Dora, Peppa Pig e Pucca</b> — perfeitos para as pequenas</> },
  { ic: "📺", html: <>Tudo em <b>Full HD 1080p</b> e dublado em português</> },
  { ic: "🎨", html: <>Interface simples e organizada, <b>fácil de achar cada episódio</b></> },
  { ic: "💬", html: <><b>Acesso imediato</b> liberado direto no seu WhatsApp</> },
  { ic: "♾️", html: <><b>Acesso 100% vitalício</b> — pague uma vez, é seu pra sempre</> },
  { ic: "🆕", html: <><b>Novos desenhos adicionados sempre</b>, sem pagar nada a mais</> },
  { ic: "🎁", html: <><b>Kit de desenhos para imprimir e colorir</b> de todos os personagens</>, bonus: true },
];


const REVIEWS = [
  {
    photo: p1.url,
    initials: "MS",
    name: "Mariana Santos",
    grad: "linear-gradient(135deg,#F65BAE,#D6167E)",
    txt: "Eu amei esse acervo! Cresci assistindo Princesas e Winx e agora posso rever tudo com a minha filha. Que nostalgia, tô apaixonada! 🥹💖",
  },
  {
    photo: p2.url,
    initials: "TS",
    name: "Tauany Silveira",
    grad: "linear-gradient(135deg,#B96CE0,#7E3FD6)",
    txt: "Tô me sentindo criança de novo kkkk maratonei Sailor Moon e Três Espiãs Demais no mesmo dia. Já mandei pra minha irmã!",
  },
  {
    photo: p3.url,
    initials: "JA",
    name: "Juliana Alves",
    grad: "linear-gradient(135deg,#F79BC4,#E0218A)",
    txt: "Gente, entrei ontem e fiquei até tarde vendo os filmes das Princesas e da Barbie. Não consegui parar! Qualidade perfeita e tudo dublado 😍✨",
  },
];

const COMMENTS = [
  {
    photo: p4.url,
    initials: "CM",
    grad: "linear-gradient(135deg,#F65BAE,#C21E77)",
    user: "carol_mendes22",
    txt: "Meninaaa, tava doida pra rever esses filmes com a minha filha e achei tudo aqui 🥰",
    time: "4 h",
  },
  {
    photo: p5.url,
    initials: "BL",
    grad: "linear-gradient(135deg,#C98CE8,#8A46D6)",
    user: "bruna.lima",
    txt: "Ficou muito bom! Fazia anos que eu procurava os filmes antigos dublados e não achava. Recomendo demais!",
    time: "2 h",
  },
  {
    photo: p6.url,
    initials: "AS",
    grad: "linear-gradient(135deg,#F79BC4,#E0218A)",
    user: "amanda_souza",
    txt: "Eu e a minha filha passamos a tarde assistindo Frozen, Ladybug e Moranguinho kkk nostalgia total 💕",
    time: "2 h",
  },
  {
    photo: p7.url,
    initials: "LD",
    grad: "linear-gradient(135deg,#FF9EBB,#D6167E)",
    user: "leticia_dias",
    txt: "Tô simplesmente apaixonada nesse acervo 💖 ficou perfeito",
    time: "2 h",
  },
];

const BUYERS = [
  "Amanda de São Paulo",
  "Juliana do Rio de Janeiro",
  "Patrícia de Belo Horizonte",
  "Camila de Curitiba",
  "Fernanda de Salvador",
  "Larissa de Recife",
  "Bruna de Porto Alegre",
];

function Divider() {
  return <hr className="my-8 border-0 border-t border-dashed border-border" />;
}

function OfferCard({
  tag,
  scarcity,
  title,
  cta,
  note,
  onCta,
}: {
  tag: string;
  scarcity?: string;
  title: string;
  cta: string;
  note: React.ReactNode;
  onCta: (e: React.MouseEvent) => void;
}) {
  return (
    <section className="card-soft px-5 py-7 text-center sm:px-7">
      <div className="font-script text-4xl leading-none text-primary">{tag}</div>
      {scarcity && (
        <div className="mx-auto mt-3 inline-block rounded-full border border-[#f0c98a] bg-[#fff6e6] px-4 py-2 text-[12px] font-bold text-[#a8681a]">
          {scarcity}
        </div>
      )}
      <h3 className="mt-4 text-[17px] font-extrabold uppercase leading-snug text-ink">{title}</h3>

      {tag === "Oferta Exclusiva" && (
        <div className="mt-4">
          <div className="text-[12px] font-bold text-muted-foreground">
            Os 10 desenhos mais pedidos:
          </div>
          <div className="mt-3">
            <PosterCarousel items={TOP_CARTOONS} size="sm" speed={22} />
          </div>
          <div className="mt-3 flex justify-center">
            <span className="rounded-full bg-primary px-3 py-1.5 text-[11.5px] font-bold text-primary-foreground">
              +21 desenhos no acervo
            </span>
          </div>
        </div>
      )}



      <div className="mt-5 text-[14px] font-bold text-muted-foreground">
        ➡ De: <s className="text-primary/70">R$59,90</s>
      </div>
      <div className="text-[13px] font-semibold text-muted-foreground">Por apenas</div>
      <div className="text-6xl font-extrabold leading-none text-primary">
        <small className="align-super text-2xl font-bold">R$</small>6,90
      </div>

      <button type="button" onClick={onCta} className="cta-btn mt-6">
        {cta}
      </button>
      <div className="mt-3 text-[12px] font-semibold leading-relaxed text-muted-foreground">
        {note}
      </div>
    </section>
  );
}

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let i = 0;
    const show = () => {
      setToast(BUYERS[i % BUYERS.length] ?? null);
      i++;
      window.setTimeout(() => setToast(null), 5000);
    };
    const first = window.setTimeout(show, 4000);
    const interval = window.setInterval(show, 14000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <main className="mx-auto w-full max-w-[620px] px-4 py-6">
      {/* HERO */}
      <section>
        <img
          src={heroAsset.url}
          alt="O maior acervo de desenhos de meninas do Brasil"
          width={1662}
          height={931}
          className="mx-auto w-full rounded-2xl object-contain shadow-[0_14px_36px_-14px_oklch(0.6_0.245_348_/_0.5)]"
        />
        <h1 className="mt-5 text-center text-[17px] font-semibold leading-relaxed text-ink">
          Agora você pode assistir aos{" "}
          <b className="text-primary">21 desenhos de meninas mais amados de todos os tempos</b>,
          dublados em português e em alta qualidade! 💖
        </h1>
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[13px] font-semibold text-muted-foreground shadow-[var(--shadow-card)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <b className="text-primary">441</b> pessoas assistindo agora
          </div>
        </div>
      </section>

      <Divider />

      <OfferCard
        tag="Oferta Exclusiva"
        scarcity="🔥 Valor promocional de lançamento — por tempo limitado"
        title="Os 21 desenhos de meninas mais amados, num lugar só"
        cta="Quero acesso a todos os desenhos 💖"
        onCta={handleCta}
        note={
          <>
            🔒 Compra 100% segura · PIX na hora
            <br />
            💗 7 dias de garantia — risco zero
          </>
        }
      />
      <p className="mt-4 text-center text-[12.5px] font-medium text-muted-foreground">
        Esse é apenas um valor simbólico para nos ajudar a manter tudo no ar e com qualidade para
        você! 💖
      </p>

      <Divider />

      {/* CARROSSEL DOS 21 DESENHOS */}
      <section>
        <h2 className="text-center text-[20px] font-extrabold text-ink">
          🎬 Os 21 desenhos que estão te esperando
        </h2>
        <p className="mt-2 text-center text-[13.5px] font-medium text-muted-foreground">
          Arraste para o lado e veja tudo o que entra no seu acesso 💕
        </p>
        <div className="mt-5">
          <PosterCarousel items={CARTOONS} speed={18} />
        </div>
      </section>


      <Divider />

      {/* O QUE RECEBE */}
      <h2 className="text-center text-[20px] font-extrabold text-ink">
        👑 Você recebe imediatamente tudo isso:
      </h2>
      <p className="mt-2 text-center text-[13.5px] font-medium text-muted-foreground">
        💌 Assim que o acesso for liberado, tudo isso é seu no WhatsApp:
      </p>
      <div className="mt-5 space-y-2.5">
        {BENEFITS.map((b, i) => (
          <div
            key={i}
            className={`flex gap-3 rounded-2xl border p-3.5 ${
              b.bonus ? "border-primary bg-secondary" : "border-border bg-card"
            }`}
          >
            <span className="text-[18px] leading-6">{b.ic}</span>
            <span className="text-[14px] leading-6 text-ink">
              {b.bonus && (
                <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary-foreground">
                  Bônus
                </span>
              )}
              {b.html}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      {/* DEPOIMENTOS */}
      <h2 className="text-center text-[20px] font-extrabold text-ink">
        💬 Acompanhe o feedback de quem já garantiu
      </h2>
      <p className="mt-2 text-center text-[13.5px] font-medium text-muted-foreground">
        Acompanhe o depoimento de algumas das milhares de fãs que já garantiram seu acesso ao nosso
        acervo 💕
      </p>

      <div className="mt-5 space-y-3">
        {REVIEWS.map((r) => (
          <div key={r.initials} className="card-soft p-4">
            <div className="flex items-center gap-3">
              <img
                src={r.photo}
                alt={r.name}
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-full border-2 border-primary/40 object-cover object-center"
                style={{ background: r.grad }}
              />
              <div>
                <div className="text-[14px] font-bold text-ink">{r.name}</div>
                <div className="text-[11.5px] text-muted-foreground">· Via Instagram</div>
              </div>
            </div>
            <div className="mt-2 text-[14px] tracking-widest text-[#f5b301]">★★★★★</div>
            <p className="mt-1.5 text-[14px] leading-6 text-ink">{r.txt}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {COMMENTS.map((c) => (
          <div key={c.user} className="flex gap-3">
            <img
              src={c.photo}
              alt={c.user}
              loading="lazy"
              className="mt-0.5 h-11 w-11 shrink-0 rounded-full border-2 border-primary/30 object-cover object-center"
              style={{ background: c.grad }}
            />
            <div>
              <div className="text-[13.5px] leading-6 text-ink">
                <b>{c.user}</b> comentou: {c.txt}
              </div>
              <div className="mt-1 text-[11.5px] font-semibold text-muted-foreground">
                <span className="text-primary">♥</span> Responder · {c.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* HISTÓRIA */}
      <section className="card-soft p-5 text-center">
        <h3 className="text-[16px] font-extrabold leading-snug text-ink">
          Sabemos como é difícil encontrar os desenhos da nossa infância em alta qualidade e
          dublados na internet…
        </h3>
        <p className="mt-3 text-[14px] leading-6 text-muted-foreground">
          Por esse motivo nós criamos esse acervo. Reunimos 21 desenhos de meninas completos —
          das Princesas Disney à Barbie, Winx, Frozen, Sailor Moon e muito mais — na melhor
          qualidade e dublados em português, pra você assistir sempre que quiser 💗
        </p>

      </section>

      <Divider />

      {/* APARELHOS */}
      <div className="text-center">
        <p className="text-[13px] font-bold text-muted-foreground">Assista em qualquer aparelho</p>
        <div className="mt-3 flex justify-center gap-8">
          {[
            {
              label: "Celular",
              path: (
                <>
                  <rect x="6" y="2" width="12" height="20" rx="3" />
                  <line x1="10" y1="18.5" x2="14" y2="18.5" />
                </>
              ),
            },
            {
              label: "Notebook",
              path: (
                <>
                  <rect x="4" y="4" width="16" height="12" rx="1.5" />
                  <path d="M2 20h20" />
                  <path d="M9.5 20l.7-2h3.6l.7 2" />
                </>
              ),
            },
            {
              label: "Smart TV",
              path: (
                <>
                  <rect x="3" y="4" width="18" height="13" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </>
              ),
            },
          ].map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-1.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary"
              >
                {d.path}
              </svg>
              <span className="text-[12px] font-semibold text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mb-2 mt-8 text-center text-[14px] font-bold text-primary">
        Não perca essa nostalgia 💖
      </p>
      <OfferCard
        tag="Última chamada"
        title="Reviva a magia dos seus desenhos favoritos ainda hoje"
        cta="Garantir meu acesso agora 🎀"
        onCta={handleCta}
        note={<>🔒 Compra 100% segura · 💗 7 dias de garantia incondicional</>}
      />

      <Divider />

      {/* SEGURANÇA */}
      <section className="card-soft p-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 text-[12px] font-extrabold text-muted-foreground">
          <span>COMPRA 100% SEGURA</span>
          <span className="rounded-full border border-border bg-pink-soft px-3 py-1.5 text-[11.5px] font-bold text-secondary-foreground">
            🤝 mercado pago
          </span>
        </div>
        <div className="mt-4 text-[15px] font-extrabold text-ink">
          7 Dias de garantia incondicional
        </div>
        <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
          Caso decida que não valeu a pena, você pode pedir um reembolso em até 7 dias depois da
          compra e receber 100% do seu investimento de volta, sem perguntas ou burocracias.
        </p>
      </section>

      {/* MODAL UPSELL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="card-soft relative my-8 w-full max-w-[520px] p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Fechar"
              className="absolute right-4 top-3 text-2xl leading-none text-muted-foreground"
            >
              ×
            </button>
            <span className="inline-block rounded-full bg-secondary px-3 py-1.5 text-[11.5px] font-extrabold text-secondary-foreground">
              🎨 Bônus liberado
            </span>
            <h3 className="mt-3 text-[18px] font-extrabold leading-snug text-ink">
              Espera! Por só <span className="text-primary">R$3 a mais</span>, a diversão vira da
              família toda 👇
            </h3>
            <p className="mt-2 text-[13.5px] leading-6 text-muted-foreground">
              Você já vai levar <b>os 21 desenhos completos</b>. Que tal transformar numa tarde
              inteira de atividade com a sua pequena? Adicione agora o <b>Kit de Diversão</b> 👇
            </p>
            <div className="mt-4 space-y-2 text-left">
              {[
                <>🎨 <b>Kits de Colorir pra imprimir</b> — Princesas, Barbie, Winx e Moranguinho (dezenas de desenhos!)</>,
                <>🧩 <b>Atividades bônus</b> — caça-palavras, ligue os pontos e jogo dos 7 erros</>,
                <>📱 <b>Papéis de parede fofos</b> dos personagens pro celular</>,
                <>🎀 <b>Carteirinha de Princesa</b> pra sua filha imprimir e se sentir parte do clube</>,

              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-pink-soft p-3 text-[13.5px] leading-6 text-ink"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="text-[13px] font-semibold text-muted-foreground">
                De <s>R$29,90</s> por apenas +R$3
              </div>
              <div className="text-5xl font-extrabold leading-none text-primary">
                <small className="align-super text-xl font-bold">R$</small>9,90
              </div>
            </div>
            <div className="mt-3 text-[12.5px] font-semibold text-muted-foreground">
              🖍️ Menos tempo de tela, mais diversão de verdade — só R$3 a mais, uma vez só.
            </div>
            <a
              href={CHECKOUT_VIP}
              onClick={(e) => {
                e.currentTarget.href = goToCheckout(
                  CHECKOUT_VIP,
                  9.9,
                  "Kit de Diversão - R$9,90",
                  e.currentTarget,
                );
              }}
              className="cta-btn mt-4"
            >
              SIM! Quero o Kit de Diversão 🎨
              <span className="mt-1 block text-[12px] font-semibold normal-case opacity-90">
                Levar tudo por R$9,90 →
              </span>
            </a>
            <a
              href={CHECKOUT}
              onClick={(e) => {
                e.currentTarget.href = goToCheckout(
                  CHECKOUT,
                  6.9,
                  "Acervo Desenhos - R$6,90",
                  e.currentTarget,
                );
              }}
              className="mt-3 block text-[12.5px] font-semibold text-muted-foreground underline"
            >
              Não, quero só assistir por R$6,90.
            </a>



          </div>
        </div>
      )}

      {/* TOAST DE PROVA SOCIAL */}
      {toast && (
        <div
          className="card-soft fixed bottom-4 left-4 z-40 flex max-w-[300px] items-center gap-3 p-3"
          style={{ animation: "toast-in .35s ease" }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
            {toast.charAt(0)}
          </div>
          <div className="text-[12.5px] leading-5 text-ink">
            <b>{toast}</b> acabou de garantir o acesso 💖
          </div>
        </div>
      )}
    </main>
  );
}
