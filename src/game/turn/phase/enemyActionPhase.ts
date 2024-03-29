import { Game } from 'game/game';
import { AnimationPhase } from '.';
import { Phase, PhaseBase } from './phase';

export class EnemyActionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new AnimationPhase();
  }

  proc(game: Game): void {
    for (const actor of game.board.actors) {
      if (actor.isEnemy() || actor.isNpc()) {
        actor.act(game);
      }
    }

    game.commands.exec(game.board);
    this.completed = true;
  }
}
