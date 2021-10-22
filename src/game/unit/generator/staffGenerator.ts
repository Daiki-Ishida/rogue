import { itemDataStore } from 'game/store/itemDataStore';
import { Staff } from '../item';

export class StaffGenerator {
  static generate(): Staff {
    const id = itemDataStore.getStaffIdRandomly();
    return Staff.generate(id);
  }
}
