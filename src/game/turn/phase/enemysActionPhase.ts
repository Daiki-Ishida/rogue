import { animationManager } from 'game';
import { Game } from 'game/game';
import { EndPhase } from './endPhase';
import { Phase, PhaseBase } from './phase';

export class EnemysActionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EndPhase();
  }

  proc(game: Game): void {
    game.commands.exec(game.board);
    animationManager.exec();
    if (animationManager.isAllDone) {
      this.completed = true;
    }
  }
}
