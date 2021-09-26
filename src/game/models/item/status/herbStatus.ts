import { itemDataStore } from 'game/store/itemDataStore';
import { UsableStatus } from './itemStatus';

export class HerbStatus implements UsableStatus {
  private constructor(
    readonly id: string,
    public used: boolean,
    public identified: boolean
  ) {}

  static init(id: string): HerbStatus {
    return new HerbStatus(id, false, false);
  }

  get displayName(): string {
    const status = itemDataStore.getHerbStatus(this.id);
    return status.identified ? status.name : status.fakeName;
  }

  identify(): void {
    const status = itemDataStore.getHerbStatus(this.id);
    status.identified = true;
    this.identified = true;
  }
}
