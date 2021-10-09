import { itemDataStore } from 'game/store/itemDataStore';
import { UsableStatus } from './itemStatus';

export class FoodStatus implements UsableStatus {
  private constructor(
    readonly id: string,
    public used: boolean,
    public identified: boolean,
    readonly value: number
  ) {}

  static init(id: string): FoodStatus {
    let value: number;
    switch (id) {
      case 'BREAD':
        value = 50;
        break;
      case 'BIG_BREAD':
        value = 100;
        break;
      case 'GIANT_BREAD':
        value = 100;
        break;
      case 'ROTTEN_BREAD':
        value = 20;
        break;
      default:
        throw new Error(`Invalid Id: ${id}`);
    }

    return new FoodStatus(id, false, true, value);
  }

  get displayName(): string {
    const status = itemDataStore.getFoodStatus(this.id);
    return status.identified ? status.name : status.fakeName;
  }

  get description(): string {
    const status = itemDataStore.getFoodStatus(this.id);
    return status.identified ? status.description : '未識別のアイテム。';
  }

  identify(): void {
    const status = itemDataStore.getFoodStatus(this.id);
    status.identified = true;
    this.identified = true;
  }
}
