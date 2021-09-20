import { WarpBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Player } from '../../../../actor';
import { Board } from '../../../../board';

/**
 * 高飛びの腕輪
 */
export class WarpBracelet extends BraceletBase {
  static generate(): WarpBracelet {
    const status = WarpBraceletStatus.init();
    return new WarpBracelet(status);
  }

  effect(player: Player, board: Board): void {
    const xy = board.getRandomEmpty();
    player.setAt(xy.x, xy.y);
  }
}
