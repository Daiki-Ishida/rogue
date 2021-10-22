import { ControllerManager } from '.';
import { Game } from '../game';

export interface Controller {
  proc: (input: string, game: Game, context: ControllerManager) => void;
}
