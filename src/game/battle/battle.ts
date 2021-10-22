import { indicatorManager, playlogManager } from 'game';
import { Actor } from 'game/unit/actor';
import { RandomUtil } from 'game/util';
import { BounceIndicator } from 'game/view/indicator';

type HitStatus = 'HIT' | 'CRITICAL_HIT' | 'MISSED';

/**
 * 戦闘のダメージ計算等を扱うクラス
 */
export class Battle {
  private constructor(
    readonly attacker: Actor,
    readonly defender: Actor,
    readonly status: HitStatus
  ) {}

  static generate(attacker: Actor, defender: Actor): Battle {
    let status: HitStatus;
    // 1/7でmiss
    if (RandomUtil.getRandomIntInclusive(0, 6) === 0) {
      status = 'MISSED';
    } else if (attacker.isPlayer()) {
      status =
        RandomUtil.getRandomIntInclusive(0, 9) === 0 ? 'CRITICAL_HIT' : 'HIT';
    } else {
      status = 'HIT';
    }

    return new Battle(attacker, defender, status);
  }

  /**
   * 戦闘処理
   */
  exec(): void {
    const attacker = this.attacker;
    const defender = this.defender;

    const status = this.status;
    if (status === 'MISSED') {
      const missed = BounceIndicator.ofMissHit(defender);
      indicatorManager.bounceIndicators.push(missed);
      return;
    }

    // ダメージ処理
    const dmg = this.calcDamage(status);
    defender.damage(dmg);
    this.onDamage(dmg);

    // 経験値獲得
    if (defender.isDead && attacker.isPlayer()) {
      attacker.gainExp(defender.status.exp);
      playlogManager.add(this.messageOnDefeated());
    }
  }

  /**
   * ダメージ計算
   */
  private calcDamage(hit: HitStatus): number {
    let atkValue = this.attacker.status.atk;
    let defValue = this.defender.status.def;

    if (this.attacker.isCondition('STRENGTHEN')) {
      atkValue *= 1.5;
    }
    if (this.defender.isCondition('PROTECTION')) {
      defValue *= 1.5;
    }

    const src = atkValue * (15 / 16) ** defValue;
    const dmg = hit === 'CRITICAL_HIT' ? src * 1.5 : src;

    return Math.floor(dmg);
  }

  private onDamage(dmg: number): void {
    const attacker = this.attacker;
    const defender = this.defender;

    if (attacker.isPlayer()) {
      attacker.status.sword?.effects.forEach((effect) => {
        effect.onDamage(attacker, defender, dmg);
      });
    }

    if (defender.isCondition('ASLEEP')) {
      const r = RandomUtil.getRandomIntInclusive(0, 1);
      if (r === 0) {
        defender.conditions.recover('ASLEEP');
      }
    }
  }

  private messageOnDefeated(): string {
    return this.attacker.isPlayer()
      ? `${this.defender.status.name}をやっつけた！`
      : `${this.attacker.status.name}に倒された・・・`;
  }
}
