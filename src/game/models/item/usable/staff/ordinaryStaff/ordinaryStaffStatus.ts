import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class OrdinaryStaffStatus extends StaffStatusBase {
  static _name = 'ただの杖';

  static generate(): OrdinaryStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new OrdinaryStaffStatus(durability);
  }

  displayName(): string {
    if (OrdinaryStaffStatus._identified) {
      return this.identified
        ? `${OrdinaryStaffStatus._name} [${this.durability}]`
        : `${OrdinaryStaffStatus._name}`;
    } else {
      return OrdinaryStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    OrdinaryStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return OrdinaryStaffStatus._identified;
  }
}
