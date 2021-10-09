import { playlogManager } from 'game';
import { Bracelet, Shield, Sword } from 'game/models/item';
import { playerDataStore } from 'game/store';
import { RandomUtil } from 'game/util';
import { ActorStatus } from '.';

export class PlayerStatus extends ActorStatus {
  private constructor(
    public name: string,
    public maxHp: number,
    public str: number,
    public vit: number,
    public level: number,
    public maxFullness: number,
    public exp: number = 0,
    public dmg: number = 0,
    public hunger: number = 0,
    public sword?: Sword,
    public shield?: Shield,
    public bracelet?: Bracelet
  ) {
    super(name, maxHp, dmg, str, vit, level, exp);
  }

  static init(name: string): PlayerStatus {
    const initialStatus = {
      level: 1,
      fullness: 100,
      hp: 999,
      str: 5,
      vit: 0,
    };

    return new PlayerStatus(
      name,
      initialStatus.hp,
      initialStatus.str,
      initialStatus.vit,
      initialStatus.level,
      initialStatus.fullness
    );
  }

  get atk(): number {
    const sword = this.sword === undefined ? 0 : this.sword.atk;
    return this.str + sword;
  }

  get def(): number {
    const shield = this.shield === undefined ? 0 : this.shield.def;
    return this.vit + shield;
  }

  get fullness(): number {
    return this.maxFullness - this.hunger;
  }

  levelUp(): void {
    this.level++;

    // 強制レベル変更のための調整
    const minExp = playerDataStore.findExpByLebel(this.level);
    if (this.exp < minExp) {
      this.exp = minExp;
    }

    // 最大HP上昇
    const addHp =
      RandomUtil.getRandomIntInclusive(1, 3) +
      RandomUtil.getRandomIntInclusive(1, 3);
    this.maxHp += addHp;

    // ちから上昇
    const addStr =
      RandomUtil.getRandomIntInclusive(0, 1) +
      RandomUtil.getRandomIntInclusive(0, 1) +
      RandomUtil.getRandomIntInclusive(1, 2);
    this.str += addStr;

    playlogManager.add(`Lv. ${this.level}にあがった！`);
    playlogManager.add(`最大HPが${addHp}上昇した！`);
    playlogManager.add(`ちからが${addStr}上昇した！`);
  }

  levelDown(): void {
    this.level--;
    // 強制レベル変更のための調整
    const minExp = playerDataStore.findExpByLebel(this.level);
    if (this.exp < minExp) {
      this.exp = minExp;
    }

    // 最大HP減少
    const reduceHp =
      RandomUtil.getRandomIntInclusive(1, 3) +
      RandomUtil.getRandomIntInclusive(1, 3);
    this.maxHp -= reduceHp;

    // ちから減少
    const reduceStr =
      RandomUtil.getRandomIntInclusive(0, 1) +
      RandomUtil.getRandomIntInclusive(0, 1) +
      RandomUtil.getRandomIntInclusive(1, 2);
    this.str -= reduceStr;

    playlogManager.add(`なんとLv. ${this.level}に下がってしまった・・・`);
    playlogManager.add(`最大HPが${reduceHp}減少した`);
    playlogManager.add(`ちからが${reduceStr}減少した`);
  }
}
