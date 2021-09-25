import { Board } from 'game/board';
import { Player } from 'game/models/actor';
import { Item } from 'game/models/item';
import { Command } from '.';

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
