"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.07 },
  }),
};

export function Hero() {
  return (
    <section id="hero" className="pt-32 pb-16">
      {/* Headshot */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-5"
      >
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
      </motion.div>

      {/* Role label */}
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
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Open to opportunities
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] mb-3"
      >
        {siteConfig.name}
      </motion.h1>

      {/* Tagline */}
      <motion.h2
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-xl sm:text-2xl font-semibold text-[var(--muted-foreground)] mb-5"
      >
        {siteConfig.tagline}
      </motion.h2>

      {/* Bio */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-[0.925rem] text-[var(--muted-foreground)] leading-relaxed max-w-xl mb-8 space-y-3"
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
