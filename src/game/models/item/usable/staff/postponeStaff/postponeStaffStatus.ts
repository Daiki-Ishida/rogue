import { StaffStatusBase } from '..';
import { RandomUtil } from '../../../../../util';

export class PostponeStaffStatus extends StaffStatusBase {
  static _name = '一時しのぎの杖';

  static generate(): PostponeStaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 6);
    return new PostponeStaffStatus(durability);
  }

  displayName(): string {
    if (PostponeStaffStatus._identified) {
      return this.identified
        ? `${PostponeStaffStatus._name} [${this.durability}]`
        : `${PostponeStaffStatus._name}`;
    } else {
      return PostponeStaffStatus._tempName;
    }
  }

  fullIdentify(): void {
    PostponeStaffStatus._identified = true;
    this.fullIdentified = true;
  }

  get identified(): boolean {
    return PostponeStaffStatus._identified;
  }
}
