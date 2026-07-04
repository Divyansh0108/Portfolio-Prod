"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  id?: string;
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
  id,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-[transform,opacity,background-color,border-color,color] duration-200 ease-[var(--ease-smooth)] cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90",
    ghost:
      "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        id={id}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      className={classes}
    >
      {children}
    </button>
  );
}
