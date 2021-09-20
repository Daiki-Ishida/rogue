import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class HealBraceletStatus extends BraceletStatusBase {
  static readonly _name = '回復の腕輪';
  static _identified = false;

  static init(): HealBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new HealBraceletStatus(cursed);
  }

  get identified(): boolean {
    return HealBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return HealBraceletStatus._identified
      ? HealBraceletStatus._name
      : HealBraceletStatus._tempName;
  }

  fullIdentify(): void {
    HealBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
