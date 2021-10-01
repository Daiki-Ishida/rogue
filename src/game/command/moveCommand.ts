import { Command } from '.';
import { Actor } from 'game/models/actor';
import { Board } from 'game/board';

export class MoveCommand implements Command {
  constructor(readonly actor: Actor, public done: boolean = false) {}

  exec(board: Board): void {
    if (this.actor.isCondition('CONFUSED')) {
      this.actor.turnRandmoly();
    }

    this.actor.move(board);
    this.done = true;
  }
}
