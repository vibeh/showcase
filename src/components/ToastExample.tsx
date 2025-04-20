'use client';

// No need to import `toast` here anymore as it's triggered from the parent.

export function ToastExample() {
  // This component now only renders a static visual preview of a toast.
  // The actual toast functionality is triggered by clicking the parent card
  // in VibeComponentsShowcase.tsx.
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* Static Toast Preview with Mandarin text */}
      <div className="w-auto max-w-xs px-4 py-2.5 rounded-xl bg-[#2a2a2a] border border-[#444] shadow-md">
        <div className="flex items-center">
          {/* Optional: Add an icon here if desired */}
          {/* <svg ... /> */}
          <div className="ml-1 flex-1">
            <p className="text-sm font-medium text-[#e5e5e5]">
              通知预览 {/* "Notification Preview" */}
            </p>
            <p className="text-xs text-[#999] mt-0.5">
              这是一个示例 {/* "This is an example" */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 