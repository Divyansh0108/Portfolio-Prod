"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";

const experiences = [
  {
    role: "AI Research Intern",
    org: "Indian AI Research Organization (IAIRO)",
    type: "Internship",
    period: "Mar 2026 – Present",
    location: "Hybrid",
    bullets: [],
  },
  {
    role: "Machine Learning Researcher",
    org: "Manipal University Jaipur",
    type: "Full-time",
    period: "Jan 2026 – Present",
    location: "Jaipur, Rajasthan · On-site",
    bullets: [
      "Conducting applied ML research in computer vision and deep learning using PyTorch, NumPy, and medical imaging datasets.",
      "Developing and evaluating model architectures for classification and segmentation tasks on real-world data.",
    ],
  },
  {
    role: "AI/ML Engineer Intern",
    org: "VIGIL Labs, IIT Hyderabad",
    type: "Internship",
    period: "Apr 2025 – Jul 2025",
    location: "Hyderabad, Telangana · Remote",
    bullets: [
      "Engineered a decentralized Federated Learning model for medical image classification & segmentation, surpassing baseline test accuracy by 20% on complex non-IID real-world data.",
      "Accelerated training convergence by optimizing communication protocols, reducing global round time by 45% and utilizing 55% fewer resources than baselines.",
      "Orchestrated secure ML workflows to address data heterogeneity and strict distributed data privacy requirements, translating project goals into a scalable, production-aligned AI solution.",
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

export function Experience() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratios = new Array(experiences.length).fill(0);

    experiences.forEach((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[i] = entry.intersectionRatio;
          const best = ratios.indexOf(Math.max(...ratios));
          setActiveIndex(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="py-16 border-t border-[var(--border)]"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <RevealText
          text="Experience"
          el="h2"
          className="text-base font-semibold text-[var(--foreground)]"
        />
      </motion.div>

      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            variants={fadeUp}
            className="relative flex gap-4"
          >
            {/* Timeline line */}
            {i < experiences.length - 1 && (
              <div className="absolute left-[15px] top-[36px] bottom-[-24px] w-px bg-[var(--border)]" />
            )}

            {/* Icon — glows when active */}
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border bg-[var(--background)] transition-all duration-300"
              style={{
                borderColor: activeIndex === i ? "var(--foreground)" : "var(--border)",
                boxShadow: activeIndex === i ? "0 0 0 3px rgba(var(--foreground-rgb, 0,0,0), 0.06)" : "none",
              }}
            >
              <Briefcase
                size={13}
                className="transition-colors duration-300"
                style={{ color: activeIndex === i ? "var(--foreground)" : "var(--muted-foreground)" }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 pb-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3
                  className="text-sm font-semibold transition-colors duration-300"
                  style={{ color: activeIndex === i ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {exp.role}
                </h3>
                <span className="text-xs text-[var(--muted-foreground)]">
                  · {exp.type}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">{exp.org}</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {exp.period} · {exp.location}
              </p>
              {exp.bullets.length > 0 && (
                <ul className="mt-1.5 space-y-1.5">
                  {exp.bullets.map((b, j) => (
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
