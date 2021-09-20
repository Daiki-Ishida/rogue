import p5 from 'p5';
import { imageStore } from '../..';
import { Camera } from '../../drawer';

export class Corridor {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly isCorner: boolean
  ) {}

  draw(p: p5, camera: Camera): void {
    const img = imageStore.maps.corridor[3];
    const { x, y } = camera.adjust(this.x, this.y);
    p.image(img, x, y, camera.zoom, camera.zoom);
  }
}
