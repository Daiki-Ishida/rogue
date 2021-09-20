import { EnemysMovePhase, Phase, PhaseBase } from '.';
import { Board } from '../../board';
import { Commands } from '../../command';

export class EnemysDecesionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EnemysMovePhase();
  }

  proc(commands: Commands, board: Board): void {
    for (const actor of board.actors) {
      if (actor.isEnemy()) {
        actor.act();
      }
    }

    this.completed = true;
  }
}
