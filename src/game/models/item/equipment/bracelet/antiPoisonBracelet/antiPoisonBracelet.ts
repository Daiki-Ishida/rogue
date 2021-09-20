import { AntiPoisonBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Condition, Player } from '../../../../actor';

/**
 * 毒消しの腕輪
 */
export class AntiPoisonBracelet extends BraceletBase {
  static generate(): AntiPoisonBracelet {
    const status = AntiPoisonBraceletStatus.init();
    return new AntiPoisonBracelet(status);
  }

  effect(player: Player): void {
    // 毎ターン１ターンだけの有利状態異常を付与する。
    const condition = Condition.ofPoisonFree(1);
    player.conditions.push(condition);
  }
}
