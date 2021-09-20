import { EquipmentStatus } from '.';

export class SwardStatus implements EquipmentStatus {
  private constructor(
    readonly baseAtk: number,
    public level: number,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  static debug(): SwardStatus {
    return new SwardStatus(1, 1, false, false, false);
  }

  get displayName(): string {
    throw new Error('Method not implemented.');
  }
}
