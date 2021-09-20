import { Game } from 'game/game';
import { InventoryWindow } from './inventoryWindow';
import { SelectionWindow } from './selectionWindow';

export class WindowManager {
  constructor(
    // readonly indicatorWindow: string,
    // readonly messageWindow: string,
    readonly inventoryWindow: InventoryWindow,
    public selectWindow?: SelectionWindow
  ) {}

  static init(game: Game): WindowManager {
    const inventoryWindow = InventoryWindow.init(game.inventory);
    return new WindowManager(inventoryWindow);
  }
}
