"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerReducedMotion = () => false;

/**
 * Scramble-then-resolve text animation.
 * Each character cycles through random glyphs before snapping to its real value.
 *
 * @param target   The final string to display
 * @param delay    ms before the animation begins (default 0)
 * @param duration Total animation duration in ms (default 900)
 */
export function useScrambleText(
  target: string,
  delay = 0,
  duration = 900
): string {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );

  const [display, setDisplay] = useState(() => target.replace(/\S/g, " "));
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    const timeoutId = setTimeout(() => {
      const animate = (now: number) => {
        if (startRef.current === null) startRef.current = now;
        const elapsed = now - startRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // How many characters have resolved (left to right)
        const resolved = Math.floor(progress * target.length);

        const next = target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        setDisplay(next);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(target);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      startRef.current = null;
    };
  }, [target, delay, duration, reduced]);

  return reduced ? target : display;
}
