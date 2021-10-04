import { Game } from 'game/game';
import { ControllerState } from './controllerState';
import { startScreenController } from './startScreenCotroller';

export class Controller {
  constructor(private state: ControllerState) {
    this.state = state;
  }

  static init(): Controller {
    return new Controller(startScreenController);
  }

  changeState(state: ControllerState): void {
    this.state = state;
  }

  proc(input: string, game: Game): void {
    this.state.proc(input, game, this);
  }
}
