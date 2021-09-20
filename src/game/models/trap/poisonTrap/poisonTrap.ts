import { PoisonTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor, Condition } from '../../actor';

const VALUE = 10;

export class PoisonTrap extends TrapBase {
  static generate(): PoisonTrap {
    const symbol = PoisonTrapSymbol.init();
    return new PoisonTrap(symbol);
  }

  effect(actor: Actor): void {
    const poison = Condition.ofPoison(VALUE);
    actor.conditions.push(poison);
  }
}
