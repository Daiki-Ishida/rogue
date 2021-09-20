import { Board } from 'game/board';
import { Actor, Player } from '../actor';
import { ItemStatus } from './status';
import { ItemSymbol } from './symbol';
import { Equipment } from './equipment';
import { Gold } from './gold';
import { Usable } from './usable';
import { GridUtil } from 'game/util';

export interface IItem {
  x: number;
  y: number;
  symbol: ItemSymbol;
  status: ItemStatus;
  spawn(board: Board): void;
  identify(): void;
  throw: (thrower: Player, board: Board) => void;
  onHit(user: Player, target: Actor, board: Board): void;
  onUnhit: (board: Board) => void;
  isUsable(): this is Usable;
  isEquipment(): this is Equipment;
  isGold(): this is Gold;
}

export abstract class Item implements IItem {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: ItemStatus
  ) {}

  abstract identify(): void;
  abstract onHit(user: Player, target: Actor, board: Board): void;

  throw(thrower: Player, board: Board): void {
    this.x = thrower.x;
    this.y = thrower.y;

    const grids = GridUtil.rayToGrids(
      thrower.x,
      thrower.y,
      thrower.d.next.x,
      thrower.d.next.y
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

    // TODO: animation
    // const animation = ...

    target !== undefined
      ? this.onHit(thrower, target, board)
      : this.onUnhit(board);
  }

  onUnhit(board: Board): void {
    return;
  }

  spawn(board: Board): void {
    const { x, y } = board.getRandomEmpty();
    this.setAt(x, y);
  }

  setAt(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.symbol.x = x;
    this.symbol.y = y;
  }

  isUsable(): this is Usable {
    return false;
  }

  isEquipment(): this is Equipment {
    return false;
  }

  isGold(): this is Gold {
    return false;
  }
}
