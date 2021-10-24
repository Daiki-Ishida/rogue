import NPC_STATUS from 'asset/data/npc_status.json';

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
}

export const npcDataStore = NpcDataStore.init();
