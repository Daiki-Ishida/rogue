import { Board } from 'game/board';
import { itemDataStore } from 'game/store/itemDataStore';
import { Bracelet } from '../item';

export class BraceletGenerator {
  static generate(board: Board): Bracelet {
    const id = itemDataStore.getBraceletNameRandomly();
    return Bracelet.generate(id, board);
  }
}
