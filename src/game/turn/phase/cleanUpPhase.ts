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

      const room = board.findRoom(actor.x, actor.y);
      room
        ? actor.visibility.setRoomRange(room)
        : actor.visibility.setActorRange(actor);
    }

    // 死んだ敵は除外
    board.actors.forEach((actor) => {
      board.clearActor(actor);
    });
    this.completed = true;
  }
}
