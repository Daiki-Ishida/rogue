import { EndPhase, Phase, PhaseBase } from '.';
import { animationManager } from '../../../animation';
import { Board } from '../../board';
import { Commands } from '../../command';

export class EnemysActionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EndPhase();
  }

  proc(commands: Commands, board: Board): void {
    commands.exec(board);
    animationManager.exec();
    if (animationManager.isAllDone) {
      this.completed = true;
    }
  }
}
