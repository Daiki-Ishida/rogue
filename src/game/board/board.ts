import p5 from 'p5';
import { Dungeon } from 'game/board/dungeon';
import { Exit } from 'game/board/dungeon/exit';
import { Room } from 'game/board/dungeon/room';
import { Actor } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Trap } from 'game/unit/trap';
import { RandomUtil } from 'game/util';
import { Camera } from 'game/drawer';
import { BaseLayer, DungeonLayer, Tile } from './layer';
import {
  EnemyGenerator,
  ItemGenerator,
  NpcGenerator,
  TrapGenerator,
} from 'game/unit/generator';
import { Enemy } from 'game/unit/actor/enemy';

/**
 * ゲームの盤面を表現するクラス
 */
export class Board {
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

    if (board.dungeon.level > 6) {
      board.generateTraps(5, 7);
    }
    board.generateItems(7, 12);
    board.generateEnemys(4, 6);

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

    if (this.dungeon.level > 6) {
      this.generateTraps(5, 7);
    }
    this.generateItems(7, 12);
    this.generateEnemys(4, 6);

    if (this.dungeon.level === 30) {
      const boss = Enemy.generate('BOSS');
      boss.spawn(this);
    }
  }

  generateEnemys(min: number, max: number): void {
    const enemyCount = RandomUtil.getRandomIntInclusive(min, max);
    const enemys = EnemyGenerator.generate(enemyCount, this);
    for (const enemy of enemys) {
      enemy.spawn(this);
    }

    const r = RandomUtil.getRandomIntInclusive(0, 4);
    if (r === 0) {
      const npc = NpcGenerator.generate(1)[0];
      npc.spawn(this);
    }
  }

  generateItems(min: number, max: number): void {
    const itemCount = RandomUtil.getRandomIntInclusive(min, max);
    const items = ItemGenerator.generate(itemCount);
    for (const item of items) {
      item.spawn(this);
    }
  }

  generateTraps(min: number, max: number): void {
    const trapCount = RandomUtil.getRandomIntInclusive(min, max);
    const traps = TrapGenerator.generate(trapCount);
    for (const trap of traps) {
      trap.spawn(this);
    }
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

      const rx = RandomUtil.getRandomIntInclusive(
        room.x + 1,
        room.x + room.w - 2
      );
      const ry = RandomUtil.getRandomIntInclusive(
        room.y + 1,
        room.y + room.h - 2
      );

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
