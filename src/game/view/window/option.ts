import { Game } from 'game/game';
import { EquipCommand, ThrowCommand, UseCommand } from 'game/command';
import { Equipment, Item, Usable } from 'game/unit/item';
import { controller, soundManager, soundStore, windowManager } from 'game';
import { Storable } from 'game/unit/item/storable';
import { InventoryPotController } from 'game/controller/inventoryPotController';
import { actionController } from 'game/controller';
import { PotContentsWindow } from '.';
import { PotContentsController } from 'game/controller/potContentsController';

export class Option {
  constructor(readonly value: OptionValue, readonly onSelection: () => void) {}

  static ofUse(item: Usable, game: Game): Option {
    const onSelected = () => {
      const command = new UseCommand(game.player, item);
      game.commands.push(command);
      windowManager.close();
      controller.changeState(actionController);
    };
    return new Option('使う', onSelected);
  }

  static ofEquip(item: Equipment, game: Game): Option {
    const onSelected = () => {
      const command = new EquipCommand(game.player, item);
      game.commands.push(command);

      windowManager.close();
      controller.changeState(actionController);
    };

    const label = item.status.equiped ? '外す' : '装備する';
    return new Option(label, onSelected);
  }

  static ofStorable(item: Storable, game: Game): Option[] {
    const put = () => {
      game.inventory.idx = 0;
      const controllerState = new InventoryPotController(item);
      controller.changeState(controllerState);
    };
    const withdraw = () => {
      const window = PotContentsWindow.init(item);
      windowManager.displayPotContent(window);
      const controllerState = new PotContentsController(item);
      controller.changeState(controllerState);
    };

    const op1 = new Option('入れる', put);
    const op2 = new Option('取り出す', withdraw);
    return [op1, op2];
  }

  static ofThrow(item: Item, game: Game): Option {
    const onSelected = () => {
      const command = new ThrowCommand(game.player, item);
      game.commands.push(command);

      windowManager.close();
      controller.changeState(actionController);
    };
    return new Option('投げる', onSelected);
  }

  static ofExit(game: Game): Option {
    const onSelected = () => {
      game.next();
      soundManager.register(soundStore.exit);

      windowManager.close();
      controller.changeState(actionController);
    };
    return new Option('すすむ', onSelected);
  }

  static ofCancel(): Option {
    const onSelected = () => {
      // 何もしない
      windowManager.close();
      controller.changeState(actionController);
    };
    return new Option('もどる', onSelected);
  }
}

type OptionValue =
  | 'すすむ'
  | 'もどる'
  | '使う'
  | '投げる'
  | '装備する'
  | '外す'
  | '入れる'
  | '取り出す'
  | 'のぞく';
