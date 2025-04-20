"use client";

import * as React from "react";
import { Command } from "cmdk";
import * as Dialog from '@radix-ui/react-dialog';

// --- Placeholder Icons --- (Replace with actual SVGs/icon library if needed)
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
// --- End Placeholder Icons ---

// No Ref interface or forwardRef needed
export const CmdkPreview = () => {
  const [search, setSearch] = React.useState("");

  // Keyboard listener remains the same for Cmd+K
  React.useEffect(() => {
    const triggerRef = document.getElementById('cmdk-trigger-placeholder');
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        triggerRef?.click();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Placeholder action
  const handleSelect = (itemName: string) => {
    console.log(`Selected: ${itemName}`);
    // Close handled by Dialog.Close or overlay click
  };

  return (
    <Dialog.Root> {/* Wrap with Radix Root */}
      {/* Trigger: The placeholder div */}
      <Dialog.Trigger asChild>
        <div
          id="cmdk-trigger-placeholder" // Add ID for keyboard listener
          className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
          title="Open Command Menu (⌘K)"
        >
          <div
            className="relative w-full max-w-sm h-12 flex items-center justify-start px-3 bg-[#1f1f1f] rounded-lg text-[#666] border border-[#333] shadow-inner pointer-events-none" // pointer-events-none prevents interfering with trigger
          >
            <SearchIcon className="text-[#666] mr-2 flex-shrink-0" />
            <span className="text-sm">Search commands...</span>
          </div>
        </div>
      </Dialog.Trigger>

      {/* Portal for the Dialog Content */}
      <Dialog.Portal>
        {/* Optional Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        {/* Content Area */}
        <Dialog.Content
          className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl bg-[#1f1f1f]/95 backdrop-blur-sm text-white rounded-lg border border-[#333] shadow-2xl overflow-hidden data-[state=open]:animate-contentShow focus:outline-none"
        >
          {/* Visually Hidden Title (Required by Radix) */}
          <Dialog.Title id="cmdk-dialog-title" className="sr-only">
            Command Menu
          </Dialog.Title>

          {/* Command Component goes INSIDE Dialog.Content */}
          <Command shouldFilter={false} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <div className="flex items-center border-b border-[#333] px-3">
              <SearchIcon className="text-[#888] mr-2 flex-shrink-0" />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Type a command or search..."
                className="w-full px-1 py-3 text-base bg-transparent focus:outline-none placeholder:text-[#666]"
              />
              {/* Optional: Add a close button if needed */}
              <Dialog.Close asChild>
                 <button className="p-2 text-gray-400 hover:text-white" aria-label="Close">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                     <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                   </svg>
                 </button>
              </Dialog.Close>
            </div>
            <Command.List className="max-h-[400px] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-4 py-6 text-center text-sm text-[#888]">
                No results found.
              </Command.Empty>

              {/* Command Groups and Items remain the same */}
              <Command.Group heading="Applications" className="cmdk-group">
                <Command.Item onSelect={() => handleSelect("Launch Chrome")} className="cmdk-item">
                  <PlaceholderIcon className="mr-2 text-blue-400" /> Launch Chrome
                </Command.Item>
                <Command.Item onSelect={() => handleSelect("Launch VS Code")} className="cmdk-item">
                  <PlaceholderIcon className="mr-2 text-purple-400" /> Launch VS Code
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Utilities" className="cmdk-group">
                <Command.Item onSelect={() => handleSelect("Calculator")} className="cmdk-item">
                  <PlaceholderIcon className="mr-2 text-green-400" /> Calculator
                </Command.Item>
                <Command.Item onSelect={() => handleSelect("Screenshot")} className="cmdk-item">
                  <PlaceholderIcon className="mr-2 text-orange-400" /> Take Screenshot
                </Command.Item>
                <Command.Item onSelect={() => handleSelect("Clipboard History")} className="cmdk-item">
                  <PlaceholderIcon className="mr-2 text-yellow-400" /> Clipboard History
                </Command.Item>
              </Command.Group>
              <Command.Separator className="h-px bg-[#333] my-2" />

              <Command.Group heading="Settings" className="cmdk-group">
                <Command.Item onSelect={() => handleSelect("System Preferences")} className="cmdk-item">
                  <PlaceholderIcon className="mr-2 text-gray-400" /> System Preferences
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
      {/* Styles need to be adjusted for new structure if necessary */}
      {/* Keyframes for Radix animations */}
       <style jsx global>{`
          @keyframes overlayShow {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes contentShow {
            from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
          .data-[state=open]:animate-overlayShow {
             animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
           }
          .data-[state=open]:animate-contentShow {
            animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* sr-only styles */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }

          /* cmdk item/group styles remain the same */
          .cmdk-item {
            display: flex;
            align-items: center;
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            user-select: none;
            transition: background 0.1s ease-in-out;
            font-size: 0.9rem;
            border-radius: 6px;
            margin-bottom: 2px;
          }
          .cmdk-item:hover {
            background-color: #2a2a2a;
          }
          .cmdk-item[aria-selected="true"] {
            background-color: #333;
          }
          .cmdk-group [cmdk-group-heading] {
            padding: 0.75rem 0.75rem 0.25rem;
            font-size: 0.7rem;
            color: #888;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
        `}</style>
    </Dialog.Root>
  );
};

CmdkPreview.displayName = "CmdkPreview"; 