import { Board } from 'game/board';
import { Actor } from 'game/unit/actor';
import { Command } from '.';

/**
 * 通常攻撃コマンドクラス
 */
export class AttackCommand implements Command {
  private constructor(readonly actor: Actor, public done: boolean) {}

  static of(actor: Actor): AttackCommand {
    return new AttackCommand(actor, false);
  }

  exec(board: Board): void {
    this.actor.attack(board);
    this.done = true;
  }
}
