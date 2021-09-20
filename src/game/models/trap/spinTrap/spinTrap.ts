import { SpinTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor, Condition } from '../../actor';

const VALUE = 10;

export class SpinTrap extends TrapBase {
  static generate(): SpinTrap {
    const symbol = SpinTrapSymbol.init();
    return new SpinTrap(symbol);
  }

  effect(actor: Actor): void {
    const confusion = Condition.ofConfusion(VALUE);
    actor.conditions.push(confusion);
  }
}
