import { playlogManager, windowManager } from 'game';
import { Game } from 'game/game';
import { ControllerManager } from './controllerManager';
import { Controller } from './controller';
import { actionController } from './actionController';
import { Storable } from 'game/unit/item/storable';
import { PutCommand } from 'game/command/putCommand';

/**
 * 壺に入れるアイテムを指定するためにインベントリを開いている時の入力処理を扱うクラス
 */
export class InventoryPotController implements Controller {
  constructor(readonly pot: Storable) {}

  proc(input: string, game: Game, context: ControllerManager): void {
    const window = windowManager.inventoryWindow;

    switch (input) {
      case 'i':
        windowManager.close();
        context.changeState(actionController);
        break;
      case 'w':
        window.prev();
        break;
      case 's':
        window.next();
        break;
      case 'a':
        window.prevPage();
        break;
      case 'd':
        window.nextPage();
        break;
      case 'u': {
        const item = window.selected;
        if (item === undefined) break; // エラーで落ちないように握りつぶす。
        if (item.isStorable()) break;
        if (item.isEquipment() && item.status.equiped) break;

        if (this.pot.isFull) {
          playlogManager.add('しかし、壺の中身は既にいっぱいだ！');
          break;
        }

        const command = PutCommand.of(game.player, this.pot, item);
        game.commands.push(command);
        game.inventory.delete();

        windowManager.close();
        context.changeState(actionController);
        break;
      }
    }
  }
}
