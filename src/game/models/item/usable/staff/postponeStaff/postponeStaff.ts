import { PostponeStaffStatus } from '.';
import { StaffBase } from '..';
import { Actor, Condition, Player } from '../../../../actor';
import { Board } from '../../../../board';
import { GridUtil } from '../../../../../util';

export class PostponeStaff extends StaffBase {
  static generate(): PostponeStaff {
    const status = PostponeStaffStatus.generate();
    return new PostponeStaff(status);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    const exit = board.getExit();
    const warpTo = this.warpAround(exit.x, exit.y, board);

    if (warpTo === null) {
      alert('todo');
      return;
    }

    const condition = Condition.ofParalyzed(50);
    target.conditions.push(condition);
  }

  private warpAround(
    x: number,
    y: number,
    board: Board
  ): { x: number; y: number } | null {
    if (!board.isBlock(x, y) && !board.findActor(x, y)) {
      return { x: x, y: y };
    }

    const grids = GridUtil.aroundGrids(x, y);
    const droppable: boolean[] = [];
    for (const grid of grids) {
      const isBlocked = board.isBlock(grid[0], grid[1]);
      const isExist = board.findActor(grid[0], grid[1]);
      const isEmpty = !(isBlocked || isExist);
      droppable.push(isEmpty);
    }

    let idx: number | null = null;
    for (let i = 0; i < droppable.length; i++) {
      if (droppable) {
        idx = i;
        break;
      }
    }
    return idx === null ? null : { x: grids[idx][0], y: grids[idx][1] };
  }
}
