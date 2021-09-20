import { MultiplicationTrapSymbol } from '.';
import { TrapBase } from '..';
import { TrapGenerator } from '../../../generator';
import { RandomUtil } from '../../../util';
import { Actor } from '../../actor';
import { Board } from '../../board';

const MIN = 15;
const MAX = 20;

export class MultiplicationTrap extends TrapBase {
  static generate(): MultiplicationTrap {
    const symbol = MultiplicationTrapSymbol.init();
    return new MultiplicationTrap(symbol);
  }

  effect(actor: Actor, board: Board): void {
    const additions = RandomUtil.getRandomIntInclusive(MIN, MAX);
    for (let i = 0; i < additions; i++) {
      const trap = TrapGenerator.generate();
      board.traps.push(trap);
    }
  }
}
