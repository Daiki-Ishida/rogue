import { Game } from 'game/game';
import { Phase, PhaseBase } from './phase';
import { EnemysDecesionPhase } from './enemysDecisionPhase';

export class PlayerActionPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EnemysDecesionPhase();
  }

  proc(game: Game): void {
    game.commands.exec(game.board);
    this.completed = true;
  }
}
