"use client";

import React, { useState, useEffect } from "react";
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

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isBeyond = pathname === "/beyond";

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isBeyond
            ? "border border-[rgba(210,160,90,0.18)] backdrop-blur-lg bg-[rgba(28,20,16,0.75)] shadow-sm"
            : "border border-white/20 dark:border-white/10 backdrop-blur-lg bg-white/60 dark:bg-black/60 shadow-sm"
          : "border border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link
          href="/"
          id="nav-logo"
          className="text-sm font-semibold hover:opacity-70 transition-opacity"
          style={{ color: isBeyond ? "#ede0cc" : "var(--foreground)" }}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav with sliding indicator */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            // On /beyond, use sequoia parchment palette regardless of theme
            const activeColor  = isBeyond ? "#ede0cc" : "var(--foreground)";
            const mutedColor   = isBeyond ? "rgba(237,224,204,0.55)" : "var(--muted-foreground)";
            const activeBg     = isBeyond ? "rgba(200,135,74,0.12)" : "var(--muted)";
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-150 rounded-md"
                style={{ color: isActive ? activeColor : mutedColor }}
              >
                {/* Sliding background pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-md"
                    style={{ background: activeBg, zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className="relative z-10 transition-colors duration-150"
                  style={{ "--hover-color": activeColor } as React.CSSProperties}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = activeColor; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = ""; }}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle + Beyond crown (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/beyond"
            id="nav-link-beyond"
            aria-label="Beyond — hobbies & life"
            title="Beyond"
            className="relative flex items-center justify-center h-8 w-8 rounded-md transition-colors duration-150"
            style={{
              color: pathname === "/beyond" ? "#c8874a" : "var(--muted-foreground)",
            }}
          >
            {pathname === "/beyond" && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-md"
                style={{ background: "rgba(200,135,74,0.12)", zIndex: -1 }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <svg
              width="15" height="15" viewBox="0 0 24 24"
              fill="currentColor" aria-hidden="true"
            >
              <path d="M2 19h20v2H2v-2zm1-9l4 4 5-8 5 8 4-4v7H3v-7z"/>
            </svg>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-mobile-menu-toggle"
          className="md:hidden flex items-center justify-center h-8 w-8 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
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
                transition={{ duration: 0.15 }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu — animated slide */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden overflow-hidden backdrop-blur-lg ${isBeyond ? "border-t border-[rgba(210,160,90,0.18)] bg-[rgba(28,20,16,0.85)]" : "border-t border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/60"}`}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}
              >
                <Link
                  href="/beyond"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{
                    background: pathname === "/beyond" ? "rgba(200,135,74,0.12)" : "transparent",
                    color: pathname === "/beyond" ? "#c8874a" : "var(--muted-foreground)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M2 19h20v2H2v-2zm1-9l4 4 5-8 5 8 4-4v7H3v-7z"/>
                  </svg>
                  Beyond
                </Link>
              </motion.div>
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
