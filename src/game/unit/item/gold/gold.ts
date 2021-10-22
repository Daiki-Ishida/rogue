import { imageStore } from 'game';
import { Actor, Player } from 'game/unit/actor';
import { Item } from '../item';
import { GoldStatus } from '../status';
import { ItemSymbol } from '../symbol';

export class Gold extends Item {
  private constructor(
    public x: number,
    public y: number,
    public symbol: ItemSymbol,
    public status: GoldStatus
  ) {
    super(x, y, symbol, status);
  }

  static generate(): Gold {
    const symbol = new ItemSymbol(imageStore.items.gold);
    const status = GoldStatus.generate();
    return new Gold(0, 0, symbol, status);
  }

  identify(): void {
    return;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = Math.floor(this.status.amount / 10);
    target.damage(dmg);
  }

  isGold(): this is Gold {
    return true;
  }
}
