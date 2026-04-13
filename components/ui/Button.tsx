"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  id?: string;
}

const MAGNET_RADIUS = 60; // px — how close the cursor needs to be to activate
const MAGNET_STRENGTH = 0.35; // 0–1, fraction of distance to pull

function useMagnet<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<T>) => {
    // Touch devices or reduced-motion: skip
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MAGNET_RADIUS) {
      const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_STRENGTH;
      el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
      timeoutRef.current = null;
    }, 400);
  };

  return { ref, onMouseMove, onMouseLeave };
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
  id,
}: ButtonProps) {
  const { ref: linkRef, onMouseMove: lMove, onMouseLeave: lLeave } = useMagnet<HTMLAnchorElement>();
  const { ref: btnRef, onMouseMove: bMove, onMouseLeave: bLeave } = useMagnet<HTMLButtonElement>();

  const base =
    "inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 active:scale-[0.98]",
    ghost:
      "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] active:scale-[0.98]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        ref={linkRef}
        id={id}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        onMouseMove={lMove}
        onMouseLeave={lLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef}
      id={id}
      className={classes}
      onMouseMove={bMove}
      onMouseLeave={bLeave}
    >
      {children}
    </button>
  );
}
