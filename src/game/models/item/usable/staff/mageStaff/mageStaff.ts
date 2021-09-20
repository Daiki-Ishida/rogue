import { MageStaffStatus } from '.';
import { StaffBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Condition, Player } from '../../../../actor';

export class MageStaff extends StaffBase {
  static generate(): MageStaff {
    const status = MageStaffStatus.generate();
    return new MageStaff(status);
  }

  onHit(user: Player, target: Actor): void {
    const r = RandomUtil.getRandomIntInclusive(0, 2);
    let condition: Condition;
    switch (r) {
      case 0:
        condition = Condition.ofAsleep(10);
        break;
      case 1:
        condition = Condition.ofConfusion(10);
        break;
      case 2:
        condition = Condition.ofPoison(30);
        break;
      default:
        throw new Error('Something went wront...');
    }
    target.conditions.push(condition);
  }
}
