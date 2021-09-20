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

    // const se = new SoundEffect(game.asset.soundFiles.select);
    switch (input) {
      case 'i':
        // se.play();
        window.close();
        context.changeState(actionController);
        break;
      case 'w':
        // se.play();
        window.prev();
        break;
      case 's':
        // se.play();
        window.next();
        break;
      case 'u': {
        // se.play();
        const item = window.selected;
        const selectWindow = ItemSelectionWindow.ofInventory(item, game);
        windowManager.selectWindow = selectWindow;

        context.changeState(selectWindowController);
        break;
      }
    }
  }
}

export const inventoryController = new InventoryController();
