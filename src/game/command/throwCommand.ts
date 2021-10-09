import { Board } from 'game/board';
import { Player } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Command } from '.';

export class ThrowCommand implements Command {
  constructor(
    readonly actor: Player,
    readonly item: Item,
    public done: boolean = false
  ) {}

  exec(board: Board): void {
    this.actor.throw(this.item, board);
    this.done = true;
  }
}
