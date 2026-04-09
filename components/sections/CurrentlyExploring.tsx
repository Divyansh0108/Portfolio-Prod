"use client";

import { motion } from "framer-motion";
import { exploring } from "@/lib/data";

export function CurrentlyExploring() {
  return (
    <motion.section
      id="currently-exploring"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-16 gradient-divider"
    >
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-6">
        Currently exploring
      </h2>

      <ul className="space-y-3">
        {exploring.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[0.925rem]">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
            <span>
              <strong className="font-semibold text-[var(--foreground)]">
                {item.topic}
              </strong>{" "}
              <span className="text-[var(--muted-foreground)]">
                — {item.description}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
