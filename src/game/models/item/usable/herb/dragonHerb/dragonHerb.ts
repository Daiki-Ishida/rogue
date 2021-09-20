import { DragonHerbStatus } from '.';
import { HerbBase } from '..';
import { GridUtil, RandomUtil } from '../../../../../util';
import { Actor, Player } from '../../../../actor';
import { Board } from '../../../../board';

/**
 * ドラゴン草
 */
export class DragonHerb extends HerbBase {
  static generate(): DragonHerb {
    const status = new DragonHerbStatus();
    return new DragonHerb(status);
  }

  identify(): void {
    DragonHerbStatus._identified = true;
  }

  effect(user: Player, board: Board): void {
    const grids = GridUtil.rayToGrids(
      user.x,
      user.y,
      user.d.next.x,
      user.d.next.y
    );

    let current: { x: number; y: number } = { x: user.x, y: user.y };
    let target: Actor | undefined = undefined;

    for (const grid of grids) {
      current = { x: grid[0], y: grid[1] };
      target = board.findActor(current.x, current.y);
      const blocked = board.isBlock(current.x, current.y);
      if (target || blocked) {
        break;
      }
    }

    if (target) {
      const dmg = RandomUtil.getRandomIntInclusive(45, 60);
      target.damage(dmg);
    }
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(45, 60);
    target.damage(dmg);
    // messages.push(`${target.name}に${dmg}ダメージを与えた`);
  }
}
