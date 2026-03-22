export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  bullets: string[];
  href: string;
  featured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  href: string;
  tags?: string[];
  featured?: boolean;
}

export interface ResearchItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  href: string;
  venue?: string;
  tags?: string[];
}

export interface ExploreItem {
  topic: string;
  description: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
