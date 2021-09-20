import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
import { RandomUtil } from 'game/util';
import { Equipment } from '.';
import { BraceletStatus } from '../status';
import { ItemSymbol } from '../symbol';

export class Bracelet extends Equipment {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: BraceletStatus,
    public effect: (player: Player, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
