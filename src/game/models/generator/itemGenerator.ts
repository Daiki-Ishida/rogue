import { Board } from 'game/board';
import { RandomUtil } from 'game/util';
import { Item } from '../item';
import { BraceletGenerator } from './braceletGenerator';
import { FoodGenerator } from './foodGenerator';
import { HerbGenerator } from './herbGenerator';
import { StaffGenerator } from './staffGenerator';

export class ItemGenerator {
  static generate(board: Board): Item[] {
    const items: Item[] = [];
    const count = RandomUtil.getRandomIntInclusive(7, 12);

    for (let i = 0; i < count; i++) {
      const item = this.getItemRandomly(board);
      items.push(item);
    }

    return items;
  }

  private static getItemRandomly(board: Board): Item {
    // todo
    const foods = FoodGenerator.generate(board);
    const herbs = HerbGenerator.generate(board);
    // const staffs = StaffGenerator.generate(board);
    const bracelets = BraceletGenerator.generate(board);
    // const scrolls = ScrollGenerator.generate();
    // return foods;
    return bracelets;
    return herbs;
  }
}
