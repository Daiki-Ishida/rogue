import { Game } from 'game/game';
import { EnemyGenerator } from 'game/models/generator';
import { Phase, PhaseBase, StandByPhase } from '.';

export class InitPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new StandByPhase();
  }

  proc(game: Game): void {
    // 10ターンに一度敵が沸く
    if (game.turn.count % 10 === 0) {
      EnemyGenerator.generate(1, game.board);
    }
    this.completed = true;
  }
}
