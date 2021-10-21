import { game } from 'game';
import { Player } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Storable } from 'game/unit/item/storable';
import { Command } from '.';

export class WithdrawCommand implements Command {
  constructor(
    readonly actor: Player,
    readonly storable: Storable,
    readonly target: Item,
    public done: boolean = false
  ) {}

  exec(): void {
    this.storable.withdraw(game.inventory);
    this.done = true;
  }
}
