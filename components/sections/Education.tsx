import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-12 border-t border-[var(--border)]">
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-6">
        Education
      </h2>

      <div className="flex gap-4 rounded-lg border border-[var(--border)] p-5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[var(--muted)]">
          <GraduationCap size={18} className="text-[var(--muted-foreground)]" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            Manipal University Jaipur
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            B.Tech (Hons.) Computer Science Engineering — Major in AI &amp; ML
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Graduated · Sept 2022 – Jun 2026 · CGPA: <strong className="font-semibold text-[var(--foreground)]">8.53</strong>
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            AI, Machine Learning, Deep Learning, Computer Vision, NLP
          </p>
          <ul className="mt-2 space-y-1">
            <li className="flex items-start gap-1.5 text-sm text-[var(--muted-foreground)]">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
              3× Dean&apos;s List — Excellence in Academics (Highest GPA) &amp; Off-campus Achievements
            </li>
            <li className="flex items-start gap-1.5 text-sm text-[var(--muted-foreground)]">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
              3× Springer Nature Published Author — SN Computer Science (Q1), Discover Computing (Q2), ICDEC 2024
            </li>
            <li className="flex items-start gap-1.5 text-sm text-[var(--muted-foreground)]">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" />
              Runner-Up — Xiaomi Ode2Code 3.0 national coding competition
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
