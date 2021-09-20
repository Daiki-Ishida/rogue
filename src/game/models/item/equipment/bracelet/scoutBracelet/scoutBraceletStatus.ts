import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class ScoutBraceletStatus extends BraceletStatusBase {
  static readonly _name = '透視の腕輪';
  static _identified = false;

  static init(): ScoutBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new ScoutBraceletStatus(cursed);
  }

  get identified(): boolean {
    return ScoutBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return ScoutBraceletStatus._identified
      ? ScoutBraceletStatus._name
      : ScoutBraceletStatus._tempName;
  }

  fullIdentify(): void {
    ScoutBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
