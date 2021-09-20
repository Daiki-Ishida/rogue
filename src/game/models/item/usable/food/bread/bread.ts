import { BreadStatus } from '.';
import { FoodBase } from '..';
import { Player } from '../../../../actor';

/**
 * パン
 */
export class Bread extends FoodBase {
  static generate(): Bread {
    const status = BreadStatus.init();
    return new Bread(status);
  }

  identify(): void {
    BreadStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.maxFullness++;
  }
}
