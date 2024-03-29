import { imageStore, playlogManager } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/unit/actor';
import { HerbStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { HerbEffect, herbEffects } from '../effects';
import { Usable } from './usable';

export class Herb extends Usable {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: HerbStatus,
    readonly effect: HerbEffect
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string): Herb {
    const symbol = new ItemSymbol(imageStore.items.herb);
    const status = HerbStatus.init(id);
    const effect = herbEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    return new Herb(0, 0, symbol, status, effect);
  }

  use(user: Player, board: Board): void {
    this.identify();
    user.removeHunger(5);
    this.effect.onUse(user, board);
    this.status.used = true;

    playlogManager.add(`${this.status.displayName}を使った`);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    return this.effect.onHit(user, target, board);
  }

  isHerb(): this is Herb {
    return true;
  }
}
