import { game } from 'game';
import { Board } from 'game/board';
import { Player } from 'game/unit/actor';
import { Usable } from 'game/unit/item';
import { Command } from '.';

/**
 * アイテムを使うコマンド
 */
export class UseCommand implements Command {
  private constructor(
    readonly actor: Player,
    readonly item: Usable,
    public done: boolean
  ) {}

  static of(player: Player, item: Usable): UseCommand {
    return new UseCommand(player, item, false);
  }

  exec(board: Board): void {
    this.actor.use(this.item, board);
    if (this.item.status.used) {
      game.inventory.delete();
    }
    this.done = true;
  }
}
