import ITEM_DISTRIBUTION from 'asset/data/distribution/item_distribution.json';
import HERB_DISTRIBUTION from 'asset/data/distribution/herb_distribution.json';
import FOOD_DISTRIBUTION from 'asset/data/distribution/food_distribution.json';
import STAFF_DISTRIBUTION from 'asset/data/distribution/staff_distribution.json';
import SCROLL_DISTRIBUTION from 'asset/data/distribution/scroll_distribution.json';
import BRACELET_DISTRIBUTION from 'asset/data/distribution/bracelet_distribution.json';
import { RandomUtil } from '../util';

interface ItemDistribution {
  name: string;
  ratio: number;
}

class ItemDataStore {
  constructor(
    readonly itemDistribution: ItemDistribution[],
    readonly herbDistribution: ItemDistribution[],
    readonly foodDistribution: ItemDistribution[],
    readonly staffDistribution: ItemDistribution[],
    readonly scrollDistribution: ItemDistribution[],
    readonly braceletDistribution: ItemDistribution[]
  ) {}

  static init(): ItemDataStore {
    return new ItemDataStore(
      ITEM_DISTRIBUTION,
      HERB_DISTRIBUTION,
      FOOD_DISTRIBUTION,
      STAFF_DISTRIBUTION,
      SCROLL_DISTRIBUTION,
      BRACELET_DISTRIBUTION
    );
  }

  getHerbNameRandomly(): string {
    return this.selectRandomlyFrom(this.herbDistribution);
  }

  getFoodNameRandomly(): string {
    return this.selectRandomlyFrom(this.foodDistribution);
  }

  getStaffNameRandomly(): string {
    return this.selectRandomlyFrom(this.staffDistribution);
  }

  getScrollNameRandomly(): string {
    return this.selectRandomlyFrom(this.scrollDistribution);
  }

  getBraceletNameRandomly(): string {
    return this.selectRandomlyFrom(this.braceletDistribution);
  }

  private selectRandomlyFrom(dist: ItemDistribution[]): string {
    const r = RandomUtil.getRandomIntInclusive(0, 255);

    let c = 0;
    let name;
    for (const d of dist) {
      c += d.ratio;
      if (c > r) {
        name = d.name;
        break;
      }
    }

    if (name === undefined) {
      throw new Error('Item Not Found.');
    }

    return name;
  }
}

export const itemDataStore = ItemDataStore.init();
