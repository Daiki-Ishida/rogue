import { RandomUtil } from 'game/util';
import { Item } from '../item';

export class ItemGenerator {
  static generate(): Item[] {
    const items: Item[] = [];
    return items;
    // const count = RandomUtil.getRandomIntInclusive(7, 12);

    // for (let i = 0; i < count; i++) {
    //   const item = this.getItemRandomly();
    //   items.push(item);
    // }

    // return items;
  }

  private static getItemRandomly(): void {
    // todo
    // const foods = FoodGenerator.generate();
    // const herbs = HerbGenerator.generate();
    // const staffs = StaffGenerator.generate();
    // const bracelets = BraceletGenerator.generate();
    // const scrolls = ScrollGenerator.generate();
    // return foods;
  }
}
