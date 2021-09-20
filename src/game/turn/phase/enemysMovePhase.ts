import { intervalPhase, Phase, PhaseBase } from '.';
import { Board } from '../../board';
import { Commands } from '../../command';

export class EnemysMovePhase extends PhaseBase {
  get nextPhase(): Phase {
    return intervalPhase;
  }

  proc(commands: Commands, board: Board): void {
    this.completed = true;
  }
}
