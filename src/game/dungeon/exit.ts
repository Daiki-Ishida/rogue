import p5, { Image } from 'p5';
import { Room } from '.';
import { imageStore } from '../..';
import { Camera } from '../../drawer';
import { RandomUtil } from '../../util';

export class Exit {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly img: Image = imageStore.maps.exit
  ) {}

  static generate(room: Room): Exit {
    const x = RandomUtil.getRandomIntInclusive(room.x + 1, room.x + room.w - 1);
    const y = RandomUtil.getRandomIntInclusive(room.y + 1, room.y + room.h - 1);

    return new Exit(x, y);
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    const size = camera.zoom * 0.7;
    p.image(this.img, x, y, size, size);
  }
}
