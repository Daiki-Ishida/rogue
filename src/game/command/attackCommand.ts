import { Actor } from 'game/models/actor';
import { Command } from '.';

export class AttackCommand implements Command {
  constructor(readonly actor: Actor, public done: boolean = false) {}

  exec(): void {
    this.actor.attack();
    this.done = true;
  }
}
