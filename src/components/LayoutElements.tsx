export function Header() {
  return (
    <header className="fixed top-6 left-0 w-full px-6 z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-7xl px-4 md:px-8 py-3 flex items-center justify-between liquid-glass rounded-full border border-cream/10">
        <div className="flex items-center gap-12">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 md:gap-4 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-cream rounded flex items-center justify-center text-deep font-bold text-sm tracking-tighter transition-transform duration-500 group-hover:scale-110 flex-shrink-0">S</div>
            <span className="font-heading tracking-tight text-lg md:text-xl text-cream hidden sm:block">SolarSync Infra</span>
          </a>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-mono uppercase tracking-wider">
          <a href="#services" className="text-cream/70 hover:text-cream transition hidden md:block">Services</a>
          <a href="#hardware" className="text-cream/70 hover:text-cream transition hidden md:block">Hardware</a>
          <a href="#process" className="text-cream/70 hover:text-cream transition hidden md:block">Process</a>
          <div className="flex items-center gap-2 md:gap-3 md:ml-2">
            <a
              href="https://calendly.com/ubaid-solarsyncinfra/solarsync-infra-gpu-requirements-"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden bg-cream text-deep px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(253,248,231,0.35)] cursor-pointer whitespace-nowrap"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Book a Call
            </a>
            <a
              href="mailto:ubaid@solarsyncinfra.xyz?subject=SolarSync%20Infra%20-%20GPU%20Requirement"
              className="liquid-glass liquid-glass-hover text-cream px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors hover:bg-cream hover:text-deep font-semibold text-[10px] md:text-xs font-mono uppercase tracking-wider inline-flex items-center justify-center cursor-pointer whitespace-nowrap hidden sm:inline-flex"
            >
              Send Requirement
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
