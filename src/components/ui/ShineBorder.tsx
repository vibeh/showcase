import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Basic cn utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Color of the border
   * @default "#000000"
   */
  shineColor?: string;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Style object for the component
   */
  style?: React.CSSProperties;
}

/**
 * ShineBorder Component
 * Source: https://magicui.design/docs/components/shine-border
 */
export const ShineBorder = React.forwardRef<HTMLDivElement, ShineBorderProps>(
  (
    {
      children,
      className,
      shineColor = "#000000", // Default from docs, will be overridden
      duration = 14,
      borderWidth = 1,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          "--shine-color": shineColor,
          "--border-width": `${borderWidth}px`,
          "--animation-duration": `${duration}s`,
        } as React.CSSProperties}
        className={cn(
          "relative rounded-lg border", // Base border class for structure
          "border-transparent", // Make base border transparent
          "bg-black", // Background to contain shine
          "before:absolute before:inset-[var(--border-width)] before:rounded-[calc(0.5rem-var(--border-width))] before:bg-white", // Inner mask
          "before:dark:bg-black",
          "after:absolute after:inset-0 after:-z-10 after:rounded-lg",
          "after:bg-[linear-gradient(var(--gradient-angle),transparent_0%,var(--shine-color)_50%,transparent_100%)]", // Gradient
          "after:animate-[shine-border] after:[animation-duration:var(--animation-duration)] after:[animation-iteration-count:infinite] after:[animation-timing-function:linear]", // Animation
          "after:[background-size:200%_100%] after:[background-position:200%_center]", // Gradient positioning for animation
          className
        )}
        {...props}
      >
        {/* Apply a z-index to ensure children are above the ::before pseudo-element */}
        <div className="relative z-10">
            {children}
        </div>
        {/* Add Keyframes directly here if not globally defined */}
        <style jsx global>{`
          @property --gradient-angle {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
          }

          @keyframes shine-border {
            0% {
              --gradient-angle: 0deg;
            }
            100% {
              --gradient-angle: 360deg;
            }
          }
        `}</style>
      </div>
    );
  }
);

ShineBorder.displayName = "ShineBorder"; 