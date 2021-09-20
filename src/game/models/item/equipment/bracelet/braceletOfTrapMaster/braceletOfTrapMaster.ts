import { BraceletOfTrapMasterStatus } from '.';
import { BraceletBase } from '..';
import { Condition, Player } from '../../../../actor';

/**
 * ワナ師の腕輪
 */
export class BraceletOfTrapMaster extends BraceletBase {
  static generate(): BraceletOfTrapMaster {
    const status = BraceletOfTrapMasterStatus.init();
    return new BraceletOfTrapMaster(status);
  }

  effect(player: Player): void {
    // 毎ターン１ターンだけの有利状態異常を付与する。
    const condition = Condition.ofTrapMaster(1);
    player.conditions.push(condition);
  }
}
