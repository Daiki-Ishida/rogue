import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class AntiConfusionBraceletStatus extends BraceletStatusBase {
  static readonly _name = '混乱よけの腕輪';
  static _identified = false;

  static init(): AntiConfusionBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new AntiConfusionBraceletStatus(cursed);
  }

  get identified(): boolean {
    return AntiConfusionBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return AntiConfusionBraceletStatus._identified
      ? AntiConfusionBraceletStatus._name
      : AntiConfusionBraceletStatus._tempName;
  }

  fullIdentify(): void {
    AntiConfusionBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
