import { GiantBreadStatus } from '.';
import { FoodBase } from '..';
import { Player } from '../../../../actor';

/**
 * 巨大なパン
 */
export class GiantBread extends FoodBase {
  static generate(): GiantBread {
    const status = GiantBreadStatus.init();
    return new GiantBread(status);
  }

  identify(): void {
    GiantBreadStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.maxFullness += 5;
  }
}
