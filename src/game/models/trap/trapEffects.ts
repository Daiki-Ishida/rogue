import { Board } from 'game/board';
import { GridUtil, RandomUtil } from 'game/util';
import { Actor, Condition } from '../actor';

const TrapEffects = () => {
  const landmine = (actor: Actor, board: Board): void => {
    const grids = GridUtil.aroundGrids(actor.x, actor.y);
    for (const grid of grids) {
      board.findActor(grid[0], grid[1])?.damage(999);
    }

    const dmg = Math.floor(actor.status.hp / 2);
    actor.damage(dmg);
    console.log(`${dmg}ダメージを受けた！`);
  };

  const multiplication = (): void => {
    const MIN = 15;
    const MAX = 20;

    const additions = RandomUtil.getRandomIntInclusive(MIN, MAX);
    // for (let i = 0; i < additions; i++) {
    //   const trap = TrapGenerator.generate();
    //   board.traps.push(trap);
    // }
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
    return; // todo
  };

  const summon = (actor: Actor): void => {
    return; // todo
  };

  return {
    landmine,
    rockSlide,
    poison,
    sleep,
    spin,
    hunger,
    strip,
    warp,
    multiplication,
    summon,
  };
};

export const trapEffects = TrapEffects();
