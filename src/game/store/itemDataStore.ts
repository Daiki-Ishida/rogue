import ITEM_DISTRIBUTION from 'asset/data/distribution/item_distribution.json';
import ITEM_STATUS from 'asset/data/item_status.json';
import SWORD_STATUS from 'asset/data/sword_status.json';
import SHIELD_STATUS from 'asset/data/shield_status.json';
import FAKE_NAMES from 'asset/data/fake_names.json';
import { RandomUtil } from '../util';

interface ItemDistribution {
  id: string;
  ratio: number;
}

interface ItemStatusList {
  BRACELET: ItemStatus[];
  FOOD: ItemStatus[];
  HERB: ItemStatus[];
  STAFF: ItemStatus[];
  SCROLL: ItemStatus[];
}

interface ItemStatus {
  id: string;
  identified: boolean;
  name: string;
  fakeName: string;
  description: string;
  ratio: number;
}

interface SwordStatus {
  id: string;
  name: string;
  atk: number;
  ratio: number;
}

interface ShieldStatus {
  id: string;
  name: string;
  def: number;
  ratio: number;
}

class ItemDataStore {
  constructor(
    readonly itemDistribution: ItemDistribution[],
    public itemStatus: ItemStatusList,
    readonly swordStatus: SwordStatus[],
    readonly shieldStatus: ShieldStatus[]
  ) {}

  static init(): ItemDataStore {
    const itemStatus = applyFakeName(ITEM_STATUS);

    return new ItemDataStore(
      ITEM_DISTRIBUTION,
      itemStatus,
      SWORD_STATUS,
      SHIELD_STATUS
    );
  }

  getItemCategoryRandomly(): string {
    return this.selectRandomlyFrom(this.itemDistribution);
  }

  getHerbIdRandomly(): string {
    return this.selectRandomlyFrom(this.itemStatus.HERB);
  }

  getFoodIdRandomly(): string {
    return this.selectRandomlyFrom(this.itemStatus.FOOD);
  }

  getStaffIdRandomly(): string {
    return this.selectRandomlyFrom(this.itemStatus.STAFF);
  }

  getScrollIdRandomly(): string {
    return this.selectRandomlyFrom(this.itemStatus.SCROLL);
  }

  getBraceletIdRandomly(): string {
    return this.selectRandomlyFrom(this.itemStatus.BRACELET);
  }

  getSwordIdRandomly(): string {
    return this.selectRandomlyFrom(this.swordStatus);
  }

  getShieldIdRandomly(): string {
    return this.selectRandomlyFrom(this.shieldStatus);
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

  getScrollStatus(id: string): ItemStatus {
    const status = this.itemStatus.SCROLL.find((scroll) => scroll.id === id);

    if (status === undefined) throw new Error(`Invalid Id: ${id}`);
    return status;
  }

  getSwordStatus(id: string): SwordStatus {
    const status = this.swordStatus.find((sword) => sword.id === id);
    if (status === undefined) throw new Error(`Invalid Id: ${id}`);
    return status;
  }

  getShieldStatus(id: string): ShieldStatus {
    const status = this.shieldStatus.find((shield) => shield.id === id);
    if (status === undefined) throw new Error(`Invalid Id: ${id}`);
    return status;
  }

  private selectRandomlyFrom(dist: ItemDistribution[]): string {
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
      throw new Error('Item Not Found.');
    }

    return id;
  }
}

const applyFakeName = (data: ItemStatusList): ItemStatusList => {
  const bracelets = data.BRACELET;
  const foods = data.FOOD;
  const herbs = data.HERB;
  const staffs = data.STAFF;
  const scrolls = data.SCROLL;

  const fakeNames = FAKE_NAMES;
  const braceletFakeNames = shuffle(fakeNames.BRACELET);
  const foodFakeNames = shuffle(fakeNames.FOOD);
  const herbFakeNames = shuffle(fakeNames.HERB);
  const staffFakeNames = shuffle(fakeNames.STAFF);
  const scorllFakeNames = shuffle(fakeNames.SCROLL);

  for (let i = 0; i < bracelets.length; i++) {
    bracelets[i].fakeName = braceletFakeNames[i];
  }
  for (let i = 0; i < foods.length; i++) {
    foods[i].fakeName = foodFakeNames[0];
  }
  for (let i = 0; i < herbs.length; i++) {
    herbs[i].fakeName = herbFakeNames[i];
  }
  for (let i = 0; i < staffs.length; i++) {
    staffs[i].fakeName = staffFakeNames[i];
  }
  for (let i = 0; i < scrolls.length; i++) {
    scrolls[i].fakeName = scorllFakeNames[i];
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
