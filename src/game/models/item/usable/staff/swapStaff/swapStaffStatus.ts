import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class SwapStaffStatus extends StaffStatusBase {
  static _name = '場所替えの杖';

  static generate(): SwapStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new SwapStaffStatus(durability);
  }

  displayName(): string {
    if (SwapStaffStatus._identified) {
      return this.identified
        ? `${SwapStaffStatus._name} [${this.durability}]`
        : `${SwapStaffStatus._name}`;
    } else {
      return SwapStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    SwapStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return SwapStaffStatus._identified;
  }
}
