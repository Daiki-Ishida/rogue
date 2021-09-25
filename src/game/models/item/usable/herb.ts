import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
import { HerbStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { HerbEffect } from './herbEffects';
import { Usable } from './usable';

export class Herb extends Usable {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: HerbStatus,
    readonly effect: HerbEffect
  ) {
    super(x, y, symbol, status);
  }

  identify(): void {
    this.status.identified = true;
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
