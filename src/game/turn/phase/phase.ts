import { Board } from '../../board';
import { Commands } from '../../command';

export interface Phase {
  readonly completed: boolean;
  readonly nextPhase: Phase;
  proc: (commands: Commands, board: Board) => void;
}

export abstract class PhaseBase {
  constructor(public completed: boolean = false) {}
}
