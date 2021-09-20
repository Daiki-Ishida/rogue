import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class FortuneStaffStatus extends StaffStatusBase {
  static _name = '幸せの杖';

  static generate(): FortuneStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new FortuneStaffStatus(durability);
  }

  displayName(): string {
    if (FortuneStaffStatus._identified) {
      return this.identified
        ? `${FortuneStaffStatus._name} [${this.durability}]`
        : `${FortuneStaffStatus._name}`;
    } else {
      return FortuneStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    FortuneStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return FortuneStaffStatus._identified;
  }
}
