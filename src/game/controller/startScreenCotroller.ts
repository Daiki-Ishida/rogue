import { textBox } from 'game';
import { Controller } from '.';
import { Game } from '../game';
import { ControllerState } from './controllerState';
import { setupScreenController } from './setupScreenController';

class StartScreenController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    if (input !== 'Enter') return;

    textBox.show();
    game.state = 'SET_UP';
    context.changeState(setupScreenController);
  }
}

export const startScreenController = new StartScreenController();
