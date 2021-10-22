import { animationManager, soundManager, soundStore } from 'game';
import { OnGridAnimation } from 'game/animation';
import { Actor } from '../actor';
import { Board } from 'game/board';
import { RandomUtil } from 'game/util';
import { Condition } from '../condition';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

export const magickAttackEffect = (level: number): SpecialArt => {
  /**
   * １マスの火炎攻撃
   */
  const fire: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = board.findActor(actor.next.x, actor.next.y);
      if (target === undefined) return;

      // sound
      soundManager.register(soundStore.fire);

      // animation
      const animation = OnGridAnimation.ofFire(target.x, target.y, () => {
        const dmg = 15;
        target.damage(dmg);
      });
      animationManager.register(animation);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  /**
   * １マスの氷攻撃
   */
  const ice: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = board.findActor(actor.next.x, actor.next.y);
      if (target === undefined) return;

      // sound
      soundManager.register(soundStore.ice);

      // animation
      const animation = OnGridAnimation.ofIce(target.x, target.y, () => {
        const dmg = 25;
        target.damage(dmg);
        // 空腹効果付与
        if (target.isPlayer()) {
          target.addHunger(5);
        }
      });
      animationManager.register(animation);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  /**
   * １マスの電撃攻撃
   */
  const thunder: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const target = board.findActor(actor.next.x, actor.next.y);
      if (target === undefined) return;

      // sound
      soundManager.register(soundStore.thunder);

      // animation
      const animation = OnGridAnimation.ofThunder(target.x, target.y, () => {
        const dmg = 40;
        target.damage(dmg);

        // 30%で麻痺
        const random = RandomUtil.getRandomIntInclusive(0, 9);
        if (random < 3) {
          const paralysis = Condition.ofParalyzed(3);
          target.conditions.push(paralysis);
        }
      });
      animationManager.register(animation);
    },
    inRange: (x: number, y: number, actor: Actor): boolean => {
      return x === actor.next.x && y === actor.next.y;
    },
  };

  let effect: SpecialArt;
  switch (level) {
    case 1:
      effect = fire;
      break;
    case 2:
      effect = ice;
      break;
    case 3:
      effect = thunder;
      break;
    default:
      throw new Error(`Invalid Params: ${level}`);
  }
  return effect;
};
