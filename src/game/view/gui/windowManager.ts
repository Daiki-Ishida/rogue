import { Game } from 'game/game';
import { HelpWindow } from './helpWindow';
import { InventoryWindow } from './inventoryWindow';
import { SelectionWindow } from './selectionWindow';

export class WindowManager {
  constructor(
    readonly inventoryWindow: InventoryWindow,
    readonly helpWindow: HelpWindow,
    public selectWindow?: SelectionWindow
  ) {}

  static init(game: Game): WindowManager {
    const inventoryWindow = InventoryWindow.init(game.inventory);
    const helpWindow = new HelpWindow();
    return new WindowManager(inventoryWindow, helpWindow);
  }
}
