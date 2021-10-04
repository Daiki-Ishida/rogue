import { imageStore } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
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

  static generate(board: Board): Gold {
    const symbol = new ItemSymbol(imageStore.items.gold);
    const status = GoldStatus.generate();
    const gold = new Gold(0, 0, symbol, status);
    gold.spawn(board);
    return gold;
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
