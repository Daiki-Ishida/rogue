import { trapDataStore } from 'game/store';
import { Trap } from '../trap';

export class TrapGenerator {
  static generate(n: number): Trap[] {
    const traps: Trap[] = [];

    for (let i = 0; i < n; i++) {
      const id = trapDataStore.getTrapNameRandomly();
      const trap = Trap.generate(id);
      traps.push(trap);
    }

    return traps;
  }
}
