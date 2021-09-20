import { HungerTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor, Player } from '../../actor';

const VALUE = 10;

export class HungerTrap extends TrapBase {
  static generate(): HungerTrap {
    const symbol = HungerTrapSymbol.init();
    return new HungerTrap(symbol);
  }

  effect(actor: Actor): void {
    if (actor instanceof Player) {
      actor.addHunger(VALUE);
    }
  }
}
