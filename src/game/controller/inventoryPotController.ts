import { windowManager } from 'game';
import { Game } from 'game/game';
import { Controller } from './controller';
import { ControllerState } from './controllerState';
import { actionController } from './actionController';
import { Storable } from 'game/unit/item/storable';
import { PutCommand } from 'game/command/putCommand';

export class InventoryPotController implements ControllerState {
  constructor(readonly pot: Storable) {}

  proc(input: string, game: Game, context: Controller): void {
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

        const command = new PutCommand(game.player, this.pot, item, false);
        game.commands.push(command);
        game.inventory.delete();

        windowManager.close();
        context.changeState(actionController);
        break;
      }
    }
  }
}