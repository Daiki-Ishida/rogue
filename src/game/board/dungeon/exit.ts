import p5, { Image } from 'p5';
import { imageStore } from 'game';
import { Camera } from 'game/drawer';
import { RandomUtil } from 'game/util/ramdom';
import { Room } from './room';

export class Exit {
  constructor(
    public x: number,
    public y: number,
    readonly img: Image = imageStore.maps.exit
  ) {}

  spawn(room: Room): void {
    this.x = RandomUtil.getRandomIntInclusive(room.x + 1, room.x + room.w - 2);
    this.y = RandomUtil.getRandomIntInclusive(room.y + 1, room.y + room.h - 2);
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    const size = camera.zoom * 0.7;
    p.image(this.img, x, y, size, size);
  }
}
