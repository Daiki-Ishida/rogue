import p5 from 'p5';
import { Area } from './area';
import { Room } from './room';
import { Exit } from './exit';
import { Corridor } from './corridor';
import { Camera } from 'game/view';
import { RandomUtil } from 'game/util';
import { imageStore } from 'game';

export class Dungeon {
  private constructor(
    readonly w: number,
    readonly h: number,
    private area: Area,
    public rooms: Room[],
    readonly exit: Exit,
    public corridors: Corridor[],
    public level: number
  ) {}

  static init(w: number, h: number): Dungeon {
    const area = Area.init(w, h);
    const dungeon = new Dungeon(w, h, area, [], new Exit(0, 0), [], 1);
    dungeon.generate();
    return dungeon;
  }

  generate(): void {
    this.initRooms();
    this.initCorridor();
    const random = RandomUtil.getRandomIntInclusive(0, this.rooms.length - 1);
    this.exit.spawn(this.rooms[random]);
  }

  private reset(): void {
    this.area = Area.init(this.w, this.h);
    this.rooms = [];
    this.corridors = [];
  }

  next(): void {
    this.level++;
    this.reset();
    this.generate();
  }

  private initRooms(): void {
    this.area.split();
    this.rooms = this.area.makeRooms();
  }

  private initCorridor(): void {
    for (const node of Array.from(this.area)) {
      if (node.isLeafNode()) continue;

      const childA = node.childNodes[0];
      const childB = node.childNodes[1];

      const roomsA = this.rooms.filter((r) => r.area.hasAncestor(childA));
      const roomsB = this.rooms.filter((r) => r.area.hasAncestor(childB));

      const img = imageStore.maps.roomInside[0];

      if (childA.y === childB.y) {
        const border = childA.x + childA.w;

        const fn0 = (r0: Room, r1: Room) =>
          Math.abs(r0.x + r0.w - border) - Math.abs(r1.x + r1.w - border);
        const fn1 = (r0: Room, r1: Room) =>
          Math.abs(r0.x - border) - Math.abs(r1.x - border);

        const roomA = roomsA.sort(fn0)[0];
        const roomB = roomsB.sort(fn1)[0];

        const entry = RandomUtil.getRandomIntInclusive(
          roomA.y + 1,
          roomA.y + roomA.h - 2
        );
        const exit = RandomUtil.getRandomIntInclusive(
          roomB.y + 1,
          roomB.y + roomB.h - 2
        );

        // roomA.connnectionPoint.push([roomA.x + roomA.w, entry]);
        // roomB.connnectionPoint.push([roomB.x - 1, exit]);

        for (let i = roomA.x + roomA.w; i < border; i++) {
          this.corridors.push(new Corridor(i, entry, img));
        }
        for (let i = roomB.x - 1; i > border; i--) {
          this.corridors.push(new Corridor(i, exit, img));
        }
        for (let i = Math.min(entry, exit); i <= Math.max(entry, exit); i++) {
          this.corridors.push(new Corridor(border, i, img));
        }
      } else if (childA.x === childB.x) {
        const border = childA.y + childA.h;

        const fn0 = (r0: Room, r1: Room) =>
          Math.abs(r0.y + r0.h - border) - Math.abs(r1.y + r1.h - border);
        const fn1 = (r0: Room, r1: Room) =>
          Math.abs(r0.y - border) - Math.abs(r1.y - border);

        const roomA = roomsA.sort(fn0)[0];
        const roomB = roomsB.sort(fn1)[0];

        const entry = RandomUtil.getRandomIntInclusive(
          roomA.x + 1,
          roomA.x + roomA.w - 2
        );
        const exit = RandomUtil.getRandomIntInclusive(
          roomB.x + 1,
          roomB.x + roomB.w - 2
        );

        // roomA.connnectionPoint.push([entry, roomA.y + roomA.h]);
        // roomB.connnectionPoint.push([exit, roomB.y - 1]);

        for (let i = roomA.y + roomA.h; i < border; i++) {
          this.corridors.push(new Corridor(entry, i, img));
        }
        for (let i = roomB.y - 1; i > border; i--) {
          this.corridors.push(new Corridor(exit, i, img));
        }
        for (let i = Math.min(entry, exit); i <= Math.max(entry, exit); i++) {
          this.corridors.push(new Corridor(i, border, img));
        }
      }
    }
  }

  draw(p: p5, camera: Camera): void {
    for (const room of this.rooms) {
      room.draw(p, camera);
    }

    for (const corridor of this.corridors) {
      corridor.draw(p, camera);
    }

    this.exit.draw(p, camera);
  }
}
