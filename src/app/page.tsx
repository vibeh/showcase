import { VibeComponentsShowcase } from "@/components/VibeComponentsShowcase";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d]">
      <main className="flex-grow">
        <VibeComponentsShowcase />
      </main>
      
      <footer className="py-6 text-center text-sm flex-shrink-0">
        <p className="text-[#86868b]">
          Built with <a 
          href="https://www.npmjs.com/package/vibe-components-cli" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#ffffff] hover:underline"
        >vibe-components-cli</a>
        </p>
      </footer>
    </div>
  );
}
