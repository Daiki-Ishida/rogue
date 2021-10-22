import { itemDataStore } from 'game/store/itemDataStore';
import { Bracelet } from '../item';

export class BraceletGenerator {
  static generate(): Bracelet {
    const id = itemDataStore.getBraceletIdRandomly();
    return Bracelet.generate(id);
  }
}
