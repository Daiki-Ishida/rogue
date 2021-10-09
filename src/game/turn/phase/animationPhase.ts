import { animationManager } from 'game';
import { Game } from 'game/game';
import { CleanUpPhase } from '.';
import { Phase, PhaseBase } from './phase';

export class AnimationPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new CleanUpPhase();
  }

  proc(game: Game): void {
    if (!animationManager.isActionDone) {
      game.resume();
    }

    if (game.isSkipMode) {
      animationManager.skipWalk(game);
      this.completed = true;
      return;
    }

    animationManager.execWalk();
    if (!animationManager.isWalkDone) {
      return;
    }

    animationManager.execSync();
    if (animationManager.isAllDone) {
      this.completed = true;
    }
  }
}
