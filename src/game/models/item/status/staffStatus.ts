import { itemDataStore } from 'game/store/itemDataStore';
import { RandomUtil } from 'game/util';
import { UsableStatus } from './itemStatus';

export class StaffStatus implements UsableStatus {
  private constructor(
    readonly id: string,
    public used: boolean,
    public identified: boolean,
    public durability: number
  ) {}

  static init(id: string): StaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 7);
    return new StaffStatus(id, false, false, durability);
  }

  get displayName(): string {
    const status = itemDataStore.getStaffStatus(this.id);
    return status.identified ? status.name : status.fakeName;
  }

  identify(): void {
    const status = itemDataStore.getStaffStatus(this.id);
    status.identified = true;
    this.identified = true;
  }
}
