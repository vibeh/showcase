'use client';

import { toast } from 'sonner';

export function ToastExample() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => toast('Notification message', {
            description: 'This is additional information about the notification.'
          })}
          className="apple-button-secondary text-[#1d1d1f]"
          aria-label="Show default toast"
        >
          Default
        </button>
        
        <button
          onClick={() => toast.success('Success message', {
            description: 'Your action was completed successfully.'
          })}
          className="apple-button-secondary border-transparent bg-[rgba(52,199,89,0.12)] hover:bg-[rgba(52,199,89,0.2)] text-[#23a550]"
          aria-label="Show success toast"
        >
          Success
        </button>
        
        <button
          onClick={() => toast.error('Error message', {
            description: 'There was a problem completing your request.'
          })}
          className="apple-button-secondary border-transparent bg-[rgba(255,59,48,0.12)] hover:bg-[rgba(255,59,48,0.2)] text-[#d60015]"
          aria-label="Show error toast"
        >
          Error
        </button>
        
        <button
          onClick={() => 
            toast.promise(
              new Promise(resolve => setTimeout(resolve, 2000)),
              {
                loading: 'Processing...',
                success: 'Completed successfully',
                error: 'Failed to complete',
              }
            )
          }
          className="apple-button-secondary border-transparent bg-[rgba(0,113,227,0.12)] hover:bg-[rgba(0,113,227,0.2)] text-[#0071e3]"
          aria-label="Show promise toast"
        >
          Promise
        </button>
      </div>
    </div>
  );
} 