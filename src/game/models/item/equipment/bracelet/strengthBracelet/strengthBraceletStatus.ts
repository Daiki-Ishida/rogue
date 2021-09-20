import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class StrengthBraceletStatus extends BraceletStatusBase {
  static readonly _name = 'ちからの腕輪';
  static _identified = false;

  static init(): StrengthBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new StrengthBraceletStatus(cursed);
  }

  get identified(): boolean {
    return StrengthBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return StrengthBraceletStatus._identified
      ? StrengthBraceletStatus._name
      : StrengthBraceletStatus._tempName;
  }

  fullIdentify(): void {
    StrengthBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
