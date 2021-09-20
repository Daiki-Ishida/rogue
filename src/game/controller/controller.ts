import { Game } from '../game';
import { actionController } from './actionController';
import { ControllerState } from './controllerState';

export class Controller {
  constructor(private state: ControllerState) {
    this.state = state;
  }

  static init(): Controller {
    return new Controller(actionController);
  }

  changeState(state: ControllerState): void {
    this.state = state;
  }

  proc(input: string, game: Game): void {
    this.state.proc(input, game, this);
  }
}
