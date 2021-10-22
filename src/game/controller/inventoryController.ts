import { windowManager } from 'game';
import { Game } from 'game/game';
import { ItemSelectionWindow } from 'game/view/window';
import { ControllerManager } from './controllerManager';
import { Controller } from './controller';
import { actionController } from './actionController';
import { selectWindowController } from './selectWindowController';

/**
 * インベントリを開いている時の入力処理を扱うクラス
 */
export class InventoryController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
    const window = windowManager.inventoryWindow;

    switch (input) {
      case 'i':
        windowManager.close();
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
