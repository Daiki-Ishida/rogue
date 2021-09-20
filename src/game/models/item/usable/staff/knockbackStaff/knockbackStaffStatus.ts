import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class KnockbackStaffStatus extends StaffStatusBase {
  static _name = '吹き飛ばしの杖';

  static generate(): KnockbackStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new KnockbackStaffStatus(durability);
  }

  displayName(): string {
    if (KnockbackStaffStatus._identified) {
      return this.identified
        ? `${KnockbackStaffStatus._name} [${this.durability}]`
        : `${KnockbackStaffStatus._name}`;
    } else {
      return KnockbackStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    KnockbackStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return KnockbackStaffStatus._identified;
  }
}
