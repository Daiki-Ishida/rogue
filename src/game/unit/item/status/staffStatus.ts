import { itemDataStore } from 'game/store/itemDataStore';
import { RandomUtil } from 'game/util';
import { UsableStatus } from './itemStatus';

export class StaffStatus implements UsableStatus {
  private constructor(
    readonly id: string,
    readonly category: string,
    public used: boolean,
    public identified: boolean,
    public durability: number
  ) {}

  static init(id: string): StaffStatus {
    const durability = RandomUtil.getRandomIntInclusive(4, 7);
    return new StaffStatus(id, 'STAFF', false, false, durability);
  }

  get displayName(): string {
    const status = itemDataStore.getStaffStatus(this.id);

    // debug
    status.identified = true;

    if (!status.identified) {
      return status.fakeName;
    }

    if (!this.identified) {
      return status.name;
    }

    return `${status.name} [${this.durability}]`;
  }

  get description(): string {
    const status = itemDataStore.getStaffStatus(this.id);
    return status.identified ? status.description : '未識別のアイテム。';
  }

  identify(): void {
    const status = itemDataStore.getStaffStatus(this.id);
    status.identified = true;
    this.identified = true;
  }
}
