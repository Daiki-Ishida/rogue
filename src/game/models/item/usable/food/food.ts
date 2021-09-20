import { FoodStatus, FoodSymbol } from '.';
import { Usable, UsableBase } from '..';
import { Actor, Player } from '../../../actor';
import { Board } from '../../../board';
import { RandomUtil } from '../../../../util';

export interface Food extends Usable {
  symbol: FoodSymbol;
  status: FoodStatus;
  effect(user: Player, board: Board): void;
}

export abstract class FoodBase extends UsableBase implements Food {
  constructor(
    public status: FoodStatus,
    public symbol: FoodSymbol = FoodSymbol.init(),
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

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
