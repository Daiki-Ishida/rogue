import { ParalysisStaffStatus } from '.';
import { StaffBase } from '..';
import { Actor, Condition, Player } from '../../../../actor';

export class ParalysisStaff extends StaffBase {
  static generate(): ParalysisStaff {
    const status = ParalysisStaffStatus.generate();
    return new ParalysisStaff(status);
  }

  onHit(user: Player, target: Actor): void {
    const paralysis = Condition.ofParalyzed(50);
    target.conditions.push(paralysis);
  }
}
