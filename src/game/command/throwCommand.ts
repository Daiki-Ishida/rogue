import { Board } from 'game/board';
import { Player } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Command } from '.';

/**
 * アイテムを投げるコマンド
 */
export class ThrowCommand implements Command {
  private constructor(
    readonly actor: Player,
    readonly item: Item,
    public done: boolean
  ) {}

  static of(player: Player, item: Item): ThrowCommand {
    return new ThrowCommand(player, item, false);
  }

  exec(board: Board): void {
    this.actor.throw(this.item, board);
    this.done = true;
  }
}
