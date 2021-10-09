import { Board } from 'game/board';
import { Actor } from 'game/unit/actor';
import { Command } from '.';

export class AttackCommand implements Command {
  constructor(readonly actor: Actor, public done: boolean = false) {}

  exec(board: Board): void {
    this.actor.attack(board);
    this.done = true;
  }
}
