import { BraceletOfItemDetectorStatus } from '.';
import { BraceletBase } from '..';
import { Condition, Player } from '../../../../actor';

/**
 * 鑑定士の腕輪
 */
export class BraceletOfItemDetector extends BraceletBase {
  static generate(): BraceletOfItemDetector {
    const status = BraceletOfItemDetectorStatus.init();
    return new BraceletOfItemDetector(status);
  }

  effect(player: Player): void {
    // 毎ターン１ターンだけの有利状態異常を付与する。
    const condition = Condition.ofAutoIdentify(1);
    player.conditions.push(condition);
  }
}
