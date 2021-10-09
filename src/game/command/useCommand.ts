import { game } from 'game';
import { Board } from 'game/board';
import { Player } from 'game/unit/actor';
import { Usable } from 'game/unit/item';
import { Command } from '.';

export class UseCommand implements Command {
  constructor(
    readonly actor: Player,
    readonly item: Usable,
    public done: boolean = false
  ) {}

  exec(board: Board): void {
    this.actor.use(this.item, board);
    if (this.item.status.used) {
      game.inventory.delete();
    }
    this.done = true;
  }
}
