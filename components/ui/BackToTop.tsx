"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const next = window.scrollY > 400;
          setVisible((prev) => (prev === next ? prev : next));
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 dark:border-white/10 backdrop-blur-lg bg-white/60 dark:bg-black/60 text-[var(--muted-foreground)] hover:text-[var(--foreground)] shadow-sm transition-all duration-200 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp size={16} />
    </button>
  );
}
