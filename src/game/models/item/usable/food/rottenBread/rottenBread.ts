import { RottenBreadStatus } from '.';
import { FoodBase } from '..';
import { Condition, Player } from '../../../../actor';

/**
 * 腐ったパン
 */
export class RottenBread extends FoodBase {
  static generate(): RottenBread {
    const status = RottenBreadStatus.init();
    return new RottenBread(status);
  }

  identify(): void {
    RottenBreadStatus._identified = true;
  }

  effect(user: Player): void {
    const poison = Condition.ofPoison(20);
    user.conditions.push(poison);
  }
}
