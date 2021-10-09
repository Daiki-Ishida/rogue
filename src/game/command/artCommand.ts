import { Board } from 'game/board';
import { Enemy } from 'game/unit/actor/enemy';
import { Command } from '.';

export class ArtCommand implements Command {
  constructor(readonly actor: Enemy, public done: boolean = false) {}

  exec(board: Board): void {
    this.actor.unleashArt(board);
    this.done = true;
  }
}
