'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';

export function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <button className="apple-button-primary">
          Open Drawer
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        <Drawer.Content className="bg-[var(--container-bg)] flex flex-col rounded-t-[20px] h-[60vh] mt-24 fixed bottom-0 left-0 right-0 border-t border-[var(--border-color)]">
          <div className="p-6 bg-[var(--container-bg)] rounded-t-[20px] flex-1">
            <div className="mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-[rgba(0,0,0,0.1)] mb-10" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-semibold text-2xl mb-5 tracking-tight">
                Drawer Component
              </Drawer.Title>
              <p className="text-[#86868b] text-base mb-5">
                This drawer follows Apple Human Interface Guidelines with a clean, minimalist design featuring proper spacing and typography.
              </p>
              <p className="text-[#86868b] text-base mb-10">
                The component includes a subtle backdrop blur effect and smooth animations for a premium feel.
              </p>
              <button 
                onClick={() => setIsOpen(false)}
                className="apple-button-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
} 