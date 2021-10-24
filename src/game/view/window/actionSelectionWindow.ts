import { Game } from 'game/game';
import { SelectionWindowBase } from './selectionWindow';
import { Option } from './option';
import { Player } from 'game/unit/actor';
import { Npc } from 'game/unit/actor/npc';
import { game } from 'game';

export class ActionSelectionWindow extends SelectionWindowBase {
  constructor(options: Option[]) {
    const x = 820;
    const y = 100;
    const w = 150;
    const h = options.length * 50;
    super(x, y, w, h, true, options, 0);
  }

  static ofExit(game: Game): ActionSelectionWindow {
    const proceed = Option.ofExit(game);
    const cancel = Option.ofCancel();

    return new ActionSelectionWindow([proceed, cancel]);
  }

  static ofNpcAbility(player: Player, npc: Npc): ActionSelectionWindow {
    const ability = Option.ofNpcAbility(player, npc, game);
    const cancel = Option.ofCancel();

    return new ActionSelectionWindow([ability, cancel]);
  }
}
