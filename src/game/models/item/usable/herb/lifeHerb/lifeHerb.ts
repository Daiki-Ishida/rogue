import { LifeHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

const VALUE = 5;

/**
 * 命の草
 */
export class LifeHerb extends HerbBase {
  static generate(): LifeHerb {
    const status = new LifeHerbStatus();
    return new LifeHerb(status);
  }

  identify(): void {
    LifeHerbStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.maxHp += VALUE;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
