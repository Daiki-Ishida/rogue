import { LightningStaffStatus } from '.';
import { StaffBase } from '..';
import { Actor, Player } from '../../../../actor';

export class LightningStaff extends StaffBase {
  static generate(): LightningStaff {
    const status = LightningStaffStatus.generate();
    return new LightningStaff(status);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = 20;
    target.damage(dmg);
  }
}
