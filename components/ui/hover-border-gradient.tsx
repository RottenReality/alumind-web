"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

type HoverBorderGradientProps = React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>;

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const intervalRef = useRef<number | null>(null);

  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    },
    [clockwise],
  );

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #A9A9A9 0%, transparent 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #1FC3FF 0%, transparent 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #A9A9A9 0%, transparent 100%)",
    RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, #1FC3FF 0%, transparent 100%)",
  };

  const highlight =
    "radial-gradient(75% 181% at 50% 50%, #C0C0C0 0%, #3275F8 40%, transparent 100%)";

  useEffect(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!hovered) {
      intervalRef.current = window.setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hovered, duration, rotateDirection]);

  // Handlers that also propagate user-provided handlers (if any)
  const handleMouseEnter: React.MouseEventHandler<HTMLElement> = (e) => {
    setHovered(true);
    if (typeof props.onMouseEnter === "function") {
      (props.onMouseEnter as React.MouseEventHandler<HTMLElement>)(e);
    }
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLElement> = (e) => {
    setHovered(false);
    if (typeof props.onMouseLeave === "function") {
      (props.onMouseLeave as React.MouseEventHandler<HTMLElement>)(e);
    }
  };

  const componentClassName = cn(
    "relative flex rounded-full border border-secondary content-center bg-black/20 hover:bg-black/10 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
    containerClassName
  );

  const componentProps: React.HTMLAttributes<HTMLElement> = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: componentClassName,
    ...props,
  };

  const contentDiv = (
    <div
      key="content"
      className={cn(
        "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
        className
      )}
    >
      {children}
    </div>
  );

  const motionDiv = (
    <motion.div
      key="motion"
      className={cn("flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]")}
      style={{
        filter: "blur(2px)",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      initial={{ background: movingMap[direction] }}
      animate={{
        background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
      }}
      transition={{ ease: "linear", duration }}
    />
  );

  const overlayDiv = (
    <div key="overlay" className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
  );

  const Component = Tag as React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(Component as any, componentProps as any, contentDiv, motionDiv, overlayDiv);
}
