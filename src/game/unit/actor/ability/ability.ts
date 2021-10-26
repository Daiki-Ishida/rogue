import { RandomUtil } from 'game/util';
import { Condition } from '..';
import { Player } from '../player';

export interface Ability {
  exec: (player: Player) => void;
  dialogue: () => string;
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
    dialogue: () => {
      return '私は旅の僧侶です。1000ゴールドお布施を頂ければ\n回復呪文で疲れを癒して差し上げます。';
    },
  };

  // 鍛冶屋
  const blacksmith = {
    exec: (player: Player) => {
      player.status.sword?.levelUp();
      player.status.shield?.levelUp();
    },
    dialogue: () => {
      return '俺は旅の鍛冶屋だ。\n1000ゴールドで武具を鍛えてやるがどうする？';
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
    dialogue: () => {
      return 'おみくじ引いていきませんかー？（1000ゴールド）';
    },
  };

  // シェフ
  const chef = {
    exec: (player: Player) => {
      player.status.maxFullness += 20;
      player.removeHunger(999);
    },
    dialogue: () => {
      return 'おいしくなーれ 萌え萌えキュン！\n『みっくすじゅ～ちゅ(はーと)』1000ゴールド';
    },
  };

  return {
    HEALER: healer,
    BLACKSMITH: blacksmith,
    PRIESTESS: priestess,
    CHEF: chef,
  };
};
