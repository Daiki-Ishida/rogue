import { Board } from 'game/board';
import { itemDataStore } from 'game/store/itemDataStore';
import { Food } from '../item';

export class FoodGenerator {
  static generate(board: Board): Food {
    const id = itemDataStore.getFoodIdRandomly();
    return Food.generate(id, board);
  }
}
