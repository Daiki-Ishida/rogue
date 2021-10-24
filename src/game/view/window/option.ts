import { Game } from 'game/game';
import {
  AskCommand,
  EquipCommand,
  ThrowCommand,
  UseCommand,
} from 'game/command';
import { Equipment, Item, Usable } from 'game/unit/item';
import { controller, soundManager, soundStore, windowManager } from 'game';
import { Storable } from 'game/unit/item/storable';
import { InventoryPotController } from 'game/controller/inventoryPotController';
import { actionController } from 'game/controller';
import { PotContentsWindow } from '.';
import { PotContentsController } from 'game/controller/potContentsController';
import { Player } from 'game/unit/actor';
import { Npc } from 'game/unit/actor/npc';

export class Option {
  private constructor(
    readonly value: OptionValue,
    readonly onSelection: () => void
  ) {}

  static ofUse(item: Usable, game: Game): Option {
    const onSelected = () => {
      const command = UseCommand.of(game.player, item);
      game.commands.push(command);
      windowManager.close();
      controller.changeState(actionController);
    };
    return new Option('使う', onSelected);
  }

  static ofEquip(item: Equipment, game: Game): Option {
    const onSelected = () => {
      const command = EquipCommand.of(game.player, item);
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
      const command = ThrowCommand.of(game.player, item);
      game.commands.push(command);

      windowManager.close();
      controller.changeState(actionController);
    };
    return new Option('投げる', onSelected);
  }

  static ofNpcAbility(player: Player, npc: Npc, game: Game): Option {
    const onSelected = () => {
      const command = AskCommand.of(player, npc);
      game.commands.push(command);

      windowManager.close();
      controller.changeState(actionController);
    };

    return new Option('すすむ', onSelected);
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
