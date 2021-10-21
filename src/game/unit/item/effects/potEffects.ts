import { ItemGenerator } from 'game/unit/generator';
import { Item, Shield, Staff, Sword } from '..';

export interface IPotEffect {
  onPut: (item: Item, contents: Item[]) => void;
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
      for (const content of contents) {
        if (assertSword(item) && assertSword(content)) {
          content.unify(item);
          break;
        }

        if (assertShield(item) && assertShield(content)) {
          content.unify(item);
          break;
        }

        if (assertStaff(item) && assertStaff(content)) {
          const durability = item.status.durability;
          content.addDurability(durability);
        }
        continue;
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
      // todo const converted = ItemGenerator.generate(1)
      contents.push(item);
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
