import { Board } from 'game/board';
import { Actor, Condition, Player } from 'game/models/actor';
import { GridUtil, RandomUtil } from 'game/util';

interface IStaffEffects {
  [key: string]: (user: Player, target: Actor, board: Board) => void;
}

const StaffEffects = (): IStaffEffects => {
  const fortune = (user: Player, target: Actor): void => {
    target.levelUp();
  };

  const unfortune = (user: Player, target: Actor): void => {
    target.isPlayer() ? target.loseExp(500) : target.levelDown();
  };

  const lightning = (user: Player, target: Actor): void => {
    const dmg = 20;
    target.damage(dmg);
  };

  const mage = (user: Player, target: Actor): void => {
    const r = RandomUtil.getRandomIntInclusive(0, 2);

    let condition: Condition;
    switch (r) {
      case 0:
        condition = Condition.ofAsleep(10);
        break;
      case 1:
        condition = Condition.ofConfusion(10);
        break;
      case 2:
        condition = Condition.ofPoison(30);
        break;
      default:
        throw new Error('Something went wront...');
    }
    target.conditions.push(condition);
  };

  const ordinary = (): void => {
    return;
  };

  const paralysis = (user: Player, target: Actor): void => {
    const paralysis = Condition.ofParalyzed(50);
    target.conditions.push(paralysis);
  };

  const sealing = (user: Player, target: Actor): void => {
    const sealing = Condition.ofSealed(999);
    target.conditions.push(sealing);
  };

  const postpone = (user: Player, target: Actor, board: Board): void => {
    const exit = board.getExit();
    const xy = warpTo(exit.x, exit.y, board);

    if (xy === null) {
      alert('todo');
      return;
    }

    target.setAt(xy.x, xy.y);

    const condition = Condition.ofParalyzed(50);
    target.conditions.push(condition);
  };

  return {
    ORDINARY_STAFF: ordinary,
    LIGHTNING_STAFF: lightning,
    POSTPONE_STAFF: postpone,
    MAGE_STAFF: mage,
    PARALYSIS_STAFF: paralysis,
    SEALING_STAFF: sealing,
    FORTUNE_STAFF: fortune,
    UNFORTUNE_STAFF: unfortune,
  };
};

export const staffEffects = StaffEffects();

const warpTo = (
  x: number,
  y: number,
  board: Board
): { x: number; y: number } | null => {
  if (!board.isBlock(x, y) && !board.findActor(x, y)) {
    return { x: x, y: y };
  }

  const grids = GridUtil.aroundGrids(x, y);
  const droppable: boolean[] = [];
  for (const grid of grids) {
    const isBlocked = board.isBlock(grid[0], grid[1]);
    const isExist = board.findActor(grid[0], grid[1]);
    const isEmpty = !(isBlocked || isExist);
    droppable.push(isEmpty);
  }

  let idx: number | null = null;
  for (let i = 0; i < droppable.length; i++) {
    if (droppable) {
      idx = i;
      break;
    }
  }
  return idx === null ? null : { x: grids[idx][0], y: grids[idx][1] };
};