"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    if (!ring) return;

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

    // Scale on interactive element hover
    const onOverInteractive = () => {
      ring.style.transform = "translate(-50%, -50%) scale(2)";
    };
    const onLeaveInteractive = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
    };

    // Smooth follow with RAF
    let raf: number;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      ring.style.left = `${pos.current.x}px`;
      ring.style.top = `${pos.current.y}px`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const interactiveSelector = "a, button, [role=button], input, textarea, select";
    const addInteractiveListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onOverInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    addInteractiveListeners();
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
    /*
     * A white-filled circle with mix-blend-mode: difference.
     * Over any background colour, difference against white produces the
     * exact RGB inverse — so the content inside the ring is always inverted,
     * making the cursor visible regardless of theme or underlying colour.
     */
    <div
      ref={ringRef}
      className="pointer-events-none fixed z-[200] h-[28px] w-[28px] rounded-full bg-white opacity-0"
      style={{
        mixBlendMode: "difference",
        transform: "translate(-50%, -50%) scale(1)",
        transition: "transform 0.18s ease, opacity 0.2s ease",
      }}
    />
  );
}
