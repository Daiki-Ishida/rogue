import { textBox } from 'game';
import { Controller } from '.';
import { Game } from '../game';
import { ControllerState } from './controllerState';
import { setupScreenController } from './setupScreenController';

class PrologueScreenController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    if (input !== 'Enter') return;

    textBox.show();
    game.setGameState('SET_UP');
    context.changeState(setupScreenController);
  }
}

export const prologueScreenController = new PrologueScreenController();
