import { Command } from '.';
import { Player } from '../actor';
import { Board } from '../board';
import { Item } from '../item/iItem';

export class ThrowCommand implements Command {
  constructor(
    readonly actor: Player,
    readonly item: Item,
    public done: boolean = false
  ) {}

  exec(board: Board): void {
    this.item.throw(this.actor, board);
  }
}
