'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { DrawerExample, DrawerExampleRef } from './DrawerExample';
import { NumberFlowExample, NumberFlowExampleRef } from './NumberFlowExample';
import { ToastExample } from './ToastExample';
import { CmdkPreview } from './CmdkPreview';
import { MotionPreview, MotionPreviewRef } from './MotionPreview';
import { SuggestComponentPreview } from './SuggestComponentPreview';
import { BorderBeam, BorderBeamStyleSheet } from "@/components/ui/BorderBeam";

// Helper Component for Copy Command - Entire area clickable, monochrome
const CopyCommand = () => {
  const [copied, setCopied] = useState(false);
  const command = 'npx vibe-components add';
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    // Clear any existing timeout
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      // Set a new timeout
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null; // Clear ref after timeout
      }, 1500); // Slightly shorter duration for feedback
    });
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-12 flex justify-center">
      {/* Outer container: relative, rounded-md, overflow-hidden, ADD onClick */}
      <div 
        className="relative max-w-fit rounded-md overflow-hidden cursor-pointer" 
        onClick={handleCopy}
        title="Click to copy command"
      >
        {/* The actual content div: Apply feedback style based on copied state */}
        <div
          className={`bg-[#1a1a1a] rounded-md p-3 px-4 flex items-center space-x-4 font-mono text-sm transition-colors duration-150 ease-in-out ${copied ? 'bg-[#2a2a2a]' : 'hover:bg-[#222]'}`}
        >
          <span className="text-[#666]">$</span>
          <span className="flex-1 text-[#e5e5e5] overflow-x-auto whitespace-nowrap no-scrollbar">
            {command}
          </span>
          <span
            // Change text and color on copy
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 ease-in-out ${
              copied ? 'opacity-100 text-green-400' : 'opacity-50 text-[#888]'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </div>
        {/* BorderBeam component: Dimmer colors */}
        <BorderBeam
            colorFrom="#555" // Dimmer start
            colorTo="#bbb"   // Dimmer end
            borderWidth={1}
            duration={7}   // Slightly faster
            delay={0}
            size={150}
        />
      </div>
      <BorderBeamStyleSheet />
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
    refRequired: false,
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
  // Define refs only for components that need them
  const drawerRef = useRef<DrawerExampleRef>(null);
  const numberFlowRef = useRef<NumberFlowExampleRef>(null);
  const motionRef = useRef<MotionPreviewRef>(null);
  const [toastCounter, setToastCounter] = useState(0); // Add state for cycling toasts

  // Disable eslint rule for this line to allow `any` for mixed ref types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refsMap: { [key: string]: React.RefObject<any> | undefined } = {
    drawer: drawerRef,
    numberflow: numberFlowRef,
    motion: motionRef,
  };

  const handleCardClick = (id: string, href?: string) => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    switch (id) {
      case 'drawer':
        refsMap.drawer?.current?.openDrawer(); // Optional chaining handles potential null/undefined
        break;
      case 'numberflow':
        refsMap.numberflow?.current?.shuffleNumber();
        break;
      case 'toast':
        // Cycle through different toast types
        const toastType = toastCounter % 4; // Example: cycle through 4 types
        switch (toastType) {
          case 0:
            toast('Event has been created', {
              description: `Monday, January 1st at 12:00 PM`,
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo!'),
              },
            });
            break;
          case 1:
            toast.success('Success!', {
              description: 'Your changes have been saved.',
            });
            break;
          case 2:
            toast.error('Error Saving', {
              description: 'Could not save changes. Please try again.',
            });
            break;
          case 3:
          default: // Fallback or other types like info/loading
             toast.info('Reminder', {
               description: 'Your meeting starts in 15 minutes.',
             });
            break;
        }
        setToastCounter((count) => count + 1); // Increment for next click
        break;
      case 'cmdk':
        // No action needed, handled by Radix Trigger
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
        <h1 className="font-mondwest text-7xl md:text-7xl font-normal text-center mb-5 tracking-tight text-white">
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
            const componentRef = item.refRequired ? refsMap[item.id] : undefined;
            const isSuggestCard = item.id === 'suggest';
            const baseCardClasses = `
              rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col group cursor-pointer
              transition-all duration-200 ease-in-out
            `;
            const normalCardClasses = `
              bg-[#1a1a1a] 
              hover:bg-[#222] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)]
              active:scale-[0.98] active:bg-[#2a2a2a]
            `;
            const suggestCardClasses = `
              bg-[#0d0d0d] border-2 border-dashed border-[#444]
              hover:bg-[#111] hover:border-white hover:scale-[1.02]
              active:scale-[0.98] active:bg-[#2a2a2a]
            `;

            return (
              <div
                key={item.id}
                className={`${baseCardClasses} ${isSuggestCard ? suggestCardClasses : normalCardClasses}`}
                onClick={() => handleCardClick(item.id, item.href)}
              >
                <div className="relative flex-1 flex items-center justify-center mb-3 md:mb-4 overflow-hidden rounded-lg min-h-0">
                  {/* Pass ref only if it exists */}
                  <Component ref={componentRef} />
                  {/* Static drawer preview */}
                  {item.id === 'drawer' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[70%] pointer-events-none">
                      <div className="bg-[#2a2a2a] flex flex-col rounded-t-[16px] h-full border-t border-[#444] shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                        <div className="mt-3 mx-auto w-10 h-1.5 flex-shrink-0 rounded-full bg-[#555]" />
                      </div>
                    </div>
                  )}
                </div>
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