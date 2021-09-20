import { Game } from 'game/game';
import { EnemysMovePhase } from './enemysMovePhase';
import { Phase, PhaseBase } from './phase';

export class EnemysDecesionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EnemysMovePhase();
  }

  proc(game: Game): void {
    for (const actor of game.board.actors) {
      if (actor.isEnemy()) {
        actor.act();
      }
    }

    this.completed = true;
  }
}
