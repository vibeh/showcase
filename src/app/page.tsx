import { VibeComponentsShowcase } from "@/components/VibeComponentsShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <VibeComponentsShowcase />
      
      <footer className="py-8 text-center text-sm space-y-2">
        <p className="text-[#86868b]">
          Built with vibe-components-cli · Designed with Apple Human Interface Guidelines
        </p>
        <a 
          href="https://www.npmjs.com/package/vibe-components-cli" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#0071e3] hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0z"></path>
            <path d="M12 16l4-4-4-4M8 12h8"></path>
          </svg>
          npm.com/package/vibe-components-cli
        </a>
      </footer>
    </div>
  );
}
