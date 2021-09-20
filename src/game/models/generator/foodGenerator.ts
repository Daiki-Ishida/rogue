import { BigBread, Bread, Food, GiantBread, RottenBread } from '../game/item';
import { itemDataStore } from '../store/itemDataStore';

export class FoodGenerator {
  static generate(): Food {
    const foodName = itemDataStore.getFoodNameRandomly();
    let food: Food;
    switch (foodName) {
      case 'Bread':
        food = Bread.generate();
        break;
      case 'BigBread':
        food = BigBread.generate();
        break;
      case 'RottenBread':
        food = RottenBread.generate();
        break;
      case 'GiantBread':
        food = GiantBread.generate();
        break;
      default:
        throw new Error(`Invalid Id: ${foodName}`);
        break;
    }

    return food;
  }
}
