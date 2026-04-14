import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Instagram, BookOpen } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={14} />,
  linkedin: <Linkedin size={14} />,
  medium: <BookOpen size={14} />,
  instagram: <Instagram size={14} />,
  kaggle: <span className="text-[10px] font-bold leading-none">K</span>,
  "google-scholar": <span className="text-[10px] font-bold leading-none">GS</span>,
  peerlist: <span className="text-[10px] font-bold leading-none">P</span>,
};

export function Footer() {
  return (
    <footer id="footer" className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            {siteConfig.name}
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button href={siteConfig.resumeUrl} external variant="ghost">
              Resume
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)] mb-6" />

        {/* Bottom grid */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 text-sm text-[var(--muted-foreground)]">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-widest mb-2 text-[var(--muted-foreground)]">
              Explore
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--foreground)] transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-widest mb-2 text-[var(--muted-foreground)]">
              Resources
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link
                href={siteConfig.resumeUrl}
                target="_blank"
                className="hover:text-[var(--foreground)] transition-colors duration-150"
              >
                Resume
              </Link>
              <Link
                href="/contact"
                className="hover:text-[var(--foreground)] transition-colors duration-150"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social + email */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex items-center justify-center h-10 w-10 rounded border border-[var(--border)] hover:border-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all duration-150"
                >
                  {iconMap[s.icon]}
                </Link>
              ))}
            </div>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 text-xs hover:text-[var(--foreground)] transition-colors duration-150"
            >
              <Mail size={12} />
              {siteConfig.email}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-xs text-[var(--muted-foreground)] flex flex-col sm:flex-row sm:justify-between gap-1">
          <span>© 2026 {siteConfig.name}</span>
          <span>Views and opinions are my own.</span>
        </div>
      </div>
    </footer>
  );
}
