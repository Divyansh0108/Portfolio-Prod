"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, BookOpen, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig, socialLinks } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const, delay: i * 0.06 },
  }),
};

const heroIconMap: Record<string, React.ReactNode> = {
  github:           <Github size={13} />,
  linkedin:         <Linkedin size={13} />,
  "google-scholar": <span className="text-[10px] font-bold leading-none">GS</span>,
  medium:           <BookOpen size={13} />,
  kaggle:           <span className="text-[10px] font-bold leading-none">K</span>,
  instagram:        <Instagram size={13} />,
  peerlist:         <span className="text-[10px] font-bold leading-none">P</span>,
};

function GetInTouchButton() {
  const [locked, setLocked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const open = locked || hovered;

  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        id="hero-get-in-touch"
        onClick={() => setLocked((l) => !l)}
        className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3.5 py-1.5 text-sm font-medium text-[var(--foreground)] cursor-pointer select-none transition-[transform,background-color,border-color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[var(--muted)] hover:border-[var(--border-strong)] active:translate-y-0 active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        Get in touch
      </button>

      <motion.div
        initial={false}
        animate={{
          maxWidth: open ? 320 : 0,
          opacity: open ? 1 : 0,
          marginLeft: open ? 8 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden flex items-center gap-1.5"
      >
        {socialLinks.map((s) => (
          <a
            key={s.icon}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[var(--border)] text-[var(--muted-foreground)] transition-[transform,color,border-color] duration-200 ease-[var(--ease-pop)] hover:scale-110 hover:text-[var(--foreground)] hover:border-[var(--foreground)] active:scale-90"
          >
            {heroIconMap[s.icon]}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="pt-28 pb-10">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-5"
      >
        <div className="h-20 w-20 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--muted)]">
          <Image
            src="/headshot.jpg"
            alt="Divyansh Pandey — profile photo"
            width={80}
            height={80}
            sizes="80px"
            className="object-cover w-full h-full"
            priority
            fetchPriority="high"
          />
        </div>
      </motion.div>

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

        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] transition-[transform,color,border-color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:scale-[1.04] hover:border-[var(--foreground)] hover:text-[var(--foreground)] active:translate-y-0 active:scale-95"
          aria-label="Open to ML roles and research — contact me"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open to research &amp; applied-ML roles
        </a>
      </motion.div>

      <motion.h1
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] leading-[1.15] mb-3"
      >
        {siteConfig.name}
      </motion.h1>

      <motion.p
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-lg sm:text-xl font-medium text-[var(--muted-foreground)] mb-5"
      >
        {siteConfig.tagline}
      </motion.p>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-[0.9375rem] text-[var(--muted-foreground)] leading-[1.7] max-w-[62ch] mb-7 space-y-3"
      >
        {siteConfig.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>

      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex items-center gap-3"
      >
        <Button href="/projects" variant="primary" id="hero-view-projects">
          View Projects
        </Button>
        <GetInTouchButton />
      </motion.div>
    </section>
  );
}
