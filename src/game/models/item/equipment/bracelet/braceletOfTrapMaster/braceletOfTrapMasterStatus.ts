import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class BraceletOfTrapMasterStatus extends BraceletStatusBase {
  static readonly _name = 'ワナ師の腕輪';
  static _identified = false;

  static init(): BraceletOfTrapMasterStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new BraceletOfTrapMasterStatus(cursed);
  }

  get identified(): boolean {
    return BraceletOfTrapMasterStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return BraceletOfTrapMasterStatus._identified
      ? BraceletOfTrapMasterStatus._name
      : BraceletOfTrapMasterStatus._tempName;
  }

  fullIdentify(): void {
    BraceletOfTrapMasterStatus._identified = true;
    this.fullIdentified = true;
  }
}
