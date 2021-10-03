import { windowManager } from 'game';
import { Game } from 'game/game';
import { ItemSelectionWindow } from 'game/view/gui';
import { Controller } from './controller';
import { ControllerState } from './controllerState';
import { actionController } from './actionController';
import { selectWindowController } from './selectWindowController';

class InventoryController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    const window = windowManager.inventoryWindow;

    switch (input) {
      case 'i':
        window.close();
        context.changeState(actionController);
        break;
      case 'w':
        window.prev();
        break;
      case 's':
        window.next();
        break;
      case 'a':
        window.prevPage();
        break;
      case 'd':
        window.nextPage();
        break;
      case 'e':
        window.sort();
        break;
      case 'u': {
        const item = window.selected;
        if (item === undefined) break; // エラーで落ちないように握りつぶす。

        const selectWindow = ItemSelectionWindow.ofInventory(item, game);
        windowManager.selectWindow = selectWindow;

        context.changeState(selectWindowController);
        break;
      }
    }
  }
}

export const inventoryController = new InventoryController();
