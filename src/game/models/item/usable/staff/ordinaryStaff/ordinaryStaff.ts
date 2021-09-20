import { OrdinaryStaffStatus } from '.';
import { StaffBase } from '..';

export class OrdinaryStaff extends StaffBase {
  static generate(): OrdinaryStaff {
    const status = OrdinaryStaffStatus.generate();
    return new OrdinaryStaff(status);
  }

  // 効果なし
  onHit(): void {
    return;
  }
}
