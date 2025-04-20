'use client';

import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Toaster, toast } from 'sonner';
import { DrawerExample, DrawerExampleRef } from './DrawerExample';
import { NumberFlowExample, NumberFlowExampleRef } from './NumberFlowExample';
import { ToastExample } from './ToastExample';
import { CmdkPreview, CmdkPreviewRef } from './CmdkPreview';
import { MotionPreview, MotionPreviewRef } from './MotionPreview';
import { SuggestComponentPreview } from './SuggestComponentPreview';
import { ShineBorder } from "@/components/ui/ShineBorder";

// Helper Component for Copy Command - Entire area clickable, monochrome
const CopyCommand = () => {
  const [copied, setCopied] = useState(false);
  const command = 'npx vibe-components-cli add';

  const handleCopy = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mb-12 flex justify-center">
      <ShineBorder
        className="rounded-lg text-center"
        shineColor="#FFFFFF"
        borderWidth={1}
        duration={8}
      >
        <div
          className="max-w-fit bg-[#1a1a1a] rounded-lg p-3 px-4 flex items-center space-x-4 font-mono text-sm cursor-pointer transition-colors hover:bg-[#222] active:bg-[#2a2a2a]"
          onClick={handleCopy}
          title="Click to copy command"
        >
          <span className="text-[#666]">$</span>
          <span className="flex-1 text-[#e5e5e5] overflow-x-auto whitespace-nowrap no-scrollbar">
            {command}
          </span>
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium transition-opacity ${
              copied ? 'opacity-100 text-[#bbb]' : 'opacity-50 text-[#888]'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </div>
      </ShineBorder>
      {/* Basic CSS to hide scrollbar visually but keep functionality */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

// --- Component Configuration ---
// Add new components here
const componentsConfig = [
  {
    id: 'drawer',
    title: 'Vaul',
    description: 'Smooth iOS-like bottom sheet',
    component: DrawerExample,
    refRequired: true, // Indicates if a ref is needed for interaction
  },
  {
    id: 'numberflow',
    title: 'NumberFlow',
    description: 'Animated number transitions',
    component: NumberFlowExample,
    refRequired: true,
  },
  {
    id: 'toast',
    title: 'Sonner',
    description: 'Elegant notifications',
    component: ToastExample,
    refRequired: false,
  },
  {
    id: 'cmdk',
    title: '⌘K Menu',
    description: 'Fast command palette',
    component: CmdkPreview,
    refRequired: true,
  },
  {
    id: 'motion',
    title: 'Motion',
    description: 'Animation examples',
    component: MotionPreview,
    refRequired: true,
  },
  {
    id: 'suggest',
    title: 'Suggest a Component',
    description: 'Help expand the collection',
    component: SuggestComponentPreview,
    refRequired: false,
    href: 'https://github.com/vibeh/components/issues',
  },
  // Add more components here (up to 9 for a 3x3 grid, or adjust grid layout)
  // Example:
  // {
  //   id: 'placeholder1',
  //   title: 'Coming Soon',
  //   description: 'Example placeholder',
  //   component: () => <div className="w-full h-full bg-[#2a2a2a] rounded-lg flex items-center justify-center text-[#666]">Preview</div>,
  //   refRequired: false,
  // },
];

export function VibeComponentsShowcase() {
  // Refs for interactive components
  const drawerRef = useRef<DrawerExampleRef>(null);
  const numberFlowRef = useRef<NumberFlowExampleRef>(null);
  // Refs for the new components
  const cmdkRef = useRef<CmdkPreviewRef>(null);
  const motionRef = useRef<MotionPreviewRef>(null);

  const refsMap: { [key: string]: React.RefObject<any> | undefined } = {
    drawer: drawerRef,
    numberflow: numberFlowRef,
    cmdk: cmdkRef,
    motion: motionRef,
  };

  const handleCardClick = (id: string, href?: string) => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    switch (id) {
      case 'drawer':
        refsMap.drawer?.current?.openDrawer();
        break;
      case 'numberflow':
        refsMap.numberflow?.current?.shuffleNumber();
        break;
      case 'toast':
        toast('Card clicked: Displaying toast!');
        break;
      case 'cmdk':
        break;
      case 'motion':
        refsMap.motion?.current?.triggerAnimation();
        break;
    }
  };

  return (
    // Remove min-h-screen, add flex-grow to fill space in parent flex container
    // Background is now handled by page.tsx
    <div className="font-sfpro flex-grow w-full text-[#e5e5e5] py-12 md:py-16 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Use PPMondwest for the main title - Updated Text */}
        <h1 className="font-mondwest text-5xl md:text-6xl font-normal text-center mb-5 tracking-tight text-white">
          Vibe Kit
        </h1>
        <p className="text-[#999] text-center mb-12 max-w-xl mx-auto text-lg md:text-xl">
        Curated components perfect for building modern React apps
        </p>

        <CopyCommand />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {componentsConfig.map((item) => {
            const Component = item.component as React.ElementType;
            const componentRef = item.refRequired && item.id in refsMap ? refsMap[item.id] : undefined;

            // Define base classes and conditional classes
            const isSuggestCard = item.id === 'suggest';
            const baseCardClasses = `
              rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col group cursor-pointer
              transition-all duration-200 ease-in-out
            `;
            const normalCardClasses = `
              bg-[#1a1a1a] border border-[#333]
              hover:bg-[#222] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)]
              active:scale-[0.98] active:bg-[#2a2a2a]
            `;
            const suggestCardClasses = `
              bg-[#0d0d0d] border-2 border-dashed border-[#444]
              hover:bg-[#1f1f1f] hover:border-solid hover:border-[#666] hover:scale-[1.02]
              active:scale-[0.98] active:bg-[#2a2a2a]
            `;

            return (
              <div
                key={item.id}
                // Combine base classes with conditional ones
                className={`${baseCardClasses} ${isSuggestCard ? suggestCardClasses : normalCardClasses}`}
                onClick={() => handleCardClick(item.id, item.href)}
              >
                {/* Component Preview Area */}
                <div className="relative flex-1 flex items-center justify-center mb-3 md:mb-4 overflow-hidden rounded-lg min-h-0">
                  {/* Render the actual component */}
                  <Component ref={componentRef as React.Ref<unknown>} />

                  {/* --- Re-add Static Drawer Preview --- */}
                  {item.id === 'drawer' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[70%] pointer-events-none">
                      {/* Static Drawer Content Lookalike */}
                      <div className="bg-[#2a2a2a] flex flex-col rounded-t-[16px] h-full border-t border-[#444] shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                        {/* Handle */}
                        <div className="mt-3 mx-auto w-10 h-1.5 flex-shrink-0 rounded-full bg-[#555]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Title and Description */}
                {/* Conditionally render Title/Desc or adjust styling for suggest card */}
                <div className={`text-center flex-shrink-0 ${isSuggestCard ? 'opacity-70' : ''}`}>
                  <h2 className="font-semibold text-sm md:text-base text-[#e5e5e5] mb-0.5">
                    {item.title}
                  </h2>
                  <p className="text-xs md:text-sm text-[#999]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toaster Component - Monochrome Dark Theme */}
      <Toaster
        position="bottom-center"
        theme="dark" // Use Sonner's built-in dark theme
        toastOptions={{
          style: {
            background: '#2a2a2a', // Dark background
            color: '#e5e5e5', // Light text
            border: '1px solid #444', // Subtle border
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            fontSize: '14px',
            fontWeight: 500,
          },
        }}
      />

      {/* Ensure fonts are loaded */}
      <style jsx global>{`
        /* Make sure you import/define these fonts */
        @font-face {
          font-family: 'PPMondwest-Regular';
          src: url('/fonts/PPMondwest-Regular.otf') format('opentype'); /* Adjust path as needed */
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'SF Pro Rounded'; /* Adjust family name if needed */
          src: url('/fonts/SF-Pro-Rounded-Regular.otf') format('opentype'); /* Adjust path */
          font-weight: normal; /* Add other weights if needed */
          font-style: normal;
        }

        .font-mondwest {
          font-family: 'PPMondwest-Regular', sans-serif; /* Fallback */
        }

        .font-sfpro {
          font-family: 'SF Pro Rounded', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; /* Comprehensive fallback */
        }

        /* Apply base font to body */
        body {
           font-family: 'SF Pro Rounded', sans-serif;
           background-color: #0d0d0d; /* Ensure body bg matches if needed */
        }
      `}</style>
    </div>
  );
}

// --- Type Definitions & Child Component Modifications Reminder ---
// Reminder: Update DrawerExample.tsx and NumberFlowExample.tsx to:
// 1. Export the Ref type (e.g., DrawerExampleRef)
// 2. Use forwardRef() around the component export
// 3. Use useImperativeHandle() to expose functions (openDrawer, shuffleNumber)
// 4. Remove any internal buttons or click handlers within the preview component itself,
//    as the entire card is now the trigger.

// Example for DrawerExample.tsx
// export interface DrawerExampleRef {
//   openDrawer: () => void;
// }
// export const DrawerExample = forwardRef<DrawerExampleRef>(...) {
//   useImperativeHandle(ref, () => ({ openDrawer: () => setOpen(true) }));
//   return ( /* ... Drawer content, NO internal Drawer.Trigger needed here if card handles click */ );
// }

// Example for NumberFlowExample.tsx
// export interface NumberFlowExampleRef {
//   shuffleNumber: () => void;
// }
// export const NumberFlowExample = forwardRef<NumberFlowExampleRef>(...) {
//   const shuffle = useCallback(...);
//   useImperativeHandle(ref, () => ({ shuffleNumber: shuffle }));
//   return ( /* ... NumberFlow display, NO internal onClick needed if card handles click */ );
// }

// ToastExample likely needs no changes if it was just displaying content.