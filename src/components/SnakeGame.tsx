import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Point, Direction } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import { Trophy, Play, Pause, RotateCcw, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [isPaused, setIsPaused] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Border collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPaused, isGameOver, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ': // Space to pause/play
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPaused, isGameOver, moveSnake]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="flex flex-col items-center">
      {/* Game Header */}
      <div className="w-full flex justify-between items-end mb-6 font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Score</span>
          <span className="text-2xl text-cyan-400 font-bold glow-cyan">{score.toString().padStart(4, '0')}</span>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Best</span>
            <div className="flex items-center gap-2 text-magenta-500">
              <Trophy size={14} />
              <span className="text-xl font-bold">{highScore.toString().padStart(4, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative p-1 bg-white/5 rounded-lg overflow-hidden border border-white/10 group">
        <div 
          className="grid gap-px bg-black/40"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(80vw, 400px)',
            height: 'min(80vw, 400px)',
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`relative w-full h-full rounded-[1px] transition-colors duration-200 ${
                  isSnake ? '' : 'bg-transparent'
                }`}
              >
                {isSnake && (
                  <motion.div 
                    layoutId={`snake-${x}-${y}`}
                    className={`absolute inset-0 rounded-[1px] ${
                      isHead ? 'bg-cyan-400 z-20 shadow-[0_0_10px_#00f2ff]' : 'bg-cyan-500/40 z-10'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {isFood && (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 m-1 rounded-full bg-magenta-500 shadow-[0_0_15px_#ff00ff]"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Overlay Screens */}
        <AnimatePresence>
          {(isPaused && !isGameOver) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <button 
                onClick={() => setIsPaused(false)}
                className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/40 transition-all hover:scale-110 group/play"
              >
                <Play fill="currentColor" size={32} className="ml-1 group-hover/play:scale-110 transition-transform" />
              </button>
              <p className="mt-4 text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] animate-pulse">Press Space to Start</p>
              
              <div className="mt-8 flex gap-6 text-white/30">
                <div className="flex flex-col items-center gap-2">
                  <div className="px-2 py-1 rounded border border-white/20 text-xs">W,A,S,D</div>
                  <span className="text-[10px] uppercase">Move</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="px-3 py-1 rounded border border-white/20 text-xs">SPACE</div>
                  <span className="text-[10px] uppercase">Pause</span>
                </div>
              </div>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
            >
              <h2 className="text-4xl font-bold text-magenta-500 mb-2 glow-magenta uppercase italic tracking-tighter">System Error</h2>
              <p className="text-white/40 mb-8 font-mono text-xs uppercase tracking-widest">Connection Terminated</p>
              
              <button 
                onClick={resetGame}
                className="flex items-center gap-3 px-8 py-3 rounded-full bg-magenta-500 text-white font-bold hover:bg-magenta-600 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_#ff00ff44]"
              >
                <RotateCcw size={20} />
                REBOOT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Buttons (for mobile/mouse) */}
      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div/>
        <ControlButton onClick={() => direction !== 'DOWN' && setDirection('UP')} icon="UP" />
        <div/>
        <ControlButton onClick={() => direction !== 'RIGHT' && setDirection('LEFT')} icon="LEFT" />
        <ControlButton onClick={() => setIsPaused(p => !p)} icon={isPaused ? "PLAY" : "PAUSE"} />
        <ControlButton onClick={() => direction !== 'LEFT' && setDirection('RIGHT')} icon="RIGHT" />
        <div/>
        <ControlButton onClick={() => direction !== 'UP' && setDirection('DOWN')} icon="DOWN" />
        <div/>
      </div>
    </div>
  );
}

function ControlButton({ onClick, icon }: { onClick: () => void, icon: string }) {
  const renderIcon = () => {
    switch (icon) {
      case 'UP': return <div className="w-1 h-1 border-t-2 border-l-2 border-white rotate-45" />;
      case 'DOWN': return <div className="w-1 h-1 border-b-2 border-r-2 border-white rotate-45" />;
      case 'LEFT': return <div className="w-1 h-1 border-b-2 border-l-2 border-white rotate-45" />;
      case 'RIGHT': return <div className="w-1 h-1 border-t-2 border-r-2 border-white rotate-45" />;
      case 'PLAY': return <Play size={16} fill="currentColor" />;
      case 'PAUSE': return <Pause size={16} fill="currentColor" />;
      default: return null;
    }
  }

  return (
    <button 
      onClick={onClick}
      className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 active:bg-white/20 transition-colors"
    >
      {renderIcon()}
    </button>
  );
}
