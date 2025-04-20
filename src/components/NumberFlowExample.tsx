'use client';

import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import NumberFlow from '@number-flow/react';

// Define the interface for the functions to expose via ref
export interface NumberFlowExampleRef {
  shuffleNumber: () => void;
}

// Wrap the component with forwardRef
export const NumberFlowExample = forwardRef<NumberFlowExampleRef>((_props, ref) => {
  const [value, setValue] = useState(12345); // Start with an initial value

  // Define the shuffle function using useCallback
  const shuffle = useCallback(() => {
    // Random value between 1 and 99999
    const newValue = Math.floor(Math.random() * 99999) + 1;
    setValue(newValue);
  }, []); // No dependencies

  // Expose the shuffleNumber function using useImperativeHandle
  useImperativeHandle(ref, () => ({
    shuffleNumber: shuffle,
  }));

  return (
    // Simplified container for the number preview
    // Removed internal buttons and click handlers
    <div className="flex flex-col items-center justify-center w-full h-full text-center p-4">
      <div className="text-4xl md:text-5xl font-semibold text-[#e5e5e5] mb-2">
        <NumberFlow 
          value={value} 
          // Optional: add formatting if desired
          // format=",0" 
          className="transition-all duration-500 ease-in-out"
        />
      </div>
      
      {/* REMOVED: All buttons (Shuffle, +100, -100) */}
    </div>
  );
});

// Add display name for better debugging
NumberFlowExample.displayName = "NumberFlowExample"; 