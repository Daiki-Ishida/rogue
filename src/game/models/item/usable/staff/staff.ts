import { StaffStatus, StaffSymbol } from '.';
import { Usable, UsableBase } from '..';
import { Player, Actor } from '../../../actor';
import { Board } from '../../../board';
import { GridUtil } from '../../../../util';

export interface Staff extends Usable {
  symbol: StaffSymbol;
  status: StaffStatus;
}

export abstract class StaffBase extends UsableBase implements Staff {
  constructor(
    public status: StaffStatus,
    public symbol: StaffSymbol = StaffSymbol.init(),
    public x: number = 0,
    public y: number = 0
  ) {
    super(x, y, symbol, status);
  }

  use(user: Player, board: Board): void {
    const grids = GridUtil.rayToGrids(
      user.x,
      user.y,
      user.d.next.x,
      user.d.next.y
    );

    let current: { x: number; y: number } = { x: user.x, y: user.y };
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

    if (target) {
      this.onHit(user, target, board);
    }
  }

  get identified(): boolean {
    return this.status.identified && this.status.fullIdentified;
  }

  identify(): void {
    this.status.fullIdentify();
  }
}
