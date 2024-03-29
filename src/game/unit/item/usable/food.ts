import { imageStore, playlogManager, soundManager, soundStore } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/unit/actor';
import { RandomUtil } from 'game/util';
import { FoodStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { foodEffects } from '../effects';
import { Usable } from './usable';

export class Food extends Usable {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: FoodStatus,
    readonly effect: (user: Player, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string): Food {
    const symbol = new ItemSymbol(imageStore.items.bread);
    const status = FoodStatus.init(id);
    const effect = foodEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    return new Food(0, 0, symbol, status, effect);
  }

  use(user: Player, board: Board): void {
    const sound = soundStore.eating;
    soundManager.register(sound);

    this.identify();
    user.removeHunger(this.status.value);
    this.effect(user, board);
    this.status.used = true;

    playlogManager.add(`${this.status.displayName}を食べた`);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }

  isFood(): this is Food {
    return true;
  }
}
