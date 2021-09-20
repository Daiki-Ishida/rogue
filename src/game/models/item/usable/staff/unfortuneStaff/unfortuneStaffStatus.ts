import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class UnfortuneStaffStatus extends StaffStatusBase {
  static _name = '不幸の杖';

  static generate(): UnfortuneStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new UnfortuneStaffStatus(durability);
  }

  displayName(): string {
    if (UnfortuneStaffStatus._identified) {
      return this.identified
        ? `${UnfortuneStaffStatus._name} [${this.durability}]`
        : `${UnfortuneStaffStatus._name}`;
    } else {
      return UnfortuneStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    UnfortuneStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return UnfortuneStaffStatus._identified;
  }
}
