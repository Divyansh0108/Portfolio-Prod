import type {
  Project,
  ResearchItem,
  ExploreItem,
  Award,
  SocialLink,
} from "./types";

// ─── Site Config ────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Divyansh Pandey",
  role: "ML Engineer · Researcher · Builder",
  tagline: "Turning research into real systems — across ML, NLP, CV, and Agents.",
  bio: "I'm a polymath at heart — I carry my ability to recognize patterns from 3D puzzles and investigative thinking into ML systems that actually work in production. From Federated Learning at IIT Hyderabad to RAG pipelines and real-time inference engines, I build at the intersection of research and engineering, with 2 years of experience shipping E2E production-grade AI systems.",
  email: "divyanshpandey0108@gmail.com",
  phone: "+91 9305425557",
  location: "Lucknow, Uttar Pradesh, India",
  resumeUrl: "/Resume.pdf",
};

// ─── Hero credentials ───────────────────────────────────────────────────────

export const credentials = [
  {
    label: "Ex-ML Research & Development @ IIT Hyderabad (Vigil Labs)",
    href: "https://tinyurl.com/3r49e4h5",
  },
  {
    label: "First Author — Springer Nature (ICDEC 2024)",
    href: "https://link.springer.com/chapter/10.1007/978-981-96-7742-9_17",
  },
  {
    label: "3× Dean's List — Manipal University Jaipur",
    href: "https://tinyurl.com/2trdx8yu",
  },
  {
    label: "ML Researcher @ Manipal University Jaipur (current)",
    href: "https://www.manipal.edu/mu/campuses/manipal-university-jaipur.html",
  },
  {
    label: "@The-Red-Wood-Lab — Open Source Org",
    href: "https://github.com/The-Red-Wood-Lab",
  },
];

// ─── Currently Exploring ───────────────────────────────────────────────────

export const exploring: ExploreItem[] = [
  {
    topic: "Generative AI & LLMs",
    description:
      "Advanced deployment strategies, LLMOps pipelines, and fine-tuning workflows for production-grade language model applications.",
  },
  {
    topic: "AI Agents",
    description:
      "Building autonomous agent architectures with LangGraph and tool-use patterns for complex multi-step reasoning tasks.",
  },
  {
    topic: "Federated Learning",
    description:
      "Privacy-preserving ML for healthcare — decentralized training on non-IID medical imaging data without sharing raw patient records.",
  },
  {
    topic: "Small Language Models & VLMs",
    description:
      "Exploring efficient SLMs and Vision-Language Models for edge deployment and resource-constrained real-world applications.",
  },
  {
    topic: "MLOps Pipelines",
    description:
      "End-to-end production deployment with DVC, MLflow, Airflow, Docker, and Kubernetes — from experiment tracking to monitoring.",
  },
];

// ─── Honors & Awards ────────────────────────────────────────────────────────

export const awards: Award[] = [
  {
    title: "Dean's List of All Round Excellence",
    issuer: "Manipal University Jaipur",
    date: "April 2025",
    description:
      "In recognition of off-campus achievements and overall excellence.",
  },
  {
    title: "Dean's List Excellence in Academics (Highest GPA)",
    issuer: "Manipal University Jaipur",
    date: "April 2024",
    description:
      "Awarded for securing the highest Grade Point Average in Computer Science and Engineering (AIML).",
  },
  {
    title: "Runner Up — Xiaomi Ode2Code 3.0",
    issuer: "Xiaomi India",
    date: "2023",
    description:
      "National-level coding competition organized by Xiaomi India.",
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "ragineer",
    category: "RAG · NLP",
    title: "RAGineer",
    description:
      "Production-ready local RAG Text-to-SQL chatbot that converts natural language into safe PostgreSQL queries with 84% SQL accuracy.",
    tags: ["python", "postgresql", "ollama", "chromadb", "ragas"],
    bullets: [
      "84% SQL accuracy, 80% end-to-end, ~2.5s latency",
      "SQL injection prevention, rate limiting, 64 tests at 97% coverage",
      "Multi-model: Qwen2.5-Coder (84%) vs CodeLlama (78%)",
    ],
    href: "https://github.com/Divyansh0108/RAGAS-NLP-SQLqueries-postgres",
    featured: true,
  },
  {
    id: "fraud-detection",
    category: "MLOps · Production",
    title: "Real-Time Fraud Detection",
    description:
      "High-performance FastAPI microservice achieving 90% latency reduction (50ms → 5.4ms) with full production observability.",
    tags: ["python", "fastapi", "xgboost", "docker", "prometheus"],
    bullets: [
      "False Positive precision from 6% → 78%, 83% Recall maintained",
      "MLflow experiment tracking, class-weighted XGBoost",
      "100% observability: Prometheus + Grafana dashboards",
    ],
    href: "https://github.com/Divyansh0108/fraud-detection-system",
    featured: true,
  },
  {
    id: "getanime",
    category: "RAG · GenAI",
    title: "GetAnime",
    description:
      "RAG-powered semantic anime recommendation engine with sub-second latency and 95% relevance accuracy across 12,000+ entries.",
    tags: ["langchain", "groq", "chromadb", "docker", "gcp"],
    bullets: [
      "Sub-second query latency with Groq LLM + ChromaDB",
      "99.5% uptime on GCP with Kubernetes + Grafana monitoring",
      "Automated ETL with HuggingFace Sentence Transformers",
    ],
    href: "https://github.com/Divyansh0108/AnimAI-Navigator",
    featured: true,
  },
  {
    id: "mental-health",
    category: "Healthcare · DL",
    title: "Mental Health Predictor",
    description:
      "AI-driven tool predicting depression among students using TensorFlow, trained on 27,000 records with LIME interpretability.",
    tags: ["tensorflow", "streamlit", "lime", "gemini-ai"],
    bullets: [
      "Neural network on 27,000 student records",
      "LIME interpretability for transparent predictions",
      "Personalized insights and self-care recommendations",
    ],
    href: "https://github.com/Divyansh0108/MentalHealth",
    featured: false,
  },
  {
    id: "data-toolkit",
    category: "Data Science",
    title: "Data Analysis Toolkit",
    description:
      "Interactive toolkit for EDA, feature engineering, model building, and visualization with Plotly and scikit-learn.",
    tags: ["python", "streamlit", "plotly", "scikit-learn"],
    bullets: [
      "End-to-end: cleaning → feature engineering → model training",
      "Interactive Plotly visualizations",
      "Download modified datasets",
    ],
    href: "https://github.com/Divyansh0108/DataAnalysisToolkit",
    featured: false,
  },
  {
    id: "text-summarization",
    category: "NLP · MLOps",
    title: "E2E Text Summarization",
    description:
      "Production-ready NLP summarization pipeline with CI/CD, Docker, and AWS EC2/ECR deployment.",
    tags: ["transformers", "fastapi", "docker", "aws", "github-actions"],
    bullets: [
      "CI/CD with GitHub Actions, Dockerized deployment",
      "AWS EC2 hosting + ECR image registry",
      "ROUGE and SacreBLEU evaluation metrics",
    ],
    href: "https://github.com/Divyansh0108/E2E-text-summarization",
    featured: false,
  },
  {
    id: "heart-disease",
    category: "Healthcare · ML",
    title: "Heart Disease Prediction",
    description:
      "ML-based heart disease risk assessment comparing Logistic Regression, Random Forest, Gradient Boosting, and SVM.",
    tags: ["python", "scikit-learn", "streamlit", "matplotlib"],
    bullets: [
      "85.2% test accuracy with Logistic Regression",
      "Interactive Streamlit web application",
      "Comprehensive model performance visualization",
    ],
    href: "https://github.com/Divyansh0108/heart-disease-pred",
    featured: false,
  },
  {
    id: "note-app",
    category: "Web Dev",
    title: "Note Taking App",
    description:
      "Full-stack Django note management app with authentication, rich text editing, search, and collaboration tools.",
    tags: ["django", "sql", "bootstrap", "javascript"],
    bullets: [
      "User authentication and note CRUD",
      "Search, filtering, and file uploads",
      "Rich text editor with collaboration features",
    ],
    href: "https://github.com/Divyansh0108/Note-Taking-Python-Web-Tech",
    featured: false,
  },
];

// ─── Research / Publications ────────────────────────────────────────────────

export const researchItems: ResearchItem[] = [
  {
    id: "barbell-icdec",
    title: "Barbell Exercise Classification and Repetition Counting",
    subtitle:
      "Engineered a robust ML system for barbell exercise classification and repetition counting using MetaMotion sensor data, achieving over 90% accuracy through comprehensive feature engineering and outlier detection pipelines for precise human activity recognition.",
    date: "2024",
    venue: "ICDEC 2024 · Springer Nature",
    href: "https://link.springer.com/chapter/10.1007/978-981-96-7742-9_17",
    tags: ["computer vision", "human activity recognition", "sensor data", "classification"],
  },
];

// ─── Social Links ───────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Divyansh0108", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divyansh-pandey-ds/", icon: "linkedin" },
  { label: "Medium", href: "https://medium.com/@divyanshpandey0108", icon: "medium" },
  { label: "Kaggle", href: "https://www.kaggle.com/div0108", icon: "kaggle" },
  { label: "Instagram", href: "https://www.instagram.com/metadatahere", icon: "instagram" },
  { label: "Peerlist", href: "https://peerlist.io/divyanshpandey", icon: "peerlist" },
];
