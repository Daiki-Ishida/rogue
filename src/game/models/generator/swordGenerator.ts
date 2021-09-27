import { Board } from 'game/board';
import { itemDataStore } from 'game/store/itemDataStore';
import { Sword } from '../item';

export class SwordGenerator {
  static generate(board: Board): Sword {
    const id = itemDataStore.getSwordIdRandomly();
    return Sword.generate(id, board);
  }
}
