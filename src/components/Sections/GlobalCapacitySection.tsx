import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1];

const europeCountries = [
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "Spain", flag: "🇪🇸" }
];

const northAmericaCountries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" }
];

export function GlobalCapacitySection() {
  return (
    <section id="network" className="w-full py-16 px-6 md:px-12 relative overflow-hidden bg-transparent border-t border-cream/5 scroll-mt-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.05)_0%,transparent_60%)] pointer-events-none mix-blend-screen -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl mb-10"
        >
          <div className="mb-5">
            <span className="px-3.5 py-1.5 rounded-full liquid-glass text-xs font-mono text-cream/90 inline-flex items-center gap-2 border border-cream/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Global Capacity Network
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-normal tracking-tight text-cream mb-5 leading-tight">
            Global Capacity<br />
            <span className="text-cream/50">deployed across premier AI corridors</span>
          </h2>

          <div className="flex items-start gap-4">
            <div className="w-6 h-6 border-l border-b border-cream/20 mt-1 flex-shrink-0"></div>
            <p className="text-sm md:text-base font-mono text-cream/80 leading-relaxed pt-0.5">
              Source enterprise-grade GPU capacity across strategic AI markets, with access to bare-metal clusters, dedicated infrastructure, and colocation through our global network of infrastructure partners
            </p>
          </div>
        </motion.div>

        {/* Countries Grid - Small, clean blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          
          {/* Europe Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease }}
            className="liquid-glass bg-cream/[0.03] backdrop-blur-2xl border border-cream/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 md:p-7 rounded-2xl hover:border-cream/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-cream/5">
              <span className="text-xl">🇪🇺</span>
              <h3 className="text-lg font-bold font-heading text-cream">Europe</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {europeCountries.map((country, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/[0.3] backdrop-blur-xl border border-cream/10 hover:border-cream/30 hover:bg-black/[0.4] hover:shadow-[0_4px_20px_rgba(0,210,255,0.08)] transition-all duration-300 group cursor-default select-none"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300 inline-block">{country.flag}</span>
                  <span className="text-sm font-mono font-medium text-cream/90 group-hover:text-cream transition-colors whitespace-nowrap">{country.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* North America Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="liquid-glass bg-cream/[0.03] backdrop-blur-2xl border border-cream/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 md:p-7 rounded-2xl hover:border-cream/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-cream/5">
                <span className="text-xl">🌎</span>
                <h3 className="text-lg font-bold font-heading text-cream">North America</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {northAmericaCountries.map((country, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3, scale: 1.03 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/[0.3] backdrop-blur-xl border border-cream/10 hover:border-cream/30 hover:bg-black/[0.4] hover:shadow-[0_4px_20px_rgba(52,211,153,0.08)] transition-all duration-300 group cursor-default select-none"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300 inline-block">{country.flag}</span>
                    <span className="text-sm font-mono font-medium text-cream/90 group-hover:text-cream transition-colors whitespace-nowrap">{country.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
