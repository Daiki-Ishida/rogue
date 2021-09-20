import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class LightningStaffStatus extends StaffStatusBase {
  static _name = '雷光の杖';

  static generate(): LightningStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new LightningStaffStatus(durability);
  }

  displayName(): string {
    if (LightningStaffStatus._identified) {
      return this.identified
        ? `${LightningStaffStatus._name} [${this.durability}]`
        : `${LightningStaffStatus._name}`;
    } else {
      return LightningStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    LightningStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return LightningStaffStatus._identified;
  }
}
