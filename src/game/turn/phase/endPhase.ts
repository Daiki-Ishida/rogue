import { InitPhase, Phase, PhaseBase } from '.';
import { Board } from '../../board';
import { Commands } from '../../command';

export class EndPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new InitPhase();
  }

  proc(commands: Commands, board: Board): void {
    // game.turn.count++;
    // todo
    // ゲームクリア、プレイヤーの死亡とかのチェック
    this.completed = true;
  }
}
