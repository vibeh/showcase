'use client';

import { Toaster } from 'sonner';
import { DrawerExample } from './DrawerExample';
import { NumberFlowExample } from './NumberFlowExample';
import { ToastExample } from './ToastExample';

export function VibeComponentsShowcase() {
  return (
    <div className="container mx-auto py-16 px-6 max-w-6xl">
      <h1 className="text-4xl font-semibold text-center mb-6 tracking-tight">Vibe Components</h1>
      <p className="text-[#86868b] text-center mb-16 max-w-xl mx-auto text-lg">
        A showcase of elegant components with Apple-inspired design principles
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Drawer Example Card */}
        <div className="apple-card p-8 flex flex-col space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Drawer</h2>
            <p className="text-[#86868b] text-sm">
              Smooth sliding panel for secondary content
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center py-6">
            <DrawerExample />
          </div>
        </div>
        
        {/* NumberFlow Example Card */}
        <div className="apple-card p-8 flex flex-col space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">NumberFlow</h2>
            <p className="text-[#86868b] text-sm">
              Animated number transitions with smooth effects
            </p>
          </div>
          <div className="flex-1">
            <NumberFlowExample />
          </div>
        </div>
        
        {/* Toast Example Card */}
        <div className="apple-card p-8 flex flex-col space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Toast</h2>
            <p className="text-[#86868b] text-sm">
              Elegant notification system for user feedback
            </p>
          </div>
          <div className="flex-1">
            <ToastExample />
          </div>
        </div>
      </div>
      
      {/* This is required for the toast notifications to work */}
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            background: 'var(--container-bg)',
            color: 'var(--foreground)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            boxShadow: '0 4px 24px var(--shadow-color)',
            fontSize: '14px',
            fontWeight: 500
          }
        }}
      />
    </div>
  );
} 