import { StripTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor, Player } from '../../actor';

export class StripTrap extends TrapBase {
  static generate(): StripTrap {
    const symbol = StripTrapSymbol.init();
    return new StripTrap(symbol);
  }

  effect(actor: Actor): void {
    if (actor instanceof Player) {
      // todo
    }
  }
}
