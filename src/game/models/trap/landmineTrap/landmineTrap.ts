import { LandmineTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor } from '../../actor';
import { Board } from '../../board';
import { GridUtil } from '../../../util';

export class LandmineTrap extends TrapBase {
  static generate(): LandmineTrap {
    const symbol = LandmineTrapSymbol.init();
    return new LandmineTrap(symbol);
  }

  effect(actor: Actor, board: Board): void {
    const grids = GridUtil.aroundGrids(actor.x, actor.y);
    for (const grid of grids) {
      board.findActor(grid[0], grid[1])?.damage(999);
    }

    const dmg = Math.floor(actor.status.hp / 2);
    actor.damage(dmg);
    // game.messages.push(`${dmg}ダメージを受けた！`);
  }
}
