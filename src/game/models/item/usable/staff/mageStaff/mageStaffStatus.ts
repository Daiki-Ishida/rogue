import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class MageStaffStatus extends StaffStatusBase {
  static _name = '魔道の杖';

  static generate(): MageStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new MageStaffStatus(durability);
  }

  displayName(): string {
    if (MageStaffStatus._identified) {
      return this.identified
        ? `${MageStaffStatus._name} [${this.durability}]`
        : `${MageStaffStatus._name}`;
    } else {
      return MageStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    MageStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return MageStaffStatus._identified;
  }
}
