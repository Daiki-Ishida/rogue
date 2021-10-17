import { RandomUtil } from 'game/util';
import { Command } from '.';
import { Board } from '../board';

export class Commands {
  private constructor(public commands: Command[]) {}

  static init(): Commands {
    return new Commands([]);
  }

  push(command: Command): void {
    this.commands.push(command);
  }

  get isEmpty(): boolean {
    return this.commands.length === 0;
  }

  exec(board: Board): void {
    this.commands.forEach((command) => {
      const actor = command.actor;
      if (actor.isCondition('ASLEEP')) {
        command.done = true;
        return;
      }

      if (actor.isCondition('PARALYZED')) {
        const r = RandomUtil.getRandomIntInclusive(0, 1);
        if (r === 0) {
          command.done = true;
          return;
        }
      }

      if (actor.isCondition('CONFUSED')) {
        actor.turnRandmoly();
      }

      command.exec(board);
    });
    this.refresh();
  }

  private refresh(): void {
    this.commands = this.commands.filter((c) => !c.done);
  }
}
