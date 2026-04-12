"use client";

import { useEffect, useRef } from "react";

// ─── Tuning constants ─────────────────────────────────────────────────────────
const MAX_CLOUDS      = 8;    // max simultaneous ink clouds
const CLOUD_RADIUS    = 180;  // peak spread radius in px
const GROWTH_SPEED    = 0.012; // how fast the cloud expands (0–1 per frame)
const DECAY_SPEED     = 0.008; // how fast opacity fades after peak
const PEAK_OPACITY_D  = 0.13; // max opacity in dark mode
const PEAK_OPACITY_L  = 0.07; // max opacity in light mode
const CURSOR_THROTTLE = 80;   // ms between cursor-spawned clouds
const SCROLL_THROTTLE = 200;  // ms between scroll-spawned clouds

interface InkCloud {
  x: number;
  y: number;
  phase: "grow" | "decay";
  progress: number; // 0 → 1 during grow; 1 → 0 during decay
}

export function InkDiffusion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clouds: InkCloud[] = [];
    let animFrame: number;
    let lastCursorSpawn = 0;
    let lastScrollSpawn = 0;
    let lastMouseX = -9999;
    let lastMouseY = -9999;

    // ── Canvas sizing ─────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Spawn a cloud ─────────────────────────────────────────────────────────
    const spawnCloud = (x: number, y: number) => {
      if (clouds.length >= MAX_CLOUDS) {
        // Evict the oldest decaying cloud, or the furthest along in decay
        const decayIdx = clouds.findIndex(c => c.phase === "decay");
        if (decayIdx !== -1) clouds.splice(decayIdx, 1);
        else return; // all growing, skip
      }
      clouds.push({ x, y, phase: "grow", progress: 0 });
    };

    // ── Cursor movement → spawn cloud when moved far enough ──────────────────
    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 60 && now - lastCursorSpawn > CURSOR_THROTTLE) {
        spawnCloud(e.clientX, e.clientY);
        lastCursorSpawn = now;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    // ── Click → immediate strong cloud ───────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      spawnCloud(e.clientX, e.clientY);
      lastCursorSpawn = Date.now();
    };

    // ── Scroll → ambient cloud at a random horizontal position ───────────────
    const onScroll = () => {
      const now = Date.now();
      if (now - lastScrollSpawn > SCROLL_THROTTLE) {
        const x = canvas.width  * (0.2 + Math.random() * 0.6);
        const y = canvas.height * (0.2 + Math.random() * 0.6);
        spawnCloud(x, y);
        lastScrollSpawn = now;
      }
    };

    // ── Ambient clouds on idle — one every ~4s ────────────────────────────────
    const ambientInterval = setInterval(() => {
      const x = canvas.width  * (0.1 + Math.random() * 0.8);
      const y = canvas.height * (0.1 + Math.random() * 0.8);
      spawnCloud(x, y);
    }, 4000);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click",     onClick);
    window.addEventListener("scroll",    onScroll, { passive: true });

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark    = document.documentElement.classList.contains("dark");
      const peakAlpha = isDark ? PEAK_OPACITY_D : PEAK_OPACITY_L;
      // Dark: white ink; Light: black ink
      const [r, g, b] = isDark ? [255, 255, 255] : [0, 0, 0];

      for (let i = clouds.length - 1; i >= 0; i--) {
        const c = clouds[i];

        // Advance phase
        if (c.phase === "grow") {
          c.progress += GROWTH_SPEED;
          if (c.progress >= 1) { c.progress = 1; c.phase = "decay"; }
        } else {
          c.progress -= DECAY_SPEED;
          if (c.progress <= 0) { clouds.splice(i, 1); continue; }
        }

        // Eased radius: ease-out on grow, linear fade on decay
        const t      = c.phase === "grow" ? c.progress : c.progress;
        const eased  = c.phase === "grow"
          ? 1 - Math.pow(1 - t, 3)   // cubic ease-out
          : t;
        const radius = CLOUD_RADIUS * eased;

        // Opacity: rises during grow, falls during decay
        const alpha  = c.phase === "grow"
          ? peakAlpha * eased
          : peakAlpha * c.progress;

        // Radial gradient — dense center, feathered edge
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, radius);
        grad.addColorStop(0,    `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.35, `rgba(${r},${g},${b},${alpha * 0.6})`);
        grad.addColorStop(0.7,  `rgba(${r},${g},${b},${alpha * 0.2})`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      clearInterval(ambientInterval);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click",     onClick);
      window.removeEventListener("scroll",    onScroll);
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
