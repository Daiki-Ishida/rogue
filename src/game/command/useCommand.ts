import { Command } from '.';
import { Player } from '../actor';
import { Board } from '../board';
import { Usable } from '../item';

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
