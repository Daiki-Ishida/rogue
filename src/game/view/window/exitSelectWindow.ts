import { Game } from 'game/game';
import { SelectionWindowBase } from './selectionWindow';
import { Option } from './option';

export class ExitSelectionWindow extends SelectionWindowBase {
  constructor(options: Option[]) {
    const x = 820;
    const y = 100;
    const w = 150;
    const h = options.length * 50;
    super(x, y, w, h, true, options, 0);
  }

  static init(game: Game): ExitSelectionWindow {
    const proceed = Option.ofExit(game);
    const cancel = Option.ofCancel();

    return new ExitSelectionWindow([proceed, cancel]);
  }
}
