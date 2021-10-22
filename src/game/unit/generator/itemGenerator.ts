import {
  Bracelet,
  Food,
  Gold,
  Herb,
  Item,
  Scroll,
  Shield,
  Staff,
  Sword,
} from '../item';
import { Board } from 'game/board';
import { BraceletGenerator } from './braceletGenerator';
import { FoodGenerator } from './foodGenerator';
import { HerbGenerator } from './herbGenerator';
import { StaffGenerator } from './staffGenerator';
import { itemDataStore } from 'game/store/itemDataStore';
import { ScrollGenerator } from './scrollGenerator';
import { SwordGenerator } from './swordGenerator';
import { ShieldGenerator } from './shieldGenerator';
import { PotGenerator } from './potGenerator';
import { Pot } from '../item/storable';

export class ItemGenerator {
  static generate(n: number): Item[] {
    const items: Item[] = [];
    for (let i = 0; i < n; i++) {
      const item = this.getItemRandomly();
      items.push(item);
    }

    return items;
  }

  private static getItemRandomly(): Item {
    const category = itemDataStore.getItemCategoryRandomly();
    let item: Item;
    switch (category) {
      case 'FOOD':
        item = FoodGenerator.generate();
        break;
      case 'HERB':
        item = HerbGenerator.generate();
        break;
      case 'STAFF':
        item = StaffGenerator.generate();
        break;
      case 'SCROLL':
        item = ScrollGenerator.generate();
        break;
      case 'BRACELET':
        item = BraceletGenerator.generate();
        break;
      case 'SWORD':
        item = SwordGenerator.generate();
        break;
      case 'SHIELD':
        item = ShieldGenerator.generate();
        break;
      case 'POT':
        item = PotGenerator.generate();
        break;
      default:
        item = Gold.generate();
    }

    return item;
  }

  static load(category: string, id: string, board: Board): Item {
    let item: Item;
    switch (category) {
      case 'FOOD':
        item = Food.generate(id);
        break;
      case 'HERB':
        item = Herb.generate(id);
        break;
      case 'STAFF':
        item = Staff.generate(id);
        break;
      case 'SCROLL':
        item = Scroll.generate(id);
        break;
      case 'BRACELET':
        item = Bracelet.generate(id);
        break;
      case 'SWORD':
        item = Sword.generate(id);
        break;
      case 'SHIELD':
        item = Shield.generate(id);
        break;
      case 'POT':
        item = Pot.generate(id);
        break;
      default:
        throw new Error('Invalid Data...');
    }
    board.clearItem(item);

    return item;
  }
}
