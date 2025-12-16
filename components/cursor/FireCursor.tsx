"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type ParticleType = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  lifespan: number;
  initialLife: number;
};

const IDLE_DELAY = 500; // ms

export function FireCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvasInstance = canvasRef.current;
    if (!canvasInstance) return;
    const context = canvasInstance.getContext("2d");
    if (!context) return;

    const canvas = canvasInstance as HTMLCanvasElement;
    const ctx = context as CanvasRenderingContext2D;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const particles: ParticleType[] = [];
    const mouse = { x: width / 2, y: height / 2 };

    const ringState = {
      scale: 0.3,
      baseRadius: 25,
    };

    // Always render active fire cursor
    let isIdle = false;
    let idleTimeout: number | undefined;

    const idleRingState = {
      opacity: 1,
      lineWidth: 1,
    };

    let isSpawning = false;

    function setCanvasSize(target: HTMLCanvasElement) {
      width = window.innerWidth;
      height = window.innerHeight;
      target.width = width;
      target.height = height;
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      lifespan: number;
      initialLife: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 3 + 1;
        this.lifespan = Math.random() * 50 + 40;
        this.initialLife = this.lifespan;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifespan--;
        this.radius = (this.lifespan / this.initialLife) * 3 + 1;
      }

      draw(context: CanvasRenderingContext2D) {
        const lightness = Math.floor(
          (this.lifespan / this.initialLife) * 70 + 30,
        );
        context.fillStyle = `hsla(30, 100%, ${lightness}%, 0.8)`;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    function spawnParticles() {
      const particlesToSpawn = 1;
      for (let i = 0; i < particlesToSpawn; i++) {
        const angle = Math.random() * Math.PI * 2;
        const currentRadius = ringState.baseRadius * ringState.scale;
        const x = mouse.x + Math.cos(angle) * currentRadius;
        const y = mouse.y + Math.sin(angle) * currentRadius;
        particles.push(new Particle(x, y));
      }
    }

    function drawIdleRing() {
      if (idleRingState.opacity > 0) {
        const currentRadius = ringState.baseRadius * ringState.scale;
        ctx.strokeStyle = `hsla(40, 100%, 75%, ${idleRingState.opacity})`;
        ctx.lineWidth = idleRingState.lineWidth;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function animate() {
      // Clear the canvas so content beneath stays visible; only particles/ring are drawn
      ctx.clearRect(0, 0, width, height);

      if (!isIdle || isSpawning) {
        spawnParticles();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i] as Particle;
        p.update();
        p.draw(ctx);
        if (p.lifespan <= 0) {
          particles.splice(i, 1);
        }
      }

      drawIdleRing();
      animationFrameRef.current = window.requestAnimationFrame(animate);
    }

    function setActiveState() {
      window.clearTimeout(idleTimeout);
      isIdle = false;
    }

    function setIdleTimeout() {
      window.clearTimeout(idleTimeout);
      // We keep isIdle = false so particles continue to spawn
      isIdle = false;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setActiveState();
      if (!isSpawning) {
        setIdleTimeout();
      }
    };

    const handleMouseDown = () => {
      isSpawning = true;
      setActiveState();
      gsap.to(ringState, { duration: 0.4, scale: 0.8, ease: "power3.out" });
    };

    const handleMouseUp = () => {
      isSpawning = false;
      setIdleTimeout();
      gsap.to(ringState, { duration: 0.4, scale: 0.3, ease: "power3.out" });
    };

    const handleResize = () => {
      const current = canvasRef.current;
      if (current) {
        setCanvasSize(current);
      }
    };

    setCanvasSize(canvas);
    animate();
    setIdleTimeout();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    const interactiveElements = document.querySelectorAll<HTMLElement>(
      ".interactive",
    );
    const enterHandlers: Array<() => void> = [];
    const leaveHandlers: Array<() => void> = [];

    interactiveElements.forEach((el) => {
      const onEnter = () => {
        gsap.to(ringState, { duration: 0.3, scale: 0.8, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(ringState, { duration: 0.3, scale: 0.3, ease: "power2.out" });
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      enterHandlers.push(onEnter);
      leaveHandlers.push(onLeave);
    });

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      window.clearTimeout(idleTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      interactiveElements.forEach((el, index) => {
        el.removeEventListener("mouseenter", enterHandlers[index]);
        el.removeEventListener("mouseleave", leaveHandlers[index]);
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fire-canvas"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}


