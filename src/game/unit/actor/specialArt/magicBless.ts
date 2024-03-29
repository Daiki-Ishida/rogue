import { Actor } from '../actor';
import { Board } from 'game/board';
import { GridUtil } from 'game/util';
import { OnRayAnimation } from 'game/animation';
import { animationManager, soundManager, soundStore } from 'game';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

export const magicBlessEffect = (level: number): SpecialArt => {
  /**
   * 火炎による遠距離攻撃
   */
  const flame: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = getActorOnRayInRoom(actor, board);
      if (target === undefined) return;

      const hitAt = {
        x: target.x,
        y: target.y,
      };

      // sound
      soundManager.register(soundStore.fire);

      // animation
      const animation = OnRayAnimation.ofFlame(actor, hitAt, () => {
        target.damage(20);
      });
      animationManager.register(animation);
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      const target = getActorOnRayInRoom(actor, board);
      if (target === undefined) return false;

      return target.x === x && target.y === y;
    },
  };

  const blizzard: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = getActorOnRayInRoom(actor, board);
      if (target === undefined) return;

      const hitAt = {
        x: target.x,
        y: target.y,
      };

      // sound
      soundManager.register(soundStore.ice);

      // animation
      const animation = OnRayAnimation.ofBlizzard(actor, hitAt, () => {
        target.damage(40);
      });
      animationManager.register(animation);
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      const target = getActorOnRayInRoom(actor, board);
      if (target === undefined) return false;

      return target.x === x && target.y === y;
    },
  };

  let effect: SpecialArt;
  switch (level) {
    case 1:
      effect = flame;
      break;
    case 2:
      effect = flame;
      break;
    case 3:
      effect = blizzard;
      break;
    default:
      throw new Error(`Invalid Params: ${level}`);
  }
  return effect;
};

const getActorOnRayInRoom = (actor: Actor, board: Board): Actor | undefined => {
  const rayGrids = GridUtil.rayToGrids(
    actor.x,
    actor.y,
    actor.d.next.x,
    actor.d.next.y
  );

  let current: { x: number; y: number } = { x: actor.x, y: actor.y };
  let target: Actor | undefined;

  for (const grid of rayGrids) {
    current = { x: grid[0], y: grid[1] };
    // 部屋の中から廊下には攻撃しない
    if (board.isCorridor(current.x, current.y)) break;

    target = board.findActor(current.x, current.y);
    const isBlocked = board.isBlock(current.x, current.y);
    if (target || isBlocked) {
      break;
    }
  }
  return target;
};
