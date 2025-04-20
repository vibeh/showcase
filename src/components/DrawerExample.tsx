'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { Drawer } from 'vaul';

// Define the interface for the functions to expose via ref
export interface DrawerExampleRef {
  openDrawer: () => void;
}

// Wrap the component with forwardRef
export const DrawerExample = forwardRef<DrawerExampleRef>((_props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Expose the openDrawer function using useImperativeHandle
  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      setIsOpen(true);
    },
  }));

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
        <Drawer.Content
          className="bg-[#2a2a2a] flex flex-col rounded-t-[20px] h-[45vh] mt-24 fixed bottom-0 left-0 right-0 border-t border-[#444] z-50 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Container for placeholder content */}
          <div className="p-6 flex-1 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Handle */}
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#555] mb-8" />

            {/* --- Placeholder Content --- */}
            <div className="max-w-md mx-auto flex flex-col items-center text-center">
              <Drawer.Title className="font-semibold text-xl mb-4 text-[#e5e5e5]">
                Vaul Drawer Example
              </Drawer.Title>
              <p className="text-[#999] text-base mb-6">
                This is the content area of the drawer. You can put anything you like here.
                It slides up smoothly from the bottom.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                (Content is scrollable if it exceeds the drawer height)
              </p>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-[#333] text-[#e5e5e5] font-medium transition-colors hover:bg-[#444] active:bg-[#555] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#555] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a2a2a] cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
            {/* --- End Placeholder Content --- */}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
});

DrawerExample.displayName = "DrawerExample"; 