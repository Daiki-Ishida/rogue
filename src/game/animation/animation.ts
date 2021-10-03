import p5 from 'p5';
import { Camera } from '../view';

export interface Animation {
  frame: number;
  done: boolean;
  exec(): void;
  draw(p: p5, camera: Camera): void;
  callback?: () => void;
}
