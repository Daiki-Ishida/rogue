import { SummonTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor, Player } from '../../actor';

const VALUE = 10;

export class SummonTrap extends TrapBase {
  static generate(): SummonTrap {
    const symbol = SummonTrapSymbol.init();
    return new SummonTrap(symbol);
  }

  effect(actor: Actor): void {
    if (actor instanceof Player) {
      actor.addHunger(VALUE);
    }
  }
}
