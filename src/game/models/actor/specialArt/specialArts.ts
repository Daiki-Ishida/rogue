import { Board } from 'game/board';
import { GridUtil } from 'game/util';
import { Actor } from '../actor';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

interface ISpecialArts {
  [key: string]: SpecialArt;
}

const specialArtsGen = (): ISpecialArts => {
  /**
   * ドラゴンのフレイム攻撃
   */
  const flame: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = getActorOnRayInRoom(actor, board);
      if (target === undefined) return;
      target.damage(40);
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      const target = getActorOnRayInRoom(actor, board);
      if (target === undefined) return false;

      return target.x === x && target.y === y;
    },
  };

  return {
    DRAGON_01: flame,
  };
};

export const specialArts = specialArtsGen();

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
