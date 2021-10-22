import { animationManager, game, imageStore, playlogManager } from 'game';
import { ThrownItemAnimation } from 'game/animation';
import { Board } from 'game/board';
import { Inventory } from 'game/inventory';
import { Actor, Player } from 'game/unit/actor';
import { GridUtil, RandomUtil } from 'game/util';
import { IPotEffect, potEffects } from '../effects';
import { Item } from '../item';
import { PotStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Storable } from './storable';

export class Pot extends Storable {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: PotStatus,
    readonly effect: IPotEffect
  ) {
    super(x, y, [], 0, symbol, status);
  }

  static generate(id: string): Pot {
    const symbol = new ItemSymbol(imageStore.items.pot);
    const status = PotStatus.init(id);
    const effect = potEffects[id];
    if (effect === undefined) {
      throw new Error(`Invalid Id: ${id}`);
    }

    return new Pot(0, 0, symbol, status, effect);
  }

  put(item: Item, board: Board): void {
    if (this.contents.length >= this.status.capacity) return;
    this.effect.onPut(item, this.contents, board);
  }

  withdraw(inventory: Inventory): void {
    if (!this.effect.withdrawable) {
      playlogManager.add('この壺からは取り出せなさそうだ・・・');
      return;
    }

    const withdrawn = this.contents.splice(this.idx, 1)[0];
    inventory.add(withdrawn);
  }

  aging(): void {
    this.effect.onAged(this.contents);
  }

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
    let isHit = false;
    for (const grid of grids) {
      current = { x: grid[0], y: grid[1] };
      target = board.findActor(current.x, current.y);
      const blocked = board.isBlock(current.x, current.y);

      if (target || blocked) {
        isHit = true;
        break;
      }
    }

    this.x = current.x - thrower.d.next.x;
    this.y = current.y - thrower.d.next.y;

    const callback = () => {
      if (isHit) {
        target !== undefined
          ? this.onHit(thrower, target, board)
          : this.dump(board);
      } else {
        this.onUnhit(thrower, board);
      }
    };

    const animation = ThrownItemAnimation.generate(
      thrower,
      this,
      current,
      callback
    );
    animationManager.push(animation);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
    this.dump(board);
  }

  private dump(board: Board): void {
    for (const item of this.contents) {
      const droppedAt = this.dumpAround(this.x, this.y, board);
      if (droppedAt === null) continue;

      item.setAt(droppedAt.x, droppedAt.y);
      board.items.push(item);
    }
  }

  private dumpAround(
    x: number,
    y: number,
    board: Board
  ): { x: number; y: number } | null {
    if (!board.isBlock(x, y) && !board.findItem(x, y)) {
      return { x: x, y: y };
    }

    let idx: { x: number; y: number } | null = null;
    const grids = GridUtil.aroundGrids(x, y);

    for (const grid of grids) {
      const _x = grid[0];
      const _y = grid[1];
      const isBlocked = game.board.isBlock(_x, _y);
      const isExist = game.board.findItem(_x, _y);
      const isEmpty = !(isBlocked || isExist);

      if (isEmpty) {
        idx = {
          x: _x,
          y: _y,
        };
      }
    }

    return idx;
  }
}
