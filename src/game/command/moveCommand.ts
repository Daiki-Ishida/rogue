import { Command } from '.';
import { Actor } from 'game/unit/actor';
import { Board } from 'game/board';

/**
 * 歩行コマンド
 */
export class MoveCommand implements Command {
  private constructor(readonly actor: Actor, public done: boolean) {}

  static of(actor: Actor): MoveCommand {
    return new MoveCommand(actor, false);
  }

  exec(board: Board): void {
    this.actor.move(board);
    this.done = true;
  }
}
