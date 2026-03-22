"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    // Scale ring on interactive element hover
    const onOverInteractive = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1.8)";
      ring.style.borderColor = "var(--foreground)";
      dot.style.transform = "translate(-50%, -50%) scale(0.5)";
    };
    const onLeaveInteractive = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.borderColor = "var(--muted-foreground)";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    // Smooth follow with RAF
    let raf: number;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      dot.style.left = `${mouse.current.x}px`;
      dot.style.top = `${mouse.current.y}px`;
      ring.style.left = `${pos.current.x}px`;
      ring.style.top = `${pos.current.y}px`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    // Add listeners to all interactive elements
    const interactiveSelector = "a, button, [role=button], input, textarea, select";
    const addInteractiveListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onOverInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    addInteractiveListeners();
    // Re-attach on DOM changes (for client nav)
    const observer = new MutationObserver(() => addInteractiveListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot - follows mouse exactly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[200] h-[5px] w-[5px] rounded-full bg-[var(--foreground)] opacity-0"
        style={{
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 0.15s ease, opacity 0.2s ease",
        }}
      />
      {/* Ring - follows with smooth lag */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[200] h-[32px] w-[32px] rounded-full border border-[var(--foreground)] opacity-0"
        style={{
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
