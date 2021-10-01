import { Board } from 'game/board';
import { GridUtil } from 'game/util';
import { Condition } from '..';
import { Actor } from '../actor';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

interface ISpecialArts {
  [key: string]: SpecialArt;
}

// todo animation
const specialArtsGen = (): ISpecialArts => {
  /**
   * 火炎による遠距離攻撃
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

  /**
   * １マスの火炎攻撃
   */
  const fire: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = board.findActor(actor.next.x, actor.next.y);
      if (target === undefined) return;

      const dmg = 20;
      target.damage(dmg);
      console.log(`${actor.status.name}は炎を吐いた！`);
      console.log(`${target.status.name}は${dmg}を受けた`);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  /**
   * 攻撃した敵をノックバックさせる(最大10マス)
   */
  const knockback: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      actor.attack(board);
      const target = board.findActor(actor.next.x, actor.next.y);

      const rayGrids = GridUtil.rayToGrids(
        actor.x,
        actor.y,
        actor.d.next.x,
        actor.d.next.y,
        10
      );

      let current: { x: number; y: number } = { x: actor.x, y: actor.y };
      for (const grid of rayGrids) {
        current = { x: grid[0], y: grid[1] };
        // 部屋の中から廊下には攻撃しない
        if (board.isCorridor(current.x, current.y)) break;

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

      target?.setAt(landingAt.x, landingAt.y);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  /**
   * 毒攻撃
   */
  const poisoningAttack: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      actor.attack(board);
      const poison = Condition.ofPoison(20);
      board.findActor(actor.next.x, actor.next.y)?.conditions.push(poison);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  /**
   * 背後に瞬間移動して攻撃
   */
  const behindAttack: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = board.findActor(actor.next.x, actor.next.y);
      if (target === undefined) return;

      const behind = {
        x: target.x - target.d.next.x,
        y: target.y - target.d.next.y,
      };
      actor.setAt(behind.x, behind.y);
      actor.turnTo(target.d.key);
      actor.attack(board);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      const around = GridUtil.aroundGrids(actor.x, actor.y);
      let result = false;
      for (const grid of around) {
        if (grid[0] === x && grid[1] === y) {
          result = true;
          break;
        }
      }
      return result;
    },
  };

  /**
   * 特殊能力無し
   */
  const noEffect: SpecialArt = {
    effect: () => {
      return;
    },
    inRange: (): boolean => {
      return false;
    },
  };

  return {
    DRAGON_01: flame,
    DRAGON_02: noEffect,
    DRAGON_03: noEffect,
    INSECTOR_01: noEffect,
    INSECTOR_02: noEffect,
    INSECTOR_03: noEffect,
    WEREWOLF_01: noEffect,
    WEREWOLF_02: noEffect,
    WEREWOLF_03: noEffect,
    GOLEM_01: knockback,
    GOLEM_02: knockback,
    GOLEM_03: knockback,
    TATSUNOKO_01: noEffect,
    TATSUNOKO_02: noEffect,
    TATSUNOKO_03: noEffect,
    GRIFFIN_01: noEffect,
    GRIFFIN_02: noEffect,
    GRIFFIN_03: noEffect,
    PIG_MAID_01: noEffect,
    PIG_MAID_02: noEffect,
    PIG_MAID_03: noEffect,
    GOBLIN_01: noEffect,
    GOBLIN_02: noEffect,
    MOFUMOFU_01: noEffect,
    MOFUMOFU_02: noEffect,
    SOLDIER_01: noEffect,
    SOLDIER_02: noEffect,
    PEGASUS_01: noEffect,
    PEGASUS_02: noEffect,
    SHADOW: noEffect,
    MANTICORE: noEffect,
    DARK_KNIGHT: noEffect,
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
