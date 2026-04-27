/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import NeonCard from './components/NeonCard';
import { motion } from 'motion/react';
import { Github, Twitter, Info } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 px-6 py-8 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_15px_#00f2ff44]">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#00f2ff]" />
            </div>
            <div>
              <h1 className="text-xl font-bold italic tracking-tighter uppercase leading-none hover:animate-glitch select-none cursor-default">Neon Viper</h1>
              <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">v1.2.4-stable</span>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/50">
            <a href="#" className="hover:text-cyan-400 transition-colors">Terminal</a>
            <a href="#" className="hover:text-magenta-500 transition-colors">Records</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Grid</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full border border-white/5 hover:bg-white/5 transition-colors">
              <Github size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Stats/System */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <NeonCard title="System Diagnostics" glowColor="#ff00ff">
              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">CPU LOAD</span>
                  <span className="text-magenta-500">22%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '22%' }}
                    className="h-full bg-magenta-500"
                  />
                </div>
                
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-white/40">SYNC-RATE</span>
                  <span className="text-cyan-400">144HZ</span>
                </div>
                
                <div className="pt-4 border-t border-white/5 text-[10px] text-white/30 leading-relaxed">
                  <p>CORE_TEMPERATURE: 42°C</p>
                  <p>ENCRYPTION: AES-256</p>
                  <p>LOCATION: GRID_07</p>
                </div>
              </div>
            </NeonCard>

            <NeonCard title="History" glowColor="#39ff14">
              <div className="space-y-3 font-mono">
                {[
                  { user: 'USER_01', score: 1420 },
                  { user: 'USER_XR', score: 980 },
                  { user: 'GUEST_9', score: Math.floor(Math.random() * 500) }
                ].map((log, i) => (
                  <div key={i} className="flex justify-between text-xs items-center p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-green-500/70">{log.user}</span>
                    <span className="text-white/40">{log.score}</span>
                  </div>
                ))}
              </div>
            </NeonCard>
          </div>

          {/* Center Column - Game */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <NeonCard className="h-full" glowColor="#00f2ff">
              <SnakeGame />
            </NeonCard>
          </div>

          {/* Right Column - Music */}
          <div className="lg:col-span-3 order-3">
            <NeonCard title="Audio Flux" glowColor="#00f2ff">
              <MusicPlayer />
            </NeonCard>
            
            {/* Quick Info */}
            <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/2">
              <div className="flex items-start gap-4">
                <Info className="text-cyan-400 shrink-0" size={18} />
                <p className="text-[11px] leading-relaxed text-white/40 italic">
                  Music provided by Synthetic Mind Lab. Ambient visuals react to the game intensity. 
                  Don't touch the borders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            <span className="text-xs font-mono text-white/20">© 2026 DIGITAL_EXTINCTION</span>
            <span className="text-xs font-mono text-white/20">|</span>
            <span className="text-xs font-mono text-white/20">PRIVACY_ZERO</span>
          </div>
          
          <div className="flex gap-6">
            <button className="text-white/40 hover:text-cyan-400 transition-colors"><Twitter size={18} /></button>
            <button className="text-white/40 hover:text-magenta-500 transition-colors"><Github size={18} /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}
