import { imageStore } from 'game';
import { Camera } from 'game/view';
import p5, { Image } from 'p5';

export class Corridor {
  constructor(readonly x: number, readonly y: number, readonly img: Image) {}

  static generate(x: number, y: number): Corridor {
    const img = imageStore.maps.roomInside[0];
    return new Corridor(x, y, img);
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    p.image(this.img, x, y, camera.zoom, camera.zoom);
  }
}
