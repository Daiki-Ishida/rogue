import { HerbStatus, HerbSymbol } from '.';
import { Usable, UsableBase } from '..';
import { Player } from '../../../actor';
import { Board } from '../../../board';

export interface Herb extends Usable {
  symbol: HerbSymbol;
  status: HerbStatus;
  effect(user: Player, board: Board): void;
}

export abstract class HerbBase extends UsableBase implements Herb {
  constructor(
    public status: HerbStatus,
    public symbol: HerbSymbol = HerbSymbol.init(),
    public x: number = 0,
    public y: number = 0
  ) {
    super(x, y, symbol, status);
  }

  use(user: Player, board: Board): void {
    this.identify();
    this.effect(user, board);
    // TODO: hunger回復
    this.status.used = true;
  }

  abstract effect(user: Player, board: Board): void;
}
