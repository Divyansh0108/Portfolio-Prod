"use client";

import { useEffect, useRef } from "react";

const TRAIL_SIZES  = [4, 3, 2] as const;
const TRAIL_LERP   = [0.08, 0.055, 0.035] as const;
const TRAIL_OPACITY = [0.34, 0.22, 0.12] as const;

export function CustomCursor() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trail0   = useRef<HTMLDivElement>(null);
  const trail1   = useRef<HTMLDivElement>(null);
  const trail2   = useRef<HTMLDivElement>(null);
  const mouse    = useRef({ x: -100, y: -100 });
  const pos      = useRef({ x: -100, y: -100 });
  const trailPos = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);
  const visible  = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    const trails = [trail0.current, trail1.current, trail2.current];

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        ring.style.opacity = "1";
        trails.forEach((t, i) => {
          if (t) t.style.opacity = String(TRAIL_OPACITY[i]);
        });
      }
    };

    const onLeave = () => {
      visible.current = false;
      ring.style.opacity = "0";
      trails.forEach((t) => { if (t) t.style.opacity = "0"; });
    };

    const getLabel = (el: Element): string | null => {
      const ariaLabel = el.getAttribute("aria-label");
      if (ariaLabel) return ariaLabel;
      const title = el.getAttribute("title");
      if (title) return title;
      const tag = el.tagName.toLowerCase();
      if (tag === "a" || tag === "button") {
        const text = (el.textContent || "").trim().replace(/\s+/g, " ");
        if (text.length > 0 && text.length <= 28) return text;
      }
      return null;
    };

    const interactiveSelector = "a, button, [role=button], input, textarea, select";

    const onOverInteractive = (e: MouseEvent) => {
      const target = (e.target as Element).closest(interactiveSelector);
      if (!target) return;

      const related = e.relatedTarget as Element | null;
      if (related && related.closest && related.closest(interactiveSelector) === target) {
        return;
      }

      ring.style.transform = "translate(-50%, -50%) scale(1.35)";

      const text = getLabel(target);
      if (text) {
        label.textContent = text;
        label.style.opacity = "1";
        label.style.transform = "translateY(0)";
      }
    };

    const onLeaveInteractive = (e: MouseEvent) => {
      const fromInteractive = (e.target as Element).closest(interactiveSelector);
      if (!fromInteractive) return;

      const related = e.relatedTarget as Element | null;
      if (related && related.closest && related.closest(interactiveSelector) === fromInteractive) {
        return;
      }

      ring.style.transform = "translate(-50%, -50%) scale(1)";
      label.style.opacity = "0";
      label.style.transform = "translateY(4px)";
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;

      const x = pos.current.x;
      const y = pos.current.y;

      ring.style.left  = `${x}px`;
      ring.style.top   = `${y}px`;

      label.style.left = `${x + 14}px`;
      label.style.top  = `${y + 18}px`;

      const sources = [pos.current, trailPos.current[0], trailPos.current[1]];
      trailPos.current.forEach((tp, i) => {
        tp.x += (sources[i].x - tp.x) * TRAIL_LERP[i];
        tp.y += (sources[i].y - tp.y) * TRAIL_LERP[i];
        const el = trails[i];
        if (el) {
          el.style.left = `${tp.x}px`;
          el.style.top  = `${tp.y}px`;
        }
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover",  onOverInteractive);
    document.addEventListener("mouseout",   onLeaveInteractive);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover",  onOverInteractive);
      document.removeEventListener("mouseout",   onLeaveInteractive);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[200] h-[24px] w-[24px] rounded-full bg-white opacity-0"
        style={{
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 220ms var(--ease-smooth), opacity 220ms var(--ease-smooth)",
        }}
      />
      <span
        ref={labelRef}
        className="pointer-events-none fixed z-[199] text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap opacity-0 select-none"
        style={{
          color: "#fff",
          mixBlendMode: "difference",
          transform: "translateY(4px)",
          transition: "opacity 180ms var(--ease-smooth), transform 180ms var(--ease-smooth)",
        }}
      />
      <div
        ref={trail0}
        aria-hidden="true"
        className="pointer-events-none fixed rounded-full bg-white opacity-0"
        style={{
          width: TRAIL_SIZES[0],
          height: TRAIL_SIZES[0],
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          zIndex: 198,
        }}
      />
      <div
        ref={trail1}
        aria-hidden="true"
        className="pointer-events-none fixed rounded-full bg-white opacity-0"
        style={{
          width: TRAIL_SIZES[1],
          height: TRAIL_SIZES[1],
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          zIndex: 197,
        }}
      />
      <div
        ref={trail2}
        aria-hidden="true"
        className="pointer-events-none fixed rounded-full bg-white opacity-0"
        style={{
          width: TRAIL_SIZES[2],
          height: TRAIL_SIZES[2],
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          zIndex: 196,
        }}
      />
    </>
  );
}
