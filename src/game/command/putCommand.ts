import { Board } from 'game/board';
import { Player } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Storable } from 'game/unit/item/storable';
import { Command } from '.';

/**
 * 壺にアイテムを入れるコマンド
 */
export class PutCommand implements Command {
  private constructor(
    readonly actor: Player,
    readonly storable: Storable,
    readonly target: Item,
    public done: boolean
  ) {}

  static of(player: Player, storable: Storable, item: Item): PutCommand {
    return new PutCommand(player, storable, item, false);
  }

  exec(board: Board): void {
    this.storable.put(this.target, board);
    this.done = true;
  }
}
