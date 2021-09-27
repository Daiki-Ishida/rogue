import { Board } from 'game/board';
import { itemDataStore } from 'game/store/itemDataStore';
import { Herb } from '../item';

export class HerbGenerator {
  static generate(board: Board): Herb {
    const id = itemDataStore.getHerbIdRandomly();
    return Herb.generate(id, board);
  }
}
