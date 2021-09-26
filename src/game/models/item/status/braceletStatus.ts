import { itemDataStore } from 'game/store/itemDataStore';
import { RandomUtil } from 'game/util';
import { EquipmentStatus } from './itemStatus';

export class BraceletStatus implements EquipmentStatus {
  private constructor(
    readonly id: string,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  static init(id: string): BraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 3);
    const cursed = r === 0;

    return new BraceletStatus(id, false, false, cursed);
  }

  get displayName(): string {
    const status = itemDataStore.getBraceletStatus(this.id);
    return status.identified ? status.name : status.fakeName;
  }

  identify(): void {
    const status = itemDataStore.getBraceletStatus(this.id);
    status.identified = true;
    this.identified = true;
  }
}
