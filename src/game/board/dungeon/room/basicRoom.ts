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
    const w = RandomUtil.getRandomIntInclusive(MIN_WIDTH, node.w - 6);
    const h = RandomUtil.getRandomIntInclusive(MIN_HEIGHT, node.h - 6);

    const x = node.x + RandomUtil.getRandomIntInclusive(5, node.w - w - 1);
    const y = node.y + RandomUtil.getRandomIntInclusive(5, node.h - h - 1);

    return new BasicRoom(x, y, w, h, node);
  }

  draw(p: p5, camera: Camera, level: number): void {
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

    for (let i = -1; i < this.w + 1; i++) {
      for (let j = -1; j < this.h + 1; j++) {
        const { x, y } = camera.adjust(i + this.x, j + this.y);
        if (j === -1) {
          // 上の辺
          switch (i) {
            case -1:
              p.image(
                mapChips.roomEdge[0],
                x,
                y - camera.zoom * 0.5,
                camera.zoom,
                camera.zoom * 2
              );
              break;
            case this.w:
              p.image(
                mapChips.roomEdge[1],
                x,
                y - camera.zoom * 0.5,
                camera.zoom,
                camera.zoom * 2
              );
              break;
            default:
              p.image(
                mapChips.roomSide[0],
                x,
                y - camera.zoom * 0.5,
                camera.zoom,
                camera.zoom * 2
              );
              break;
          }
        }

        if (j >= 0 && j < this.h) {
          // 中
          switch (i) {
            case -1:
              p.image(mapChips.roomSide[1], x, y, camera.zoom, camera.zoom);
              break;
            case this.w:
              p.image(mapChips.roomSide[2], x, y, camera.zoom, camera.zoom);
              break;
            default:
              p.image(mapChips.roomInside[0], x, y, camera.zoom, camera.zoom);
              break;
          }
        }

        if (j === this.h) {
          // 下の辺
          switch (i) {
            case -1:
              p.image(mapChips.roomEdge[2], x, y, camera.zoom, camera.zoom);
              break;
            case this.w:
              p.image(mapChips.roomEdge[3], x, y, camera.zoom, camera.zoom);
              break;
            default:
              p.image(mapChips.roomSide[3], x, y, camera.zoom, camera.zoom);
              break;
          }
        }
      }
    }
  }
}
