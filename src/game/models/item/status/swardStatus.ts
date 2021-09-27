import { itemDataStore } from 'game/store/itemDataStore';
import { EquipmentStatus } from '.';

export class SwordStatus implements EquipmentStatus {
  private constructor(
    readonly id: string,
    private name: string,
    readonly baseAtk: number,
    public level: number,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  static init(id: string): SwordStatus {
    const status = itemDataStore.getSwordStatus(id);
    return new SwordStatus(
      status.id,
      status.name,
      status.atk,
      1,
      false,
      false,
      false
    );
  }

  get displayName(): string {
    return this.identified ? `${this.name} +${this.level}` : this.name;
  }

  identify(): void {
    // IDENTIFIED = true;
    this.identified = true;
  }
}
