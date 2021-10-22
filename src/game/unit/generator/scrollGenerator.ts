import { itemDataStore } from 'game/store/itemDataStore';
import { Scroll } from '../item';

export class ScrollGenerator {
  static generate(): Scroll {
    const id = itemDataStore.getScrollIdRandomly();
    return Scroll.generate(id);
  }
}
