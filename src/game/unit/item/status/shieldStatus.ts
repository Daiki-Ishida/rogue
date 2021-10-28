import { itemDataStore } from 'game/store/itemDataStore';
import { RandomUtil } from 'game/util';
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
    const level = RandomUtil.getRandomIntInclusive(0, 3);
    const cursed = RandomUtil.getRandomIntInclusive(0, 7) === 0;

    return new ShieldStatus(
      status.id,
      'SHIELD',
      status.name,
      status.def,
      level,
      false,
      false,
      cursed
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
