import { AntiConfusionBraceletStatus } from './antiConfusionBraceletStatus';
import { BraceletBase } from '../bracelet';
import { Player, Condition } from '../../../../actor';

/**
 * 混乱よけの腕輪
 */
export class AntiConfusionBracelet extends BraceletBase {
  static generate(): AntiConfusionBracelet {
    const status = AntiConfusionBraceletStatus.init();
    return new AntiConfusionBracelet(status);
  }

  effect(player: Player): void {
    // 毎ターン１ターンだけの有利状態異常を付与する。
    const condition = Condition.ofAntiConfusion(1);
    player.conditions.push(condition);
  }
}
