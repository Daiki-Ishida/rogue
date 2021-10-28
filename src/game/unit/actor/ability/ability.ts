import { animationManager, playlogManager } from 'game';
import { OnGridAnimation } from 'game/animation';
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
      playlogManager.add('体力が全回復した！');
      playlogManager.add('状態異常が全て治った！');
    },
    dialogue: () => {
      return '私は旅の僧侶です。1000ゴールドお布施を頂ければ\n回復呪文で疲れを癒して差し上げます。';
    },
  };

  // 鍛冶屋
  const blacksmith = {
    exec: (player: Player) => {
      const sword = player.status.sword;
      if (sword) {
        sword.levelUp();
        playlogManager.add('武器のレベルが上がった！');
      }

      const shield = player.status.shield;
      if (shield) {
        shield.levelUp();
        playlogManager.add('盾のレベルが上がった！');
      }
    },
    dialogue: () => {
      return '俺は旅の鍛冶屋だ。\n1000ゴールドで武具を鍛えてやるがどうする？';
    },
  };

  // 巫女
  const priestess = {
    exec: (player: Player) => {
      const random = RandomUtil.getRandomIntInclusive(0, 4);
      let callback: () => void;

      switch (random) {
        case 0:
          callback = () => {
            player.levelUp();
            player.levelUp();
            player.levelUp();
            player.conditions.push(Condition.ofStrengthen(30));
            player.conditions.push(Condition.ofProtection(30));
            player.conditions.push(Condition.ofClearSighted(30));
            player.heal(999);
            player.removeHunger(999);
          };
          playlogManager.add('なんと・・・大吉だ！');
          playlogManager.add('全身からみるみる力が湧いてくる！');
          break;
        case 1:
          callback = () => {
            player.levelUp();
            player.conditions.push(Condition.ofStrengthen(20));
            player.conditions.push(Condition.ofProtection(20));
            player.heal(50);
            player.removeHunger(50);
            playlogManager.add('ラッキー、中吉だ！');
            playlogManager.add('全身から力が湧いてくる！');
          };
          break;
        case 2:
          callback = () => {
            player.conditions.push(Condition.ofStrengthen(20));
            player.conditions.push(Condition.ofProtection(20));
            player.heal(30);
            player.removeHunger(20);
          };
          playlogManager.add('吉だ');
          playlogManager.add('元気が出てきた気がする！');
          break;
        case 3:
          callback = () => {
            player.levelDown();
            player.conditions.push(Condition.ofConfusion(5));
            player.conditions.push(Condition.ofPoison(5));
            player.addHunger(10);
          };
          playlogManager.add('残念、凶だ！');
          playlogManager.add('少し元気がなくなった・・・');
          break;
        case 4:
          callback = () => {
            player.levelDown();
            player.levelDown();
            player.levelDown();
            player.conditions.push(Condition.ofConfusion(10));
            player.conditions.push(Condition.ofPoison(10));
            player.addHunger(20);
            player.status.maxFullness -= 20;
          };
          playlogManager.add('なんと・・・大凶だ！');
          playlogManager.add('全身からみるみる力が抜けていく・・・');
          break;
        default:
          throw new Error('something went wrong...');
      }

      const animation = OnGridAnimation.ofMagicCircle(
        player.x,
        player.y,
        callback
      );
      animationManager.register(animation);
    },
    dialogue: () => {
      return 'おみくじ引いていきませんかー？（1000ゴールド）';
    },
  };

  // シェフ
  const chef = {
    exec: (player: Player) => {
      const callback = () => {
        player.status.maxFullness += 20;
        player.removeHunger(999);
      };
      const animation = OnGridAnimation.ofHeart(player.x, player.y, callback);
      animationManager.register(animation);

      playlogManager.add('最大満腹度が20上がった！');
      playlogManager.add('空腹が全回復した！');
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
