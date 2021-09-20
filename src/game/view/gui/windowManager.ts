import { InventoryWindow, SelectionWindow } from '.';
import { Game } from '../game';

export class WindowManager {
  constructor(
    // readonly indicatorWindow: string,
    // readonly messageWindow: string,
    readonly inventoryWindow: InventoryWindow,
    public selectWindow?: SelectionWindow
  ) {}

  static init(game: Game): WindowManager {
    return new WindowManager(InventoryWindow.init(game.inventory));
  }
}
