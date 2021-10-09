import { Game } from 'game/game';
import { EnemyGenerator } from 'game/unit/generator';
import { Phase, PhaseBase, StandByPhase } from '.';
import { MoveCommand, StepCommand } from 'game/command';

export class InitPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new StandByPhase();
  }

  proc(game: Game): void {
    // 10ターンに一度敵が沸く
    if (game.turn.count % 20 === 0) {
      EnemyGenerator.generate(1, game.board);
    }

    // ダッシュ
    if (game.mode === 'DASH') {
      const command = new MoveCommand(game.player);
      game.commands.push(command);
    }

    // 足踏み
    if (game.mode === 'STEP') {
      const command = new StepCommand(game.player);
      game.commands.push(command);
    }

    this.completed = true;
  }
}
