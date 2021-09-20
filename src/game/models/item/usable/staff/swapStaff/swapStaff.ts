import { SwapStaffStatus } from '.';
import { StaffBase } from '..';
import { Actor, Player } from '../../../../actor';
import { Board } from '../../../../board';

export class SwapStaff extends StaffBase {
  static generate(): SwapStaff {
    const status = SwapStaffStatus.generate();
    return new SwapStaff(status);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    // todo
    return;
  }
}
