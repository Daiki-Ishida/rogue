import { UnfortuneStaffStatus } from '.';
import { StaffBase } from '..';
import { Actor, Player } from '../../../../actor';

const VALUE = 500;

export class UnfortuneStaff extends StaffBase {
  static generate(): UnfortuneStaff {
    const status = UnfortuneStaffStatus.generate();
    return new UnfortuneStaff(status);
  }

  onHit(user: Player, target: Actor): void {
    target.isPlayer() ? target.removeExp(VALUE) : target.levelDown();
  }
}
