import p5 from 'p5';
import { Game } from 'game/game';
import { Controller } from './controller';
import { startScreenController } from './startScreenCotroller';
import { actionController } from './actionController';

/**
 * キー入力の処理を統括するクラス
 */
export class ControllerManager {
  private constructor(public controller: Controller) {}

  static init(): ControllerManager {
    return new ControllerManager(startScreenController);
  }

  /**
   * コントローラーの状態を設定する
   */
  changeState(controller: Controller): void {
    this.controller = controller;
  }

  /**
   * 押しっぱなし有効
   */
  hold(game: Game, p: p5): void {
    if (this.isMoveKey(p)) {
      this.proc(p.key, game);
    }
  }

  /**
   * 押しっぱなし無効
   */
  press(game: Game, p: p5): void {
    if (this.isMoveKey(p)) return;

    this.proc(p.key, game);
  }

  /**
   * ボタンを離した時の処理
   */
  release(game: Game, p: p5): void {
    if (!game.isSkipMode) return;

    if (p.key === 'u' || p.key === 'o') {
      game.resume();
    }
  }

  /**
   * 移動するためのキーかどうか判定
   * 移動のみ押しっぱなし有効
   */
  private isMoveKey = (p: p5): boolean => {
    if (this.controller !== actionController) return false;

    return (
      p.key !== 'A' &&
      p.key !== 'W' &&
      p.key !== 'S' &&
      p.key !== 'D' &&
      (p.keyIsDown(65) || p.keyIsDown(87) || p.keyIsDown(83) || p.keyIsDown(68))
    );
  };

  /**
   * 処理実行
   */
  private proc(input: string, game: Game): void {
    // bridge effect中は操作不能
    if (game.state === 'BRIDGE') {
      return;
    }

    this.controller.proc(input, game, this);
  }
}
