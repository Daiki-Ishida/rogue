import { RandomUtil } from 'game/util';
import { Condition } from '..';
import { Player } from '../player';

export interface Ability {
  exec: (player: Player) => void;
}

interface IAbilitys {
  [key: string]: Ability;
}

export const NpcAbility = (): IAbilitys => {
  // 僧侶
  const healer = {
    exec: (player: Player) => {
      player.heal(999);
      player.conditions.cureAll();
    },
  };

  // 鍛冶屋
  const blacksmith = {
    exec: (player: Player) => {
      player.status.sword?.levelUp();
      player.status.shield?.levelUp();
    },
  };

  // 巫女
  const priestess = {
    exec: (player: Player) => {
      const random = RandomUtil.getRandomIntInclusive(0, 4);
      let condition: Condition;

      switch (random) {
        case 0:
          condition = Condition.ofStrengthen(30);
          break;
        case 1:
          condition = Condition.ofProtection(30);
          break;
        case 2:
          condition = Condition.ofAutoIdentify(30);
          break;
        case 3:
          condition = Condition.ofTrapMaster(30);
          break;
        case 4:
          condition = Condition.ofConfusion(30);
          break;
        default:
          throw new Error('something went wrong...');
      }
      player.conditions.push(condition);
    },
  };

  // シェフ
  const chef = {
    exec: (player: Player) => {
      player.status.maxFullness += 20;
      player.removeHunger(999);
    },
  };

  return {
    HEALER: healer,
    BLACKSMITH: blacksmith,
    PRIESTESS: priestess,
    CHEF: chef,
  };
};
