import { Command } from '.';
import { Actor } from '../actor';

export class MoveCommand implements Command {
  constructor(readonly actor: Actor, public done: boolean = false) {}

  exec(): void {
    this.actor.move();
    this.done = true;
  }
}
