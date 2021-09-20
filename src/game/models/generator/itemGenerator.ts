import { RandomUtil } from '../util';
import {
  HerbGenerator,
  FoodGenerator,
  StaffGenerator,
  ScrollGenerator,
  BraceletGenerator,
} from '.';
import { Item } from '../game/item/iItem';

export class ItemGenerator {
  static generate(): Item[] {
    const items = [];
    const count = RandomUtil.getRandomIntInclusive(7, 12);

    for (let i = 0; i < count; i++) {
      const item = this.getItemRandomly();
      items.push(item);
    }

    return items;
  }

  private static getItemRandomly(): Item {
    // todo
    const foods = FoodGenerator.generate();
    const herbs = HerbGenerator.generate();
    const staffs = StaffGenerator.generate();
    const bracelets = BraceletGenerator.generate();
    // const scrolls = ScrollGenerator.generate();
    return foods;
  }
}
