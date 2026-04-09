import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TagPill } from "@/components/ui/TagPill";
import { researchItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description: "Publications and research by Divyansh Pandey in machine learning, computer vision, and federated learning.",
};

export default function ResearchPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          Academic
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Research
        </h1>
        <p className="mt-2 text-[0.925rem] text-[var(--muted-foreground)] max-w-lg">
          My research interests lie in practical applications of ML, DL, NLP, & CV in domains like Finance, Healthcare, and Cybersecurity — with a current focus on Neurosymbolic AI and LLM steering.
        </p>
      </div>

      {/* Publications */}
      <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">Publications</h2>
      <div className="space-y-0">
        {researchItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            id={`research-${item.id}`}
            className="group flex items-start justify-between gap-4 py-5 border-b border-[var(--border)] last:border-0 hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2">
                <p className="text-xs text-[var(--muted-foreground)] font-medium">{item.date}</p>
                {item.venue && (
                  <>
                    <span className="text-xs text-[var(--muted-foreground)]">·</span>
                    <p className="text-xs font-medium text-[var(--foreground)]">{item.venue}</p>
                  </>
                )}
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--muted-foreground)] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-snug">
                {item.subtitle}
              </p>
              {item.tags && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {item.tags.map((tag) => (
                    <TagPill key={tag} label={tag} />
                  ))}
                </div>
              )}
            </div>
            <ArrowUpRight
              size={14}
              className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
