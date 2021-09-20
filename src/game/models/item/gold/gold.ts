import { GoldStatus, GoldSymbol, ItemBase } from '..';
import { Player, Actor } from '../../actor';

export class Gold extends ItemBase {
  constructor(
    public symbol: GoldSymbol,
    public status: GoldStatus,
    public x: number = 0,
    public y: number = 0
  ) {
    super(x, y, symbol, status);
  }

  static generate(): Gold {
    const symbol = GoldSymbol.init();
    const status = GoldStatus.generate();
    return new Gold(symbol, status);
  }

  identify(): void {
    GoldStatus._identified = true;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = Math.floor(this.status.amount / 10);
    target.damage(dmg);
  }
}
