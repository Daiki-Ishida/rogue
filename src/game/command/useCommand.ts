import { Board } from 'game/board';
import { Player } from 'game/models/actor';
import { Usable } from 'game/models/item';
import { Command } from '.';

export class UseCommand implements Command {
  constructor(
    readonly actor: Player,
    readonly item: Usable,
    public done: boolean = false
  ) {}

  exec(board: Board): void {
    this.actor.use(this.item, board);
  }
}
