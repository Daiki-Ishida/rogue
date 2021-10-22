import { Board } from 'game/board';
import { Enemy } from 'game/unit/actor/enemy';
import { Command } from '.';

/**
 * 技コマンドクラス
 */
export class ArtCommand implements Command {
  private constructor(readonly actor: Enemy, public done: boolean) {}

  static of(enemy: Enemy): ArtCommand {
    return new ArtCommand(enemy, false);
  }

  exec(board: Board): void {
    this.actor.unleashArt(board);
    this.done = true;
  }
}
