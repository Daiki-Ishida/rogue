import { HerbBase, WeedStatus } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

const VALUE = 10;

/**
 * 胃縮小の種
 */
export class StomachShrinker extends HerbBase {
  static generate(): StomachShrinker {
    const status = new WeedStatus();
    return new StomachShrinker(status);
  }

  identify(): void {
    WeedStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.maxFullness -= VALUE;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
