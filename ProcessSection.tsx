import { motion } from 'motion/react';
import spectralRibbon from '../../assets/images/spectral_ribbon_1789529715134.jpg';

const ease = [0.16, 1, 0.3, 1];

const steps = [
  { id: 'STEP 1', emoji: '📋', title: 'Share requirement', desc: 'GPU type, node count, region, timeline, contract term, power, cooling and workload details.' },
  { id: 'STEP 2', emoji: '🔍', title: 'Review routes', desc: 'Evaluate hardware, bare-metal, cloud and colocation options through partner networks.' },
  { id: 'STEP 3', emoji: '🤝', title: 'Align & introduce', desc: 'Support introduction and next steps once pricing and timeline are aligned.' }
];

export function ProcessSection() {
  return (
    <section id="process" className="w-full py-20 md:py-32 px-6 md:px-12 relative overflow-hidden bg-transparent border-t border-cream/5 scroll-mt-24">
      {/* Spectral Ribbon Background Image */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0 mix-blend-screen overflow-hidden"
           style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
         {/* Using the original image */}
         <motion.img
           src={spectralRibbon}
           alt=""
           className="absolute top-0 -left-[80%] md:-left-[40%] w-[250%] md:w-[150%] max-w-none h-full object-cover"
           style={{ willChange: "filter, opacity" }}
           animate={{
             opacity: [0.4, 0.9, 0.4],
             filter: [
               "hue-rotate(0deg) brightness(1)",
               "hue-rotate(35deg) brightness(1.3)",
               "hue-rotate(0deg) brightness(1)"
             ]
           }}
           transition={{
             duration: 12,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
         
         {/* Redesigned Header with Spectral Ribbon Backdrop */}
         <div className="relative mb-16 md:mb-20">

            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1, ease }}
               className="relative z-10 drop-shadow-xl"
            >
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-normal tracking-tight text-cream leading-[1.1]">
                  The process of<br/>
                  <span className="text-cream/50">infrastructure sourcing</span>
               </h2>
               <div className="flex items-start gap-3 md:gap-4 mt-6 md:mt-8">
                  <div className="w-4 h-4 md:w-6 md:h-6 border-l border-b border-cream/20 mt-1 md:mt-2 flex-shrink-0"></div>
                  <p className="text-xs md:text-base font-mono text-cream/80 max-w-md uppercase tracking-wider leading-relaxed pt-1 md:pt-2">
                    A simple process designed for infrastructure buyers and suppliers to move at the speed of AI.
                  </p>
               </div>
            </motion.div>
         </div>

         {/* Compact cards with tight, clean spacing */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
           {steps.map((step, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 1, delay: idx * 0.1, ease }}
               className="liquid-glass liquid-glass-hover bg-black/[0.3] backdrop-blur-2xl border border-cream/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] p-6 md:p-8 rounded-2xl flex flex-col gap-3 relative group overflow-hidden hover:bg-black/[0.4] hover:border-cream/20 transition-all duration-400"
             >
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cream to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] md:text-xs font-semibold text-cream/70 uppercase tracking-widest px-2 py-0.5 md:px-2.5 md:py-1 rounded bg-white/5 border border-white/5">
                    {step.id}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cream/30 group-hover:bg-cyan-400 group-hover:scale-125 transition-all"></span>
                </div>
                
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-cream group-hover:text-white transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs md:text-sm font-mono text-cream/75 leading-relaxed">
                  {step.desc}
                </p>
             </motion.div>
           ))}
         </div>
         
         {/* Spectacular Pink/Purple/Blue Ambient Glow (from gradient reference) */}
         <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0 flex justify-center items-end opacity-25 mix-blend-screen overflow-hidden">
            <div className="w-[150%] max-w-[2000px] h-[400px] bg-gradient-to-r from-[#FF0055] via-[#8A2BE2] to-[#00BFFF] blur-[100px] md:blur-[160px] translate-y-1/2 md:translate-y-2/3"></div>
         </div>

         {/* CTA Banner section */}
         <motion.div 
           id="contact-cta"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 1, ease }}
           className="liquid-glass bg-black/[0.45] backdrop-blur-2xl border border-cream/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 sm:p-12 md:p-16 rounded-3xl md:rounded-[2.5rem] text-center relative z-10 scroll-mt-32"
         >
            <div className="relative max-w-3xl mx-auto">
               <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal tracking-tight text-cream mb-4 md:mb-6 leading-tight">
                 Looking for GPU infrastructure or colocation?
               </h3>
               <p className="text-xs sm:text-sm md:text-base font-mono text-cream/70 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto px-4 md:px-0">
                 Send your requirement and we'll help review the best available route for your workload, deployment timeline and commercial needs.
               </p>
               
               <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-3 md:gap-4 w-full px-4 sm:px-0">
                 <a
                   href="mailto:ubaid@solarsyncinfra.xyz?subject=SolarSync%20Infra%20-%20GPU%20Requirement&body=Hi%20Ubaid%2C%0A%0AI%20am%20interested%20in%20sourcing%20GPU%20infrastructure%20capacity%20from%20SolarSync%20Infra.%0A%0AWorkload%20%2F%20Requirements%3A%0A-%20GPU%20Model%20(e.g.%20B300%2C%20B200%2C%20H100%2C%20H200)%3A%20%0A-%20Number%20of%20Nodes%20%2F%20GPUs%3A%20%0A-%20Deployment%20Timeline%3A%20%0A-%20Colocation%20%2F%20Power%20Needs%3A%20%0A%0ABest%20regards%2C"
                   className="bg-[#00D2FF] text-[#111] font-bold px-6 py-3.5 md:px-7 rounded-full text-xs md:text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,210,255,0.3)] inline-flex items-center justify-center cursor-pointer w-full sm:w-auto"
                 >
                   Send Requirement &rarr;
                 </a>
                 <a
                   href="https://www.linkedin.com/in/ubaid-mohammed-shaikh-a06b19390"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-transparent border border-cream/20 text-cream/80 hover:text-cream px-6 py-3.5 md:px-7 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider hover:bg-cream/10 transition-colors inline-flex items-center gap-2 justify-center cursor-pointer w-full sm:w-auto"
                 >
                   <span className="w-1.5 h-1.5 rounded-full bg-cream animate-pulse shrink-0"></span>
                   <span className="whitespace-nowrap">Connect on LinkedIn</span>
                 </a>
                 <a
                   href="https://calendly.com/ubaid-solarsyncinfra/solarsync-infra-gpu-requirements-"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="relative group overflow-hidden bg-cream text-deep font-bold px-6 py-3.5 md:px-7 rounded-full text-xs md:text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(253,248,231,0.25)] inline-flex items-center gap-2.5 justify-center cursor-pointer w-full sm:w-auto"
                 >
                   <span className="relative flex h-2 w-2 shrink-0">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
                   Book a Call
                 </a>
               </div>
            </div>
         </motion.div>
      </div>
    </section>
  );
}
