import p5 from 'p5';
import { imageStore } from 'game';
import { Dungeon } from 'game/dungeon';
import { Exit } from 'game/dungeon/exit';
import { Room } from 'game/dungeon/room';
import { Actor } from 'game/models/actor';
import { Item } from 'game/models/item';
import { Trap } from 'game/models/trap';
import { RandomUtil } from 'game/util';
import { Camera } from 'game/view';
import { BaseLayer, DungeonLayer, Layer, Tile } from './layer';

export interface IBoard {
  w: number;
  h: number;
  dungeon: Dungeon;
  actors: Actor[];
  items: Item[];
  traps: Trap[];
  baseLayer: Layer;
  dungeonLayer: Layer;
  findTrap(x: number, y: number): Trap | undefined;
  findItem(x: number, y: number): Item | undefined;
  findActor(x: number, y: number): Actor | undefined;
  findRoom(x: number, y: number): Room | undefined;
  findExit(x: number, y: number): Exit | undefined;
  clearActor(actor: Actor): void;
  clearItem(item: Item): void;
  clearTrap(trap: Trap): void;
  isBlock(x: number, y: number): boolean;
  isRoom(x: number, y: number): boolean;
  isCorridor(x: number, y: number): boolean;
  getExit(): { x: number; y: number };
  getRandomEmpty(): { x: number; y: number };
  draw(p: p5, camera: Camera): void;
}

export class Board implements IBoard {
  constructor(
    readonly w: number,
    readonly h: number,
    readonly dungeon: Dungeon,
    public actors: Actor[],
    public items: Item[],
    public traps: Trap[],
    readonly baseLayer: Layer,
    readonly dungeonLayer: Layer
  ) {}

  static init(w: number, h: number): Board {
    const dungeon = Dungeon.init(w, h);
    const dungeonLayer = DungeonLayer.init(w, h);
    dungeonLayer.apply(dungeon);
    return new Board(
      w,
      h,
      dungeon,
      [],
      [],
      [],
      BaseLayer.init(w, h),
      dungeonLayer
    );
  }

  findTrap(x: number, y: number): Trap | undefined {
    return this.traps.find((it) => it.x === x && it.y === y);
  }

  findItem(x: number, y: number): Item | undefined {
    return this.items.find((it) => it.x === x && it.y === y);
  }

  findActor(x: number, y: number): Actor | undefined {
    return this.actors.find((it) => it.x === x && it.y === y);
  }

  findRoom(x: number, y: number): Room | undefined {
    return this.dungeon.rooms.find((room) => {
      return (
        room.x <= x && room.x + room.w > x && room.y <= y && room.y + room.h > y
      );
    });
  }

  findExit(x: number, y: number): Exit | undefined {
    const exit = this.getExit();
    return exit.x === x && exit.y === y ? this.dungeon.exit : undefined;
  }

  clearActor(actor: Actor): void {
    this.actors = this.actors.filter((a) => a !== actor);
  }

  clearItem(item: Item): void {
    this.items = this.items.filter((i) => i !== item);
  }

  clearTrap(trap: Trap): void {
    this.traps = this.traps.filter((t) => t !== trap);
  }

  private isEmpty(x: number, y: number): boolean {
    if (!this.isRoom(x, y)) return false;

    const actor = this.findActor(x, y);
    if (actor) return false;

    const item = this.findItem(x, y);
    if (item) return false;

    const trap = this.findTrap(x, y);
    if (trap) return false;

    const exit = this.findExit(x, y);
    if (exit) return false;

    return true;
  }

  getRandomEmpty(): { x: number; y: number } {
    let found: { x: number; y: number } | undefined;

    while (found === undefined) {
      const random = RandomUtil.getRandomIntInclusive(
        0,
        this.dungeon.rooms.length - 1
      );
      const room = this.dungeon.rooms[random];

      const rx = RandomUtil.getRandomIntInclusive(room.x, room.x + room.w);
      const ry = RandomUtil.getRandomIntInclusive(room.y, room.y + room.h);

      if (this.isEmpty(rx, ry)) {
        found = { x: rx, y: ry };
      }
    }

    return found;
  }

  getExit(): { x: number; y: number } {
    return {
      x: this.dungeon.exit.x,
      y: this.dungeon.exit.y,
    };
  }

  isBlock(x: number, y: number): boolean {
    const tile = this.dungeonLayer.tileAt(x, y);
    return tile === Tile.BLOCK;
  }

  isRoom(x: number, y: number): boolean {
    const tile = this.dungeonLayer.tileAt(x, y);
    return tile === Tile.ROOM;
  }

  isCorridor(x: number, y: number): boolean {
    const tile = this.dungeonLayer.tileAt(x, y);
    return tile === Tile.CORRIDOR;
  }

  isExit(x: number, y: number): boolean {
    const exit = this.getExit();
    return x === exit.x && y === exit.y;
  }

  visit(x: number, y: number, w: number, h: number): void {
    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        this.baseLayer.putAt(Tile.VISITED, i, j);
      }
    }
  }

  draw(p: p5, camera: Camera): void {
    this.drawBoardBase(p, camera);
    this.drawDungeon(p, camera);
  }

  private drawBoardBase(p: p5, camera: Camera): void {
    p.push();
    p.imageMode('corner');
    const baseImg = imageStore.maps.mapBase;

    const o = camera.adjust(0, 0);
    const x = (0 - 2) * camera.zoom;
    const y = (0 - 3) * camera.zoom;
    const w = (baseImg.width / 16) * camera.zoom;
    const h = (baseImg.height / 16) * camera.zoom;

    p.image(baseImg, o.x + x, o.y + y, w, h);
    p.pop();
  }

  private drawDungeon(p: p5, camera: Camera): void {
    this.dungeon.draw(p, camera);
  }
}
