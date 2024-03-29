import { Game } from 'game/game';
import { Item } from 'game/unit/item';
import { SelectionWindowBase } from './selectionWindow';
import { Option } from './option';

export class ItemSelectionWindow extends SelectionWindowBase {
  constructor(x: number, options: Option[]) {
    const y = 100;
    const w = 150;
    const h = options.length * 50;
    super(x, y, w, h, true, options, 0);
  }

  static ofInventory(item: Item, game: Game): ItemSelectionWindow {
    const options: Option[] = [];

    if (item.isUsable()) {
      options.push(Option.ofUse(item, game));
    }

    if (item.isEquipment()) {
      options.push(Option.ofEquip(item, game));
    }

    if (item.isStorable()) {
      for (const op of Option.ofStorable(item, game)) {
        options.push(op);
      }
    }

    options.push(Option.ofThrow(item, game));
    options.push(Option.ofCancel());

    const x = 650;
    return new ItemSelectionWindow(x, options);
  }
}
