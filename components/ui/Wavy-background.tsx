"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

type Speed = "slow" | "fast";

interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: Speed;
  waveOpacity?: number;
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...restProps
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const ntRef = useRef<number>(0);
  const noiseRef = useRef<ReturnType<typeof createNoise3D> | null>(null);

  const getSpeed = (): number => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
      default:
        return 0.002;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  useEffect(() => {
    noiseRef.current = createNoise3D();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const applyFilter = () => {
      if (typeof blur === "number") ctx.filter = `blur(${blur}px)`;
    };
    applyFilter();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      applyFilter();
    };

    window.addEventListener("resize", onResize);

    const drawWave = (n: number) => {
      const noise = noiseRef.current!;
      ntRef.current += getSpeed();

      if (!ctxRef.current) return;
      const c = ctxRef.current;

      for (let i = 0; i < n; i++) {
        c.beginPath();
        c.lineWidth = waveWidth ?? 50;
        c.strokeStyle = waveColors[i % waveColors.length];

        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
          c.lineTo(x, y + h * 0.5);
        }
        c.stroke();
        c.closePath();
      }
    };

    const render = () => {
      if (!ctxRef.current) return;
      const c = ctxRef.current;
      c.fillStyle = backgroundFill ?? "black";
      c.globalAlpha = waveOpacity ?? 0.5;
      c.fillRect(0, 0, w, h);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", onResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
  ]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)} {...restProps}>
        {children}
      </div>
    </div>
  );
};
