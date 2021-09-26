import { itemDataStore } from 'game/store/itemDataStore';
import { UsableStatus } from './itemStatus';

export class ScrollStatus implements UsableStatus {
  private constructor(
    readonly id: string,
    public used: boolean,
    public identified: boolean
  ) {}

  static init(id: string): ScrollStatus {
    return new ScrollStatus(id, false, false);
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
