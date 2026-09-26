import { Header } from './components/LayoutElements';
import { HeroSection } from './components/Sections/HeroSection';
import { SourceSection } from './components/Sections/SourceSection';
import { RequirementsSection } from './components/Sections/RequirementsSection';
import { GlobalCapacitySection } from './components/Sections/GlobalCapacitySection';
import { ProcessSection } from './components/Sections/ProcessSection';

export default function App() {
  return (
    <div className="min-h-screen bg-deep font-sans text-cream overflow-x-hidden selection:bg-cream/20 selection:text-cream">
      <Header />
      <main>
        <HeroSection />
        <SourceSection />
        <RequirementsSection />
        <GlobalCapacitySection />
        <ProcessSection />
      </main>
    </div>
  );
}
