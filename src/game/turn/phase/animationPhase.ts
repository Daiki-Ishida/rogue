import { animationManager } from 'game';
import { CleanUpPhase } from '.';
import { Phase, PhaseBase } from './phase';

export class AnimationPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new CleanUpPhase();
  }

  proc(): void {
    animationManager.execWalk();
    if (!animationManager.isWalkDone) {
      return;
    }

    animationManager.exec();
    if (animationManager.isAllDone) {
      this.completed = true;
    }
  }
}
