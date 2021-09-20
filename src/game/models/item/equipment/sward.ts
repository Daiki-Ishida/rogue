import { Equipment } from './equipment';
import { SwardStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Board } from 'game/board';
import { Player, Actor } from 'game/models/actor';
import { Usable } from '../usable';

export class Sward extends Equipment {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: SwardStatus,
    public effects: string[]
  ) {
    super(x, y, symbol, status);
  }

  get atk(): number {
    return this.status.baseAtk + this.status.level;
  }

  unify(sward: Sward): void {
    // 識別
    this.identify();

    // レベル合成
    this.status.level += sward.status.level;

    // 特殊能力合成
    this.effects = this.effects.concat(sward.effects);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    throw new Error('Method not implemented.');
  }

  isSward(): this is Sward {
    return true;
  }
}
