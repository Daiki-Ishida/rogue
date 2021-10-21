import { itemDataStore } from 'game/store/itemDataStore';
import { RandomUtil } from 'game/util';
import { StorableStatus } from './itemStatus';

export class PotStatus implements StorableStatus {
  private constructor(
    readonly id: string,
    readonly category: string,
    public capacity: number,
    public identified: boolean
  ) {}

  static init(id: string): PotStatus {
    const capacity = RandomUtil.getRandomIntInclusive(4, 6);
    return new PotStatus(id, 'POT', capacity, false);
  }

  get displayName(): string {
    const status = itemDataStore.getPotStatus(this.id);
    return status.identified ? status.name : status.fakeName;
  }

  get description(): string {
    const status = itemDataStore.getPotStatus(this.id);
    return status.identified ? status.description : '未識別のアイテム。';
  }

  identify(): void {
    const status = itemDataStore.getPotStatus(this.id);
    status.identified = true;
    this.identified = true;
  }
}
