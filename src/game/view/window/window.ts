import p5 from 'p5';

export interface Window {
  x: number;
  y: number;
  w: number;
  h: number;
  display: boolean;
  open(): void;
  close(): void;
  draw(p: p5): void;
}
