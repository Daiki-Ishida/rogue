import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class FortuneBraceletStatus extends BraceletStatusBase {
  static readonly _name = 'しあわせの腕輪';
  static _identified = false;

  static init(): FortuneBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new FortuneBraceletStatus(cursed);
  }

  get identified(): boolean {
    return FortuneBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return FortuneBraceletStatus._identified
      ? FortuneBraceletStatus._name
      : FortuneBraceletStatus._tempName;
  }

  fullIdentify(): void {
    FortuneBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
