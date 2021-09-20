import { Game } from 'game/game';
import { EquipCommand, ThrowCommand, UseCommand } from 'game/command';
import { Equipment, Item, Usable } from 'game/models/item';

export class Option {
  constructor(readonly value: TOption, readonly onSelection: () => void) {}

  static ofUse(item: Usable, game: Game): Option {
    const onSelected = () => {
      const command = new UseCommand(game.player, item);
      game.commands.push(command);
    };
    return new Option('USE', onSelected);
  }

  static ofEquip(item: Equipment, game: Game): Option {
    const onSelected = () => {
      const command = new EquipCommand(game.player, item);
      game.commands.push(command);
    };

    const label = item.status.equiped ? 'UNEQUIP' : 'EQUIP';
    return new Option(label, onSelected);
  }

  static ofThrow(item: Item, game: Game): Option {
    const onSelected = () => {
      const command = new ThrowCommand(game.player, item);
      game.commands.push(command);
    };
    return new Option('THROW', onSelected);
  }

  static ofExit(game: Game): Option {
    const onSelected = () => {
      // TODO: 次のフロアへ
      return;
    };
    return new Option('PROCEED', onSelected);
  }

  static ofCancel(): Option {
    const onSelected = () => {
      // 何もしない
      return;
    };
    return new Option('CANCEL', onSelected);
  }
}

type TOption =
  | 'PROCEED'
  | 'CANCEL'
  | 'USE'
  | 'THROW'
  | 'EQUIP'
  | 'UNEQUIP'
  | 'INSERT'
  | 'REMOVE'
  | 'LOOK_INTO';
