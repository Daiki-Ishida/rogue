import { StrengthBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Condition, Player } from '../../../../actor';

/**
 * ちからの腕輪
 */
export class StrengthBracelet extends BraceletBase {
  static generate(): StrengthBracelet {
    const status = StrengthBraceletStatus.init();
    return new StrengthBracelet(status);
  }

  effect(player: Player): void {
    const condition = Condition.ofStrengthen(1);
    player.conditions.push(condition);
  }
}
