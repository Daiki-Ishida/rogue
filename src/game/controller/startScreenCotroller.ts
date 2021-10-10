import { fileInput } from 'game';
import { Controller, prologueScreenController } from '.';
import { Game } from '../game';
import { ControllerState } from './controllerState';

class StartScreenController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    if (input !== 'Enter') return;

    fileInput.show();
    fileInput.position(600, 600);
    game.setGameState('PROLOGUE');
    context.changeState(prologueScreenController);
  }
}

export const startScreenController = new StartScreenController();
