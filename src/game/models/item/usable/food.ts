import { imageStore } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
import { RandomUtil } from 'game/util';
import { FoodStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { foodEffects } from './foodEffects';
import { Usable } from './usable';

export class Food extends Usable {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: FoodStatus,
    readonly effect: (user: Player, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string, board: Board): Food {
    const symbol = new ItemSymbol(imageStore.items.bread);
    const status = FoodStatus.init(id);
    const effect = foodEffects[id];

    const food = new Food(0, 0, symbol, status, effect);

    food.spawn(board);
    return food;
  }

  identify(): void {
    this.status.identified = true;
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
