import { game, playlogManager } from 'game';
import { Board } from 'game/board';
import { EnemyGenerator, ItemGenerator } from 'game/unit/generator';
import { GridUtil } from 'game/util';
import { Item, Shield, Staff, Sword } from '..';

export interface IPotEffect {
  onPut: (item: Item, contents: Item[], board: Board) => void;
  onAged: (items: Item[]) => void;
  withdrawable: boolean;
}

interface IPotEffects {
  [key: string]: IPotEffect;
}

const PotEffects = (): IPotEffects => {
  const storage = {
    onPut: (item: Item, contents: Item[]) => {
      contents.push(item);
    },
    onAged: () => {
      // 何も起こらない
      return;
    },
    withdrawable: true,
  };

  const identify = {
    onPut: (item: Item, contents: Item[]) => {
      item.identify();
      contents.push(item);
    },
    onAged: () => {
      // 何も起こらない
      return;
    },
    withdrawable: false,
  };

  const enhance = {
    onPut: (item: Item, contents: Item[]) => {
      contents.push(item);
    },
    onAged: (items: Item[]) => {
      for (const item of items) {
        if (assertSword(item) || assertShield(item)) {
          item.levelUp();
        }
        if (assertStaff(item)) {
          item.addDurability(1);
        }
      }
    },

    withdrawable: false,
  };

  const weakening = {
    onPut: (item: Item, contents: Item[]) => {
      contents.push(item);
    },
    onAged: (items: Item[]) => {
      for (const item of items) {
        if (assertSword(item) || assertShield(item)) {
          item.levelDown();
        }
        if (assertStaff(item)) {
          item.reduceDurability(1);
        }
      }
    },

    withdrawable: false,
  };

  const unify = {
    onPut: (item: Item, contents: Item[]) => {
      if (contents.length === 0) {
        contents.push(item);
        return;
      }

      let unified = false;
      for (const content of contents) {
        if (assertSword(item) && assertSword(content)) {
          content.unify(item);
          unified = true;
          break;
        }

        if (assertShield(item) && assertShield(content)) {
          content.unify(item);
          unified = true;
          break;
        }

        if (assertStaff(item) && assertStaff(content)) {
          const durability = item.status.durability;
          content.addDurability(durability);
          unified = true;
          break;
        }
        continue;
      }
      if (!unified) {
        contents.push(item);
      }
    },
    onAged: () => {
      // 何も起こらない
      return;
    },
    withdrawable: false,
  };

  const conversion = {
    onPut: (item: Item, contents: Item[]) => {
      const converted = ItemGenerator.generate(1)[0];
      contents.push(converted);
    },
    onAged: () => {
      // 何も起こらない
      return;
    },
    withdrawable: false,
  };

  const monsterSummon = {
    onPut: (item: Item, contents: Item[], board: Board) => {
      const grids = GridUtil.aroundGrids(game.player.x, game.player.y);
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

      playlogManager.add('魔物のるつぼだ！');
      playlogManager.add('たくさんの魔物が現れた！');
    },
    onAged: () => {
      // 何も起こらない
      return;
    },
    withdrawable: false,
  };

  return {
    STORAGE_POT: storage,
    IDENTIFY_POT: identify,
    CONVERSION_POT: conversion,
    ENHANCE_POT: enhance,
    WEAKENING_POT: weakening,
    MELDING_POT: unify,
    MONSTER_POT: monsterSummon,
  };
};

export const potEffects = PotEffects();

const assertSword = (item: Item): item is Sword => {
  if (!item.isEquipment()) return false;
  return item.isSword();
};

const assertShield = (item: Item): item is Shield => {
  if (!item.isEquipment()) return false;
  return item.isShield();
};

const assertStaff = (item: Item): item is Staff => {
  if (!item.isUsable()) return false;
  return item.isStaff();
};
