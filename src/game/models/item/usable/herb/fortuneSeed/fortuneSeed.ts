import { FortuneSeedStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

/**
 * しあわせのタネ
 */
export class FortuneSeed extends HerbBase {
  static generate(): FortuneSeed {
    const status = new FortuneSeedStatus();
    return new FortuneSeed(status);
  }

  identify(): void {
    FortuneSeedStatus._identified = true;
  }

  effect(user: Player): void {
    user.levelUp();
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);

    target.levelUp();
  }
}
