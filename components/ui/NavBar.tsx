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
  { label: "Beyond", href: "/beyond" },
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

  // Close mobile menu on route change. This is a legitimate sync from an
  // external state (the URL) to component state, so the lint warning about
  // setState-in-effect doesn't apply here.
  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenuOpen(false);
    }
  }, [pathname]);

  const isBeyond = pathname === "/beyond";

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-smooth)] ${
        scrolled
          ? isBeyond
            ? "border border-[rgba(210,160,90,0.18)] backdrop-blur-lg bg-[rgba(28,20,16,0.75)] shadow-sm"
            : "border border-[var(--nav-border)] backdrop-blur-xl bg-[var(--nav-bg)]"
          : "border border-transparent bg-transparent"
      }`}
      style={!isBeyond && scrolled ? { boxShadow: "var(--nav-shadow)" } : undefined}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 h-14">
        <Link
          href="/"
          id="nav-logo"
          className="text-sm font-semibold transition-opacity duration-200 ease-[var(--ease-smooth)] hover:opacity-70"
          style={{ color: isBeyond ? "#ede0cc" : "var(--foreground)" }}
        >
          {siteConfig.name}
        </Link>

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
                className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-[var(--ease-smooth)] rounded-md"
                style={{ color: isActive ? activeColor : mutedColor }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-md"
                    style={{ background: activeBg, zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 38, mass: 0.8 }}
                  />
                )}
                <span
                  className="relative z-10 transition-colors duration-200 ease-[var(--ease-smooth)]"
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

        <div className="hidden md:flex items-center gap-1">
          <ThemeToggle />
        </div>

        <button
          id="nav-mobile-menu-toggle"
          className="md:hidden flex items-center justify-center h-8 w-8 text-[var(--muted-foreground)] transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-[var(--foreground)]"
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
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden overflow-hidden backdrop-blur-xl ${isBeyond ? "border-t border-[rgba(210,160,90,0.18)] bg-[rgba(28,20,16,0.85)]" : "border-t border-[var(--nav-border)] bg-[var(--nav-bg)]"}`}
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
                    transition={{ delay: i * 0.025, duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-[var(--ease-smooth)]"
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
