import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  title?: string;
}

export default function NeonCard({ children, className = '', glowColor = '#00f2ff', title }: NeonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-xl bg-black/80 border border-white/10 overflow-hidden ${className}`}
      style={{
        boxShadow: `0 0 20px ${glowColor}15`,
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute -top-24 -left-24 w-48 h-48 blur-[80px] rounded-full pointer-events-none"
        style={{ backgroundColor: glowColor, opacity: 0.1 }}
      />
      
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">{title}</h2>
          <div className="h-px flex-1 ml-4 bg-white/5 opacity-50" />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
