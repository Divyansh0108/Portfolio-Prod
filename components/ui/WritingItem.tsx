import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/types";

interface WritingItemProps {
  article: Article;
  showDate?: boolean;
}

export function WritingItem({ article, showDate = false }: WritingItemProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      id={`writing-item-${article.id}`}
      className="group flex items-start justify-between gap-4 py-4 border-b border-[var(--border)] last:border-0 hover:opacity-80 transition-opacity duration-150"
    >
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--muted-foreground)] transition-colors duration-150">
          {article.title}
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] leading-snug">
          {article.subtitle}
        </p>
        {showDate && (
          <span className="mt-1 text-xs text-[var(--muted-foreground)] font-medium">
            {formattedDate}
          </span>
        )}
      </div>
      <ArrowUpRight
        size={14}
        className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-150"
      />
    </Link>
  );
}
