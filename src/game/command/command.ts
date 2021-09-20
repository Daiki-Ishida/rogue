import { Actor } from '../actor';
import { Board } from '../board';

export interface Command {
  actor: Actor;
  done: boolean;
  exec: (board: Board) => void;
}
