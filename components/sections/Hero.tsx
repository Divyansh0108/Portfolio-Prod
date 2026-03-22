"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig, credentials } from "@/lib/data";

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
            alt={siteConfig.name}
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
      <motion.p
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-[0.925rem] text-[var(--muted-foreground)] leading-relaxed max-w-xl mb-6"
      >
        {siteConfig.bio}
      </motion.p>

      {/* Credentials */}
      <motion.ul
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-8 space-y-2"
      >
        {credentials.map((cred, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
            <Link
              href={cred.href}
              target="_blank"
              rel="noopener noreferrer"
              className="colored-link underline underline-offset-2 transition-opacity duration-150 hover:opacity-75 flex items-center gap-1"
            >
              {cred.label}
              <ArrowUpRight size={12} className="flex-shrink-0" />
            </Link>
          </li>
        ))}
      </motion.ul>

      {/* CTA Buttons */}
      <motion.div
        custom={6}
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
