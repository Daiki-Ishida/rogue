import { RandomUtil } from 'game/util';
import { Command } from '.';
import { Board } from '../board';

export class CommandManager {
  private constructor(public commands: Command[]) {}

  static init(): CommandManager {
    return new CommandManager([]);
  }

  get isEmpty(): boolean {
    return this.commands.length === 0;
  }

  push(command: Command): void {
    this.commands.push(command);
  }

  exec(board: Board): void {
    for (const command of this.commands) {
      const actor = command.actor;
      if (actor.isCondition('ASLEEP')) {
        command.done = true;
        continue;
      }

      if (actor.isCondition('PARALYZED')) {
        const r = RandomUtil.getRandomIntInclusive(0, 1);
        if (r === 0) {
          command.done = true;
          continue;
        }
      }

      if (actor.isCondition('CONFUSED')) {
        actor.turnRandmoly();
      }

      command.exec(board);
    }
    this.refresh();
  }

  private refresh(): void {
    this.commands = this.commands.filter((c) => !c.done);
  }
}
