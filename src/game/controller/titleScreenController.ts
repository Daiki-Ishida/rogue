import { ControllerManager, Controller, setupScreenController } from '.';
import { Game } from '../game';

/**
 * タイトル画面の入力処理を扱うクラス
 */
class TitleScreenController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
    if (input !== 'Enter') return;
    game.setState('SET_UP');
    context.changeState(setupScreenController);
  }
}

export const titleScreenController = new TitleScreenController();
