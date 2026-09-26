import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const dxCloud = -15;
const dyCloud = -15;

const paths = {
  cloud: (
    <g>
      {/* Central Core Data Node */}
      <motion.polygon points="100,50 140,70 100,90 60,70" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
      <motion.polygon points="60,70 100,90 100,130 60,110" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
      <motion.polygon points="100,90 140,70 140,110 100,130" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
      
      {/* Outer Orbiting Data Nodes */}
      {/* Left Node */}
      <motion.polygon points="30,80 50,90 30,100 10,90" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
      <motion.polygon points="10,90 30,100 30,120 10,110" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
      <motion.polygon points="30,100 50,90 50,110 30,120" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
      
      {/* Right Node */}
      <motion.polygon points="170,40 190,50 170,60 150,50" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }} />
      <motion.polygon points="150,50 170,60 170,80 150,70" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }} />
      <motion.polygon points="170,60 190,50 190,70 170,80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }} />

      {/* Top Node */}
      <motion.polygon points="130,10 145,17.5 130,25 115,17.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.1 }} />
      <motion.polygon points="115,17.5 130,25 130,40 115,32.5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.1 }} />
      <motion.polygon points="130,25 145,17.5 145,32.5 130,40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.1 }} />

      {/* Network Connection Lines (Data Pathways) */}
      <motion.polyline points="50,100 80,115 100,105" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.5 }} />
      <motion.polyline points="150,60 120,75 100,65" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.7 }} />
      <motion.polyline points="130,32.5 130,55 110,65" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.9 }} />

      {/* Hovering Data Packets (Blinking Orbs) */}
      <motion.circle cx="80" cy="115" r="2" fill="rgba(255,255,255,1)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
      <motion.circle cx="120" cy="75" r="2" fill="rgba(255,255,255,1)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.8 }} />
    </g>
  ),
  gpu: (
    <g>
      {/* Front-Left Face */}
      <motion.polygon 
        points="30,85 80,110 80,140 30,115" 
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} 
      />
      
      {/* Front-Right Face */}
      <motion.polygon 
        points="80,110 170,65 170,95 80,140" 
        fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }} 
      />
      
      {/* Top Face */}
      <motion.polygon 
        points="120,40 170,65 80,110 30,85" 
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: 0.4 }} 
      />
      
      {/* PCIe Gold Fingers */}
      <motion.polygon 
        points="40,120 65,132.5 65,140.5 40,128" 
        fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinejoin="round" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }} 
      />
      
      {/* Heatsink Grooves */}
      {[40, 50, 60, 70].map((x, i) => (
        <motion.line 
          key={i} x1={x} y1={85 + (x-30)*0.5} x2={x} y2={115 + (x-30)*0.5} 
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 + i*0.1 }} 
        />
      ))}
      
      {/* Dual Fans on Top Face */}
      {/* Fan 1 */}
      <motion.ellipse cx="82" cy="84" rx="18" ry="9" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.2 }} />
      <motion.ellipse cx="82" cy="84" rx="6" ry="3" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.4 }} />
      <motion.line x1="64" y1="84" x2="100" y2="84" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.6 }} />
      <motion.line x1="82" y1="75" x2="82" y2="93" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.6 }} />

      {/* Fan 2 */}
      <motion.ellipse cx="118" cy="66" rx="18" ry="9" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.3 }} />
      <motion.ellipse cx="118" cy="66" rx="6" ry="3" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.5 }} />
      <motion.line x1="100" y1="66" x2="136" y2="66" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.7 }} />
      <motion.line x1="118" y1="57" x2="118" y2="75" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.7 }} />
    </g>
  ),
  computer: (
    <g>
      {/* Base Drop Shadow */}
      <motion.polygon points="70,175 115,197 160,175 115,153" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
      
      {/* Top panel */}
      <motion.polygon points="70,40 115,60 160,40 115,20" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
      
      {/* Front panel */}
      <motion.polygon points="70,170 115,190 115,60 70,40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
      
      {/* Right panel */}
      <motion.polygon points="115,190 160,170 160,40 115,60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
      
      {/* Server Blades (Lines on front & right) */}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => {
         const yOffset = i * 15;
         return (
           <g key={i}>
             {/* Front blade line */}
             <motion.line x1="70" y1={40 + yOffset} x2="115" y2={60 + yOffset} stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: i * 0.1 }} />
             {/* Right blade line */}
             <motion.line x1="115" y1={60 + yOffset} x2="160" y2={40 + yOffset} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: i * 0.1 }} />
             {/* Server Blinking LEDs */}
             <motion.circle cx="78" cy={48 + yOffset} r="1.5" fill="rgba(255,255,255,0.9)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
           </g>
         )
      })}
    </g>
  )
};

const sequence = ['cloud', 'gpu', 'computer'] as const;

export function IsometricMorph() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    // 3s drawing + 3s hold = 6s total cycle
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % sequence.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const activeShape = sequence[activeIdx];

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
           <AnimatePresence mode="wait">
             <motion.g 
               key={activeShape}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, transition: { duration: 0.5 } }}
             >
               {paths[activeShape]}
             </motion.g>
           </AnimatePresence>
        </svg>
      </div>
    </div>
  );
}
