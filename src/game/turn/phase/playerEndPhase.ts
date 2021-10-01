import { controller, windowManager } from 'game';
import { selectWindowController } from 'game/controller';
import { Game } from 'game/game';
import { ExitSelectionWindow } from 'game/view/gui';
import { EnemyActionPhase } from '.';
import { Phase, PhaseBase } from './phase';

export class PlayerEndPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EnemyActionPhase();
  }

  proc(game: Game): void {
    if (windowManager.selectWindow) return;

    const player = game.player;
    const board = game.board;

    // 10ターンに一度空腹処理
    if (game.turn.count % 10 === 0) {
      player.addHunger(1);
    }

    // 毎ターン１回復（調整するかも）
    player.heal(1);

    // 状態異常自然治癒チェック
    player.conditions.conditions.forEach((cond) => cond.count++);
    player.conditions.refresh();

    // 毒ダメージ
    if (player.conditions.isInclude('POISONED')) {
      player.damage(2);
    }

    const room = board.findRoom(player.x, player.y);
    room
      ? player.visibility.setRoomRange(room)
      : player.visibility.setActorRange(player);

    board.visit(
      player.visibility.x,
      player.visibility.y,
      player.visibility.w,
      player.visibility.h
    );

    const trap = board.findTrap(player.x, player.y);
    trap?.activate(board);

    const item = board.findItem(player.x, player.y);
    item?.pickup(game);

    // 死んだらゲームオーバー(現時点では判定だけ)
    if (player.isDead) {
      alert('game over...');
    }

    // 死んだ敵は除外
    board.actors = board.actors.filter((actor) => !actor.isDead);

    // 階段の到着
    if (board.isExit(player.x, player.y)) {
      const window = ExitSelectionWindow.init(game);
      windowManager.selectWindow = window;
      controller.changeState(selectWindowController);
    }

    this.completed = true;
  }
}
