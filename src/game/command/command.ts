import { Board } from 'game/board';
import { Actor } from 'game/models/actor';

export interface Command {
  actor: Actor;
  done: boolean;
  exec: (board: Board) => void;
}
