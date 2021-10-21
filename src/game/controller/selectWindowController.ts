import { windowManager } from 'game';
import { Game } from 'game/game';
import { Controller } from './controller';
import { ControllerState } from './controllerState';
import { actionController } from './actionController';

export class SelectWindowController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    const window = windowManager.selectWindow;
    if (window === undefined) {
      context.changeState(actionController);
      return;
    }

    switch (input) {
      case 'w':
        window.prev();
        break;
      case 's':
        window.next();
        break;
      case 'u': {
        window.select();
        break;
      }
    }
  }
}

export const selectWindowController = new SelectWindowController();
