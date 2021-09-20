import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class ParalysisStaffStatus extends StaffStatusBase {
  static _name = 'かなしばりの杖';

  static generate(): ParalysisStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new ParalysisStaffStatus(durability);
  }

  displayName(): string {
    if (ParalysisStaffStatus._identified) {
      return this.identified
        ? `${ParalysisStaffStatus._name} [${this.durability}]`
        : `${ParalysisStaffStatus._name}`;
    } else {
      return ParalysisStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    ParalysisStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return ParalysisStaffStatus._identified;
  }
}
