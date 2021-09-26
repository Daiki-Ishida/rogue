import { imageStore } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
import { HerbStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { HerbEffect, herbEffects } from './herbEffects';
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

  static generate(id: string, board: Board): Herb {
    const symbol = new ItemSymbol(imageStore.items.herb);
    const status = HerbStatus.init(id);
    const effect = herbEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    const herb = new Herb(0, 0, symbol, status, effect);
    herb.spawn(board);
    return herb;
  }

  use(user: Player, board: Board): void {
    this.identify();
    user.removeHunger(5);
    this.effect.onUse(user, board);
    this.status.used = true;
  }

  onHit(user: Player, target: Actor, board: Board): void {
    return this.effect.onHit(user, target, board);
  }
}
