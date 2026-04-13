"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const compute = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress((prev) => {
        // Skip re-render if the change is sub-pixel (< 0.1%)
        return Math.abs(next - prev) < 0.1 ? prev : next;
      });
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(compute);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      id="scroll-progress"
      className="fixed top-0 left-0 z-[49] h-[2px] bg-[var(--foreground)] transition-none"
      style={{ width: `${progress}%` }}
    />
  );
}
