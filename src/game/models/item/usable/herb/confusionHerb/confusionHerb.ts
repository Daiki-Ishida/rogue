import { ConfusionHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Condition, Player } from '../../../../actor';

/**
 * 混乱草
 */
export class ConfusionHerb extends HerbBase {
  static generate(): ConfusionHerb {
    const status = new ConfusionHerbStatus();
    return new ConfusionHerb(status);
  }

  identify(): void {
    ConfusionHerbStatus._identified = true;
  }

  effect(user: Player): void {
    const confusion = Condition.ofConfusion(10);
    user.conditions.push(confusion);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);

    const confusion = Condition.ofConfusion(10);
    target.conditions.push(confusion);
  }
}
