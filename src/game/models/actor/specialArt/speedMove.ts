import { Actor } from '../actor';
import { Board } from 'game/board';
import { GridUtil } from 'game/util';
import { Player } from '..';

export interface SpecialArt {
  effect: (actor: Actor, board: Board) => void;
  inRange: (x: number, y: number, actor: Actor, board: Board) => boolean;
}

export const speedMoves = (level: number): SpecialArt => {
  /**
   * 背後に瞬間移動して攻撃
   */
  const behindAttack: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      const success = getPlayerBehind(actor, board);
      if (!success) return;

      actor.attack(board);
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      return isInRange(x, y, actor, board);
    },
  };

  const crossAttack: SpecialArt = {
    effect: (actor: Actor, board: Board) => {
      let success = getPlayerAround(actor, board);
      if (!success) return;

      const secondAttack = () => {
        success = getPlayerAround(actor, board);
        if (!success) return;
        actor.attack(board);
      };

      actor.attack(board, secondAttack);
    },
    inRange: (x: number, y: number, actor: Actor, board: Board): boolean => {
      return isInRange(x, y, actor, board);
    },
  };

  let effect: SpecialArt;
  switch (level) {
    case 1:
      effect = behindAttack;
      break;
    case 2:
      effect = behindAttack;
      break;
    case 3:
      effect = crossAttack;
      break;
    default:
      throw new Error(`Invalid Params: ${level}`);
  }
  return effect;
};

const getPlayerBehind = (actor: Actor, board: Board): boolean => {
  const around = GridUtil.aroundGrids(actor.x, actor.y);
  let target: Player | undefined = undefined;
  for (const grid of around) {
    const actor = board.findActor(grid[0], grid[1]);
    if (actor?.isPlayer()) {
      target = actor;
    }
  }
  if (target === undefined) return false;

  const behind = {
    x: target.x - target.d.next.x,
    y: target.y - target.d.next.y,
  };

  actor.setAt(behind.x, behind.y);
  actor.turnTo(target.d.key);

  return true;
};

// todo refactor
const getPlayerAround = (actor: Actor, board: Board): boolean => {
  const around = GridUtil.aroundGrids(actor.x, actor.y);
  let target: Player | undefined = undefined;
  for (const grid of around) {
    const actor = board.findActor(grid[0], grid[1]);
    if (actor?.isPlayer()) {
      target = actor;
    }
  }
  if (target === undefined) return false;

  const a = GridUtil.aroundGrids(target.x, target.y);
  const b = a.filter(
    (e, idx) => idx === 1 || idx === 3 || idx === 4 || idx === 6
  );
  const c: {
    p: { x: number; y: number };
    d: 'UP' | 'DOWN' | 'RIGHT' | 'LEFT';
  }[] = [];
  b.forEach((e, idx) => {
    const p = { x: e[0], y: e[1] };
    let d: 'UP' | 'DOWN' | 'RIGHT' | 'LEFT';
    switch (idx) {
      case 0:
        d = 'DOWN';
        break;
      case 1:
        d = 'RIGHT';
        break;
      case 2:
        d = 'LEFT';
        break;
      case 3:
        d = 'UP';
        break;
      default:
        throw new Error('some thing went wrong.');
    }
    c.push({ p: p, d: d });
  });

  let g = c.filter((e) => {
    if (board.isBlock(e.p.x, e.p.y)) return false;
    if (board.findActor(e.p.x, e.p.y)) return false;
    return true;
  });
  g = shuffle(g);
  const h = g[0];

  actor.setAt(h.p.x, h.p.y);
  actor.turnTo(h.d);

  return true;
};

const isInRange = (
  x: number,
  y: number,
  actor: Actor,
  board: Board
): boolean => {
  const around = GridUtil.aroundGrids(actor.x, actor.y);
  let result = false;
  for (const grid of around) {
    if (grid[0] === x && grid[1] === y) {
      result = true;
      break;
    }
  }
  if (!result) return false;

  const target = board.findActor(x, y);
  if (target === undefined) return false;

  const behind = {
    x: target.x - target.d.next.x,
    y: target.y - target.d.next.y,
  };

  if (board.isBlock(behind.x, behind.y)) return false;
  if (board.findActor(behind.x, behind.y)) return false;

  return true;
};

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
