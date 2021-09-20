import { InitPhase, Phase } from '.';
import { Commands } from '../command';
import { Board } from '../board';

export class Turn {
  phase: Phase;
  count: number;

  private constructor(state: Phase) {
    this.phase = state;
    this.count = 1;
  }

  static init(): Turn {
    const initPhase = new InitPhase();
    return new Turn(initPhase);
  }

  goNextPhase(): void {
    this.phase = this.phase.nextPhase;
  }

  proc(commands: Commands, board: Board): void {
    this.phase.proc(commands, board);
    if (this.phase.completed) {
      this.goNextPhase();
    }
  }
}
