"use client";

import { useEffect, useRef } from "react";

// ─── Tuning constants ─────────────────────────────────────────────────────────
const PARTICLE_COUNT   = 80;   // total floating particles
const PARTICLE_SPEED   = 0.35; // base drift speed
const CURSOR_RADIUS    = 120;  // px — scatter influence radius
const SCATTER_FORCE    = 1.8;  // scatter velocity magnitude
const RETURN_EASE      = 0.012; // how gently particles drift back to normal speed
const DOT_RADIUS       = 1.4;  // particle dot size

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number; // original drift direction
  baseVy: number;
}

export function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect users who prefer reduced motion — skip the animation entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number | null = null;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    let isDark = document.documentElement.classList.contains("dark");

    // ── Theme observer: only re-read isDark when <html class> changes ────────
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── Canvas sizing ─────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      buildParticles();
    };

    const buildParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = PARTICLE_SPEED * (0.4 + Math.random() * 0.6);
        const vx    = Math.cos(angle) * speed;
        const vy    = Math.sin(angle) * speed;
        particles.push({
          x:      Math.random() * canvas.width,
          y:      Math.random() * canvas.height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove",   onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const channel = isDark ? 255 : 0;
      const dotAlpha = isDark ? 0.55 : 0.35;
      ctx.fillStyle = `rgba(${channel},${channel},${channel},${dotAlpha})`;

      for (const p of particles) {
        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CURSOR_RADIUS && dist > 0) {
          const force = (1 - dist / CURSOR_RADIUS) * SCATTER_FORCE;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        p.vx += (p.baseVx - p.vx) * RETURN_EASE;
        p.vy += (p.baseVy - p.vy) * RETURN_EASE;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10)                  p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10)   p.x = -10;
        if (p.y < -10)                  p.y = canvas.height + 10;
        if (p.y > canvas.height + 10)   p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (animFrame === null) animFrame = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (animFrame !== null) {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }
    };

    // Pause when tab is hidden — save CPU/battery.
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
