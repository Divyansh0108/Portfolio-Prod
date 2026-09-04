import type {
  Project,
  ResearchItem,
  ExploreItem,
  Award,
  SocialLink,
} from "./types";

// ─── Site Config ────────────────────────────────────────────────────────────

/**
 * Centralized base URL resolver. Prefers an explicit production override
 * (NEXT_PUBLIC_SITE_URL) so the site works on a custom domain, falls back to
 * Vercel's preview URL, then to localhost for `next dev`.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    return url.startsWith("http") ? url : `https://${url}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Divyansh Pandey",
  role: "AI Researcher · ML Engineer",
  tagline: "Turning research into real systems.",
  bio: [
    "ML engineer and researcher working on Neurosymbolic AI, knowledge graphs, sparse autoencoders & mechanistic interpretability, VLMs & LVLMs, embodied AI, federated learning, and LLM fine-tuning.",
    "Currently at IAIRO, IISER Kolkata, and Pragya Lab (BITS Goa). 3× Springer Nature published author — open to research collaborations and applied-ML roles.",
  ],
  email: "divyanshpandey0108@gmail.com",
  phone: "+91 9305425557",
  location: "Lucknow, Uttar Pradesh, India",
  resumeUrl: "/Divyansh_Resume.pdf",
};


// ─── Currently Exploring ───────────────────────────────────────────────────

export const exploring: ExploreItem[] = [
  {
    topic: "Neurosymbolic AI & Knowledge Graphs",
    description:
      "Fusing neural networks with symbolic reasoning and structured knowledge for systems that generalize and stay interpretable.",
  },
  {
    topic: "Sparse Autoencoders & Mechanistic Interpretability",
    description:
      "Decomposing LLM internals to understand how models represent features and make decisions.",
  },
  {
    topic: "VLMs, LVLMs & Embodied AI",
    description:
      "Vision-language models and grounded agents for real-world perception and action.",
  },
  {
    topic: "Efficient Inference & LLM Deployment",
    description:
      "Model optimization and serving language models at scale.",
  },
];

// ─── Hobbies ────────────────────────────────────────────────────────────────

export interface HobbyGroup {
  label: string;
  icon: string;
  items: string[];
  note?: string;
}

export const hobbyGroups: HobbyGroup[] = [
  {
    label: "Music",
    icon: "♩",
    items: ["Flute", "Guitar", "Cajón", "Piano", "Vocals"],
    note: "Five instruments, one common thread — obsessive about texture and space.",
  },
  {
    label: "Making things",
    icon: "✦",
    items: ["Painting", "Writing", "Poetry"],
    note: "Different mediums, same compulsion — turning noise into signal.",
  },
  {
    label: "Machines",
    icon: "⌗",
    items: ["PS5", "PC"],
    note: "Equal parts gamer and spec-nerd. The build matters as much as the game.",
  },
  {
    label: "Motion",
    icon: "→",
    items: ["Mountain biking", "Cyclist"],
    note: "MTB trails, long rides, and the particular silence of a good descent.",
  },
  {
    label: "Books",
    icon: "◈",
    items: ["Philosophy"],
    note: "Mostly philosophy. The kind that raises more questions than it settles.",
  },
  {
    label: "Martial arts",
    icon: "⊕",
    items: ["Katana", "Nunchaku", "Boxing", "Bō staff"],
    note: "Each weapon teaches a different relationship with distance and timing.",
  },
];

// ─── Honors & Awards ────────────────────────────────────────────────────────

export const awards: Award[] = [
  {
    title: "3× Springer Nature Published Author",
    issuer: "SN Computer Science (Q1) · Discover Computing (Q2) · ICDEC 2024",
    date: "2024 – 2026",
    description:
      "Peer-reviewed research in ensemble deep learning, federated medical image segmentation, and sensor-based human activity recognition.",
  },
  {
    title: "Dean's List — Excellence in Academics (Highest GPA)",
    issuer: "Manipal University Jaipur",
    date: "2024",
    description:
      "Awarded for the highest Grade Point Average in Computer Science and Engineering (AI & ML).",
  },
  {
    title: "2× Dean's List — Excellence in Off-campus Achievements",
    issuer: "Manipal University Jaipur",
    date: "2025",
    description:
      "Recognition for research publications and competition results beyond the classroom.",
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
    id: "dexnet-sncs",
    title: "DEXNet: An Ensemble Model Integrating DenseNet, EfficientNetB3, and XGBoost for Histopathological Lung and Colon Cancer Classification",
    subtitle:
      "Ensemble architecture combining DenseNet and EfficientNetB3 for hierarchical feature extraction with XGBoost classification, augmented by Class-Selective Image Preprocessing (CSIP), Grad-CAM interpretability, and a HIPAA/GDPR-compliant AWS deployment pipeline with federated learning provisions for multi-institutional privacy-preserving inference.",
    date: "2026",
    venue: "SN Computer Science (Springer Nature) · Vol. 7, Art. 360 · Q1",
    href: "https://link.springer.com/article/10.1007/s42979-026-04953-2",
    tags: ["lung cancer detection", "histopathology", "deep learning", "ensemble learning", "CNN", "EfficientNetB3", "XGBoost"],
  },
  {
    id: "fedbound-discover",
    title: "FedBound: A Boundary-Aware Optimization Strategy for Federated Medical Image Segmentation Under Non-IID Data",
    subtitle:
      "A lightweight boundary-aware optimization strategy for federated medical image segmentation that emphasizes contour pixels during local training without adding communication overhead. Evaluated across six segmentation architectures on the ISIC 2018 skin-lesion dataset under a Dirichlet non-IID partition of 100 federated clients — improving boundary precision (HD95) and reducing cross-client variance while preserving Dice/IoU performance.",
    date: "2026",
    venue: "Discover Computing (Springer Nature) · Vol. 29, Art. 585 · Q2",
    href: "https://scholar.google.com/citations?user=tlQfoXYAAAAJ",
    tags: ["federated learning", "medical image segmentation", "boundary-aware loss", "HD95", "non-IID data", "deep learning"],
  },
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
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=tlQfoXYAAAAJ", icon: "google-scholar" },
  { label: "Medium", href: "https://medium.com/@divyanshpandey0108", icon: "medium" },
  { label: "Kaggle", href: "https://www.kaggle.com/div0108", icon: "kaggle" },
  { label: "Instagram", href: "https://www.instagram.com/metadatahere", icon: "instagram" },
  { label: "Peerlist", href: "https://peerlist.io/divyanshpandey", icon: "peerlist" },
];
