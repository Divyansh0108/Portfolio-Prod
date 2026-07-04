"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <button
        id="theme-toggle"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background-subtle)] text-[var(--muted-foreground)] transition-colors duration-150 hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
        aria-label="Toggle theme"
      >
        <Sun size={15} />
      </button>
    );
  }

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      id="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background-subtle)] text-[var(--muted-foreground)] transition-colors duration-150 hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
