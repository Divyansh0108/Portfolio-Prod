"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

const entries = [
  {
    role: "Member · Open Source Contributor",
    org: "The Red Wood Lab",
    type: "Part-time",
    period: "Jan 2025 – May 2025",
    location: "Jaipur, Rajasthan · Remote",
    bullets: [
      "Contributed a multivariate Ridge regression model for electrical energy prediction on Micro Gas Turbine data (achieving R² = 0.9785 on test set).",
      "Worked across ML, NLP, and data science projects within the lab's open research ecosystem.",
    ],
  },
  {
    role: "Open Source Contributor",
    org: "Social Winter of Code (SWOC)",
    type: "Part-time",
    period: "Jan 2025 – Mar 2025",
    location: "Remote",
    bullets: [
      "Contributed to open-source projects spanning LLMs, Computer Vision, and NLP as part of the SWOC program.",
    ],
  },
  {
    role: "Open Source Contributor",
    org: "Hacktoberfest",
    type: "Part-time",
    period: "Oct 2024",
    location: "Remote",
    bullets: [
      "Contributed ML and data science notebooks to open-source repositories during Hacktoberfest 2024. Earned Level 1 badge.",
    ],
  },
  {
    role: "Software Engineering Virtual Simulation",
    org: "JPMorgan Chase & Co. (via Forage)",
    type: "Trainee",
    period: "Jan 2024",
    location: "Remote",
    bullets: [
      "Completed a simulation focused on engineering tasks in JPMorgan Chase's credit-card rewards department.",
      "Created a new class to get an existing system up and running; authored a comprehensive unit test suite in Java.",
    ],
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function Volunteering() {
  return (
    <motion.section
      id="volunteering"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="py-16 border-t border-[var(--border)]"
    >
      <motion.h2
        variants={fadeUp}
        className="text-base font-semibold text-[var(--foreground)] mb-6"
      >
        Positions of Responsibility &amp; Volunteering
      </motion.h2>

      <div className="space-y-5">
        {entries.map((entry, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="relative flex gap-4"
          >
            {/* Timeline line */}
            {i < entries.length - 1 && (
              <div className="absolute left-[15px] top-[36px] bottom-[-20px] w-px bg-[var(--border)]" />
            )}

            {/* Icon */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)]">
              <Users size={13} className="text-[var(--muted-foreground)]" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 pb-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {entry.role}
                </h3>
                <span className="text-xs text-[var(--muted-foreground)]">
                  · {entry.type}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">{entry.org}</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {entry.period} · {entry.location}
              </p>
              {entry.bullets.length > 0 && (
                <ul className="mt-1.5 space-y-1.5">
                  {entry.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-1.5 text-sm text-[var(--muted-foreground)] leading-snug"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
