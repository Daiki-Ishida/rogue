import { EnemysActionPhase, Phase, PhaseBase } from '.';
import { player } from '../../..';
import { Board } from '../../board';
import { Commands } from '../../command';

class IntervalPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new EnemysActionPhase();
  }

  proc(commands: Commands, board: Board): void {
    // 毎ターン１回復（調整するかも）
    player.heal(1);

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

    board.actors.forEach((a) => {
      a.updateVisibility();
    });
    // board.visit(
    //   player.visibility.x,
    //   player.visibility.y,
    //   player.visibility.w,
    //   player.visibility.h
    // );

    // const trap = board.findTrap(player.x, player.y);
    // if (trap) {
    //   trap.exec(player, game);
    // }

    // const item = board.findItem(player.x, player.y);
    // if (item) {
    //   new SoundEffect(game.asset.soundFiles.pickUp).play();
    //   board.clearItem(item);
    //   game.items.delete(item);
    //   game.inventory.add(item);
    //   game.messages.push(`${item.displayName()}を拾った`);
    // }

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

export const intervalPhase = new IntervalPhase();
