"use client";

import { motion } from "framer-motion";
import { hobbyGroups } from "@/lib/data";

export function Hobbies() {
  return (
    <section
      id="hobbies"
      className="relative py-20"
      style={{
        background: "var(--hobbies-bg, #0d0b14)",
        // Bleed past the max-w-3xl container to full viewport width
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        paddingLeft: "calc(50vw - 50% + 1.5rem)",
        paddingRight: "calc(50vw - 50% + 1.5rem)",
      }}
    >
      {/* Faint grain texture — reinforces the different-world feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#c9a84c" }}
          >
            Outside the terminal
          </p>
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#f0ece6" }}
          >
            What I do when I&apos;m not shipping.
          </h2>
        </motion.div>

        {/* Grid of hobby groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-white/[0.07]">
          {hobbyGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              className="group relative p-6 border border-white/[0.07] hover:bg-white/[0.03] transition-colors duration-200"
            >
              {/* Icon + label row */}
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="text-base leading-none select-none"
                  style={{ color: "#c9a84c" }}
                  aria-hidden="true"
                >
                  {group.icon}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: "#c9a84c" }}
                >
                  {group.label}
                </span>
              </div>

              {/* Items */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-medium"
                    style={{ color: "#f0ece6" }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Note */}
              {group.note && (
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(240,236,230,0.45)" }}
                >
                  {group.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
