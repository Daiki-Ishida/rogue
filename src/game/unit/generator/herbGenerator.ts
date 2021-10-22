import { itemDataStore } from 'game/store/itemDataStore';
import { Herb } from '../item';

export class HerbGenerator {
  static generate(): Herb {
    const id = itemDataStore.getHerbIdRandomly();
    return Herb.generate(id);
  }
}
