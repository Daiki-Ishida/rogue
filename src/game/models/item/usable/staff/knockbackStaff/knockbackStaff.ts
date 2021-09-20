import { KnockbackStaffStatus } from '.';
import { StaffBase } from '..';
import { GridUtil } from '../../../../../util';
import { Actor, Direction, Player } from '../../../../actor';
import { Board } from '../../../../board';

export class KnockbackStaff extends StaffBase {
  static generate(): KnockbackStaff {
    const status = KnockbackStaffStatus.generate();
    return new KnockbackStaff(status);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    const grids = GridUtil.rayToGrids(
      target.x,
      target.y,
      user.d.next.x,
      user.d.next.y,
      10
    );

    let current: { x: number; y: number } = { x: target.x, y: target.y };
    let actor: Actor | undefined = undefined;

    for (const grid of grids) {
      current = { x: grid[0], y: grid[1] };
      actor = board.findActor(current.x, current.y);
      const blocked = board.isBlock(current.x, current.y);
      if (actor || blocked) {
        break;
      }
    }

    const landingAt = this.dropAround(current.x, current.y, user.d, board);
    if (landingAt === null) {
      // 着地点候補が全部埋まってる
      alert('todo');
      return;
    }
    console.log(landingAt);
  }

  private dropAround(
    x: number,
    y: number,
    d: Direction,
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
    switch (d.key) {
      case 'LEFT':
        droppable[4]
          ? (idx = 4)
          : droppable[2]
          ? (idx = 2)
          : droppable[7]
          ? (idx = 7)
          : (idx = null);
        break;
      case 'UP':
        droppable[6]
          ? (idx = 6)
          : droppable[5]
          ? (idx = 5)
          : droppable[7]
          ? (idx = 7)
          : (idx = null);
        break;
      case 'RIGHT':
        droppable[3]
          ? (idx = 3)
          : droppable[0]
          ? (idx = 0)
          : droppable[5]
          ? (idx = 5)
          : (idx = null);
        break;
      case 'DOWN':
        droppable[1]
          ? (idx = 1)
          : droppable[0]
          ? (idx = 0)
          : droppable[2]
          ? (idx = 2)
          : (idx = null);
        break;
    }
    return idx === null ? null : { x: grids[idx][0], y: grids[idx][1] };
  }
}
