import { Game } from 'game/game';

export interface Phase {
  readonly completed: boolean;
  readonly nextPhase: Phase;
  proc: (game: Game) => void;
}

export abstract class PhaseBase {
  constructor(public completed: boolean = false) {}
}
