import { Board } from 'game/board';
import { Actor } from 'game/unit/actor';

export interface Command {
  actor: Actor;
  done: boolean;
  exec: (board: Board) => void;
}
