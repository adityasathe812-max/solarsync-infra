import { motion, useScroll, useTransform, useSpring, useVelocity } from 'motion/react';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const GlitchingTitle = () => {
  const line1 = "GPU infrastructure";
  const line2 = "that scales with ambition.";
  const totalLength = line1.length + line2.length;
  
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const pickRandomChar = () => {
       const validIndices: number[] = [];
       for (let i = 0; i < totalLength; i++) {
          const char = i < line1.length ? line1[i] : line2[i - line1.length];
          if (char !== ' ' && char !== '.') validIndices.push(i);
       }
       if (validIndices.length > 0) {
         setGlitchIndex(validIndices[Math.floor(Math.random() * validIndices.length)]);
       }
    };
    
    pickRandomChar();
    const interval = setInterval(pickRandomChar, 3000);
    return () => clearInterval(interval);
  }, [totalLength]);

  const renderLine = (lineText: string, offset: number, isDim: boolean) => {
    const words = lineText.split(' ');
    let currentOffset = offset;

    return words.map((word, wordIdx) => {
      const wordStart = currentOffset;
      currentOffset += word.length + 1;

      return (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIdx) => {
            const globalIdx = wordStart + charIdx;

            if (globalIdx === glitchIndex) {
              return (
                <span key={charIdx} className="relative inline-block align-baseline">
                  <span className="invisible select-none pointer-events-none">{char}</span>
                  <span
                    className={`absolute inset-0 flex items-center justify-center font-pixel text-[0.85em] leading-none ${
                      isDim ? 'text-neutral-500' : 'text-neutral-400'
                    } drop-shadow-[0_0_6px_rgba(255,255,255,0.15)] select-none pointer-events-none`}
                  >
                    {char}
                  </span>
                </span>
              );
            }
            return <span key={charIdx}>{char}</span>;
          })}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      );
    });
  };

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-normal tracking-tight text-cream mb-8 leading-[1.1] relative z-10 break-words">
      <span className="block">{renderLine(line1, 0, false)}</span>
      <span className="block text-cream/50">{renderLine(line2, line1.length, true)}</span>
    </h1>
  );
};

const PatternBackground = () => {
  // Detect small screens so we can run a lighter-weight version of the effect there.
  // Mobile GPUs/CPUs struggle with 5 stacked scroll-linked physics paths; desktop doesn't.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress, scrollY } = useScroll();
  
  // Add physics/spring to the scroll for smooth momentum
  // Mobile: tuned close to critically-damped so it settles almost instantly in either scroll direction (fixes the "takes a second" delay), without changing the visual motion range at all
  const smoothProgress = useSpring(scrollYProgress, {
    damping: isMobile ? 35 : 30,
    stiffness: isMobile ? 300 : 70,
    mass: isMobile ? 0.5 : 1.2
  });

  // Calculate velocity for stretching/skewing effects based on scroll speed
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Organic drifting path driven by smoothed scroll - same travel distance as desktop so it moves the same way
  const x = useTransform(smoothProgress, [0, 0.4, 1], ["0vw", "-40vw", "-120vw"]);
  const y = useTransform(smoothProgress, [0, 0.4, 1], ["0vh", "5vh", "15vh"]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, -45]);

  // Velocity-driven physical deformations (stretches and squishes as you scroll fast) - same as desktop
  const velocityScaleY = useTransform(smoothVelocity, [-1500, 0, 1500], [0.8, 1, 1.2]);
  const velocityScaleX = useTransform(smoothVelocity, [-1500, 0, 1500], [1.05, 1, 0.95]);
  const velocityRotate = useTransform(smoothVelocity, [-1500, 0, 1500], [10, 0, -10]);

  const renderLineBundle = (basePath: string, offsetX: number, offsetY: number) => {
     // Fewer overlapping strokes on mobile = noticeably less paint work per frame
     const colors = isMobile
       ? ["rgba(255,0,127,0.8)", "rgba(30,144,255,0.8)", "rgba(0,250,154,0.8)"]
       : ["rgba(255,0,127,0.7)", "rgba(30,144,255,0.7)", "rgba(0,250,154,0.7)", "rgba(255,215,0,0.7)", "rgba(157,0,255,0.7)"];
     return (
       <g fill="none" strokeLinecap="round" strokeWidth={isMobile ? 4 : 2.5}>
         {colors.map((color, i) => (
           <path key={i} d={basePath} stroke={color} style={{ transform: `translate(${offsetX * i}px, ${offsetY * i}px)` }} />
         ))}
       </g>
     );
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${isMobile ? 'opacity-80' : 'opacity-60'}`}>
       <motion.div
         className={`absolute -top-[20%] -right-[10%] ${isMobile ? 'w-[95vw]' : 'w-[69vw]'} h-[150%]`}
         style={{ 
           x, y, rotate,
           willChange: 'transform'
         }}
       >
         {/* Container that reacts to scroll velocity (physics bending) */}
         <motion.div
           style={{ 
             scaleY: velocityScaleY, 
             scaleX: velocityScaleX,
             rotate: velocityRotate,
             transformOrigin: 'center center',
             width: '100%',
             height: '100%',
             willChange: 'transform'
           }}
         >
           {/* Constant organic wriggling animation independent of scroll - same as desktop */}
           <motion.div
             animate={{ 
               scaleX: [1, 1.15, 0.85, 1],
               scaleY: [1, 0.9, 1.1, 1],
               rotate: [0, 5, -5, 0],
               x: [0, -30, 30, 0]
             }}
             transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
             style={{ width: '100%', height: '100%', willChange: 'transform' }}
           >
             <svg viewBox="0 0 1200 2400" className="w-full h-full overflow-visible">
               {renderLineBundle("M 1000,-600 C 50,400 1100,1200 200,2000 S 900,2800 300,3200", -7, 4)}
             </svg>
           </motion.div>
         </motion.div>
       </motion.div>
    </div>
  );
};

const HardwareReveal = () => {
  const boxVariants = {
    hidden: { y: 0 },
    visible: (custom: number) => ({
      y: custom,
      transition: { duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
    })
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 0.4, delay: 2.4, ease: "easeOut" } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 2.6 } }
  };

  const drawSlice = (startY: number) => ({
    top: `M 200 ${startY} L 280 ${startY + 40} L 200 ${startY + 80} L 120 ${startY + 40} Z`,
    left: `M 120 ${startY + 40} L 120 ${startY + 100} L 200 ${startY + 140} L 200 ${startY + 80} Z`,
    right: `M 280 ${startY + 40} L 280 ${startY + 100} L 200 ${startY + 140} L 200 ${startY + 80} Z`
  });

  const topSlice = drawSlice(100);
  const midSlice = drawSlice(160);
  const botSlice = drawSlice(220);

  return (
    <div className="relative w-full aspect-square flex items-center justify-center mt-12 lg:mt-0 max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">
      <svg viewBox="0 0 550 500" className="w-full h-full">
        <g stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" strokeLinejoin="round">
          
          {/* BOTTOM SLICE */}
          <motion.g custom={90} initial="hidden" animate="visible" variants={boxVariants}>
            <path d={botSlice.top} />
            <path d={botSlice.left} />
            <path d={botSlice.right} />
            
            {/* Control Panel / Power Button */}
            <path d="M 140 280 L 160 290 L 160 310 L 140 300 Z" />
            <path d="M 147 289 L 153 292 L 153 297 L 147 294 Z" />

            {/* Bottom Arrow & Text */}
            <motion.path d="M 280 290 L 330 265 L 360 265" stroke="rgba(255,255,255,0.4)" variants={lineVariants} />
            <motion.text x="370" y="269" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="1" stroke="none" variants={textVariants}>03. STORAGE & POWER</motion.text>
          </motion.g>

          {/* MIDDLE SLICE */}
          <motion.g custom={0} initial="hidden" animate="visible" variants={boxVariants}>
            <path d={midSlice.top} />
            <path d={midSlice.left} />
            <path d={midSlice.right} />
            
            {/* Drive Bays */}
            <path d="M 130 215 L 180 240 L 180 250 L 130 225 Z" />
            <path d="M 130 235 L 180 260 L 180 270 L 130 245 Z" />
            
            {/* LED Indicators */}
            <path d="M 172 238 L 175 239.5" stroke="#FFE600" strokeWidth="2" />
            <path d="M 172 258 L 175 259.5" stroke="#FFE600" strokeWidth="2" />

            {/* Middle Arrow & Text */}
            <motion.path d="M 280 230 L 330 205 L 360 205" stroke="rgba(255,255,255,0.4)" variants={lineVariants} />
            <motion.text x="370" y="209" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="1" stroke="none" variants={textVariants}>02. COMPUTE NODES</motion.text>
          </motion.g>

          {/* TOP SLICE */}
          <motion.g custom={-90} initial="hidden" animate="visible" variants={boxVariants}>
            <path d={topSlice.top} />
            {/* Inner Recessed Top */}
            <path d="M 200 112 L 265 145 L 200 178 L 135 145 Z" />
            <path d={topSlice.left} />
            <path d={topSlice.right} />
            
            {/* Top Logo / Indent */}
            <path d="M 130 160 L 150 170" strokeWidth="2" />
            <circle cx="165" cy="182" r="2" fill="#FFE600" stroke="none" />

            {/* Top Arrow & Text */}
            <motion.path d="M 280 170 L 330 145 L 360 145" stroke="rgba(255,255,255,0.4)" variants={lineVariants} />
            <motion.text x="370" y="149" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="1" stroke="none" variants={textVariants}>01. ORCHESTRATION</motion.text>
          </motion.g>

        </g>
      </svg>
    </div>
  );
};

export function HeroSection() {
  return (
    <section className="min-h-screen w-full flex items-center px-6 md:px-12 pt-32 pb-16 relative bg-transparent">
      
      {/* Moved PatternBackground here so it spans the full screen and bleeds down */}
      <PatternBackground />

      {/* Ambient Background Glow (Optimized without blur filter) */}
      <div className="absolute top-1/2 left-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_60%)] pointer-events-none -translate-y-1/2 -translate-x-1/2 mix-blend-screen"></div>
      <div className="absolute top-1/3 right-1/4 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.08)_0%,transparent_60%)] pointer-events-none translate-x-1/4 mix-blend-screen"></div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 h-full relative z-20 items-center">
        
        {/* Left Column - Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="w-full flex flex-col relative"
        >

          <div className="flex flex-wrap gap-2 md:gap-4 mb-8 md:mb-12 relative z-10">
            <span className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full liquid-glass text-[10px] md:text-sm font-mono text-cream/80 flex items-center gap-2 md:gap-3 whitespace-nowrap">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cream animate-pulse"></div>
              Enterprise GPU Sourcing
            </span>
            <span className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full liquid-glass text-[10px] md:text-sm font-mono text-cream/80 flex items-center gap-2 md:gap-3 whitespace-nowrap">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cream/40"></div>
              Global Deployment Routes
            </span>
          </div>

          <GlitchingTitle />
          
          <div className="flex items-start gap-3 md:gap-4 mb-10 md:mb-16 max-w-xl relative z-10">
             <div className="w-4 h-4 md:w-6 md:h-6 border-l border-b border-cream/20 mt-1 md:mt-2 flex-shrink-0 rounded-bl"></div>
             <p className="text-xs sm:text-sm md:text-base font-mono text-cream/80 leading-relaxed pt-1 md:pt-2 tracking-wide">
               SolarSync Infra helps AI companies and enterprises source hardware GPUs, bare-metal compute, and high-density colocation through trusted partners.
             </p>
          </div>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2, ease }}
             className="relative p-5 md:p-8 rounded-xl max-w-[500px] w-full bg-[#1a1b20] shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-10 group overflow-hidden"
          >
             {/* Hover reflection sweep */}
             <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] transition-transform duration-500 ease-out group-hover:translate-x-[150%] pointer-events-none z-0"></div>

             {/* Window Controls */}
             <div className="flex items-center gap-2 mb-6 md:mb-8">
               <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/30"></div>
               <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/50"></div>
               <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/80"></div>
             </div>

             {/* Code Content */}
             <div className="font-mono text-xs md:text-sm relative z-10 tracking-wide">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Click to execute and jump to capacity request"
                  className="w-full text-left text-white/90 hover:text-white flex items-center justify-between mb-4 md:mb-6 group/cmd cursor-pointer p-1.5 -m-1.5 rounded-lg transition-all hover:bg-white/5"
                >
                  <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                    <span className="text-[#1a1b20] font-bold bg-white px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[10px] md:text-xs shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover/cmd:bg-emerald-400 group-hover/cmd:text-black transition-colors shrink-0">EXEC</span>
                    <span className="group-hover/cmd:underline underline-offset-4 truncate">request_capacity --gpu B300 --nodes 128</span>
                  </div>
                  <span className="text-cream/50 text-[10px] md:text-xs font-mono tracking-widest opacity-0 group-hover/cmd:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
                    &darr;
                  </span>
                </button>
                <div className="space-y-3 md:space-y-4 pl-[3px] ml-2 md:ml-4">
                  <p className="text-white/75 flex items-center gap-3 md:gap-4 pl-3 md:pl-4 relative text-[10px] md:text-sm">
                    <span className="absolute -left-[3px] md:-left-[4px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#27c93f] rounded-full shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span> 
                    Hardware route identified
                  </p>
                  <p className="text-white/75 flex items-center gap-3 md:gap-4 pl-3 md:pl-4 relative text-[10px] md:text-sm">
                    <span className="absolute -left-[3px] md:-left-[4px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#27c93f] rounded-full shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span> 
                    Colocation requirement reviewed
                  </p>
                  <p className="text-white/75 flex items-center gap-3 md:gap-4 pl-3 md:pl-4 relative text-[10px] md:text-sm">
                    <span className="absolute -left-[3px] md:-left-[4px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#27c93f] rounded-full shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span> 
                    Pricing & deployment alignment
                  </p>
                </div>
             </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.4, ease }}
             className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-4 mt-10 md:mt-12 relative z-10 w-full"
          >
            {/* 1. Send Requirement */}
            <a
              href="mailto:ubaid@solarsyncinfra.xyz?subject=SolarSync%20Infra%20-%20GPU%20Requirement&body=Hi%20Ubaid%2C%0A%0AI%20am%20interested%20in%20sourcing%20GPU%20infrastructure%20capacity%20from%20SolarSync%20Infra.%0A%0AWorkload%20%2F%20Requirements%3A%0A-%20GPU%20Model%20(e.g.%20B300%2C%20B200%2C%20H100%2C%20H200)%3A%20%0A-%20Number%20of%20Nodes%20%2F%20GPUs%3A%20%0A-%20Deployment%20Timeline%3A%20%0A-%20Colocation%20%2F%20Power%20Needs%3A%20%0A%0ABest%20regards%2C"
              className="relative group overflow-hidden bg-cream text-deep px-5 py-3 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-mono uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(253,248,231,0.3)] flex items-center justify-center gap-3 font-semibold cursor-pointer text-center"
            >
              <span className="relative z-10">Send Requirement</span>
              <span className="relative z-10 text-base leading-none">&rarr;</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </a>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 md:gap-4">
              {/* 2. Connect on LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ubaid-mohammed-shaikh-a06b19390"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden bg-cream text-deep px-5 py-3 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-mono uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(253,248,231,0.3)] flex items-center justify-center gap-2 font-semibold cursor-pointer w-full sm:w-auto"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-deep animate-pulse"></span>
                <span className="relative z-10 whitespace-nowrap">Connect on LinkedIn</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </a>

              {/* 3. Book a Call (Animated) */}
              <motion.a
                href="https://calendly.com/ubaid-solarsyncinfra/solarsync-infra-gpu-requirements-"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative group overflow-hidden bg-cream text-deep px-5 py-3 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-mono uppercase tracking-wider transition-all hover:shadow-[0_0_35px_rgba(253,248,231,0.4)] flex items-center justify-center gap-2.5 font-semibold cursor-pointer w-full sm:w-auto"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10 whitespace-nowrap">Book a Call</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Hardware Reveal & Capability Tags */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="w-full flex flex-col items-center justify-center relative mt-12 lg:mt-0"
        >
          <HardwareReveal />

          {/* Capability Tags from Image 1 as requested in Image 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6, ease }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-8 md:mt-4 max-w-lg z-20"
          >
            {[
              { label: "B300 / B200 / H200 / H100", dot: "bg-cyan-400", href: "#hardware" },
              { label: "Bare Metal", dot: "bg-emerald-400", href: "#services" },
              { label: "Hardware Sourcing", dot: "bg-amber-400", href: "#services" },
              { label: "Colocation", dot: "bg-purple-400", href: "#hardware" }
            ].map((tag, idx) => (
              <motion.a
                key={idx}
                href={tag.href}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3.5 + idx * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3
                }}
                whileHover={{ scale: 1.06, y: -6 }}
                className="group relative px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#18191f]/90 backdrop-blur-xl border border-white/10 hover:border-white/30 text-cream/90 text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(253,248,231,0.25)] flex items-center gap-1.5 md:gap-2 cursor-pointer"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tag.dot} animate-pulse shrink-0`}></span>
                <span className="group-hover:text-cream transition-colors whitespace-nowrap">{tag.label}</span>
                <span className="text-cream/30 text-[8px] md:text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">&rarr;</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
