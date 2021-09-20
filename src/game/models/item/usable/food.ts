import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
import { RandomUtil } from 'game/util';
import { FoodStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Usable } from './usable';

export abstract class Food extends Usable {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: FoodStatus,
    readonly effect: (user: Player, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  use(user: Player, board: Board): void {
    this.identify();
    user.removeHunger(this.status.value);
    this.effect(user, board);
    this.status.used = true;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
