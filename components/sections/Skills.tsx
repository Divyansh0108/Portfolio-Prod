"use client";

import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";

const skillGroups = [
  {
    label: "Languages",
    dotColor: "rgb(59,130,246)",
    pillBg: "rgba(59,130,246,0.07)",
    pillBorder: "rgba(59,130,246,0.2)",
    span: 1,
    skills: ["Python", "SQL", "Java", "C", "JavaScript", "MATLAB"],
  },
  {
    label: "ML / DL",
    dotColor: "rgb(168,85,247)",
    pillBg: "rgba(168,85,247,0.07)",
    pillBorder: "rgba(168,85,247,0.2)",
    span: 2,
    skills: [
      "PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost",
      "Computer Vision", "NLP", "Federated Learning", "Generative AI",
      "CNN", "GAN", "Reinforcement Learning", "Time Series",
    ],
  },
  {
    label: "LLMs & Agents",
    dotColor: "rgb(139,92,246)",
    pillBg: "rgba(139,92,246,0.07)",
    pillBorder: "rgba(139,92,246,0.2)",
    span: 2,
    skills: [
      "LangChain", "LangGraph", "LangServe", "LangSmith",
      "RAG Pipelines", "LLM Fine-tuning", "Ollama", "Groq",
      "HuggingFace Transformers", "GPT", "BERT", "Chainlit",
    ],
  },
  {
    label: "MLOps & Cloud",
    dotColor: "rgb(16,185,129)",
    pillBg: "rgba(16,185,129,0.07)",
    pillBorder: "rgba(16,185,129,0.2)",
    span: 1,
    skills: [
      "MLflow", "DVC", "DAGsHub", "BentoML", "Airflow", "Docker",
      "Kubernetes", "AWS (S3, EC2, IAM, RDS)", "GCP", "Azure",
      "CI/CD", "GitHub Actions", "Prometheus", "Grafana",
    ],
  },
  {
    label: "Databases",
    dotColor: "rgb(245,158,11)",
    pillBg: "rgba(245,158,11,0.07)",
    pillBorder: "rgba(245,158,11,0.2)",
    span: 1,
    skills: [
      "PostgreSQL", "MySQL", "MongoDB", "SQLite",
      "ChromaDB", "FAISS", "AstraDB",
    ],
  },
  {
    label: "Frameworks & Tools",
    dotColor: "rgb(244,63,94)",
    pillBg: "rgba(244,63,94,0.07)",
    pillBorder: "rgba(244,63,94,0.2)",
    span: 2,
    skills: [
      "FastAPI", "Flask", "Django", "Streamlit",
      "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly",
      "Tableau", "Power BI", "Selenium", "Git", "Jira",
    ],
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export function Skills() {
  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="py-16 gradient-divider"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <RevealText
          text="Skills & Stack"
          el="h2"
          className="text-base font-semibold text-[var(--foreground)]"
        />
      </motion.div>

      {/* Bento grid — 3 cols on md+, 1 col on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
            variants={fadeUp}
            className="rounded-xl border border-[var(--border)] p-4 bg-[var(--background-subtle)] hover:border-[var(--border-strong)] transition-colors duration-200"
            style={{
              gridColumn: `span ${group.span}`,
            }}
          >
            {/* Label row */}
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: group.dotColor }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
              />
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
                {group.label}
              </p>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded px-2.5 py-0.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
                  style={{
                    backgroundColor: group.pillBg,
                    border: `1px solid ${group.pillBorder}`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
