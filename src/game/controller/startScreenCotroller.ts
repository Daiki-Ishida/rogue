import { fileInput } from 'game';
import { ControllerManager, titleScreenController } from '.';
import { Game } from '../game';
import { Controller } from './controller';

/**
 * 初期表示画面の入力処理を扱うクラス
 */
class StartScreenController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
    if (input !== 'Enter') return;

    fileInput.show();
    fileInput.position(600, 600);
    game.setState('PROLOGUE');
    context.changeState(titleScreenController);
  }
}

export const startScreenController = new StartScreenController();
