"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "featured-research", label: "Research" },
  { id: "featured-projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "featured-writing", label: "Writing" },
  { id: "education", label: "Education" },
  { id: "honors-awards", label: "Awards" },
];

export function SectionNav() {
  const [activeId, setActiveId] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ratios: Record<string, number> = {};

    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          const best = Object.entries(ratios).reduce(
            (a, b) => (b[1] > a[1] ? b : a),
            ["hero", 0]
          );
          // Only re-render when the active section actually changes.
          setActiveId((prev) => (prev === best[0] ? prev : best[0]));
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      return obs;
    });

    // Show nav only after first scroll
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observers.forEach((o) => o?.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Page sections"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5 pointer-events-auto"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => {
              const target = document.getElementById(id);
              if (!target) return;
              // Account for the fixed navbar (h-14 = 56px) with a little extra
              // breathing room so the section heading isn't kissing the nav.
              const navOffset = 72;
              const top =
                target.getBoundingClientRect().top + window.scrollY - navOffset;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            aria-label={`Scroll to ${label}`}
            aria-current={isActive ? "location" : undefined}
            title={label}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Tooltip label */}
            <span className="pointer-events-none absolute right-full mr-2.5 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium bg-[var(--muted)] text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              {label}
            </span>

            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-250"
              style={{
                width: isActive ? 8 : 5,
                height: isActive ? 8 : 5,
                backgroundColor: isActive ? "var(--foreground)" : "var(--border-strong)",
              }}
            />
          </button>
        );
      })}
    </motion.nav>
  );
}
