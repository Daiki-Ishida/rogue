import { SuperHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

const VALUE = 100;

/**
 * 上薬草
 */
export class SuperHerb extends HerbBase {
  static generate(): SuperHerb {
    const status = new SuperHerbStatus();
    return new SuperHerb(status);
  }

  identify(): void {
    SuperHerbStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.dmg === 0 ? user.status.maxHp++ : user.heal(VALUE);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
