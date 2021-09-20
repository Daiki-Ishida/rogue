import { Board } from 'game/board';
import { Actor, Condition, Player } from 'game/models/actor';
import { GridUtil, RandomUtil } from 'game/util';

export interface HerbEffect {
  onHit: (user: Player, target: Actor, board: Board) => void;
  onUse: (user: Player, board: Board) => void;
}

const HerbEffects = () => {
  const baseOnHit = (user: Player, target: Actor) => {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  };

  const greenHerb: HerbEffect = {
    onHit: baseOnHit,
    onUse: (user: Player) => {
      user.status.dmg === 0 ? user.status.maxHp++ : user.heal(25);
    },
  };

  const superHerb: HerbEffect = {
    onHit: baseOnHit,
    onUse: (user: Player) => {
      user.status.dmg === 0 ? user.status.maxHp++ : user.heal(100);
    },
  };

  const lifeHerb: HerbEffect = {
    onHit: baseOnHit,
    onUse: (user: Player) => {
      user.status.maxHp += 5;
    },
  };

  const poisonHerb: HerbEffect = {
    onHit: (user: Player, target: Actor): void => {
      const dmg = RandomUtil.getRandomIntInclusive(1, 2);
      target.damage(dmg);
      const posion = Condition.ofPoison(30);
      target.conditions.push(posion);
    },
    onUse: (user: Player) => {
      user.status.maxHp -= 5;
      const posion = Condition.ofPoison(30);
      user.conditions.push(posion);
    },
  };

  const sleepyHerb: HerbEffect = {
    onHit: (user: Player, target: Actor): void => {
      const dmg = RandomUtil.getRandomIntInclusive(1, 2);
      target.damage(dmg);
      const asleep = Condition.ofAsleep(10);
      target.conditions.push(asleep);
    },
    onUse: (user: Player) => {
      const asleep = Condition.ofAsleep(10);
      user.conditions.push(asleep);
    },
  };

  const confusionHerb = {
    onHit: (user: Player, target: Actor): void => {
      const dmg = RandomUtil.getRandomIntInclusive(1, 2);
      target.damage(dmg);
      const confusion = Condition.ofConfusion(10);
      target.conditions.push(confusion);
    },
    onUse: (user: Player) => {
      const confusion = Condition.ofConfusion(10);
      user.conditions.push(confusion);
    },
  };

  const fortuneSeed = {
    onHit: (user: Player, target: Actor): void => {
      const dmg = RandomUtil.getRandomIntInclusive(1, 2);
      target.damage(dmg);
      target.levelUp();
    },
    onUse: (user: Player) => {
      user.levelUp();
    },
  };

  const unfortuneSeed = {
    onHit: (user: Player, target: Actor): void => {
      const dmg = RandomUtil.getRandomIntInclusive(1, 2);
      target.damage(dmg);
      target.levelDown();
    },
    onUse: (user: Player) => {
      user.levelDown();
    },
  };

  const antidoteHerb = {
    onHit: (user: Player, target: Actor): void => {
      const dmg = RandomUtil.getRandomIntInclusive(1, 2);
      target.damage(dmg);
      target.conditions.recover('POISONED');
    },
    onUse: (user: Player) => {
      user.conditions.recover('POISONED');
    },
  };

  const sightHerb = {
    onHit: baseOnHit,
    onUse: (user: Player, board: Board) => {
      board.traps.forEach((trap) => trap.disclose());
    },
  };

  const stomachExpander = {
    onHit: baseOnHit,
    onUse: (user: Player) => {
      user.status.maxFullness += 10;
    },
  };

  const stomachShrinker = {
    onHit: baseOnHit,
    onUse: (user: Player) => {
      user.status.maxFullness -= 10;
    },
  };

  const dragonHerb = {
    onHit: (user: Player, target: Actor) => {
      const dmg = RandomUtil.getRandomIntInclusive(45, 60);
      target.damage(dmg);
    },
    onUse: (user: Player, board: Board) => {
      const grids = GridUtil.rayToGrids(
        user.x,
        user.y,
        user.d.next.x,
        user.d.next.y
      );

      let current: { x: number; y: number } = { x: user.x, y: user.y };
      let target: Actor | undefined = undefined;

      for (const grid of grids) {
        current = { x: grid[0], y: grid[1] };
        target = board.findActor(current.x, current.y);
        const blocked = board.isBlock(current.x, current.y);
        if (target || blocked) {
          break;
        }
      }

      if (target) {
        const dmg = RandomUtil.getRandomIntInclusive(45, 60);
        target.damage(dmg);
      }
    },
  };

  const weed = {
    onHit: baseOnHit,
    onUse: () => {
      // 効果なし
      return;
    },
  };

  return {
    greenHerb,
    superHerb,
    lifeHerb,
    dragonHerb,
    weed,
    fortuneSeed,
    unfortuneSeed,
    poisonHerb,
    confusionHerb,
    sleepyHerb,
    antidoteHerb,
    sightHerb,
    stomachExpander,
    stomachShrinker,
  };
};

export const herbEffects = HerbEffects();
