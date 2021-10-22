import { Command } from '.';
import { Actor } from 'game/unit/actor';

/**
 * 足踏みするコマンド
 */
export class StepCommand implements Command {
  private constructor(readonly actor: Actor, public done: boolean) {}

  static of(actor: Actor): StepCommand {
    return new StepCommand(actor, false);
  }

  // その場で何もしない。
  exec(): void {
    this.done = true;
  }
}
