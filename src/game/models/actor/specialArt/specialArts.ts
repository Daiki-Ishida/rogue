import { Board } from 'game/board';
import { Actor } from '../actor';
import { magicBlessEffect } from './magicBless';
import { conditionAttackEffect } from './conditionAttack';
import { flickEffect } from './flick';
import { healEffect } from './heal';
import { knockbackEffect } from './knockback';
import { magickAttackEffect } from './magicAttack';
import { speedMoves } from './speedMove';
import { RandomUtil } from 'game/util';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

interface ISpecialArts {
  [key: string]: SpecialArt;
}

const specialArtsGen = (): ISpecialArts => {
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

  const ramdomArts = (): SpecialArt => {
    const random = RandomUtil.getRandomIntInclusive(0, 4);

    let arts: SpecialArt;
    switch (random) {
      case 0:
        arts = magicBlessEffect(2);
        break;
      case 1:
        arts = conditionAttackEffect(2);
        break;
      case 2:
        arts = knockbackEffect(2);
        break;
      case 3:
        arts = magickAttackEffect(2);
        break;
      case 4:
        arts = healEffect(2);
        break;
      default:
        throw new Error('something went wrong...');
    }
    return arts;
  };

  return {
    DRAGON_01: magicBlessEffect(1),
    DRAGON_02: magicBlessEffect(2),
    DRAGON_03: magicBlessEffect(3),
    INSECTOR_01: conditionAttackEffect(1),
    INSECTOR_02: conditionAttackEffect(2),
    INSECTOR_03: conditionAttackEffect(3),
    WEREWOLF_01: speedMoves(1),
    WEREWOLF_02: speedMoves(2),
    WEREWOLF_03: speedMoves(3),
    GOLEM_01: knockbackEffect(1),
    GOLEM_02: knockbackEffect(2),
    GOLEM_03: knockbackEffect(3),
    TATSUNOKO_01: magickAttackEffect(1),
    TATSUNOKO_02: magickAttackEffect(2),
    TATSUNOKO_03: magickAttackEffect(3),
    GRIFFIN_01: noEffect,
    GRIFFIN_02: noEffect,
    GRIFFIN_03: noEffect,
    PIG_MAID_01: healEffect(1),
    PIG_MAID_02: healEffect(2),
    PIG_MAID_03: healEffect(3),
    GOBLIN_01: noEffect,
    GOBLIN_02: noEffect,
    MOFUMOFU_01: noEffect,
    MOFUMOFU_02: noEffect,
    SOLDIER_01: flickEffect(1),
    SOLDIER_02: flickEffect(2),
    PEGASUS_01: noEffect,
    PEGASUS_02: noEffect,
    SHADOW: ramdomArts(),
    MANTICORE: noEffect,
    DARK_KNIGHT: noEffect,
  };
};

export const specialArts = specialArtsGen();
