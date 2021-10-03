import { Game } from 'game/game';
import { InitPhase, Phase } from './phase';

export class Turn {
  private constructor(public phase: Phase, public count: number) {}

  static init(): Turn {
    const initPhase = new InitPhase();
    return new Turn(initPhase, 1);
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
