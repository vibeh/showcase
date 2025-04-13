'use client';

import { useState } from 'react';
import NumberFlow from '@number-flow/react';

export function NumberFlowExample() {
  const [value, setValue] = useState(0);

  const shuffle = () => {
    // Random value between 1 and 99999
    const newValue = Math.floor(Math.random() * 99999) + 1;
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center bg-[rgba(0,0,0,0.02)] py-10 rounded-2xl">
        <div className="text-5xl font-medium text-[#0071e3]">
          <NumberFlow 
            value={value} 
            className="transition-all"
          />
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          className="apple-button-primary flex-1"
          onClick={shuffle}
          aria-label="Randomize number"
        >
          Shuffle
        </button>
      </div>
      
      <div className="flex gap-3">
        <button 
          className="apple-button-secondary flex-1 text-[#1d1d1f]"
          onClick={() => setValue(prev => prev + 100)}
          aria-label="Increase by 100"
        >
          +100
        </button>
        <button 
          className="apple-button-secondary flex-1 text-[#1d1d1f]"
          onClick={() => setValue(prev => Math.max(0, prev - 100))}
          aria-label="Decrease by 100"
        >
          -100
        </button>
      </div>
    </div>
  );
} 