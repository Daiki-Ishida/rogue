import { HerbBase, WeedStatus } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

const VALUE = 10;

/**
 * 胃拡張の種
 */
export class StomachExpander extends HerbBase {
  static generate(): StomachExpander {
    const status = new WeedStatus();
    return new StomachExpander(status);
  }

  identify(): void {
    WeedStatus._identified = true;
  }

  effect(user: Player): void {
    user.status.maxFullness += VALUE;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
