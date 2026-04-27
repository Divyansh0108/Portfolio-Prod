"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { exploring } from "@/lib/data";

export function CurrentlyExploring() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <motion.section
      id="currently-exploring"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-16 gradient-divider"
    >
      <div className="overflow-hidden mb-6">
        <motion.h2
          className="text-base font-semibold text-[var(--foreground)]"
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Currently exploring
        </motion.h2>
      </div>

      <ul className="divide-y divide-[var(--border)]">
        {exploring.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left group"
              aria-expanded={openIndex === i}
              aria-controls={`exploring-panel-${i}`}
              id={`exploring-trigger-${i}`}
            >
              {/* Topic — dot indicator + label */}
              <span className="flex items-center gap-2.5 text-[0.925rem] font-semibold text-[var(--foreground)] group-hover:text-[var(--muted-foreground)] transition-colors duration-150">
                <span
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-transform duration-300"
                  style={{
                    background: "var(--foreground)",
                    transform: openIndex === i ? "scale(1.6)" : "scale(1)",
                  }}
                />
                {item.topic}
              </span>

              {/* Expand icon */}
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="flex-shrink-0 text-[var(--muted-foreground)]"
              >
                {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
              </motion.span>
            </button>

            {/* Expanding description */}
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="content"
                  id={`exploring-panel-${i}`}
                  role="region"
                  aria-labelledby={`exploring-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { type: "spring", stiffness: 280, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed pl-4">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
