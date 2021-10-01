import { Board } from 'game/board';
import { Player } from 'game/models/actor';
import { Item } from '..';
import { UsableStatus } from '../status';
import { ItemSymbol } from '../symbol';

export abstract class Usable extends Item {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: UsableStatus
  ) {
    super(x, y, symbol, status);
  }

  abstract use(user: Player, board: Board): void;

  identify(): void {
    this.status.identify();
  }

  isUsable(): this is Usable {
    return true;
  }
}
