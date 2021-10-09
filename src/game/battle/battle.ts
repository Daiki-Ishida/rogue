import { indicatorManager, playlogManager } from 'game';
import { Actor } from 'game/unit/actor';
import { RandomUtil } from 'game/util';
import { BounceIndicator } from 'game/view/indicator';

export class Battle {
  constructor(readonly attacker: Actor, readonly defender: Actor) {}

  /**
   * ダメージ計算
   */
  get damage(): number {
    let atkValue = this.attacker.status.atk;
    let defValue = this.defender.status.def;

    if (this.attacker.isCondition('STRENGTHEN')) {
      atkValue *= 1.5;
    }
    if (this.defender.isCondition('PROTECTION')) {
      defValue *= 1.5;
    }

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
      const missed = BounceIndicator.ofMissHit(this.defender);
      indicatorManager.bounceIndicators.push(missed);
      return;
    }

    // ダメージ処理
    const dmg = this.damage;
    this.defender.damage(dmg);
    if (!this.defender.isDead) return;

    // 経験値獲得
    if (this.attacker.isPlayer()) {
      const exp = this.defender.status.exp;
      this.attacker.gainExp(exp);

      playlogManager.add(this.messageOnDefeated());
    }
  }

  private messageOnDefeated(): string {
    let message: string;
    if (this.attacker.isPlayer()) {
      message = `${this.defender.status.name}をやっつけた！`;
    } else {
      message = `${this.attacker.status.name}に倒された・・・`;
    }
    return message;
  }
}
