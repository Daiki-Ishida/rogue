import { Image } from 'p5';
import { imageStore } from '../../..';

export class Condition {
  value: ConditionType;
  duration: number;
  count: number;
  icon?: Image;

  constructor(value: ConditionType, duration: number, icon?: Image) {
    this.value = value;
    this.duration = duration;
    this.icon = icon;
    this.count = 0;
  }

  static ofPoison(duration: number): Condition {
    return new Condition('POISONED', duration, imageStore.conditions.poisoned);
  }

  static ofPoisonFree(duration: number): Condition {
    return new Condition('POISON_FREE', duration);
  }

  static ofConfusion(duration: number): Condition {
    return new Condition('CONFUSED', duration, imageStore.conditions.confused);
  }

  static ofAntiConfusion(duration: number): Condition {
    return new Condition('ANTI_CONFUSION', duration);
  }

  static ofParalyzed(duration: number): Condition {
    return new Condition(
      'PARALYZED',
      duration,
      imageStore.conditions.paralyzed
    );
  }

  static ofSealed(duration: number): Condition {
    return new Condition('SEALED', duration, imageStore.conditions.sealed);
  }

  static ofAsleep(duration: number): Condition {
    return new Condition('ASLEEP', duration, imageStore.conditions.asleep);
  }

  static ofAutoIdentify(duration: number): Condition {
    return new Condition('AUTO_IDENTIFY', duration);
  }

  static ofTrapMaster(duration: number): Condition {
    return new Condition('TRAP_MASTER', duration);
  }

  static ofStrengthen(duration: number): Condition {
    return new Condition('STRENGTHEN', duration);
  }

  static ofProtection(duration: number): Condition {
    return new Condition('PROTECTION', duration);
  }

  static ofClearSighted(duration: number): Condition {
    return new Condition('CLEAR_SIGHTED', duration);
  }

  get isRecovered(): boolean {
    return this.duration < this.count;
  }

  recover(): void {
    this.count = this.duration;
  }

  // draw(x: number, y: number, p: p5, camera: Camera): void {
  //   if (this.icon === undefined) return;

  //   p.image(this.icon, x, y, camera.zoom * 0.5, camera.zoom * 0.5);
  // }
}

export type ConditionType =
  | 'DOUBLE_SPEED' // 倍速
  | 'SLOWED' // 鈍足
  | 'ASLEEP' // 眠り
  | 'LIGHT_SLEEP' // 浅い眠り
  | 'DEEP_SLEEP' // 爆睡
  | 'WIDE_AWAKE' // 不眠
  | 'SILENT_MOVEMENT' // 忍足
  | 'POISONED' // 毒
  | 'POISON_FREE' // 毒無効
  | 'NO_NATURAL_RECOVERY' // HP非回復状態
  | 'HIT_POINT_DRAIN' // HP減少状態
  | 'HUNGRY' // 空腹
  | 'EVER_FULL' // 腹減らず
  | 'SEALED' // 封印・口無し
  | 'HANDS_FULL' // 拾えず
  | 'AUTO_IDENTIFY' // 拾い識別
  | 'BLINDED' // 目潰し
  | 'CLEAR_SIGHTED' // よく見え
  | 'INVISIBLE' // 透明
  | 'CLERA_HEARING' // 地獄耳
  | 'POT' // ツボ
  | 'ONIGIRI' // おにぎり
  | 'SACRIFICE' // 身代わり
  | 'IMMOBILIZED' // 影縫い
  | 'HYPNOTIZED' // 催眠
  | 'PARALYZED' // 金縛り
  | 'CONFUSED' // 混乱
  | 'ANTI_CONFUSION' // 混乱無効
  | 'PUZZLED' // まどわし
  | 'KIGNY' // キグニ
  | 'AFRAID' // 怯え
  | 'ENHANCED' // パワーアップ
  | 'STRENGTHEN' // ちから増強
  | 'PROTECTION' // まもり増強
  | 'INVINCIBLE' // 無敵
  | 'TRAP_MASTER' // ワナ師
  | 'DAMAGE_SHARING'; // 痛み分け
