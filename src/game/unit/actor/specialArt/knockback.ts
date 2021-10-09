import { Actor } from '../actor';
import { Board } from 'game/board';
import { GridUtil } from 'game/util';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

// todo animation
export const knockbackEffect = (level: number): SpecialArt => {
  /**
   * 攻撃した敵をノックバックさせる(最大5マス)
   */
  const knockback: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      actor.attack(board);
      const target = board.findActor(actor.next.x, actor.next.y);

      if (target === undefined) return;

      const rayGrids = GridUtil.rayToGrids(
        target.x,
        target.y,
        actor.d.next.x,
        actor.d.next.y,
        5
      );

      let current: { x: number; y: number } = { x: target.x, y: target.y };
      for (const grid of rayGrids) {
        current = { x: grid[0], y: grid[1] };
        const blockingActor = board.findActor(current.x, current.y);
        const isBlocked = board.isBlock(current.x, current.y);
        if (blockingActor || isBlocked) {
          break;
        }
      }

      const landingAt = {
        x: current.x - actor.d.next.x,
        y: (current.y -= actor.d.next.y),
      };

      target.setAt(landingAt.x, landingAt.y);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  return knockback;
};
