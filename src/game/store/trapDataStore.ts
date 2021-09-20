import TRAP_DISTRIBUTION from '../assets/data/distribution/trap_distribution.json';
import { RandomUtil } from '../util';

interface TrapDistribution {
  name: string;
  ratio: number;
}

class TrapDataStore {
  constructor(readonly distribution: TrapDistribution[]) {}

  static init(): TrapDataStore {
    return new TrapDataStore(TRAP_DISTRIBUTION);
  }

  getTrapNameRandomly(): string {
    const r = RandomUtil.getRandomIntInclusive(0, 255);

    let c = 0;
    let name;
    for (const d of this.distribution) {
      c += d.ratio;
      if (c > r) {
        name = d.name;
        break;
      }
    }

    if (name === undefined) {
      throw new Error('Trap Not Found.');
    }

    return name;
  }
}

export const trapDataStore = TrapDataStore.init();
