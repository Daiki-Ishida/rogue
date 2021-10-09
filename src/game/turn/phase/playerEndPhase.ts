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
    player.autoHeal();

    // 状態異常自然治癒チェック
    player.conditions.conditions.forEach((cond) => cond.count++);
    player.conditions.refresh();

    // 腕輪効果発動
    player.status.bracelet?.effect(player, board);

    // 毒ダメージ
    if (player.isCondition('POISONED')) {
      player.damage(2);
    }

    /**
     * ワナの発動
     */
    const trap = board.findTrap(player.x, player.y);
    if (trap) {
      player.isCondition('TRAP_MASTER')
        ? trap.disclose()
        : trap.activate(board);

      game.resume();
    }

    /**
     * アイテム拾い
     */
    const item = board.findItem(player.x, player.y);
    if (item) {
      if (player.isCondition('AUTO_IDENTIFY')) {
        item.identify();
      }
      item.pickup(game);
      game.resume();
    }

    if (!player.canMove(board)) {
      game.resume();
    }

    if (
      board.isCorridor(player.x, player.y) &&
      board.isRoom(player.next.x, player.next.y)
    ) {
      game.resume();
    }

    // 死んだらゲームオーバー
    if (player.isDead) {
      game.resume();
      game.state = 'GAME_OVER';
    }

    // 死んだ敵は除外
    board.actors.forEach((actor) => {
      if (actor.isDead) {
        board.clearActor(actor);
      }
    });

    // 階段の到着
    if (board.isExit(player.x, player.y)) {
      game.resume();
      const window = ExitSelectionWindow.init(game);
      windowManager.selectWindow = window;
      controller.changeState(selectWindowController);
    }

    /**
     * 視野の更新
     */
    if (player.isCondition('CLEAR_SIGHTED')) {
      player.visibility.setFullRange();
    } else {
      const room = board.findRoom(player.x, player.y);
      room
        ? player.visibility.setRoomRange(room)
        : player.visibility.setActorRange(player);
    }

    /**
     * ミニマップ更新
     */
    board.visit(
      player.visibility.x,
      player.visibility.y,
      player.visibility.w,
      player.visibility.h
    );

    this.completed = true;
  }
}
