import p5 from 'p5';
import { Board } from 'game/board';
import { Actor, Player } from '../actor';
import { ItemStatus } from './status';
import { ItemSymbol } from './symbol';
import { Equipment } from './equipment';
import { Gold } from './gold';
import { Usable } from './usable';
import { GridUtil } from 'game/util';
import { Game } from 'game/game';
import { ThrownItemAnimation } from 'game/animation';
import {
  animationManager,
  game,
  playlogManager,
  soundManager,
  soundStore,
} from 'game';
import { Camera } from 'game/view';
import { Storable } from './storable';

export interface IItem {
  x: number;
  y: number;
  symbol: ItemSymbol;
  status: ItemStatus;
  spawn(board: Board): void;
  identify(): void;
  throw: (thrower: Player, board: Board) => void;
  onHit(user: Player, target: Actor, board: Board): void;
  onUnhit: (thrower: Player, board: Board) => void;
  isUsable(): this is Usable;
  isEquipment(): this is Equipment;
  isGold(): this is Gold;
  draw(p: p5, camera: Camera): void;
}

export abstract class Item implements IItem {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    public status: ItemStatus
  ) {}

  abstract identify(): void;
  abstract onHit(user: Player, target: Actor, board: Board): void;

  throw(thrower: Player, board: Board): void {
    game.inventory.delete();
    this.setAt(thrower.x, thrower.y);

    const grids = GridUtil.rayToGrids(
      thrower.x,
      thrower.y,
      thrower.d.next.x,
      thrower.d.next.y,
      10
    );

    let current: { x: number; y: number } = { x: thrower.x, y: thrower.y };
    let target: Actor | undefined = undefined;
    for (const grid of grids) {
      current = { x: grid[0], y: grid[1] };
      target = board.findActor(current.x, current.y);
      const blocked = board.isBlock(current.x, current.y);

      if (target || blocked) {
        break;
      }
    }

    this.x = current.x - thrower.d.next.x;
    this.y = current.y - thrower.d.next.y;

    const callback = () => {
      target !== undefined
        ? this.onHit(thrower, target, board)
        : this.onUnhit(thrower, board);
    };

    const animation = ThrownItemAnimation.generate(
      thrower,
      this,
      current,
      callback
    );
    animationManager.push(animation);
  }

  onUnhit(thrower: Player, board: Board): void {
    const dropedAt = this.dropAround(this.x, this.y, thrower, board);
    if (dropedAt === null) {
      return;
    }

    this.x = dropedAt.x;
    this.y = dropedAt.y;
    board.items.push(this);
  }

  private dropAround(
    x: number,
    y: number,
    p: Player,
    board: Board
  ): { x: number; y: number } | null {
    if (!board.isBlock(x, y) && !board.findItem(x, y)) {
      return { x: x, y: y };
    }

    const grids = GridUtil.aroundGrids(x, y);
    const droppable: boolean[] = [];
    for (const grid of grids) {
      const isBlocked = game.board.isBlock(grid[0], grid[1]);
      const isExist = game.board.findItem(grid[0], grid[1]);
      const isEmpty = !(isBlocked || isExist);
      droppable.push(isEmpty);
    }

    let idx: number | null = null;
    switch (p.d.key) {
      case 'LEFT':
        droppable[4]
          ? (idx = 4)
          : droppable[1]
          ? (idx = 1)
          : droppable[6]
          ? (idx = 6)
          : (idx = null);
        break;
      case 'UP':
        droppable[6]
          ? (idx = 6)
          : droppable[3]
          ? (idx = 3)
          : droppable[4]
          ? (idx = 4)
          : (idx = null);
        break;
      case 'RIGHT':
        droppable[3]
          ? (idx = 3)
          : droppable[1]
          ? (idx = 1)
          : droppable[6]
          ? (idx = 6)
          : (idx = null);
        break;
      case 'DOWN':
        droppable[1]
          ? (idx = 1)
          : droppable[3]
          ? (idx = 3)
          : droppable[4]
          ? (idx = 4)
          : (idx = null);
        break;
    }
    return idx === null ? null : { x: grids[idx][0], y: grids[idx][1] };
  }

  spawn(board: Board): void {
    const { x, y } = board.getRandomEmpty();
    this.setAt(x, y);
    board.items.push(this);
  }

  setAt(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.symbol.x = x;
    this.symbol.y = y;
  }

  pickup(game: Game): void {
    if (this.isGold()) {
      game.gold += this.status.amount;
    } else {
      const result = game.inventory.add(this);
      if (!result) return;
    }

    const sound = soundStore.pickUp;
    soundManager.register(sound);

    playlogManager.add(`${this.status.displayName}を拾った。`);

    game.board.clearItem(this);
  }

  isUsable(): this is Usable {
    return false;
  }

  isEquipment(): this is Equipment {
    return false;
  }

  isStorable(): this is Storable {
    return false;
  }

  isGold(): this is Gold {
    return false;
  }

  draw(p: p5, camera: Camera): void {
    this.symbol.draw(p, camera);
  }
}
