import { Board } from 'game/board';
import { trapDataStore } from 'game/store';
import { RandomUtil } from 'game/util';
import { Trap } from '../trap';

export class TrapGenerator {
  static generate(board: Board): Trap[] {
    const traps: Trap[] = [];
    const count = RandomUtil.getRandomIntInclusive(7, 12);

    for (let i = 0; i < count; i++) {
      const id = trapDataStore.getTrapNameRandomly();
      const trap = Trap.generate(id, board);
      traps.push(trap);
    }

    return traps;
  }
}
