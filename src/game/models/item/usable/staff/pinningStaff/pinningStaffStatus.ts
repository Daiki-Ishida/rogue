import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class PinningStaffStatus extends StaffStatusBase {
  static _name = '飛びつきの杖';

  static generate(): PinningStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new PinningStaffStatus(durability);
  }

  displayName(): string {
    if (PinningStaffStatus._identified) {
      return this.identified
        ? `${PinningStaffStatus._name} [${this.durability}]`
        : `${PinningStaffStatus._name}`;
    } else {
      return PinningStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    PinningStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return PinningStaffStatus._identified;
  }
}
