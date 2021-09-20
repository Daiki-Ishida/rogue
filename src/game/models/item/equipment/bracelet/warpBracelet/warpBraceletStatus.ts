import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class WarpBraceletStatus extends BraceletStatusBase {
  static readonly _name = 'ワナの腕輪';
  static _identified = false;

  static init(): WarpBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new WarpBraceletStatus(cursed);
  }

  get identified(): boolean {
    return WarpBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return WarpBraceletStatus._identified
      ? WarpBraceletStatus._name
      : WarpBraceletStatus._tempName;
  }

  fullIdentify(): void {
    WarpBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
