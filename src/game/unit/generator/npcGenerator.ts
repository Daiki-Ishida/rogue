import { npcDataStore } from 'game/store';
import { Npc } from '../actor/npc';

export class NpcGenerator {
  static generate(n: number): Npc[] {
    const npcs: Npc[] = [];
    for (let i = 0; i < n; i++) {
      const id = npcDataStore.getIdRandomly();
      const npc = Npc.generate(id);
      npcs.push(npc);
    }

    return npcs;
  }
}
