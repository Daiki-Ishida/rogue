import { Command } from '.';
import { Actor } from '../actor';

export class AttackCommand implements Command {
  constructor(readonly actor: Actor, public done: boolean = false) {}

  exec(): void {
    this.actor.attack();
    this.done = true;
  }
}
