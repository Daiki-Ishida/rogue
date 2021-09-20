import { EnemysDecesionPhase, Phase, PhaseBase } from '.';
import { Board } from '../../board';
import { Commands } from '../../command';

export class PlayerActionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EnemysDecesionPhase();
  }

  proc(commands: Commands, board: Board): void {
    commands.exec(board);
    this.completed = true;
  }
}
