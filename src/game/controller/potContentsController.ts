import { windowManager } from 'game';
import { Game } from 'game/game';
import { Controller } from './controller';
import { ControllerState } from './controllerState';
import { actionController } from './actionController';
import { Storable } from 'game/unit/item/storable';
import { WithdrawCommand } from 'game/command/withdrawCommand';

export class PotContentsController implements ControllerState {
  constructor(readonly pot: Storable) {}

  proc(input: string, game: Game, context: Controller): void {
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
