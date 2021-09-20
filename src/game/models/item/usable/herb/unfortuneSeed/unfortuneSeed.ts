import { UnfortuneSeedStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

/**
 * 不幸のタネ
 */
export class UnfortuneSeed extends HerbBase {
  static generate(): UnfortuneSeed {
    const status = new UnfortuneSeedStatus();
    return new UnfortuneSeed(status);
  }

  identify(): void {
    UnfortuneSeedStatus._identified = true;
  }

  effect(user: Player): void {
    user.levelDown();
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);

    target.levelDown();
  }
}
