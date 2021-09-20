import { ScoutBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Condition, Player } from '../../../../actor';

/**
 * 透視の腕輪
 */
export class ScoutBracelet extends BraceletBase {
  static generate(): ScoutBracelet {
    const status = ScoutBraceletStatus.init();
    return new ScoutBracelet(status);
  }

  effect(player: Player): void {
    const condition = Condition.ofClearSighted(1);
    player.conditions.push(condition);
  }
}
