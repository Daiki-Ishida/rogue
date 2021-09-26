import { EquipmentStatus } from '.';

export class ShieldStatus implements EquipmentStatus {
  private constructor(
    readonly id: string,
    readonly def: number,
    public level: number,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {}

  get displayName(): string {
    return '';
    // return IDENTIFIED ? this.name : TEMP_NAME;
  }

  static debug(id: string): ShieldStatus {
    return new ShieldStatus(id, 1, 1, false, false, false);
  }

  identify(): void {
    // IDENTIFIED = true;
    this.identified = true;
  }
}
