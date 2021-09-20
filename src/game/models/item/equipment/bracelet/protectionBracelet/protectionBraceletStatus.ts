import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class ProtectionBraceletStatus extends BraceletStatusBase {
  static readonly _name = 'まもりの腕輪';
  static _identified = false;

  static init(): ProtectionBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new ProtectionBraceletStatus(cursed);
  }

  get identified(): boolean {
    return ProtectionBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return ProtectionBraceletStatus._identified
      ? ProtectionBraceletStatus._name
      : ProtectionBraceletStatus._tempName;
  }

  fullIdentify(): void {
    ProtectionBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
