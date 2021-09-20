import { Game } from 'game/game';
import { Phase, PhaseBase } from './phase';
import { PlayerActionPhase } from './playerActionPhase';

export class StandByPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new PlayerActionPhase();
  }

  proc(game: Game): void {
    if (game.commands.isEmpty) return;

    this.completed = true;
  }
}
