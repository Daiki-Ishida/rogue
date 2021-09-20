import { GreenHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

const VALUE = 25;

/**
 * 薬草
 */
export class GreenHerb extends HerbBase {
  static generate(): GreenHerb {
    const status = new GreenHerbStatus();
    return new GreenHerb(status);
  }

  identify(): void {
    GreenHerbStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.dmg === 0 ? user.status.maxHp++ : user.heal(VALUE);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
