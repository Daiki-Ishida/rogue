import { Board } from 'game/board';
import { Actor, Condition, Player } from 'game/models/actor';
import { TrapGenerator } from 'game/models/generator';
import { GridUtil, RandomUtil } from 'game/util';

interface IStaffEffects {
  [key: string]: (user: Player, board: Board) => void;
}

const ScrollEffects = (): IStaffEffects => {
  const blastwave = (user: Player, board: Board): void => {
    const range = effectRange(user, board);
    for (const r of range) {
      const target = board.findActor(r.x, r.y);
      if (target) {
        const dmg = RandomUtil.getRandomIntInclusive(25, 50);
        target.damage(dmg);
        console.log(`${target.status.name}に${dmg}ダメージを与えた！`);
      }
    }
  };

  const confusion = (user: Player, board: Board): void => {
    const range = effectRange(user, board);

    for (const r of range) {
      const target = board.findActor(r.x, r.y);
      if (target) {
        const condition = Condition.ofConfusion(20);
        target.conditions.push(condition);
      }
    }
  };

  const sealing = (user: Player, board: Board): void => {
    const range = effectRange(user, board);

    for (const r of range) {
      const target = board.findActor(r.x, r.y);
      if (target) {
        const condition = Condition.ofSealed(50);
        target.conditions.push(condition);
      }
    }
  };

  const slumber = (user: Player, board: Board): void => {
    const range = effectRange(user, board);

    for (const r of range) {
      const target = board.findActor(r.x, r.y);
      if (target) {
        const condition = Condition.ofAsleep(20);
        target.conditions.push(condition);
      }
    }
  };

  const trap = (user: Player, board: Board): void => {
    const n = RandomUtil.getRandomIntInclusive(7, 12);
    const traps = TrapGenerator.generate(n, board);
    for (const trap of traps) {
      board.traps.push(trap);
    }
    console.log('このフロアの罠が増えてしまったようだ・・・');
  };

  const fate = (user: Player): void => {
    user.status.sward?.levelUp();
  };

  const earth = (user: Player): void => {
    user.status.shield?.levelUp();
  };

  const exorcism = (user: Player): void => {
    user.status.sward?.uncurse();
    user.status.shield?.uncurse();
    user.status.bracelet?.uncurse();
  };

  const fixer = (user: Player, board: Board): void => {
    user.heal(999);

    const range = GridUtil.aroundGrids(user.x, user.y);
    for (const r of range) {
      const target = board.findActor(r[0], r[1]);
      if (target) {
        const condition = Condition.ofParalyzed(20);
        target.conditions.push(condition);
      }
    }
  };

  const navigation = (user: Player, board: Board): void => {
    console.log('todo');
  };

  const lost = (user: Player, board: Board): void => {
    console.log('todo');
  };

  const explosion = (user: Player, board: Board): void => {
    user.damage(user.status.hp - 1);
    const range = GridUtil.aroundGrids(user.x, user.y);
    for (const r of range) {
      const target = board.findActor(r[0], r[1]);
      target?.damage(999);
    }
  };

  const identify = (user: Player, board: Board): void => {
    console.log('todo');
  };

  return {
    BLASTWAVE_SCROLL: blastwave,
    CONFUSION_SCROLL: confusion,
    SEALING_SCROLL: sealing,
    SLUMBER_SCROLL: slumber,
    NAVIGATION_SCROLL: navigation,
    LOST_SCROLL: lost,
    TRAP_SCROLL: trap,
    FIXER_SCROLL: fixer,
    FATE_SCROLL: fate,
    EARTH_SCROLL: earth,
    EXORCISM_SCROLL: exorcism,
    EXPLOSION_SCROLL: explosion,
    IDENTIFY_SCROLL: identify,
  };
};

export const scrollEffects = ScrollEffects();

const effectRange = (
  user: Player,
  board: Board
): { x: number; y: number }[] => {
  const room = board.findRoom(user.x, user.y);
  const range: { x: number; y: number }[] = [];
  if (room) {
    for (let i = room.x; i < room.x + room.w; i++) {
      for (let j = room.y; j < room.y + room.h; j++) {
        range.push({ x: i, y: j });
      }
    }
  } else {
    const grids = GridUtil.aroundGrids(user.x, user.y);
    for (const grid of grids) {
      range.push({ x: grid[0], y: grid[1] });
    }
  }
  return range.filter((r) => r.x === user.x && r.y === user.y);
};
