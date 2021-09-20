import { SealingStaffStatus } from '.';
import { StaffBase } from '..';
import { Actor, Condition, Player } from '../../../../actor';

export class SealingStaff extends StaffBase {
  static generate(): SealingStaff {
    const status = SealingStaffStatus.generate();
    return new SealingStaff(status);
  }

  onHit(user: Player, target: Actor): void {
    const sealing = Condition.ofSealed(999);
    target.conditions.push(sealing);
  }
}
