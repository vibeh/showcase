import React from "react";
import { cn } from "./ShineBorder"; // Reuse cn from ShineBorder or move cn to a shared utils file

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40", // Default from example, will override
  colorTo = "#9c40ff", // Default from example, will override
  delay = 0,
}) => {
  // Correct calculation for gradient angle based on anchor
  const gradientAngle = `calc(${anchor} * 1deg)`;
  // Correct calculation for gradient position based on anchor
  const gradientPosition = `calc(${anchor} * 1%)`;

  return (
    <div
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}%`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
          "--gradient-angle": gradientAngle,
          "--gradient-position": gradientPosition,
        } as React.CSSProperties
      }
      className={cn(
        "absolute inset-0 rounded-[inherit] [border:calc(var(--border-width))_solid_transparent]",
        // Mask gradient for card borders
        "[mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)]",
        "mask-composite:intersect",
        // Animation
        "after:animate-border-beam after:[animation-duration:var(--duration)] after:[animation-delay:var(--delay)] after:background-[linear-gradient(var(--gradient-angle),var(--color-from),var(--color-to),var(--color-from))] after:[background-size:calc(var(--size)_*_1%)_100%] after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:z-[-1]",
        className
      )}
    />
  );
};

// Add keyframes if not defined globally
export function BorderBeamStyleSheet() {
    return (
        <style jsx global>{`
            @keyframes border-beam {
              100% {
                offset-distance: 100%;
              }
            }
        `}</style>
    )
} 