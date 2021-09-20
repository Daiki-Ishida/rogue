import { SleepTrapSymbol } from '.';
import { TrapBase } from '..';
import { Actor, Condition } from '../../actor';

const VALUE = 10;

export class SleepTrap extends TrapBase {
  static generate(): SleepTrap {
    const symbol = SleepTrapSymbol.init();
    return new SleepTrap(symbol);
  }

  effect(actor: Actor): void {
    const asleep = Condition.ofAsleep(VALUE);
    actor.conditions.push(asleep);
  }
}
