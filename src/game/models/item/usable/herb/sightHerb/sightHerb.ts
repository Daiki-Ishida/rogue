import { SightHerbStatus } from '.';
import { HerbBase } from '..';
import { RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';
import { Board } from '../../../../board';

/**
 * 目薬草
 */
export class SightHerb extends HerbBase {
  static generate(): SightHerb {
    const status = new SightHerbStatus();
    return new SightHerb(status);
  }

  identify(): void {
    SightHerbStatus._identified = true;
  }

  effect(user: Player, board: Board): void {
    board.traps.forEach((trap) => trap.disclose());
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}
