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
    this.commands.forEach((c) => c.exec(board));
    this.refresh();
  }

  // execMove(game: Game): void {
  //   this.commands.forEach((command) => {
  //     if (command instanceof MoveCommand) {
  //       command.exec(game);
  //     }
  //   });
  //   this.clear();
  // }

  // execAct(game: Game): void {
  //   this.commands.forEach((command) => {
  //     if (!(command instanceof MoveCommand)) {
  //       command.exec(game);
  //     }
  //   });
  //   this.clear();
  // }

  private refresh(): void {
    this.commands = this.commands.filter((c) => !c.done);
  }
}
