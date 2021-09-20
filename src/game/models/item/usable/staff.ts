import { Board } from 'game/board';
import { Player, Actor } from 'game/models/actor';
import { GridUtil } from 'game/util';
import { StaffStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Usable } from './usable';

export class StaffBase extends Usable {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: StaffStatus,
    readonly effect: (user: Player, target: Actor, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  identify(): void {
    this.status.identified = true;
  }

  use(user: Player, board: Board): void {
    this.status.durability--;

    const grids = GridUtil.rayToGrids(user.x, user.y, user.next.x, user.next.y);
    let current: { x: number; y: number } = { x: user.x, y: user.y };
    let target: Actor | undefined = undefined;
    for (const grid of grids) {
      current = { x: grid[0], y: grid[1] };
      target = board.findActor(current.x, current.y);
      const blocked = board.isBlock(current.x, current.y);

      if (target || blocked) break;
    }

    // TODO: animation
    // const animation = ...

    if (target) {
      this.effect(user, target, board);
    }
  }

  onHit(user: Player, target: Actor, board: Board): void {
    this.effect(user, target, board);
  }
}
