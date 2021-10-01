import { Game } from 'game/game';
import { InitPhase } from './initPhase';
import { Phase, PhaseBase } from './phase';

export class EndPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new InitPhase();
  }

  proc(game: Game): void {
    // todo
    // ゲームクリア、ゲームオーバーとかのチェック
    game.turn.count++;
    this.completed = true;
  }
}
