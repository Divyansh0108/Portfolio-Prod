import React from "react";

interface TagPillProps {
  label: string;
  className?: string;
}

export function TagPill({ label, className = "" }: TagPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium lowercase tracking-wide bg-[var(--tag-bg)] text-[var(--tag-text)] ${className}`}
    >
      {label}
    </span>
  );
}
