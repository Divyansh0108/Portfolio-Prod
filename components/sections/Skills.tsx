const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "SQL", "Java", "C", "JavaScript", "MATLAB"],
  },
  {
    label: "ML / DL",
    skills: [
      "PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost",
      "Computer Vision", "NLP", "Generative AI", "Federated Learning",
      "CNN", "GAN", "Reinforcement Learning", "Time Series",
      "Neurosymbolic AI", "Knowledge Graphs", "Mechanistic Interpretability",
      "VLMs / LVLMs",
    ],
  },
  {
    label: "LLMs & Agents",
    skills: [
      "LangChain", "LangGraph", "LangServe", "LangSmith",
      "RAG Pipelines", "LLM Fine-tuning", "LLM Evaluation",
      "Sparse Autoencoders", "Ollama", "Groq",
      "HuggingFace Transformers", "GPT", "BERT", "Chainlit",
    ],
  },
  {
    label: "MLOps & Cloud",
    skills: [
      "MLflow", "DVC", "DAGsHub", "BentoML", "Airflow", "Docker",
      "Kubernetes", "AWS (S3, EC2, IAM, RDS)", "GCP", "Azure",
      "CI/CD", "GitHub Actions", "Prometheus", "Grafana",
    ],
  },
  {
    label: "Databases",
    skills: [
      "PostgreSQL", "MySQL", "MongoDB", "SQLite",
      "ChromaDB", "FAISS", "AstraDB",
    ],
  },
  {
    label: "Frameworks & Tools",
    skills: [
      "FastAPI", "Flask", "Django", "Streamlit",
      "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly",
      "Tableau", "Power BI", "Selenium", "Postman", "Git", "Jira",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-12 border-t border-[var(--border)]">
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-6">
        Skills &amp; Stack
      </h2>

      <div className="space-y-5">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
