import { windowManager } from 'game';
import { Game } from 'game/game';
import { ControllerManager } from './controllerManager';
import { Controller } from './controller';
import { actionController } from './actionController';

/**
 * 選択ウィンドウを開いている時の入力処理を扱うクラス
 */
export class SelectWindowController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
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
