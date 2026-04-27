import React, { useState, useEffect } from 'react';
import { DUMMY_TRACKS } from '../constants';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p + 0.5) % 100);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentTrackIndex((i) => (i + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((i) => (i - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Visualizer / Album Art */}
      <div className="relative aspect-square w-full rounded-lg bg-white/5 overflow-hidden flex items-center justify-center border border-white/10">
        <motion.div 
          animate={{ 
            scale: isPlaying ? [1, 1.05, 1] : 1,
            rotate: isPlaying ? [0, 3, -3, 0] : 0
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="relative z-10 w-32 h-32 flex items-center justify-center rounded-full bg-black/40 border-2"
          style={{ borderColor: currentTrack.color }}
        >
          <Music size={48} style={{ color: currentTrack.color }} />
        </motion.div>

        {/* Ambient background visualizer-ish bars */}
        <div className="absolute inset-0 flex items-end justify-center gap-1 p-2 opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: isPlaying ? `${Math.random() * 80 + 20}%` : '10%' 
              }}
              className="flex-1 rounded-t-sm"
              style={{ backgroundColor: currentTrack.color }}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-1">
        <AnimatePresence mode="wait">
          <motion.h3 
            key={currentTrack.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-xl font-bold tracking-tight text-white"
          >
            {currentTrack.title}
          </motion.h3>
        </AnimatePresence>
        <p className="text-sm text-white/40 uppercase tracking-[0.2em]">{currentTrack.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full"
            style={{ backgroundColor: currentTrack.color, width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/30">
          <span>01:23</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button className="text-white/40 hover:text-white transition-colors">
          <Volume2 size={18} />
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrev}
            className="p-2 text-white/60 hover:text-white transition-colors hover:scale-110 active:scale-95"
          >
            <SkipBack fill="currentColor" size={24} />
          </button>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: currentTrack.color, boxShadow: `0 0 20px ${currentTrack.color}44` }}
          >
            {isPlaying ? (
              <Pause fill="white" size={28} className="text-white" />
            ) : (
              <Play fill="white" size={28} className="text-white ml-1" />
            )}
          </button>

          <button 
            onClick={handleNext}
            className="p-2 text-white/60 hover:text-white transition-colors hover:scale-110 active:scale-95"
          >
            <SkipForward fill="currentColor" size={24} />
          </button>
        </div>

        <div className="w-4 h-4 rounded-full border border-white/20 animate-spin-slow" />
      </div>
    </div>
  );
}
