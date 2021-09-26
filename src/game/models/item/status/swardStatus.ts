import { EquipmentStatus } from '.';

export class SwardStatus implements EquipmentStatus {
  private constructor(
    readonly id: string,
    readonly baseAtk: number,
    public level: number,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  static debug(): SwardStatus {
    return new SwardStatus('sward', 1, 1, false, false, false);
  }

  get displayName(): string {
    return this.id;
    // return IDENTIFIED ? this.name : TEMP_NAME;
  }

  identify(): void {
    // IDENTIFIED = true;
    this.identified = true;
  }
}
