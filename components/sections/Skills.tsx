"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Languages",
    // blue
    pillBg: "rgba(59,130,246,0.07)",
    pillBorder: "rgba(59,130,246,0.2)",
    skills: ["Python", "SQL", "Java", "C", "JavaScript", "MATLAB"],
  },
  {
    label: "ML / DL",
    // purple
    pillBg: "rgba(168,85,247,0.07)",
    pillBorder: "rgba(168,85,247,0.2)",
    skills: [
      "PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost",
      "Computer Vision", "NLP", "Federated Learning", "Generative AI",
      "CNN", "GAN", "Reinforcement Learning", "Time Series",
    ],
  },
  {
    label: "LLMs & Agents",
    // violet
    pillBg: "rgba(139,92,246,0.07)",
    pillBorder: "rgba(139,92,246,0.2)",
    skills: [
      "LangChain", "LangGraph", "LangServe", "LangSmith",
      "RAG Pipelines", "LLM Fine-tuning", "Ollama", "Groq",
      "HuggingFace Transformers", "GPT", "BERT", "Chainlit",
    ],
  },
  {
    label: "MLOps & Cloud",
    // emerald
    pillBg: "rgba(16,185,129,0.07)",
    pillBorder: "rgba(16,185,129,0.2)",
    skills: [
      "MLflow", "DVC", "DAGsHub", "BentoML", "Airflow", "Docker",
      "Kubernetes", "AWS (S3, EC2, IAM, RDS)", "GCP", "Azure",
      "CI/CD", "GitHub Actions", "Prometheus", "Grafana",
    ],
  },
  {
    label: "Databases",
    // amber
    pillBg: "rgba(245,158,11,0.07)",
    pillBorder: "rgba(245,158,11,0.2)",
    skills: [
      "PostgreSQL", "MySQL", "MongoDB", "SQLite",
      "ChromaDB", "FAISS", "AstraDB",
    ],
  },
  {
    label: "Frameworks & Tools",
    // rose
    pillBg: "rgba(244,63,94,0.07)",
    pillBorder: "rgba(244,63,94,0.2)",
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
      <motion.h2
        variants={fadeUp}
        className="text-base font-semibold text-[var(--foreground)] mb-6"
      >
        Skills &amp; Stack
      </motion.h2>

      <div className="space-y-5">
        {skillGroups.map((group) => (
          <motion.div key={group.label} variants={fadeUp}>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
              {group.label}
            </p>
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
