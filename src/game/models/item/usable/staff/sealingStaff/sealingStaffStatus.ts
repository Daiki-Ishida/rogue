import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class SealingStaffStatus extends StaffStatusBase {
  static _name = '封印の杖';

  static generate(): SealingStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new SealingStaffStatus(durability);
  }

  displayName(): string {
    if (SealingStaffStatus._identified) {
      return this.identified
        ? `${SealingStaffStatus._name} [${this.durability}]`
        : `${SealingStaffStatus._name}`;
    } else {
      return SealingStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    SealingStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return SealingStaffStatus._identified;
  }
}
