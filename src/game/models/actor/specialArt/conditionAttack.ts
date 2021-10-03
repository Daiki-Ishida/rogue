import { Actor } from '../actor';
import { Board } from 'game/board';
import { Condition } from '../condition';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

// todo animation
export const conditionAttackEffect = (level: number): SpecialArt => {
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
   * 麻痺攻撃
   */
  const paralysisAttack: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      actor.attack(board);
      const poison = Condition.ofParalyzed(3);
      board.findActor(actor.next.x, actor.next.y)?.conditions.push(poison);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  /**
   * 混乱攻撃
   */
  const confusingAttack: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      actor.attack(board);
      const poison = Condition.ofConfusion(5);
      board.findActor(actor.next.x, actor.next.y)?.conditions.push(poison);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  let effect: SpecialArt;
  switch (level) {
    case 1:
      effect = poisoningAttack;
      break;
    case 2:
      effect = paralysisAttack;
      break;
    case 3:
      effect = confusingAttack;
      break;
    default:
      throw new Error(`Invalid Params: ${level}`);
  }
  return effect;
};
