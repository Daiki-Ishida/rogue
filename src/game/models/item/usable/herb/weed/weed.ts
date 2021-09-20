import { WeedStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';

/**
 * 雑草
 */
export class Weed extends HerbBase {
  static generate(): Weed {
    const status = new WeedStatus();
    return new Weed(status);
  }

  identify(): void {
    WeedStatus._identified = true;
  }

  effect(): void {
    // 効果なし
    return;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
