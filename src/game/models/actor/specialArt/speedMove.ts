import { Actor } from '../actor';
import { Board } from 'game/board';
import { GridUtil } from 'game/util';
import { Player } from '..';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

// todo animation
export const speedMoves = (level: number): SpecialArt => {
  /**
   * 背後に瞬間移動して攻撃
   */
  const behindAttack: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const around = GridUtil.aroundGrids(actor.x, actor.y);
      let target: Player | undefined = undefined;
      for (const grid of around) {
        const actor = board.findActor(grid[0], grid[1]);
        if (actor?.isPlayer()) {
          target = actor;
        }
      }
      if (target === undefined) return;

      const behind = {
        x: target.x - target.d.next.x,
        y: target.y - target.d.next.y,
      };

      actor.setAt(behind.x, behind.y);
      actor.turnTo(target.d.key);
      actor.attack(board);
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      const around = GridUtil.aroundGrids(actor.x, actor.y);
      let result = false;
      for (const grid of around) {
        if (grid[0] === x && grid[1] === y) {
          result = true;
          break;
        }
      }
      if (!result) return false;

      const target = board.findActor(x, y);
      if (target === undefined) return false;

      const behind = {
        x: target.x - target.d.next.x,
        y: target.y - target.d.next.y,
      };

      if (
        board.isBlock(behind.x, behind.y) ||
        board.findActor(behind.x, behind.y)
      ) {
        return false;
      }

      return true;
    },
  };

  return behindAttack;
};
