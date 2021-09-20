import p5 from 'p5';
import { Area } from '..';
import { Camera } from '../../../drawer';

export interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  area: Area;
  draw(p: p5, camera: Camera): void;
}
