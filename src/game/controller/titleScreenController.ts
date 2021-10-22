import { textBox } from 'game';
import { ControllerManager } from '.';
import { Game } from '../game';
import { Controller } from './controller';
import { setupScreenController } from './setupScreenController';

/**
 * タイトル画面の入力処理を扱うクラス
 */
class TitleScreenController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
    if (input !== 'Enter') return;

    textBox.show();
    game.setState('SET_UP');
    context.changeState(setupScreenController);
  }
}

export const titleScreenController = new TitleScreenController();
