import { textBox } from 'game';
import { Game } from '../game';
import { ControllerManager, Controller, actionController } from '.';

/**
 * キャラ設定画面の入力処理を扱うクラス
 */
class SetupScreenController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
    if (input !== 'Enter') return;

    const name = textBox.value().toString();
    if (name.length === 0) {
      alert('名前を入力してください！');
      return;
    }
    if (name.length > 8) {
      alert('８文字以内で入力してください！');
      return;
    }

    game.player.changeName(name);
    game.setState('PLAY');
    context.changeState(actionController);
  }
}

export const setupScreenController = new SetupScreenController();
