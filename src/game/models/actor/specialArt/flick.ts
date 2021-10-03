import { playlogManager } from 'game';
import { Actor } from '../actor';
import { Board } from 'game/board';
import { RandomUtil } from 'game/util';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

// todo animation
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
      if (random === 0) {
        const equipment = taregt.status.sward;
        if (equipment === undefined) return;

        playlogManager.add(`${equipment.status.displayName}が弾き飛ばされた！`);
        equipment.forceUnequip();
        taregt.status.sward = undefined;
      } else {
        const equipment = taregt.status.shield;
        if (equipment === undefined) return;

        playlogManager.add(`${equipment.status.displayName}が弾き飛ばされた！`);
        equipment.forceUnequip();
        taregt.status.shield = undefined;
      }
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  return flick;
};
