import { Board } from 'game/board';
import { GridUtil, RandomUtil } from 'game/util';
import { Actor, Condition } from '../actor';
import { EnemyGenerator, TrapGenerator } from '../generator';

interface ITrapEffects {
  [key: string]: (actor: Actor, board: Board) => void;
}

const TrapEffects = (): ITrapEffects => {
  const landmine = (actor: Actor, board: Board): void => {
    const grids = GridUtil.aroundGrids(actor.x, actor.y);
    for (const grid of grids) {
      board.findActor(grid[0], grid[1])?.damage(999);
    }

    const dmg = Math.floor(actor.status.hp / 2);
    actor.damage(dmg);
    console.log(`${dmg}ダメージを受けた！`);
  };

  const multiplication = (actor: Actor, board: Board): void => {
    const MIN = 15;
    const MAX = 20;

    const additions = RandomUtil.getRandomIntInclusive(MIN, MAX);
    TrapGenerator.generate(additions, board);
  };

  const poison = (actor: Actor): void => {
    const poison = Condition.ofPoison(10);
    actor.conditions.push(poison);
  };

  const sleep = (actor: Actor): void => {
    const asleep = Condition.ofAsleep(10);
    actor.conditions.push(asleep);
  };

  const spin = (actor: Actor): void => {
    const confusion = Condition.ofConfusion(10);
    actor.conditions.push(confusion);
  };

  const rockSlide = (actor: Actor): void => {
    const MIN = 15;
    const MAX = 20;

    const dmg = RandomUtil.getRandomIntInclusive(MIN, MAX);
    actor.damage(dmg);
  };

  const hunger = (actor: Actor): void => {
    if (actor.isPlayer()) {
      actor.addHunger(10);
    }
  };

  const warp = (actor: Actor, board: Board): void => {
    const warpTo = board.getRandomEmpty();
    actor.setAt(warpTo.x, warpTo.y);
  };

  const strip = (actor: Actor): void => {
    if (actor.isPlayer()) {
      actor.unequipAll();
    }
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
    const enemys = EnemyGenerator.generate(count, 1, board);
    let c = 0;
    for (let i = 0; i < emptyGrids.length - 1; i++) {
      if (emptyGrids[i]) {
        const xy = grids[i];
        enemys[c].setAt(xy[0], xy[1]);
        c++;
      }
    }
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
