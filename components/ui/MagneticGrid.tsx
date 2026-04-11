"use client";

import { useEffect, useRef } from "react";

// ─── Tuning constants ────────────────────────────────────────────────────────
const SPACING = 30;       // px between grid points
const DOT_RADIUS = 1.3;   // base dot radius in px
const REPEL_RADIUS = 110; // cursor influence radius in px
const REPEL_STRENGTH = 9; // peak displacement magnitude (px)
const STIFFNESS = 0.13;   // spring pull back toward origin
const DAMPING = 0.80;     // velocity damping (< 1 required for stability)

interface Dot {
  ox: number; oy: number; // origin (grid position)
  x: number; y: number;   // current position
  vx: number; vy: number; // velocity
}

export function MagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // No-op on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouse = { x: -9999, y: -9999 };
    let animFrame: number;
    let dots: Dot[] = [];
    let isVisible = true;

    // ── Build dot grid to fill the viewport ─────────────────────────────────
    const buildGrid = () => {
      dots = [];
      const cols = Math.ceil(canvas.width / SPACING);
      const rows = Math.ceil(canvas.height / SPACING);
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const ox = c * SPACING;
          const oy = r * SPACING;
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildGrid();
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    // ── Pause loop when canvas is not visible ────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) draw();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // ── Animation loop ───────────────────────────────────────────────────────
    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Respect current theme
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark
        ? "rgba(255,255,255,0.18)"
        : "rgba(0,0,0,0.11)";

      for (const d of dots) {
        const dx = mouse.x - d.ox;
        const dy = mouse.y - d.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel away from cursor when within influence radius
        let rx = 0;
        let ry = 0;
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          rx = -(dx / dist) * force;
          ry = -(dy / dist) * force;
        }

        // Spring physics: pull back to origin + velocity damping
        d.vx = (d.vx + rx - STIFFNESS * (d.x - d.ox)) * DAMPING;
        d.vy = (d.vy + ry - STIFFNESS * (d.y - d.oy)) * DAMPING;
        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
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
