import { playlogManager } from 'game';
import { Actor } from '../actor';
import { Board } from 'game/board';
import { RandomUtil } from 'game/util';
import { Player } from '../player';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

export const flickEffect = (level: number): SpecialArt => {
  /**
   * 装備を弾き飛ばす
   */
  const flick: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      actor.attack(board);
      const taregt = board.findActor(actor.next.x, actor.next.y);
      if (taregt === undefined) return;
      if (!taregt.isPlayer()) return;

      // todo refactor
      const random = RandomUtil.getRandomIntInclusive(0, 1);
      random === 0 ? unequipSword(taregt) : unequipShield(taregt);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  /**
   * 装備を弾き飛ばす
   */
  const fullflick: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      actor.attack(board);
      const taregt = board.findActor(actor.next.x, actor.next.y);
      if (taregt === undefined) return;
      if (!taregt.isPlayer()) return;
      unequipSword(taregt);
      unequipShield(taregt);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  let effect: SpecialArt;
  switch (level) {
    case 1:
      effect = flick;
      break;
    case 2:
      effect = fullflick;
      break;
    default:
      throw new Error(`Invalid Params: ${level}`);
  }
  return effect;
};

/**
 * 剣を弾き飛ばす
 */
const unequipSword = (target: Player) => {
  const sword = target.status.sword;
  if (sword === undefined) return;

  playlogManager.add(`${sword.status.displayName}が弾き飛ばされた！`);
  sword.forceUnequip();
  target.status.sword = undefined;
};

/**
 * 盾を弾き飛ばす
 */
const unequipShield = (target: Player) => {
  const shield = target.status.shield;
  if (shield === undefined) return;

  playlogManager.add(`${shield.status.displayName}が弾き飛ばされた！`);
  shield.forceUnequip();
  target.status.shield = undefined;
};
