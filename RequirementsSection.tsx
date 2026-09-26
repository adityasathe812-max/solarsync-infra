import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1];

const checkList = [
  "GPU cluster sourcing for AI labs and enterprise buyers.",
  "Hardware GPU procurement and bare-metal deployment routes.",
  "Colocation sourcing for high-density AI deployments.",
  "Support for commercial alignment, timelines and introductions."
];

const focusCards = [
  { title: "B300", desc: "Next-generation AI deployments and large inference/training clusters." },
  { title: "B200", desc: "Enterprise HGX-class GPU infrastructure and large-scale compute." },
  { title: "H200 / H100", desc: "Training, inference, fine-tuning and production AI workloads." },
  { title: "Colocation", desc: "AI-ready facilities, power capacity, cooling and deployment support." }
];

export function RequirementsSection() {
  return (
    <section id="hardware" className="w-full py-20 md:py-32 px-6 md:px-12 relative overflow-hidden bg-transparent border-t border-cream/5 scroll-mt-24">
      {/* Ambient Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[500px] md:h-[800px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0%,transparent_60%)] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 relative z-10">
        
        {/* Left Card: Requirements (Liquid Glass) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="liquid-glass liquid-glass-hover bg-black/[0.3] backdrop-blur-2xl border border-cream/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-6 sm:p-10 md:p-12 rounded-3xl md:rounded-[2rem] flex flex-col h-full hover:border-cream/20 hover:bg-black/[0.4] transition-all duration-500"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight text-cream mb-4 md:mb-6 leading-tight">
            Built around serious<br/>GPU requirements
          </h2>
          <p className="text-sm md:text-base font-sans text-cream/85 leading-relaxed mb-8 md:mb-10 max-w-md">
            SolarSync Infra focuses on large-value AI infrastructure opportunities where availability, pricing, power, cooling and deployment timelines matter.
          </p>
          
          <div className="space-y-4 md:space-y-6 mt-auto">
            {checkList.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 md:gap-4">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0 mt-0.5 md:mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm md:text-base font-sans font-medium text-cream/95 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Card: Focus (Liquid Glass) */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, delay: 0.2, ease }}
           className="liquid-glass liquid-glass-hover bg-black/[0.3] backdrop-blur-2xl border border-cream/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-6 sm:p-10 md:p-12 rounded-3xl md:rounded-[2rem] flex flex-col h-full hover:border-cream/20 hover:bg-black/[0.4] transition-all duration-500"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight text-cream mb-4 md:mb-6 leading-tight">
            Supported<br/>infrastructure focus
          </h2>
          <p className="text-sm md:text-base font-sans text-cream/85 leading-relaxed mb-6 md:mb-10">
            Common requirements we help evaluate and route.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-auto">
             {focusCards.map((card, idx) => (
               <a
                 key={idx}
                 href={`mailto:ubaid@solarsyncinfra.xyz?subject=SolarSync%20Infra%20-%20Requirement%20for%20${encodeURIComponent(card.title)}&body=Hi%20Ubaid%2C%0A%0AI%20am%20interested%20in%20sourcing%20${encodeURIComponent(card.title)}%20infrastructure.%0A%0ADetails%3A%0A-%20Capacity%2FNode%20count%3A%20%0A-%20Timeline%3A%20%0A-%20Region%3A%20%0A%0ABest%20regards%2C`}
                 className="group text-left bg-black/[0.3] backdrop-blur-xl border border-cream/10 rounded-2xl p-5 md:p-6 hover:bg-black/[0.4] hover:border-cream/25 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)] flex flex-col items-start relative overflow-hidden cursor-pointer"
               >
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-cream/5 blur-xl group-hover:bg-cream/10 transition-colors"></div>
                  <h4 className="text-lg md:text-xl font-bold text-cream mb-1.5 md:mb-2 group-hover:text-white transition-colors flex items-center gap-2 w-full justify-between sm:justify-start">
                    {card.title}
                    <span className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:-translate-x-2 sm:group-hover:translate-x-0 transition-all duration-300 text-cream/50 sm:text-cream/90">&rarr;</span>
                  </h4>
                  <p className="text-xs md:text-sm font-sans text-cream/75 leading-relaxed group-hover:text-cream/90 transition-colors">{card.desc}</p>
               </a>
             ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
