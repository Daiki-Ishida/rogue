import { PinningStaffStatus } from '.';
import { StaffBase } from '..';
import { Game } from '../../../../../game';
import { GridUtil } from '../../../../../util';
import { Actor, Direction, Player } from '../../../../actor';
import { Board } from '../../../../board';

export class PinningStaff extends StaffBase {
  static generate(): PinningStaff {
    const status = PinningStaffStatus.generate();
    return new PinningStaff(status);
  }

  // この杖だけは、処理が特殊なのでベースの処理をoverride
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

  onHit(user: Player, target: Actor, board: Board): void {
    return;
  }

  private pinTo(
    x: number,
    y: number,
    d: Direction,
    game: Game
  ): { x: number; y: number } {
    if (!game.board.isBlock(x, y) && !game.board.findActor(x, y)) {
      return { x: x, y: y };
    }

    const grids = GridUtil.aroundGrids(x, y);

    let idx: number;
    switch (d.key) {
      case 'LEFT':
        idx = 4;
        break;
      case 'UP':
        idx = 6;
        break;
      case 'RIGHT':
        idx = 3;
        break;
      case 'DOWN':
        idx = 1;
        break;
    }
    return { x: grids[idx][0], y: grids[idx][1] };
  }
}
