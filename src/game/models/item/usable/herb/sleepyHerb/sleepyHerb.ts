import { SleepyHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Condition, Player } from '../../../../actor';

/**
 * 睡眠草
 */
export class SleepyHerb extends HerbBase {
  static generate(): SleepyHerb {
    const status = new SleepyHerbStatus();
    return new SleepyHerb(status);
  }

  identify(): void {
    SleepyHerbStatus._identified = true;
  }

  effect(user: Player): void {
    const asleep = Condition.ofAsleep(10);
    user.conditions.push(asleep);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);

    const asleep = Condition.ofAsleep(10);
    target.conditions.push(asleep);
  }
}
