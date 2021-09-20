import { TrapBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Player } from '../../../../actor';
import { Board } from '../../../../board';

/**
 * ワナの腕輪
 */
export class TrapBracelet extends BraceletBase {
  static generate(): TrapBracelet {
    const status = TrapBraceletStatus.init();
    return new TrapBracelet(status);
  }

  effect(player: Player, board: Board): void {
    console.log('todo');
    return;
  }
}
