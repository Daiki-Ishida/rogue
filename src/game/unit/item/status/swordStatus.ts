import { itemDataStore } from 'game/store/itemDataStore';
import { RandomUtil } from 'game/util';
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
    const level = RandomUtil.getRandomIntInclusive(0, 3);
    const cursed = RandomUtil.getRandomIntInclusive(0, 7) === 0;

    return new SwordStatus(
      status.id,
      'SWORD',
      status.name,
      status.atk,
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
    return `攻撃力: ${this.baseAtk}`;
  }

  identify(): void {
    this.identified = true;
  }
}
