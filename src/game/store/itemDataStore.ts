import ITEM_DISTRIBUTION from 'asset/data/distribution/item_distribution.json';
import HERB_DISTRIBUTION from 'asset/data/distribution/herb_distribution.json';
import FOOD_DISTRIBUTION from 'asset/data/distribution/food_distribution.json';
import STAFF_DISTRIBUTION from 'asset/data/distribution/staff_distribution.json';
import SCROLL_DISTRIBUTION from 'asset/data/distribution/scroll_distribution.json';
import BRACELET_DISTRIBUTION from 'asset/data/distribution/bracelet_distribution.json';
import ITEM_STATUS from 'asset/data/item_status.json';
import FAKE_NAMES from 'asset/data/fake_names.json';
import { RandomUtil } from '../util';

interface ItemDistribution {
  name: string;
  ratio: number;
}

interface ItemStatusList {
  BRACELET: ItemStatus[];
  FOOD: ItemStatus[];
  HERB: ItemStatus[];
  STAFF: ItemStatus[];
}

interface ItemStatus {
  id: string;
  identified: boolean;
  name: string;
  fakeName: string;
}

class ItemDataStore {
  constructor(
    readonly itemDistribution: ItemDistribution[],
    readonly herbDistribution: ItemDistribution[],
    readonly foodDistribution: ItemDistribution[],
    readonly staffDistribution: ItemDistribution[],
    readonly scrollDistribution: ItemDistribution[],
    readonly braceletDistribution: ItemDistribution[],
    readonly itemStatus: ItemStatusList
  ) {}

  static init(): ItemDataStore {
    const itemStatus = applyFakeName(ITEM_STATUS);

    return new ItemDataStore(
      ITEM_DISTRIBUTION,
      HERB_DISTRIBUTION,
      FOOD_DISTRIBUTION,
      STAFF_DISTRIBUTION,
      SCROLL_DISTRIBUTION,
      BRACELET_DISTRIBUTION,
      itemStatus
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

  getBraceletStatus(id: string): ItemStatus {
    const status = this.itemStatus.BRACELET.find(
      (bracelet) => bracelet.id === id
    );

    if (status === undefined) throw new Error(`Invalid Id: ${id}`);
    return status;
  }

  getFoodStatus(id: string): ItemStatus {
    const status = this.itemStatus.FOOD.find((food) => food.id === id);

    if (status === undefined) throw new Error(`Invalid Id: ${id}`);
    return status;
  }

  getHerbStatus(id: string): ItemStatus {
    const status = this.itemStatus.HERB.find((herb) => herb.id === id);

    if (status === undefined) throw new Error(`Invalid Id: ${id}`);
    return status;
  }

  getStaffStatus(id: string): ItemStatus {
    const status = this.itemStatus.STAFF.find((staff) => staff.id === id);

    if (status === undefined) throw new Error(`Invalid Id: ${id}`);
    return status;
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

const applyFakeName = (data: ItemStatusList): ItemStatusList => {
  const bracelets = data.BRACELET;
  const foods = data.FOOD;
  const herbs = data.HERB;
  const staffs = data.STAFF;

  const fakeNames = FAKE_NAMES;
  const braceletFakeNames = shuffle(fakeNames.BRACELET);
  const foodFakeNames = shuffle(fakeNames.FOOD);
  const herbFakeNames = shuffle(fakeNames.HERB);
  const staffFakeNames = shuffle(fakeNames.STAFF);

  for (let i = 0; i < bracelets.length - 1; i++) {
    bracelets[i].fakeName = braceletFakeNames[i];
  }
  for (let i = 0; i < foods.length - 1; i++) {
    foods[i].fakeName = foodFakeNames[0];
  }
  for (let i = 0; i < herbs.length - 1; i++) {
    herbs[i].fakeName = herbFakeNames[i];
  }
  for (let i = 0; i < staffs.length - 1; i++) {
    staffs[i].fakeName = staffFakeNames[i];
  }

  return data;
};

// todo refactor
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const itemDataStore = ItemDataStore.init();
