import { Trophy } from "lucide-react";
import { awards } from "@/lib/data";

export function HonorsAwards() {
  return (
    <section id="honors-awards" className="py-12 border-t border-[var(--border)]">
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-6">
        Honors &amp; Awards
      </h2>

      <div className="space-y-4">
        {awards.map((award, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-4"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[var(--muted)]">
              <Trophy size={14} className="text-[var(--muted-foreground)]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-x-2">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {award.title}
                </h3>
                <span className="text-xs text-[var(--muted-foreground)]">
                  · {award.date}
                </span>
              </div>
              <p className="text-xs font-medium text-[var(--muted-foreground)]">
                {award.issuer}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] leading-snug mt-0.5">
                {award.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
