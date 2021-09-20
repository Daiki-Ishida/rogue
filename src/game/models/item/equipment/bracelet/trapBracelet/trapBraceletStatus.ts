import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class TrapBraceletStatus extends BraceletStatusBase {
  static readonly _name = 'ワナの腕輪';
  static _identified = false;

  static init(): TrapBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new TrapBraceletStatus(cursed);
  }

  get identified(): boolean {
    return TrapBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return TrapBraceletStatus._identified
      ? TrapBraceletStatus._name
      : TrapBraceletStatus._tempName;
  }

  fullIdentify(): void {
    TrapBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
