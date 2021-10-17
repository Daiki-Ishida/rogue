import p5 from 'p5';
import { Area } from '../area';
import { Camera } from 'game/view';

export interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  area: Area;
  draw(p: p5, camera: Camera, level: number): void;
}
