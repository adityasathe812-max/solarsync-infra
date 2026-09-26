import { motion } from 'motion/react';
import { IsometricMorph } from '../IsometricMorph';

const ease = [0.16, 1, 0.3, 1];

const cards = [
  { id: '01', emoji: '⚡', title: 'Enterprise GPU Sourcing', desc: 'Access to GPU opportunities across H100, H200, B200, B300 and other AI accelerators.' },
  { id: '02', emoji: '🖥️', title: 'Bare-Metal AI Compute', desc: 'Dedicated GPU infrastructure for training, inference, fine-tuning and production workloads.' },
  { id: '03', emoji: '🏢', title: 'High-Density Colocation', desc: 'Support sourcing AI-ready data center capacity for power, cooling and deployment requirements.' },
  { id: '04', emoji: '🔧', title: 'Hardware Procurement', desc: 'GPU servers, clusters and infrastructure hardware through trusted supply channels.' }
];

export function SourceSection() {
  return (
    <section id="services" className="w-full py-20 md:py-32 px-6 md:px-12 relative overflow-hidden bg-transparent border-t border-cream/5 scroll-mt-24">


      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="w-full lg:w-1/2 relative z-10 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight text-cream mb-6 md:mb-8 leading-tight">
              Infrastructure that<br/>
              <span className="text-cream/50">scales with ambition</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 md:gap-4 max-w-xl mx-auto lg:mx-0">
               <div className="hidden sm:block w-6 h-6 border-l border-b border-cream/20 mt-2 flex-shrink-0"></div>
               <p className="text-sm md:text-base font-mono text-cream/80 leading-relaxed pt-2 tracking-wide">
                 We connect serious AI infrastructure demand with qualified suppliers, operators, and deployment partners worldwide.
               </p>
            </div>
          </motion.div>

          <div className="relative mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full max-w-[300px] md:max-w-none lg:w-1/2 h-[250px] sm:h-[300px] lg:h-[400px] pointer-events-none opacity-50 lg:opacity-100 mix-blend-screen z-0 mx-auto">
             <IsometricMorph />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: idx * 0.1, ease }}
              className="liquid-glass liquid-glass-hover bg-black/[0.3] backdrop-blur-2xl border border-cream/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-6 md:p-8 rounded-2xl min-h-[220px] md:min-h-[280px] flex flex-col relative group overflow-hidden hover:bg-black/[0.4] hover:border-cream/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(253,248,231,0.06)] transition-all duration-500"
            >
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cream/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="font-mono text-xs md:text-sm text-cream/60 font-semibold">{card.id} <span className="text-cream/30">/</span></div>
                <span className="text-xl md:text-2xl">{card.emoji}</span>
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-cream mb-2 md:mb-3">{card.title}</h4>
              <p className="text-xs md:text-sm font-mono text-cream/75 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
