import { itemDataStore } from 'game/store/itemDataStore';
import { Pot } from '../item/storable';

export class PotGenerator {
  static generate(): Pot {
    const id = itemDataStore.getPotIdRandomly();
    return Pot.generate(id);
  }
}
