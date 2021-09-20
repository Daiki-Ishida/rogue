import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class AntiPoisonBraceletStatus extends BraceletStatusBase {
  static readonly _name = '毒消しの腕輪';
  static _identified = false;

  static init(): AntiPoisonBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new AntiPoisonBraceletStatus(cursed);
  }

  get identified(): boolean {
    return AntiPoisonBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return AntiPoisonBraceletStatus._identified
      ? AntiPoisonBraceletStatus._name
      : AntiPoisonBraceletStatus._tempName;
  }

  fullIdentify(): void {
    AntiPoisonBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
