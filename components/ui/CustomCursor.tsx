"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mouse    = useRef({ x: -100, y: -100 });
  const pos      = useRef({ x: -100, y: -100 });
  const visible  = useRef(false);

  useEffect(() => {
    // Don't show on touch devices or when user prefers reduced motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      ring.style.opacity = "0";
    };

    // Returns the best short label for an interactive element, or null
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

      ring.style.transform = "translate(-50%, -50%) scale(1.7)";

      const text = getLabel(target);
      if (text) {
        label.textContent = text;
        label.style.opacity = "1";
        label.style.transform = "translateY(0)";
      }
    };

    const onLeaveInteractive = (e: MouseEvent) => {
      if (!(e.target as Element).closest(interactiveSelector)) return;
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      label.style.opacity = "0";
      label.style.transform = "translateY(4px)";
    };

    // Smooth follow with RAF — both ring and label track the same smoothed position
    let raf: number;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      const x = pos.current.x;
      const y = pos.current.y;

      ring.style.left  = `${x}px`;
      ring.style.top   = `${y}px`;

      // Label sits 18px below and 14px right of ring center
      label.style.left = `${x + 14}px`;
      label.style.top  = `${y + 18}px`;

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
      {/*
       * Ring: mix-blend-mode difference → always visible regardless of theme.
       * Label: fades in on interactive hover showing title/aria-label/text.
       */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[200] h-[28px] w-[28px] rounded-full bg-white opacity-0"
        style={{
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 0.18s ease, opacity 0.2s ease",
        }}
      />
      <span
        ref={labelRef}
        className="pointer-events-none fixed z-[199] text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap opacity-0 select-none"
        style={{
          color: "#fff",
          mixBlendMode: "difference",
          transform: "translateY(4px)",
          transition: "opacity 0.15s ease, transform 0.15s ease",
        }}
      />
    </>
  );
}
