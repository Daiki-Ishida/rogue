import p5, { Image } from 'p5';
import { Camera } from '../../drawer';

export interface TrapSymbol {
  x: number;
  y: number;
  img: Image;
  draw(p: p5, camera: Camera): void;
}

export abstract class TrapSymbolBase implements TrapSymbol {
  constructor(
    readonly img: Image,
    readonly x: number = 0,
    readonly y: number = 0
  ) {}

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    p.image(this.img, x, y, camera.zoom, camera.zoom);
  }
}
