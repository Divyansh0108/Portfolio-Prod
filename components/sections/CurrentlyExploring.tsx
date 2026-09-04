import { exploring } from "@/lib/data";

export function CurrentlyExploring() {
  return (
    <section id="currently-exploring" className="py-12 border-t border-[var(--border)]">
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-6">
        Currently exploring
      </h2>

      <ul className="space-y-4">
        {exploring.map((item, i) => (
          <li key={i} className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {item.topic}
            </span>
            <span className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
