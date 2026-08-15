import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

const MOBILE_BREAKPOINT = 640;
const VISIBLE_FRACTION = 0.82;
const GAP = 12;
const TRANSITION_MS = 500;

interface MobileCarouselProps {
  children: React.ReactNode;
  interval?: number;
}

export function MobileCarousel({ children, interval = 2500 }: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const items = React.Children.toArray(children);
  const count = items.length;
  const slides = count > 1 ? [...items, ...items] : items;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (count <= 1 || !isMobile) return;
    const timer = window.setInterval(() => {
      if (!paused && dragStart === null) {
        setIndex((prev) => prev + 1);
      }
    }, interval);
    return () => window.clearInterval(timer);
  }, [count, interval, paused, dragStart, isMobile]);

  // Trigger reset after completing a full loop
  useEffect(() => {
    if (index >= count && count > 0) {
      const t = window.setTimeout(() => {
        setIsResetting(true);
        setIndex(index % count);
      }, TRANSITION_MS);
      return () => window.clearTimeout(t);
    }
  }, [index, count]);

  // Apply transform
  useEffect(() => {
    if (!trackRef.current || !isMobile || count === 0) return;
    const track = trackRef.current;
    const containerWidth = track.parentElement?.clientWidth || track.clientWidth;
    const itemWidth = containerWidth * VISIBLE_FRACTION;
    const totalItemWidth = itemWidth + GAP;
    const effectiveIndex = index % Math.max(count, 1);
    const offset = effectiveIndex * totalItemWidth;
    const centerOffset = (containerWidth - itemWidth) / 2;

    if (isResetting) {
      track.style.transition = "none";
      track.style.transform = `translateX(${centerOffset - offset}px)`;
      void track.offsetWidth;
      track.style.transition = `transform ${TRANSITION_MS}ms ease-out`;
      setIsResetting(false);
    } else {
      track.style.transform = `translateX(${centerOffset - offset}px)`;
    }
  }, [index, isMobile, count, isResetting]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setPaused(true);
    setDragStart(e.touches[0]!.clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (dragStart === null) return;
      const diff = e.changedTouches[0]!.clientX - dragStart;
      setDragStart(null);
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          setIndex((prev) => prev + 1);
        } else {
          setIndex((prev) => (prev - 1 + count) % count);
        }
      }
      window.setTimeout(() => setPaused(false), interval);
    },
    [dragStart, count, interval]
  );

  if (!isMobile) {
    return <div className="flex flex-wrap justify-center gap-2">{children}</div>;
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ touchAction: "pan-y" }}>
      <div
        ref={trackRef}
        className="flex"
        style={{
          transition: `transform ${TRANSITION_MS}ms ease-out`,
          willChange: "transform",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((child, i) => (
          <div
            key={`mobile-carousel-${i}`}
            className="flex shrink-0 items-center justify-center px-1"
            style={{ width: `${VISIBLE_FRACTION * 100}%` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
