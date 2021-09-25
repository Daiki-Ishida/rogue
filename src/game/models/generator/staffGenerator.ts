import { Board } from 'game/board';
import { itemDataStore } from 'game/store/itemDataStore';
import { Staff } from '../item';

export class StaffGenerator {
  static generate(board: Board): Staff {
    const id = itemDataStore.getStaffNameRandomly();
    return Staff.generate(id, board);
  }
}
