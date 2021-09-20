import { BraceletStatusBase } from '../braceletStatus';
import { RandomUtil } from '../../../../../util';

export class MonsterSummonerBraceletStatus extends BraceletStatusBase {
  static readonly _name = '魔物呼びの腕輪';
  static _identified = false;

  static init(): MonsterSummonerBraceletStatus {
    const r = RandomUtil.getRandomIntInclusive(0, 4);
    const cursed: boolean = r === 0;

    return new MonsterSummonerBraceletStatus(cursed);
  }

  get identified(): boolean {
    return MonsterSummonerBraceletStatus._identified && this.fullIdentified;
  }

  displayName(): string {
    return MonsterSummonerBraceletStatus._identified
      ? MonsterSummonerBraceletStatus._name
      : MonsterSummonerBraceletStatus._tempName;
  }

  fullIdentify(): void {
    MonsterSummonerBraceletStatus._identified = true;
    this.fullIdentified = true;
  }
}
