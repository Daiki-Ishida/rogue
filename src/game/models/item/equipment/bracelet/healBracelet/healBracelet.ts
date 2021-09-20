import { HealBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Player } from '../../../../actor';

const HEAL_VALUE = 2;
const HUNGER_VALUE = 1;

/**
 * 回復の腕輪
 */
export class HealBracelet extends BraceletBase {
  static generate(): HealBracelet {
    const status = HealBraceletStatus.init();
    return new HealBracelet(status);
  }

  effect(player: Player): void {
    player.heal(HEAL_VALUE);
    player.addHunger(HUNGER_VALUE);
  }
}
