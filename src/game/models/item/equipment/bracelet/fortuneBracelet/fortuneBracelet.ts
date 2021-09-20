import { FortuneBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Player } from '../../../../actor';

/**
 * しあわせの腕輪
 */
export class FortuneBracelet extends BraceletBase {
  static generate(): FortuneBracelet {
    const status = FortuneBraceletStatus.init();
    return new FortuneBracelet(status);
  }

  effect(player: Player): void {
    player.gainExp(1);
  }
}
