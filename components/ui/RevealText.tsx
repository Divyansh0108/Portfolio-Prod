"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  el?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerDelay?: number;
}

const wordVariant = {
  hidden: { y: "105%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: i * 0.055,
    },
  }),
};

export function RevealText({ text, className, el: El = "span", staggerDelay = 0 }: RevealTextProps) {
  const words = text.split(" ");

  return (
    <El className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="inline-flex flex-wrap gap-x-[0.3em]"
        aria-hidden="true"
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block leading-[1.15]">
            <motion.span
              custom={i + staggerDelay / 55}
              variants={wordVariant}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </El>
  );
}
