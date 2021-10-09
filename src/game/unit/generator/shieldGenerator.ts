import { Board } from 'game/board';
import { itemDataStore } from 'game/store/itemDataStore';
import { Shield } from '../item';

export class ShieldGenerator {
  static generate(board: Board): Shield {
    const id = itemDataStore.getShieldIdRandomly();
    return Shield.generate(id, board);
  }
}
