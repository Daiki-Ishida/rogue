import { animationManager, playlogManager } from 'game';
import { OnGridAnimation } from 'game/animation';
import { Board } from 'game/board';
import { GridUtil, RandomUtil } from 'game/util';
import { Actor, Condition } from '../actor';
import { EnemyGenerator, TrapGenerator } from '../generator';

interface ITrapEffects {
  [key: string]: (actor: Actor, board: Board) => void;
}

const TrapEffects = (): ITrapEffects => {
  const landmine = (actor: Actor, board: Board): void => {
    const callback = () => {
      const grids = GridUtil.aroundGrids(actor.x, actor.y);
      for (const grid of grids) {
        board.findActor(grid[0], grid[1])?.damage(999);
      }

      const dmg = Math.floor(actor.status.hp / 2);
      actor.damage(dmg);
    };

    const animation = OnGridAnimation.ofExplosion(actor.x, actor.y, callback);
    animationManager.register(animation);

    playlogManager.add('地雷を踏んでしまった！');
  };

  const multiplication = (actor: Actor, board: Board): void => {
    const MIN = 15;
    const MAX = 20;

    const additions = RandomUtil.getRandomIntInclusive(MIN, MAX);
    const traps = TrapGenerator.generate(additions);
    for (const trap of traps) {
      trap.spawn(board);
    }
  };

  const poison = (actor: Actor): void => {
    const poison = Condition.ofPoison(10);
    actor.conditions.push(poison);

    playlogManager.add('毒の罠を踏んでしまった！');
  };

  const sleep = (actor: Actor): void => {
    const asleep = Condition.ofAsleep(10);
    actor.conditions.push(asleep);

    playlogManager.add('眠りの罠を踏んでしまった！');
  };

  const spin = (actor: Actor): void => {
    const confusion = Condition.ofConfusion(10);
    actor.conditions.push(confusion);

    playlogManager.add('混乱の罠を踏んでしまった！');
  };

  const rockSlide = (actor: Actor): void => {
    const MIN = 15;
    const MAX = 20;

    const callback = () => {
      const dmg = RandomUtil.getRandomIntInclusive(MIN, MAX);
      actor.damage(dmg);
    };

    const animation = OnGridAnimation.ofRockSlide(actor.x, actor.y, callback);
    animationManager.register(animation);

    playlogManager.add('落石の罠を踏んでしまった！');
  };

  const hunger = (actor: Actor): void => {
    if (actor.isPlayer()) {
      actor.addHunger(10);
    }

    playlogManager.add('腹減りの罠を踏んでしまった！');
    playlogManager.add('満腹度が10減った。');
  };

  const warp = (actor: Actor, board: Board): void => {
    const warpTo = board.getRandomEmpty();
    actor.setAt(warpTo.x, warpTo.y);

    playlogManager.add('ワープの罠だ！');
  };

  const strip = (actor: Actor): void => {
    if (actor.isPlayer()) {
      actor.unequipAll();
    }

    playlogManager.add('装備外しの罠を踏んでしまった！');
  };

  const summon = (actor: Actor, board: Board): void => {
    const grids = GridUtil.aroundGrids(actor.x, actor.y);
    const emptyGrids: boolean[] = [];
    for (const grid of grids) {
      const exist = board.findActor(grid[0], grid[1]);
      const block = board.isBlock(grid[0], grid[1]);
      const isEmpty = !(exist || block);
      emptyGrids.push(isEmpty);
    }

    const count = emptyGrids.filter((g) => g === true).length;
    const enemys = EnemyGenerator.generate(count, board);
    let c = 0;
    for (let i = 0; i < emptyGrids.length - 1; i++) {
      if (emptyGrids[i]) {
        const xy = grids[i];
        enemys[c].setAt(xy[0], xy[1]);
        c++;
      }
    }

    playlogManager.add('魔物呼びの罠を踏んでしまった！');
    playlogManager.add('たくさんの魔物が現れた！');
  };

  return {
    LANDMINE: landmine,
    ROCK_SLIDE: rockSlide,
    POISON: poison,
    SLEEP: sleep,
    SPIN: spin,
    HUNGER: hunger,
    STRIP: strip,
    WARP: warp,
    MULTIPLICATION: multiplication,
    SUMMON: summon,
  };
};

export const trapEffects = TrapEffects();
