import { input } from 'game';
import { Controller } from '.';
import { Game } from '../game';
import { ControllerState } from './controllerState';
import { setupScreenController } from './setupScreenController';

class StartScreenController implements ControllerState {
  proc(_input: string, game: Game, context: Controller): void {
    if (_input !== 'Enter') return;

    input.show();
    game.state = 'SET_UP';
    context.changeState(setupScreenController);
  }
}

export const startScreenController = new StartScreenController();
