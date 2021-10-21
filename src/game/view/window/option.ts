import { Game } from 'game/game';
import { EquipCommand, ThrowCommand, UseCommand } from 'game/command';
import { Equipment, Item, Usable } from 'game/unit/item';
import { soundManager, soundStore } from 'game';
import { Storable } from 'game/unit/item/storable';

export class Option {
  constructor(readonly value: OptionValue, readonly onSelection: () => void) {}

  static ofUse(item: Usable, game: Game): Option {
    const onSelected = () => {
      const command = new UseCommand(game.player, item);
      game.commands.push(command);
    };
    return new Option('使う', onSelected);
  }

  static ofEquip(item: Equipment, game: Game): Option {
    const onSelected = () => {
      const command = new EquipCommand(game.player, item);
      game.commands.push(command);
    };

    const label = item.status.equiped ? '外す' : '装備する';
    return new Option(label, onSelected);
  }

  static ofStorable(item: Storable, game: Game): Option[] {
    const put = () => {
      console.log(`${item}: put`);
    };
    const withdraw = () => {
      console.log(`${item}: withdraw`);
    };
    const lookInto = () => {
      console.log(`${item}: look into`);
    };

    const op1 = new Option('入れる', put);
    const op2 = new Option('取り出す', withdraw);
    const op3 = new Option('のぞく', lookInto);
    return [op1, op2, op3];
  }

  static ofThrow(item: Item, game: Game): Option {
    const onSelected = () => {
      const command = new ThrowCommand(game.player, item);
      game.commands.push(command);
    };
    return new Option('投げる', onSelected);
  }

  static ofExit(game: Game): Option {
    const onSelected = () => {
      game.next();
      soundManager.register(soundStore.exit);
    };
    return new Option('すすむ', onSelected);
  }

  static ofCancel(): Option {
    const onSelected = () => {
      // 何もしない
      return;
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
