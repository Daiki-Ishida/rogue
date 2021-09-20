import { BigBreadStatus } from '.';
import { FoodBase } from '..';
import { Player } from '../../../../actor';

/**
 * 大きいパン
 */
export class BigBread extends FoodBase {
  static generate(): BigBread {
    const status = BigBreadStatus.init();
    return new BigBread(status);
  }

  identify(): void {
    BigBreadStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.maxFullness += 2;
  }
}
