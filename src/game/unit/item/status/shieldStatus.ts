import { itemDataStore } from 'game/store/itemDataStore';
import { EquipmentStatus } from '.';

export class ShieldStatus implements EquipmentStatus {
  private constructor(
    readonly id: string,
    readonly category: string,
    private name: string,
    readonly def: number,
    public level: number,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  static init(id: string): ShieldStatus {
    const status = itemDataStore.getShieldStatus(id);
    return new ShieldStatus(
      status.id,
      'SHIELD',
      status.name,
      status.def,
      1,
      false,
      false,
      false
    );
  }

  get displayName(): string {
    return this.identified ? `${this.name} +${this.level}` : this.name;
  }

  get description(): string {
    return `防御力: ${this.def}`;
  }

  identify(): void {
    // IDENTIFIED = true;
    this.identified = true;
  }
}
