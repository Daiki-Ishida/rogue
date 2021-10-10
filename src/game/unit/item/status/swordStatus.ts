import { itemDataStore } from 'game/store/itemDataStore';
import { EquipmentStatus } from '.';

export class SwordStatus implements EquipmentStatus {
  private constructor(
    readonly id: string,
    readonly category: string,
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
      'SWORD',
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

  get description(): string {
    return `攻撃力: ${this.baseAtk}`;
  }

  identify(): void {
    this.identified = true;
  }
}
