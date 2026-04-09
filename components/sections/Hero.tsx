"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data";
import { useScrambleText } from "@/hooks/useScrambleText";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.07 },
  }),
};

// Clip-path wipe: slides up from below a mask
const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (i: number) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      clipPath: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.07 },
      opacity:  { duration: 0.15, delay: i * 0.07 },
    },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrambledName = useScrambleText(siteConfig.name, 300, 1000);

  // Scroll parallax — layers move at different rates
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY    = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const nameY   = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bioY    = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const ctaY    = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={sectionRef} id="hero" className="relative pt-32 pb-16 overflow-hidden">

      {/* ── Aurora blob ─────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 w-[480px] h-[380px] opacity-[0.07] dark:opacity-[0.06] blur-[90px]"
        style={{
          background: "radial-gradient(ellipse at 40% 50%, #6366f1 0%, #a855f7 40%, transparent 70%)",
          animation: "aurora-drift 14s ease-in-out infinite alternate",
        }}
      />

      {/* Headshot */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ y: imgY }}
        className="mb-5"
      >
        <div className="relative h-20 w-20">
          <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-[var(--border)] bg-[var(--muted)]">
            <Image
              src="/headshot.jpg"
              alt="Divyansh Pandey — profile photo"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Role label + badge */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-wrap items-center gap-3 mb-3"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          {siteConfig.role}
        </p>

        {/* Animated "open to opportunities" badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] badge-breathe">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Open to opportunities
        </span>
      </motion.div>

      {/* Name — scramble + parallax + clip-path reveal */}
      <div className="overflow-hidden mb-3">
        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={clipReveal}
          style={{ y: nameY }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] font-mono"
        >
          {scrambledName}
        </motion.h1>
      </div>

      {/* Tagline — clip reveal */}
      <div className="overflow-hidden mb-5">
        <motion.h2
          custom={3}
          initial="hidden"
          animate="visible"
          variants={clipReveal}
          className="text-xl sm:text-2xl font-semibold text-[var(--muted-foreground)]"
        >
          {siteConfig.tagline}
        </motion.h2>
      </div>

      {/* Bio */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ y: bioY }}
        className="text-[0.925rem] text-[var(--muted-foreground)] leading-[1.8] max-w-xl mb-8 space-y-3"
      >
        {siteConfig.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ y: ctaY }}
        className="flex items-center gap-3"
      >
        <Button href="/projects" variant="primary" id="hero-view-projects">
          View Projects
        </Button>
        <Button href={`mailto:${siteConfig.email}`} variant="ghost" id="hero-get-in-touch">
          Get in touch
        </Button>
      </motion.div>
    </section>
  );
}
