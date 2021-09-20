import { actionController, Controller, ControllerState } from '.';
import { Game } from '../game';
import { windowManager } from '..';

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
        break;
      }
    }
  }
}

export const selectWindowController = new SelectWindowController();
