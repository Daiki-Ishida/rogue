import { imageStore } from 'game';
import { Camera } from 'game/view';
import p5, { Image } from 'p5';

export class Corridor {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly img: Image
  ) {}

  static generate(x: number, y: number, level: number): Corridor {
    let mapChips;
    if (level <= 3) {
      mapChips = imageStore.maps.roomB;
    } else if (level <= 14) {
      mapChips = imageStore.maps.roomD;
    } else if (level <= 25) {
      mapChips = imageStore.maps.roomC;
    } else {
      mapChips = imageStore.maps.roomA;
    }

    const img = mapChips.roomInside[0];
    return new Corridor(x, y, img);
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    p.image(this.img, x, y, camera.zoom, camera.zoom);
  }
}
