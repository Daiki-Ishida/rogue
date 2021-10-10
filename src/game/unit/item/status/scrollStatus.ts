import { itemDataStore } from 'game/store/itemDataStore';
import { UsableStatus } from './itemStatus';

export class ScrollStatus implements UsableStatus {
  private constructor(
    readonly id: string,
    readonly category: string,
    public used: boolean,
    public identified: boolean
  ) {}

  static init(id: string): ScrollStatus {
    return new ScrollStatus(id, 'SCROLL', false, false);
  }

  get displayName(): string {
    const status = itemDataStore.getScrollStatus(this.id);
    return status.identified ? status.name : status.fakeName;
  }

  get description(): string {
    const status = itemDataStore.getScrollStatus(this.id);
    return status.identified ? status.description : '未識別のアイテム。';
  }

  identify(): void {
    const status = itemDataStore.getScrollStatus(this.id);
    status.identified = true;
    this.identified = true;
  }
}
