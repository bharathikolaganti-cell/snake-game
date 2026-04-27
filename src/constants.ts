/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Track } from './types';

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = 'UP';
export const GAME_SPEED = 100;

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Silicon Drift',
    artist: 'AI Voyager',
    duration: '3:45',
    color: '#00f2ff', // Cyan neon
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Neural Network',
    duration: '4:12',
    color: '#ff00ff', // Magenta neon
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Synthetic Mind',
    duration: '2:58',
    color: '#39ff14', // Lime neon
  },
];
