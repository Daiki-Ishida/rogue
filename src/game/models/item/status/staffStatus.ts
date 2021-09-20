import { RandomUtil } from 'game/util';
import { UsableStatus } from './itemStatus';

export class StaffStatus implements UsableStatus {
  private constructor(
    public used: boolean,
    public identified: boolean,
    public durability: number
  ) {}

  static init(): StaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 7);
    return new StaffStatus(false, false, durability);
  }

  get displayName(): string {
    return 'todo';
  }
}
