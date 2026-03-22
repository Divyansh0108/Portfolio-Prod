import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, BookOpen, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig, socialLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Divyansh Pandey.",
};

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={16} />,
  linkedin: <Linkedin size={16} />,
  medium: <BookOpen size={16} />,
  instagram: <Instagram size={16} />,
  kaggle: <span className="text-xs font-bold">K</span>,
  peerlist: <span className="text-xs font-bold">P</span>,
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-lg">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          Get in touch
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] mb-5">
          Contact
        </h1>
        <p className="text-[0.925rem] text-[var(--muted-foreground)] leading-relaxed mb-10">
          I&apos;m always open to discussing new projects, research collaborations,
          or opportunities in ML/AI. The best way to reach me is by email.
        </p>

        {/* Contact details */}
        <div className="flex flex-col gap-4 mb-12">
          <Link
            href={`mailto:${siteConfig.email}`}
            id="contact-email-link"
            className="colored-link inline-flex items-center gap-2.5 text-lg font-semibold underline underline-offset-2 transition-opacity duration-150 hover:opacity-75"
          >
            <Mail size={18} />
            {siteConfig.email}
          </Link>

          <Link
            href={`tel:${siteConfig.phone}`}
            id="contact-phone-link"
            className="inline-flex items-center gap-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
          >
            <Phone size={16} />
            {siteConfig.phone}
          </Link>

          <div className="inline-flex items-center gap-2.5 text-sm text-[var(--muted-foreground)]">
            <MapPin size={16} />
            {siteConfig.location}
          </div>
        </div>

        {/* Resume button */}
        <div className="flex items-center gap-3 mb-12">
          <Button
            href={siteConfig.resumeUrl}
            external
            variant="primary"
            id="contact-resume"
          >
            Download resume
          </Button>
        </div>

        {/* Social links */}
        <div className="border-t border-[var(--border)] pt-8">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
            Find me online
          </p>
          <div className="flex flex-col gap-3">
            {socialLinks.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                id={`contact-social-${s.icon}`}
                className="inline-flex items-center gap-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
              >
                {iconMap[s.icon]}
                {s.label}
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
