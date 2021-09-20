import { RockSlideTrapSymbol } from '.';
import { TrapBase } from '..';
import { RandomUtil } from '../../../util';
import { Actor } from '../../actor';

const MIN = 5;
const MAX = 10;

export class RockSlideTrap extends TrapBase {
  static generate(): RockSlideTrap {
    const symbol = RockSlideTrapSymbol.init();
    return new RockSlideTrap(symbol);
  }

  effect(actor: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(MIN, MAX);
    actor.damage(dmg);
  }
}
