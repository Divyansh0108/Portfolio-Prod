"use client";

import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { hobbyGroups } from "@/lib/data";

// ─── Sequoia palette ─────────────────────────────────────────────────────────
// Inspired by old-growth sequoia groves: deep bark reds, forest floor moss,
// amber light through canopy, and the stillness of ancient wood.
const S = {
  bg:          "#1c1410", // heartwood — dark, warm, almost black-brown
  bgCard:      "#241a13", // slightly lifted surface
  bgCardHover: "#2c2018", // hover lift
  border:      "rgba(210,160,90,0.12)",
  borderHover: "rgba(210,160,90,0.28)",
  accent:      "#c8874a", // amber bark light
  accentMuted: "rgba(200,135,74,0.55)",
  textPrimary: "#ede0cc", // warm parchment
  textSecond:  "rgba(237,224,204,0.55)",
  textMuted:   "rgba(237,224,204,0.32)",
  moss:        "#6b8c5a", // moss green — secondary accent
};

export default function BeyondPage() {
  // Paint the body bg so no white flash bleeds around the container.
  // useLayoutEffect runs before paint, so the swap happens synchronously and
  // we don't see a flash of the previous theme on route enter/exit.
  useLayoutEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = S.bg;
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <div
      className="min-h-screen -mt-[3.5rem] pt-[3.5rem]"
      style={{ background: S.bg, color: S.textPrimary }}
    >
      {/* Full-bleed bg override — bleeds past max-w-3xl container */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{ background: S.bg }}
      />

      {/* Subtle radial glow top-left — like light through canopy */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[500px] z-[-1] opacity-30"
        style={{
          background: "radial-gradient(ellipse at 20% 10%, #5c3d1e 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-0 w-[500px] h-[400px] z-[-1] opacity-20"
        style={{
          background: "radial-gradient(ellipse at 80% 90%, #3a5c2e 0%, transparent 65%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: S.accent }}
          >
            Beyond the work
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] mb-4"
            style={{ color: S.textPrimary }}
          >
            What I do when I&apos;m not shipping.
          </h1>
          <p
            className="text-sm leading-relaxed max-w-lg"
            style={{ color: S.textSecond }}
          >
            The researcher is just one layer. Here&apos;s the rest of it —
            the obsessions, the instruments, the miles, and the margins
            filled with half-finished poems.
          </p>
        </motion.div>

        {/* ── Hobby grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hobbyGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + i * 0.07 }}
            >
              <div
                className="group h-full rounded-xl p-5 transition-all duration-200 cursor-default"
                style={{
                  background: S.bgCard,
                  border: `1px solid ${S.border}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = S.bgCardHover;
                  (e.currentTarget as HTMLDivElement).style.borderColor = S.borderHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = S.bgCard;
                  (e.currentTarget as HTMLDivElement).style.borderColor = S.border;
                }}
              >
                {/* Icon + label */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-sm leading-none select-none"
                    style={{ color: S.accent }}
                    aria-hidden="true"
                  >
                    {group.icon}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: S.accent }}
                  >
                    {group.label}
                  </span>
                </div>

                {/* Items as pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(200,135,74,0.1)",
                        border: `1px solid rgba(200,135,74,0.2)`,
                        color: S.textPrimary,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Note */}
                {group.note && (
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: S.textMuted }}
                  >
                    {group.note}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer note ────────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-xs text-center leading-relaxed"
          style={{ color: S.textMuted }}
        >
          The margins of a life well-lived.
        </motion.p>
      </div>
    </div>
  );
}
