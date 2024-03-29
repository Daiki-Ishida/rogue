import p5, { Image } from 'p5';
import { Camera } from 'game/drawer';

export class ItemSymbol {
  constructor(
    readonly img: Image,
    public x: number = 0,
    public y: number = 0
  ) {}

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    const size = camera.zoom * 0.7;
    p.image(this.img, x, y, size, size);
  }
}
