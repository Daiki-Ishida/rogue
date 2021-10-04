import { Command } from '.';
import { Actor } from 'game/models/actor';

export class StepCommand implements Command {
  constructor(readonly actor: Actor, public done: boolean = false) {}

  // その場で何もしない。
  exec(): void {
    this.done = true;
  }
}
