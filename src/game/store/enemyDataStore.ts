import ENEMY_STATUS from 'asset/data/enemy_status.json';
import ENEMY_DISTRIBUTIONS from 'asset/data/distribution/enemy_distribution.json';
import { RandomUtil } from 'game/util';

interface EnemyStatus {
  id: string;
  name: string;
  group: string;
  level: number;
  hp: number;
  atk: number;
  def: number;
  exp: number;
}

interface EnemyDistribution {
  id: string;
  ratio: number;
}

interface EnemyDistributionsByLevel {
  level: number;
  enemys: EnemyDistribution[];
}

class EnemyDataStore {
  private constructor(
    readonly status: EnemyStatus[],
    readonly distribution: EnemyDistributionsByLevel[]
  ) {}

  static init() {
    return new EnemyDataStore(ENEMY_STATUS, ENEMY_DISTRIBUTIONS);
  }

  findEnemyStatusById(id: string): EnemyStatus {
    const found = this.status.find((status) => status.id === id);
    if (found === undefined) {
      throw new Error('Enemy Status Not Found.');
    }

    return found;
  }

  findByLevelAndGroup(level: number, group: string): EnemyStatus | undefined {
    return this.status.find((it) => it.group === group && it.level === level);
  }

  getEnemyIdInLevelRandomly(level: number): string {
    const found = this.findDistributionByLevel(level);
    if (found === undefined) {
      throw new Error(`Distribution On level ${level} Not Found.`);
    }

    return this.selectRandomlyFrom(found.enemys);
  }

  private findDistributionByLevel(
    level: number
  ): EnemyDistributionsByLevel | undefined {
    return this.distribution.find((d) => d.level === level);
  }

  private selectRandomlyFrom(dist: EnemyDistribution[]): string {
    const r = RandomUtil.getRandomIntInclusive(0, 255);

    let c = 0;
    let id;
    for (const d of dist) {
      c += d.ratio;
      if (c > r) {
        id = d.id;
        break;
      }
    }

    if (id === undefined) {
      throw new Error('Enemy Not Found.');
    }

    return id;
  }
}

export const enemyDataStore = EnemyDataStore.init();
