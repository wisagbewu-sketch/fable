import { useEffect, useRef } from "react";

/** Lightweight 2D canvas particles — golden sparkles. */
export function Particles({ density = 28 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; t: number };
    let parts: P[] = [];

    const reset = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.05 - Math.random() * 0.15,
        r: 1 + Math.random() * 2.2,
        a: 0.25 + Math.random() * 0.45,
        t: Math.random() * Math.PI * 2,
      }));
    };
    reset();
    const onResize = () => reset();
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += 0.02;
        p.x += p.vx + Math.sin(p.t) * 0.15;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        const alpha = p.a * (0.7 + 0.3 * Math.sin(p.t * 2));
        ctx.beginPath();
        ctx.fillStyle = `rgba(243, 199, 95, ${alpha})`;
        ctx.shadowColor = "rgba(243, 199, 95, 0.6)";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [density]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
