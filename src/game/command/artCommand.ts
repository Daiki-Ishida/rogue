import { Board } from 'game/board';
import { Enemy } from 'game/models/actor/enemy';
import { Command } from '.';

export class ArtCommand implements Command {
  constructor(readonly actor: Enemy, public done: boolean = false) {}

  exec(board: Board): void {
    console.log('hoge');
    this.actor.unleashArt(board);
    this.done = true;
  }
}