const experiences = [
  {
    role: "AI Research Intern",
    org: "Indian AI Research Organization (IAIRO)",
    logo: "/logos/iairo.png",
    type: "Internship",
    period: "Mar 2026 – Present",
    location: "Remote",
    bullets: [
      "Researching Neurosymbolic AI and knowledge integration — frameworks that fuse neural networks with symbolic reasoning for interpretable, generalizable systems.",
      "Supervisors: Dr. Amit Sheth, Dr. Vedant Khandelwal",
    ],
  },
  {
    role: "AI Research Associate",
    org: "IISER Kolkata",
    logo: "/logos/iiser-kolkata.svg",
    type: "Apprenticeship",
    period: "Mar 2026 – Present",
    location: "Remote",
    bullets: [
      "Researching Sparse Autoencoders (SAEs) and mechanistic interpretability — decomposing LLM internals to understand feature representations and decision-making.",
    ],
  },
  {
    role: "NLP Research Intern",
    org: "Pragya Lab, BITS Goa",
    logo: "/logos/pragya.webp",
    type: "Internship",
    period: "Jun 2026 – Present",
    bullets: [
      "Research in NLP and LLM evaluation — building systematic methodologies to assess large language model behavior and outputs.",
      "Supervisor: Dr. Amitava Das",
    ],
  },
  {
    role: "Machine Learning Researcher",
    org: "Manipal University Jaipur",
    logo: "/logos/manipal.png",
    type: "Full-time",
    period: "Jan 2026 – Present",
    location: "Jaipur, Rajasthan · On-site",
    bullets: [
      "Applied ML research in computer vision and deep learning with PyTorch and medical imaging datasets.",
      "Developing and evaluating model architectures for classification and segmentation on real-world data.",
    ],
  },
  {
    role: "ML Research & Development Intern",
    org: "VIGIL Labs, IIT Hyderabad",
    logo: "/logos/iit-hyderabad.png",
    type: "Internship",
    period: "Apr 2025 – Jul 2025",
    location: "Hyderabad, Telangana · Remote",
    bullets: [
      "Engineered a decentralized Federated Learning model for medical image classification & segmentation, surpassing baseline test accuracy by 20% on complex non-IID real-world data.",
      "Reduced global communication round time by 45% and used 55% fewer resources than baselines by optimizing communication protocols.",
      "Orchestrated secure ML workflows addressing data heterogeneity and strict distributed-data-privacy requirements.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-12 border-t border-[var(--border)]">
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-6">
        Experience
      </h2>

      <div className="space-y-6">
        {experiences.map((exp, i) => {
          const isCurrent = exp.period.includes("Present");

          return (
            <div key={i} className="relative flex gap-4">
              {i < experiences.length - 1 && (
                <div className="absolute left-[18px] top-[42px] bottom-[-24px] w-px bg-[var(--border)]" />
              )}

              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={exp.logo}
                  alt={`${exp.org} logo`}
                  className="h-full w-full object-contain p-1"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-1 pb-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: isCurrent ? "var(--foreground)" : "var(--muted-foreground)" }}
                  >
                    {exp.role}
                  </h3>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    · {exp.type}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">{exp.org}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {exp.period}
                  {"location" in exp && exp.location ? ` · ${exp.location}` : ""}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
