import { Actor } from '../actor';
import { Board } from 'game/board';
import { GridUtil } from 'game/util';
import { Enemy } from '../enemy';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

export const healEffect = (level: number): SpecialArt => {
  /**
   * HP回復
   */
  const heal: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = findTarget(actor, board);
      if (target === undefined) return;
      target.heal(15);
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      const target = findTarget(actor, board);
      if (target === undefined) return false;
      if (target.status.dmg === 0) return false;
      return true;
    },
  };

  /**
   * HP回復 + 状態異常回復
   */
  const cure: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = findTarget(actor, board);
      if (target === undefined) return;
      target.heal(15);
      target.conditions.cureAll();
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      const target = findTarget(actor, board);
      if (target === undefined) return false;
      if (target.status.dmg === 0) return false;
      return true;
    },
  };

  /**
   * 周囲のHP回復 + 状態異常回復
   */
  const areaCure: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const grids = GridUtil.aroundGrids(actor.x, actor.y);
      for (const grid of grids) {
        const target = board.findActor(grid[0], grid[1]);
        if (target?.isEnemy()) {
          target.heal(30);
          target.conditions.cureAll();
        }
      }
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      const target = findTarget(actor, board);
      if (target === undefined) return false;
      if (target.status.dmg === 0) return false;
      return true;
    },
  };

  let effect: SpecialArt;
  switch (level) {
    case 1:
      effect = heal;
      break;
    case 2:
      effect = cure;
      break;
    case 3:
      effect = areaCure;
      break;
    default:
      throw new Error(`Invalid Params: ${level}`);
  }
  return effect;
};

const findTarget = (actor: Actor, board: Board): Enemy | undefined => {
  let grids = GridUtil.aroundGrids(actor.x, actor.y);
  grids = shuffle(grids);
  let target: Enemy | undefined;
  for (const grid of grids) {
    const actor = board.findActor(grid[0], grid[1]);
    if (actor?.isEnemy()) {
      target = actor;
      break;
    }
  }
  return target;
};

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
