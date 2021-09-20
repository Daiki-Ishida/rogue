import { WarpTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor } from '../../actor';
import { Board } from '../../board';

export class WarpTrap extends TrapBase {
  static generate(): WarpTrap {
    const symbol = WarpTrapSymbol.init();
    return new WarpTrap(symbol);
  }

  effect(actor: Actor, board: Board): void {
    const warpTo = board.getRandomEmpty();
    actor.setAt(warpTo.x, warpTo.y);
  }
}
