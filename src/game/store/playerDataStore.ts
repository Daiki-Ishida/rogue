import EXP_TABLE from 'asset/data/exp_table.json';

interface ExpTable {
  level: number;
  exp: number;
}

class PlayerDataStore {
  constructor(readonly expTable: ExpTable[]) {}

  static init(): PlayerDataStore {
    return new PlayerDataStore(EXP_TABLE);
  }

  findLevelByExp(exp: number): number {
    const found = this.expTable.find((table) => table.exp > exp);
    return found === undefined
      ? this.expTable[this.expTable.length - 1].level
      : found.level - 1;
  }

  findExpByLebel(level: number): number {
    const found = this.expTable.find((table) => table.level === level);
    return found === undefined
      ? this.expTable[this.expTable.length - 1].exp
      : found.exp;
  }
}

export const playerDataStore = PlayerDataStore.init();
