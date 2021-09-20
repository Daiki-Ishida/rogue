import { Controller } from '.';
import { Game } from '../game';

export interface ControllerState {
  proc: (input: string, game: Game, context: Controller) => void;
}
