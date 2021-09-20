import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class BraceletOfItemDetectorStatus extends BraceletStatusBase {
  static readonly _name = '鑑定士の腕輪';
  static _identified = false;

  static init(): BraceletOfItemDetectorStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new BraceletOfItemDetectorStatus(cursed);
  }

  get identified(): boolean {
    return BraceletOfItemDetectorStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return BraceletOfItemDetectorStatus._identified
      ? BraceletOfItemDetectorStatus._name
      : BraceletOfItemDetectorStatus._tempName;
  }

  fullIdentify(): void {
    BraceletOfItemDetectorStatus._identified = true;
    this.fullIdentified = true;
  }
}
