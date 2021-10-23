import { ControllerManager, Controller, titleScreenController } from '.';
import { Game } from '../game';

/**
 * 初期表示画面の入力処理を扱うクラス
 */
class StartScreenController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
    if (input !== 'Enter') return;

    game.setState('PROLOGUE');
    context.changeState(titleScreenController);
  }
}

export const startScreenController = new StartScreenController();
