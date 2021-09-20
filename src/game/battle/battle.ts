import { RandomUtil } from '../../util';
import { Actor, Player } from '../actor';

export class Battle {
  constructor(readonly attacker: Actor, readonly defender: Actor) {}

  /**
   * ダメージ計算
   */
  get damage(): number {
    const atkValue = this.attacker.status.atk;
    const defValue = this.defender.status.def;
    return Math.floor(atkValue * (15 / 16) ** defValue);
  }

  /**
   * 当たり判定
   * 1 / 7
   */
  get isHit(): boolean {
    return RandomUtil.getRandomIntInclusive(0, 6) !== 0;
  }

  /**
   * 戦闘処理
   */
  exec(): void {
    // 攻撃失敗
    if (!this.isHit) {
      console.log(this.messageOnMissed());
    }

    // ダメージ処理
    const dmg = this.damage;
    this.defender.damage(dmg);
    console.log(this.messageOnHit(dmg));
    if (!this.defender.isDead) return;

    // 経験値獲得
    if (this.attacker instanceof Player) {
      const exp = this.defender.status.exp;
      this.attacker.gainExp(exp);

      console.log(this.messageOnDefeated());
      const message = `${exp}の経験値を獲得した`;
      console.log(message);
    }
  }

  private messageOnHit(dmg: number): string {
    let message: string;
    if (this.attacker instanceof Player) {
      message = `${this.defender.status.name}に${dmg}ダメージを与えた`;
    } else {
      message = `${this.attacker.status.name}から${dmg}ダメージを受けた`;
    }
    return message;
  }

  private messageOnMissed(): string {
    return `${this.attacker.status.name}の攻撃は外れた！`;
  }

  private messageOnDefeated(): string {
    let message: string;
    if (this.attacker instanceof Player) {
      message = `${this.defender.status.name}をやっつけた！`;
    } else {
      message = `${this.attacker.status.name}に倒された・・・`;
    }
    return message;
  }
}
