import { ItemBase, ItemSymbol, UsableStatus } from '..';
import { Player } from '../../actor';
import { Board } from '../../board';
import { Item } from '../iItem';

export interface Usable extends Item {
  status: UsableStatus;
  use: (user: Player, board: Board) => void;
}

export abstract class UsableBase extends ItemBase implements Usable {
  constructor(
    public x: number,
    public y: number,
    public symbol: ItemSymbol,
    readonly status: UsableStatus
  ) {
    super(x, y, symbol, status);
  }
  abstract use(user: Player, board: Board): void;
}
