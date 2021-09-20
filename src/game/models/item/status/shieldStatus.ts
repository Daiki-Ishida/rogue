import { EquipmentStatus } from '.';

export class ShieldStatus implements EquipmentStatus {
  private constructor(
    readonly def: number,
    public level: number,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  get displayName(): string {
    throw new Error('Method not implemented.');
  }

  static debug(): ShieldStatus {
    return new ShieldStatus(1, 1, false, false, false);
  }
}
