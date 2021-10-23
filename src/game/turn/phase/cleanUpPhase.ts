import { Game } from 'game/game';
import { EndPhase } from '.';
import { Phase, PhaseBase } from './phase';

export class CleanUpPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EndPhase();
  }

  proc(game: Game): void {
    const board = game.board;

    for (const actor of board.actors) {
      if (actor.isPlayer()) continue;

      // 死んだ敵は除外
      if (actor.isDead) board.clearActor(actor);

      // 状態異常自然治癒チェック
      actor.conditions.conditions.forEach((cond) => cond.count++);
      actor.conditions.refresh();

      // 毒ダメージ
      if (actor.isCondition('POISONED')) {
        actor.damage(2);
      }

      // 視野更新
      const room = board.findRoom(actor.x, actor.y);
      room
        ? actor.visibility.setRoomRange(room)
        : actor.visibility.setActorRange(actor);
    }
    game.player.visibility.scanSymbols(board);

    this.completed = true;
  }
}
