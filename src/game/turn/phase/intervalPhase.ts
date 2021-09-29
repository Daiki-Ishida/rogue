import { Game } from 'game/game';
import { EnemysActionPhase } from './enemysActionPhase';
import { Phase, PhaseBase } from './phase';

export class IntervalPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EnemysActionPhase();
  }

  proc(game: Game): void {
    const player = game.player;
    const board = game.board;

    // 毎ターン１回復（調整するかも）
    game.player.heal(1);

    // 状態異常自然治癒チェック
    // player.conditions.conditions.forEach((cond) => cond.count++);
    // player.refreshCondition();

    // 毒ダメージ
    // if (player.isCondition('POISONED')) {
    //   player.addDmg(2);
    // }

    // 10ターンに一度空腹処理
    // if (game.turn.count % 10 === 0) {
    //   const value = player.maxFullness / 100;
    //   player.addHunger(value);
    // }

    // board.visit(
    //   player.visibility.x,
    //   player.visibility.y,
    //   player.visibility.w,
    //   player.visibility.h
    // );

    const room = board.findRoom(player.x, player.y);
    room
      ? player.visibility.setRoomRange(room)
      : player.visibility.setActorRange(player);

    const trap = board.findTrap(player.x, player.y);
    trap?.activate(board);

    const item = board.findItem(player.x, player.y);
    item?.pickup(game);

    // game.enemys.enemys.forEach((enemy) => enemy.setVisibility(board));

    // // 死んだらゲームオーバー(現時点では判定だけ)
    // if (player.isDead) {
    //   game.gameOver();
    // }

    // // 死んだ敵は除外
    // game.enemys.filterAlive(board);

    // // 階段の到着
    // if (board.isExit(player.x, player.y)) {
    //   game.selectWindow = exitSelectWindow;
    //   controller.changeState(selectWindowController);
    // }

    // if (game.selectWindow) return;
    this.completed = true;
  }
}
