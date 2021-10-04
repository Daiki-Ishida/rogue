import { Controller, actionController } from '.';
import { Game } from '../game';
import { ControllerState } from './controllerState';

class StartScreenController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    if (input !== 'Enter') return;
    game.state = 'PLAY';
    context.changeState(actionController);
  }
}

export const startScreenController = new StartScreenController();
