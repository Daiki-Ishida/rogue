import p5 from 'p5';
import { Area, Corridor, Exit, Room } from '.';
import { Camera } from '../../drawer';
import { RandomUtil } from '../util';

export class Dungeon {
  constructor(
    readonly w: number,
    readonly h: number,
    public area: Area,
    public exit: Exit,
    public rooms: Room[] = [],
    readonly corridors: Corridor[] = [],
    public level: number = 1
  ) {}

  static init(w: number, h: number): Dungeon {
    const area = Area.init(w, h);
    const dungeon = new Dungeon(w, h, area, new Exit(0, 0));
    dungeon.generate();
    return dungeon;
  }

  generate(): void {
    this.initRooms();
    this.initCorridor();
    const random = RandomUtil.getRandomIntInclusive(0, this.rooms.length - 1);
    this.exit = Exit.generate(this.rooms[random]);
  }

  private reset(): void {
    this.area = Area.init(this.w, this.h);
    this.rooms = [];
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
          this.corridors.push(new Corridor(i, entry, false));
        }
        for (let i = roomB.x - 1; i > border; i--) {
          this.corridors.push(new Corridor(i, exit, false));
        }
        for (let i = Math.min(entry, exit); i <= Math.max(entry, exit); i++) {
          this.corridors.push(new Corridor(border, i, false));
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
          this.corridors.push(new Corridor(entry, i, false));
        }
        for (let i = roomB.y - 1; i > border; i--) {
          this.corridors.push(new Corridor(exit, i, false));
        }
        for (let i = Math.min(entry, exit); i <= Math.max(entry, exit); i++) {
          this.corridors.push(new Corridor(i, border, false));
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
