import { game } from 'game';
import { Player } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Storable } from 'game/unit/item/storable';
import { Command } from '.';

/**
 * 壺からアイテムを取り出すコマンド
 */
export class WithdrawCommand implements Command {
  private constructor(
    readonly actor: Player,
    readonly storable: Storable,
    readonly target: Item,
    public done: boolean
  ) {}

  static of(player: Player, storable: Storable, item: Item): WithdrawCommand {
    return new WithdrawCommand(player, storable, item, false);
  }

  exec(): void {
    this.storable.withdraw(game.inventory);
    this.done = true;
  }
}
