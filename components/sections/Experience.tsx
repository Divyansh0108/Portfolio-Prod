"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
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
  return (
    <motion.section
      id="experience"
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
        Experience
      </motion.h2>

      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="relative flex gap-4"
          >
            {/* Timeline line */}
            {i < experiences.length - 1 && (
              <div className="absolute left-[15px] top-[36px] bottom-[-24px] w-px bg-[var(--border)]" />
            )}

            {/* Icon */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)]">
              <Briefcase size={13} className="text-[var(--muted-foreground)]" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 pb-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
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
