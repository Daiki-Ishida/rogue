import { Board } from 'game/board';
import { trapDataStore } from 'game/store';
import { Trap } from '../trap';

export class TrapGenerator {
  static generate(n: number, board: Board): Trap[] {
    const traps: Trap[] = [];

    for (let i = 0; i < n; i++) {
      const id = trapDataStore.getTrapNameRandomly();
      const trap = Trap.generate(id, board);
      traps.push(trap);
    }

    return traps;
  }
}
