import { itemDataStore } from 'game/store/itemDataStore';
import { Sword } from '../item';

export class SwordGenerator {
  static generate(): Sword {
    const id = itemDataStore.getSwordIdRandomly();
    return Sword.generate(id);
  }
}
