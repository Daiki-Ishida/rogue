import { FortuneStaffStatus } from '.';
import { StaffBase } from '../staff';
import { Actor, Player } from '../../../../actor';

export class FortuneStaff extends StaffBase {
  static generate(): FortuneStaff {
    const status = FortuneStaffStatus.generate();
    return new FortuneStaff(status);
  }

  onHit(user: Player, target: Actor): void {
    target.levelUp();
  }
}
