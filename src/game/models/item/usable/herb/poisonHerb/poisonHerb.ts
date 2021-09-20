import { PoisonHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Condition, Player } from '../../../../actor';

const VALUE = 5;

/**
 * 毒草
 */
export class PoisonHerb extends HerbBase {
  static generate(): PoisonHerb {
    const status = new PoisonHerbStatus();
    return new PoisonHerb(status);
  }

  identify(): void {
    PoisonHerbStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.maxHp -= VALUE;
    const posion = Condition.ofPoison(30);
    user.conditions.push(posion);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);

    const posion = Condition.ofPoison(30);
    target.conditions.push(posion);
  }
}
