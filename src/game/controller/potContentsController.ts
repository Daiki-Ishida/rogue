import { windowManager } from 'game';
import { Game } from 'game/game';
import { ControllerManager } from './controllerManager';
import { Controller } from './controller';
import { actionController } from './actionController';
import { Storable } from 'game/unit/item/storable';
import { WithdrawCommand } from 'game/command/withdrawCommand';

/**
 * 壺の中身を開いている時の入力処理を扱うクラス
 */
export class PotContentsController implements Controller {
  constructor(readonly pot: Storable) {}

  proc(input: string, game: Game, context: ControllerManager): void {
    const window = windowManager.potContentWindow;
    if (window === undefined) {
      throw new Error('something went wrong...');
    }

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
      case 'u': {
        const item = window.selected;
        if (item === undefined) break; // エラーで落ちないように握りつぶす。

        const command = WithdrawCommand.of(game.player, this.pot, item);
        game.commands.push(command);

        windowManager.close();
        context.changeState(actionController);
        break;
      }
    }
  }
}
