import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Writing", href: "/writing" },
  { label: "Resume", href: siteConfig.resumeUrl, external: true },
];

export function FooterCTA() {
  return (
    <section id="footer-cta" className="py-12 border-t border-[var(--border)]">
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
        Get in touch
      </h2>
      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-[54ch] mb-6">
        Open to research collaborations, ML/AI roles, and ambitious systems work.
        Email is the fastest way to reach me.
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href={`mailto:${siteConfig.email}`}
          id="footer-cta-email"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] decoration-[var(--border-strong)] underline-offset-4 transition-[transform,color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:underline active:translate-y-0 active:scale-95"
        >
          <Mail size={13} />
          {siteConfig.email}
          <ArrowRight size={13} className="transition-transform duration-150 ease-[var(--ease-pop)] group-hover:translate-x-0.5" />
        </Link>

        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] underline-offset-4 transition-[transform,color] duration-200 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:text-[var(--foreground)] hover:underline active:translate-y-0 active:scale-95"
          >
            {l.label}
            <ArrowUpRight size={12} className="transition-transform duration-150 ease-[var(--ease-pop)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
