import NPC_STATUS from 'asset/data/npc_status.json';
import { RandomUtil } from 'game/util';

interface NpcStatus {
  id: string;
  name: string;
  hp: number;
  atk: number;
  def: number;
}

class NpcDataStore {
  private constructor(readonly status: NpcStatus[]) {}

  static init() {
    return new NpcDataStore(NPC_STATUS);
  }

  findStatusById(id: string): NpcStatus {
    const found = this.status.find((status) => status.id === id);
    if (found === undefined) {
      throw new Error('Npc Status Not Found.');
    }

    return found;
  }

  getIdRandomly(): string {
    const l = this.status.length;
    const r = RandomUtil.getRandomIntInclusive(0, l - 1);
    return this.status[r].id;
  }
}

export const npcDataStore = NpcDataStore.init();
