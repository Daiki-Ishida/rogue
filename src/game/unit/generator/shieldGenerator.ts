import { itemDataStore } from 'game/store/itemDataStore';
import { Shield } from '../item';

export class ShieldGenerator {
  static generate(): Shield {
    const id = itemDataStore.getShieldIdRandomly();
    return Shield.generate(id);
  }
}
