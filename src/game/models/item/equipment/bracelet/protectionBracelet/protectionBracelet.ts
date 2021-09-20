import { ProtectionBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Condition, Player } from '../../../../actor';

/**
 * まもりの腕輪
 */
export class ProtectionBracelet extends BraceletBase {
  static generate(): ProtectionBracelet {
    const status = ProtectionBraceletStatus.init();
    return new ProtectionBracelet(status);
  }

  effect(player: Player): void {
    const condition = Condition.ofProtection(1);
    player.conditions.push(condition);
  }
}
