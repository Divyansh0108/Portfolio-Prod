"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-[var(--border)] backdrop-blur-md bg-[var(--background)]/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link
          href="/"
          id="nav-logo"
          className="text-sm font-semibold text-[var(--foreground)] hover:opacity-70 transition-opacity"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme toggle (desktop) */}
        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-mobile-menu-toggle"
          className="md:hidden flex items-center justify-center h-8 w-8 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
