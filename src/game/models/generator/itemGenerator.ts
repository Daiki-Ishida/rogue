import { Item } from '../item';
import { Board } from 'game/board';
import { BraceletGenerator } from './braceletGenerator';
import { FoodGenerator } from './foodGenerator';
import { HerbGenerator } from './herbGenerator';
import { StaffGenerator } from './staffGenerator';
import { itemDataStore } from 'game/store/itemDataStore';
import { ScrollGenerator } from './scrollGenerator';
import { SwordGenerator } from './swordGenerator';
import { ShieldGenerator } from './shieldGenerator';

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
      default:
        item = SwordGenerator.generate(board);
      // throw new Error(`Invalid Category: ${category}`);
    }

    return item;
  }
}
