"use client";

import { motion } from "framer-motion"; // Use framer-motion import
import React, { useState } from "react";

// Define Ref type
export interface MotionPreviewRef {
  triggerAnimation: () => void;
}

// --- Constants for Animation ---
const bounce = {
  duration: 1.2,
  ease: bounceEase,
};

const spring = {
  type: "spring" as const, // Ensure type is literal for framer-motion
  stiffness: 700,
  damping: 30,
};

// --- Easing Function ---
// From https://easings.net/#easeOutBounce
function bounceEase(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

// --- Main Component (Toggle Switch Animation) ---
export const MotionPreview = React.forwardRef<MotionPreviewRef>((props, ref) => {
  const [isOn, setIsOn] = useState(true);

  // Expose trigger function via ref for click interaction (Toggle)
  React.useImperativeHandle(ref, () => ({
    triggerAnimation: () => {
      setIsOn((prevIsOn) => !prevIsOn);
    },
  }));

  return (
    // Container - allows flex centering, set bg color
    <div
      className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center font-sans bg-[#1a1a1a] p-4"
    >
      {/* The Switch Element - onClick removed */}
      <div
        className="switch"
        data-is-on={isOn}
        // onClick={() => setIsOn(!isOn)} // Removed: Triggered by card click now
        title="Click card to toggle"
      >
        <motion.div
          className="ball"
          layout // Animate layout changes
          transition={isOn ? spring : bounce} // Apply different transitions based on state
        />
      </div>

      {/* Integrate Styles */}
      <StyleSheet />
    </div>
  );
});

MotionPreview.displayName = "MotionPreview";

// --- StyleSheet Component --- (Adapted for Monochrome)
function StyleSheet() {
  return (
    <style jsx global>{`
      /* Styles specific to the toggle switch preview */

      .switch {
        width: 60px; /* Adjusted size for preview */
        height: 100px; /* Adjusted size for preview */
        background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent light grey */
        display: flex;
        align-items: flex-end; /* Default to bottom (off) */
        border-radius: 30px;
        padding: 6px;
        cursor: pointer; /* Indicate interactivity via card */
        box-sizing: border-box;
        transition: background-color 0.2s ease-in-out; /* Smooth bg transition */
      }

      .switch[data-is-on="true"] {
        align-items: flex-start; /* Move ball to top (on) */
        background-color: rgba(255, 255, 255, 0.3); /* Brighter semi-transparent light grey */
      }

      .ball {
        width: 48px; /* Adjusted size */
        height: 48px; /* Adjusted size */
        background-color: #e5e5e5; /* Light grey ball color */
        border-radius: 24px; /* Fully rounded */
        will-change: transform;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3); /* Slightly darker shadow */
      }
    `}</style>
  );
} 