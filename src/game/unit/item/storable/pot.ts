import { imageStore } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/unit/actor';
import { RandomUtil } from 'game/util';
import { IPotEffect, potEffects } from '../effects';
import { Item } from '../item';
import { PotStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Storable } from './storable';

export class Pot extends Storable {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: PotStatus,
    readonly effect: IPotEffect
  ) {
    super(x, y, [], 0, symbol, status);
  }

  static generate(id: string, board: Board): Pot {
    const symbol = new ItemSymbol(imageStore.items.pot);
    const status = PotStatus.init(id);
    const effect = potEffects[id];
    if (effect === undefined) {
      throw new Error(`Invalid Id: ${id}`);
    }

    const pot = new Pot(0, 0, symbol, status, effect);
    pot.spawn(board);
    return pot;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }

  put(item: Item): void {
    if (this.contents.length >= this.status.capacity) return;
    this.effect.onPut(item, this.contents);
  }

  withdraw(): void {
    // this.effect.onWithdrawn()
    this.contents.splice(this.idx, 1);
  }
}
