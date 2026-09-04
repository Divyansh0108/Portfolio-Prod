"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenuOpen(false);
    }
  }, [pathname]);

  const isBeyond = pathname === "/beyond";
  const logoColor = isBeyond ? "#ede0cc" : "var(--foreground)";

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-smooth)] ${
        scrolled
          ? isBeyond
            ? "border-b border-[rgba(210,160,90,0.18)] backdrop-blur-lg bg-[rgba(28,20,16,0.8)]"
            : "border-b border-[var(--nav-border)] backdrop-blur-xl bg-[var(--nav-bg)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 h-14">
        <Link
          href="/"
          id="nav-logo"
          className="inline-block text-sm font-semibold transition-[transform,opacity] duration-200 ease-[var(--ease-pop)] hover:opacity-70 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          style={{ color: logoColor }}
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            const activeColor = isBeyond ? "#ede0cc" : "var(--foreground)";
            const mutedColor = isBeyond ? "rgba(237,224,204,0.55)" : "var(--muted-foreground)";
            const activeBg = isBeyond ? "rgba(200,135,74,0.12)" : "var(--muted)";
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-[transform,opacity,background-color] duration-200 ease-[var(--ease-pop)] hover:opacity-100 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                  !isActive && !isBeyond ? "hover:bg-[var(--surface-hover)]" : ""
                }`}
                style={{
                  color: isActive ? activeColor : mutedColor,
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-md"
                    style={{ background: activeBg, zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 38, mass: 0.8 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-1">
          <ThemeToggle />
        </div>

        <button
          id="nav-mobile-menu-toggle"
          className="md:hidden flex items-center justify-center h-8 w-8 text-[var(--muted-foreground)] transition-[transform,color] duration-200 ease-[var(--ease-pop)] hover:scale-110 hover:text-[var(--foreground)] active:scale-90"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden overflow-hidden backdrop-blur-xl ${isBeyond ? "border-t border-[rgba(210,160,90,0.18)] bg-[rgba(28,20,16,0.85)]" : "border-t border-[var(--nav-border)] bg-[var(--nav-bg)]"}`}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium transition-[transform,background-color,color] duration-200 ease-[var(--ease-pop)] active:scale-[0.97]"
                    style={
                      isBeyond
                        ? {
                            background: isActive ? "rgba(200,135,74,0.15)" : "transparent",
                            color: isActive ? "#ede0cc" : "rgba(237,224,204,0.55)",
                          }
                        : {
                            background: isActive ? "var(--muted)" : "transparent",
                            color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                          }
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-2 pt-2 mt-1 border-t border-[var(--border)]">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
