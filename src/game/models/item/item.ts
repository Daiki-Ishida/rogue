import { ItemStatus, ItemSymbol } from '.';
import { game } from '../..';
import { GridUtil } from '../../util';
import { Actor, Player } from '../actor';
import { Board } from '../board';
import { Equipment } from './equipment/iEquipment';
import { Item } from './iItem';
import { Usable, UsableBase } from './usable';

export abstract class ItemBase implements Item {
  constructor(
    public x: number,
    public y: number,
    public symbol: ItemSymbol,
    public status: ItemStatus
  ) {}

  abstract identify(): void;
  abstract onHit(user: Player, target: Actor, board: Board): void;
  isEquipment(): this is Equipment {
    return false;
  }

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

  isUsable(): this is Usable {
    return this instanceof UsableBase;
  }

  spawn(): void {
    const board = game.board;
    const { x, y } = board.getRandomEmpty();
    this.setAt(x, y);
  }

  setAt(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.symbol.x = x;
    this.symbol.y = y;
  }
}
