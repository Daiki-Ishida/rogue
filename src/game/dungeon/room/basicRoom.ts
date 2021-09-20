import { imageStore } from 'game';
import { RandomUtil } from 'game/util';
import { Camera } from 'game/view';
import p5 from 'p5';
import { Area } from '../area';
import { Room } from './room';

const MIN_WIDTH = 6;
const MIN_HEIGHT = 6;

export class BasicRoom implements Room {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    readonly area: Area
  ) {}

  static generate(node: Area): BasicRoom {
    const w = RandomUtil.getRandomIntInclusive(MIN_WIDTH, node.w - 3);
    const h = RandomUtil.getRandomIntInclusive(MIN_HEIGHT, node.h - 3);

    const x = node.x + RandomUtil.getRandomIntInclusive(3, node.w - w) - 1;
    const y = node.y + RandomUtil.getRandomIntInclusive(3, node.h - h) - 1;

    return new BasicRoom(x, y, w, h, node);
  }

  draw(p: p5, camera: Camera): void {
    const mapChips = imageStore.maps;

    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        const { x, y } = camera.adjust(i + this.x, j + this.y);

        if (i === 0) {
          switch (j) {
            case 0:
              p.image(mapChips.roomEdge[0], x, y, camera.zoom, camera.zoom);
              break;
            case this.h - 1:
              p.image(mapChips.roomEdge[2], x, y, camera.zoom, camera.zoom * 2);
              break;
            default:
              p.image(mapChips.roomSide[4], x, y, camera.zoom, camera.zoom);
              break;
          }
        } else if (i === this.w - 1) {
          switch (j) {
            case 0:
              p.image(mapChips.roomEdge[1], x, y, camera.zoom, camera.zoom);
              break;
            case this.h - 1:
              p.image(mapChips.roomEdge[3], x, y, camera.zoom, camera.zoom * 2);
              break;
            default:
              p.image(mapChips.roomSide[5], x, y, camera.zoom, camera.zoom);
              break;
          }
        } else {
          switch (j) {
            case 0:
              p.image(mapChips.roomSide[0], x, y, camera.zoom, camera.zoom);
              break;
            case this.h - 1:
              p.image(mapChips.roomSide[7], x, y, camera.zoom, camera.zoom * 2);
              break;
            default:
              p.image(mapChips.roomInside[2], x, y, camera.zoom, camera.zoom);
              break;
          }
        }
      }
    }
  }
}
