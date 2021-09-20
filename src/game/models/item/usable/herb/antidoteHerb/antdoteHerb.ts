import { AntidoteHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

/**
 * 毒消し草
 */
export class AntidoteHerb extends HerbBase {
  static generate(): AntidoteHerb {
    const status = new AntidoteHerbStatus();
    return new AntidoteHerb(status);
  }

  identify(): void {
    AntidoteHerbStatus._identified = true;
  }

  effect(user: Player): void {
    user.conditions.recover('POISONED');
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
    target.conditions.recover('POISONED');
  }
}
