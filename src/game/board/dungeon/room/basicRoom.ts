import p5, { Image } from 'p5';
import { imageStore } from 'game';
import { RandomUtil } from 'game/util';
import { Camera } from 'game/drawer';
import { Room } from './room';
import { Area } from '../area';

const MIN_WIDTH = 6;
const MIN_HEIGHT = 6;

export class BasicRoom implements Room {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    readonly area: Area,
    private chips: Image[]
  ) {}

  static generate(node: Area, level: number): BasicRoom {
    const w = RandomUtil.getRandomIntInclusive(MIN_WIDTH, node.w - 6);
    const h = RandomUtil.getRandomIntInclusive(MIN_HEIGHT, node.h - 6);

    const x = node.x + RandomUtil.getRandomIntInclusive(5, node.w - w - 1);
    const y = node.y + RandomUtil.getRandomIntInclusive(5, node.h - h - 1);

    const room = new BasicRoom(x, y, w, h, node, []);

    let map;
    const chips: Image[] = [];

    if (level <= 3) {
      map = imageStore.maps.roomB;
    } else if (level <= 14) {
      map = imageStore.maps.roomD;
    } else if (level <= 25) {
      map = imageStore.maps.roomC;
    } else {
      map = imageStore.maps.roomA;
    }

    for (let i = -2; i < room.h + 1; i++) {
      for (let j = -1; j < room.w + 1; j++) {
        if (i === -2) {
          // 上の辺
          switch (j) {
            case -1:
              chips.push(map[0]);
              break;
            case room.w:
              chips.push(map[2]);
              break;
            default:
              chips.push(map[1]);
              break;
          }
        }
        if (i === -1) {
          // 上の辺
          switch (j) {
            case -1:
              chips.push(map[3]);
              break;
            case room.w:
              chips.push(map[5]);
              break;
            default:
              chips.push(map[4]);
              break;
          }
        }
        if (i >= 0 && i < room.h) {
          // 中
          switch (j) {
            case -1:
              chips.push(map[6]);
              break;
            case room.w:
              chips.push(map[8]);
              break;
            default:
              chips.push(map[7]);
              break;
          }
        }

        if (i === room.h) {
          // 下の辺
          switch (j) {
            case -1:
              chips.push(map[9]);
              break;
            case room.w:
              chips.push(map[11]);
              break;
            default:
              chips.push(map[10]);
              break;
          }
        }
      }
    }

    room.chips = chips;
    return room;
  }

  draw(p: p5, camera: Camera): void {
    for (let i = 0; i < this.chips.length; i++) {
      const grid = indexToGrid(i, this.w + 2);
      const _x = this.x + grid[0] - 1;
      const _y = this.y + grid[1] - 2;
      const { x, y } = camera.adjust(_x, _y);
      p.image(this.chips[i], x, y, camera.zoom, camera.zoom);
    }
  }
}

// todo refactor
const indexToGrid = (idx: number, w: number) => {
  const x = idx % w;
  const y = (idx - x) / w;
  return [x, y];
};
