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
  get hitStatus(): 'HIT' | 'CRITICAL_HIT' | 'MISSED' {
    if (RandomUtil.getRandomIntInclusive(0, 6) === 0) return 'MISSED';

    if (this.attacker.isPlayer()) {
      if (RandomUtil.getRandomIntInclusive(0, 9) === 0) {
        return 'CRITICAL_HIT';
      }
    }

    return 'HIT';
  }

  /**
   * 戦闘処理
   */
  exec(): 'HIT' | 'CRITICAL_HIT' | 'MISSED' {
    const status = this.hitStatus;
    switch (status) {
      case 'MISSED': {
        const missed = BounceIndicator.ofMissHit(this.defender);
        indicatorManager.bounceIndicators.push(missed);
        break;
      }
      case 'HIT': {
        const dmg = this.damage;
        this.defender.damage(dmg);
        break;
      }
      case 'CRITICAL_HIT': {
        const dmg = Math.floor(this.damage * 1.5);
        this.defender.damage(dmg);
        break;
      }
    }

    // 経験値獲得
    if (this.defender.isDead && this.attacker.isPlayer()) {
      const exp = this.defender.status.exp;
      this.attacker.gainExp(exp);
      playlogManager.add(this.messageOnDefeated());
    }

    return status;
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
