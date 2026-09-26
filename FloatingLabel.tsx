import { motion } from 'motion/react';

interface FloatingLabelProps {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: number;
}

export function FloatingLabel({ label, top, bottom, left, right, delay = 0 }: FloatingLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="absolute z-30 flex items-center gap-2"
      style={{ top, bottom, left, right }}
    >
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100">
        <div className="w-2 h-2 bg-black rounded-full" />
        <span className="text-xs font-bold tracking-wide">{label}</span>
      </div>
    </motion.div>
  );
}
