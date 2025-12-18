"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type BoxType = {
  x: number;
  y: number;
  w: number;
  h: number;
  a: number;
  s: number;
  v: number;
  o: number;
  update: () => void;
  reset: () => void;
  render: (ctx: CanvasRenderingContext2D) => void;
};

export function CursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({
    isMoveForFirst: false,
    x: 0,
    y: 0,
    ox: 0,
    oy: 0,
    tx: 0,
    ty: 0,
  });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    const mouse = mouseRef.current;
    mouse.tx = c.width / 2;
    mouse.ty = c.height / 2;

    const Box = function (
      this: BoxType,
      x: number,
      y: number,
      w: number,
      h: number,
    ) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.a = Math.random() * Math.PI * 2;
      this.s = 1;
      this.v = 0;
      this.o = 1;
    } as any as new (x: number, y: number, w: number, h: number) => BoxType;

    Box.prototype = {
      constructor: Box,
      update: function (this: BoxType) {
        // Use GSAP for smooth opacity transitions
        this.o -= 0.01;
        this.v += 0.1;
        this.a += Math.random() * 0.8 - 0.4;
        this.x += Math.cos(this.a) * this.v;
        this.y += Math.sin(this.a) * this.v;

        this.v = Math.min(10, this.v);
        this.o = Math.max(0, this.o);
      },
      reset: function (this: BoxType) {
        this.a = Math.random() * Math.PI * 2;
        this.v = 0;
        this.o = 1;
      },
      render: function (this: BoxType, ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.o;
        ctx.fillStyle = "white";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.a);
        ctx.scale(this.s, this.s);
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
      },
    };

    let boxList: BoxType[] = [];
    const maxBox = 200;
    let index = -1;
    let mouseTween: gsap.core.Tween | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      // Use window coordinates since canvas covers full viewport
      mouse.isMoveForFirst = true;
      
      // Kill existing tween if any
      if (mouseTween) {
        mouseTween.kill();
        mouseTween = null;
      }
      
      // Update mouse position directly for immediate response
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      mouse.tx = c.width / 2;
      mouse.ty = c.height / 2;
    };

    // Attach to window since canvas has pointer-events: none
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    function loop() {
      if (!c || !ctx) return;
      requestAnimationFrame(loop);

      // Clear canvas with transparency so content beneath is visible
      ctx.clearRect(0, 0, c.width, c.height);

      if (!mouse.isMoveForFirst) {
        const dx = mouse.tx - mouse.x;
        const dy = mouse.ty - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        // Use GSAP for smooth interpolation to center
        if (d > 0.98) {
          if (!mouseTween || !mouseTween.isActive()) {
            mouseTween = gsap.to(mouse, {
              x: mouse.tx,
              y: mouse.ty,
              duration: 1,
              ease: "power2.out",
            });
          }
        } else {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
        }
      }

      if (mouse.x !== mouse.ox && mouse.y !== mouse.oy) {
        if (boxList.length < maxBox) {
          const box = new Box(mouse.x, mouse.y, 10, 3);
          boxList.push(box);
        } else {
          index = (index + 1) % boxList.length;
          const box = boxList[index];
          box.reset();
          box.x = mouse.x;
          box.y = mouse.y;
        }
      }

      if (ctx) {
        for (let i = 0; i < boxList.length; i++) {
          const box = boxList[i];
          box.update();
          box.render(ctx);
        }
      }

      mouse.ox = mouse.x;
      mouse.oy = mouse.y;
    }

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mouseTween) {
        mouseTween.kill();
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas id="c" ref={canvasRef} />;
}

