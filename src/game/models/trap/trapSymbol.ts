import p5, { Image } from 'p5';
import { Camera } from '../../view';

export interface ITrapSymbol {
  x: number;
  y: number;
  img: Image;
  draw(p: p5, camera: Camera): void;
}

export class TrapSymbol implements ITrapSymbol {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly img: Image
  ) {}

  static init(img: Image): TrapSymbol {
    return new TrapSymbol(0, 0, img);
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    p.image(this.img, x, y, camera.zoom, camera.zoom);
  }
}
