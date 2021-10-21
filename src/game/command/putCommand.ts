import { Board } from 'game/board';
import { Player } from 'game/unit/actor';
import { Item } from 'game/unit/item';
import { Storable } from 'game/unit/item/storable';
import { Command } from '.';

export class PutCommand implements Command {
  constructor(
    readonly actor: Player,
    readonly storable: Storable,
    readonly target: Item,
    public done: boolean = false
  ) {}

  exec(board: Board): void {
    this.storable.put(this.target, board);
    this.done = true;
  }
}
