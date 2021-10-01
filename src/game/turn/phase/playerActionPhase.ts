import { animationManager } from 'game';
import { Game } from 'game/game';
import { Phase, PhaseBase } from './phase';
import { PlayerEndPhase } from './playerEndPhase';

export class PlayerActionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new PlayerEndPhase();
  }

  proc(game: Game): void {
    game.commands.exec(game.board);
    animationManager.execAction();
    if (animationManager.isActionDone) {
      this.completed = true;
    }
  }
}
