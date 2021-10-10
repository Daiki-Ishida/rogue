import p5 from 'p5';
import { Dungeon } from 'game/dungeon';
import { Exit } from 'game/dungeon/exit';
import { Room } from 'game/dungeon/room';
import { Actor } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Trap } from 'game/unit/trap';
import { RandomUtil } from 'game/util';
import { Camera } from 'game/view';
import { BaseLayer, DungeonLayer, Layer, Tile } from './layer';
import {
  EnemyGenerator,
  ItemGenerator,
  TrapGenerator,
} from 'game/unit/generator';

export interface IBoard {
  w: number;
  h: number;
  dungeon: Dungeon;
  actors: Actor[];
  items: Item[];
  traps: Trap[];
  baseLayer: Layer;
  dungeonLayer: Layer;
  next(): void;
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
  private constructor(
    readonly w: number,
    readonly h: number,
    readonly dungeon: Dungeon,
    public actors: Actor[],
    public items: Item[],
    public traps: Trap[],
    readonly baseLayer: BaseLayer,
    readonly dungeonLayer: DungeonLayer
  ) {}

  static init(w: number, h: number): Board {
    const dungeon = Dungeon.init(w, h);

    const dungeonLayer = DungeonLayer.init(w, h);
    dungeonLayer.apply(dungeon);

    const board = new Board(
      w,
      h,
      dungeon,
      [],
      [],
      [],
      BaseLayer.init(w, h),
      dungeonLayer
    );

    board.generateTraps();
    board.generateItems();
    board.generateEnemys();

    return board;
  }

  next(): void {
    this.baseLayer.reset();
    this.dungeonLayer.reset();

    this.dungeon.next();
    this.dungeonLayer.apply(this.dungeon);

    this.actors = [];
    this.items = [];
    this.traps = [];

    this.generateTraps();
    this.generateItems();
    this.generateEnemys();
  }

  generateEnemys(): void {
    const enemyCount = RandomUtil.getRandomIntInclusive(4, 6);
    EnemyGenerator.generate(enemyCount, this);
  }

  generateItems(): void {
    const itemCount = RandomUtil.getRandomIntInclusive(7, 12);
    ItemGenerator.generate(itemCount, this);
  }

  generateTraps(): void {
    const trapCount = RandomUtil.getRandomIntInclusive(7, 12);
    TrapGenerator.generate(trapCount, this);
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
        if (this.isRoom(i, j) || this.isCorridor(i, j)) {
          this.baseLayer.putAt(Tile.VISITED, i, j);
        }
      }
    }
  }

  draw(p: p5, camera: Camera): void {
    this.dungeon.draw(p, camera);
  }
}
