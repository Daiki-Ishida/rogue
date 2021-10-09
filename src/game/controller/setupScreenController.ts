import { textBox } from 'game';
import { Game } from '../game';
import { Controller, actionController } from '.';
import { ControllerState } from './controllerState';

class SetupScreenController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    if (input !== 'Enter') return;

    const name = textBox.value().toString();
    if (name.length === 0) {
      alert('名前を入力してください！');
      return;
    }
    if (name.length > 8) {
      alert('８文字以内で入力してください！');
      return;
    }

    game.player.changeName(name);
    textBox.remove();

    game.setGameState('PLAY');
    context.changeState(actionController);
  }
}

export const setupScreenController = new SetupScreenController();
