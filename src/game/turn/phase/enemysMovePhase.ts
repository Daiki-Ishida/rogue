import { Game } from 'game/game';
import { IntervalPhase } from '.';
import { Phase, PhaseBase } from './phase';

export class EnemysMovePhase extends PhaseBase {
  get nextPhase(): Phase {
    return new IntervalPhase();
  }

  proc(game: Game): void {
    game.commands.exec(game.board);
    this.completed = true;
  }
}
