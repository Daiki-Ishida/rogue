import { itemDataStore } from 'game/store/itemDataStore';
import { Food } from '../item';

export class FoodGenerator {
  static generate(): Food {
    const id = itemDataStore.getFoodIdRandomly();
    return Food.generate(id);
  }
}
