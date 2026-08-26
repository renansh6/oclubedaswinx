import { useEffect, useRef } from "react";
import type { Cartoon } from "@/data/cartoons";

type Props = {
  items: Cartoon[];
  /** pixels por segundo do movimento automático */
  speed?: number;
  size?: "sm" | "md";
};

export function PosterCarousel({ items, speed = 26, size = "md" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused.current && el.scrollWidth > 0) {
        el.scrollLeft += speed * dt;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // arrastar com o dedo / mouse
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const down = (e: PointerEvent) => {
      dragging = true;
      paused.current = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const up = () => {
      dragging = false;
      window.setTimeout(() => (paused.current = false), 900);
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [speed]);

  const dims = size === "sm" ? "w-[92px] h-[123px]" : "w-[120px] h-[160px]";
  const loop = [...items, ...items];

  return (
    <div
      ref={trackRef}
      className="flex cursor-grab select-none gap-3 overflow-x-auto pb-1 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]"
    >
      {loop.map((c, i) => (
        <figure
          key={`${c.id}-${i}`}
          className={`relative shrink-0 overflow-hidden rounded-xl shadow-[0_6px_16px_-8px_oklch(0.6_0.245_348_/_0.6)] ${dims}`}
          style={{ background: c.grad }}
        >
          {c.image ? (
            <img
              src={c.image}
              alt={`Pôster de ${c.name}`}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-contain"
            />
          ) : (
            <figcaption className="flex h-full w-full items-end p-2 text-left text-[11px] font-extrabold leading-tight text-white drop-shadow">
              {c.name}
            </figcaption>
          )}
        </figure>

        </figure>
      ))}
    </div>
  );
}
