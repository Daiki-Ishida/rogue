import { Game } from 'game/game';
import { InitPhase, Phase } from './phase';

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

  proc(game: Game): void {
    this.phase.proc(game);

    if (this.phase.completed) {
      this.goNextPhase();
    }
  }
}
