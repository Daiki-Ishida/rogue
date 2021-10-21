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
  static generate(n: number, board: Board): Item[] {
    const items: Item[] = [];
    for (let i = 0; i < n; i++) {
      const item = this.getItemRandomly(board);
      items.push(item);
    }

    return items;
  }

  private static getItemRandomly(board: Board): Item {
    const category = itemDataStore.getItemCategoryRandomly();
    let item: Item;
    switch (category) {
      case 'FOOD':
        item = FoodGenerator.generate(board);
        break;
      case 'HERB':
        item = HerbGenerator.generate(board);
        break;
      case 'STAFF':
        item = StaffGenerator.generate(board);
        break;
      case 'SCROLL':
        item = ScrollGenerator.generate(board);
        break;
      case 'BRACELET':
        item = BraceletGenerator.generate(board);
        break;
      case 'SWORD':
        item = SwordGenerator.generate(board);
        break;
      case 'SHIELD':
        item = ShieldGenerator.generate(board);
        break;
      case 'POT':
        item = PotGenerator.generate(board);
        break;
      default:
        item = Gold.generate(board);
    }

    return item;
  }

  static load(category: string, id: string, board: Board): Item {
    let item: Item;
    switch (category) {
      case 'FOOD':
        item = Food.generate(id, board);
        break;
      case 'HERB':
        item = Herb.generate(id, board);
        break;
      case 'STAFF':
        item = Staff.generate(id, board);
        break;
      case 'SCROLL':
        item = Scroll.generate(id, board);
        break;
      case 'BRACELET':
        item = Bracelet.generate(id, board);
        break;
      case 'SWORD':
        item = Sword.generate(id, board);
        break;
      case 'SHIELD':
        item = Shield.generate(id, board);
        break;
      case 'POT':
        item = Pot.generate(id, board);
        break;
      default:
        throw new Error('Invalid Data...');
    }
    board.clearItem(item);

    return item;
  }
}
