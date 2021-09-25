import { RandomUtil } from 'game/util';
import { EquipmentStatus } from './itemStatus';

export class BraceletStatus implements EquipmentStatus {
  private constructor(
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  static init(): BraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 3);
    const cursed = r === 0;
    return new BraceletStatus(false, false, cursed);
  }

  get displayName(): string {
    throw new Error('Method not implemented.');
  }
}
