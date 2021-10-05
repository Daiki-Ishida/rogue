import { input } from 'game';
import { Game } from '../game';
import { Controller, actionController } from '.';
import { ControllerState } from './controllerState';

class SetupScreenController implements ControllerState {
  proc(_input: string, game: Game, context: Controller): void {
    if (_input !== 'Enter') return;

    input.remove();
    game.player.changeName(input.value().toString());

    game.state = 'PLAY';
    context.changeState(actionController);
  }
}

export const setupScreenController = new SetupScreenController();
