import { windowManager } from 'game';
import { Game } from 'game/game';
import { Controller } from './controller';
import { ControllerState } from './controllerState';
import { actionController } from './actionController';

class SelectWindowController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    const window = windowManager.selectWindow;
    if (window === undefined) {
      context.changeState(actionController);
      return;
    }

    // const se = new SoundEffect(game.asset.soundFiles.select);
    switch (input) {
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
        window.select();
        windowManager.inventoryWindow.close();
        windowManager.selectWindow = undefined;
        context.changeState(actionController);
        break;
      }
    }
  }
}

export const selectWindowController = new SelectWindowController();
