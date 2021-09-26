import { Board } from 'game/board';
import { itemDataStore } from 'game/store/itemDataStore';
import { Scroll } from '../item';

export class ScrollGenerator {
  static generate(board: Board): Scroll {
    const id = itemDataStore.getScrollNameRandomly();
    return Scroll.generate(id, board);
  }
}
