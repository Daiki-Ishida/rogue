import { Equipment } from './equipment';
import { SwordStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Player, Actor } from 'game/unit/actor';
import { imageStore } from 'game';
import { ISwordEffect, swordEffects } from '../effects';

export class Sword extends Equipment {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: SwordStatus,
    public effects: ISwordEffect[]
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string): Sword {
    const symbol = new ItemSymbol(imageStore.items.sword[id]);
    const status = SwordStatus.init(id);
    const effect = swordEffects[id];

    return new Sword(0, 0, symbol, status, [effect]);
  }

  get atk(): number {
    return this.status.baseAtk + this.status.level;
  }

  levelUp(): void {
    this.status.level++;
  }

  levelDown(): void {
    this.status.level--;
  }

  unify(sword: Sword): void {
    // 識別
    this.identify();

    // レベル合成
    this.status.level += sword.status.level;

    // 特殊能力合成
    this.effects = this.effects.concat(sword.effects);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = this.atk;
    target.damage(dmg);
    console.log(`${target.status.name}に${dmg}ダメージを与えた。`);
  }

  isSword(): this is Sword {
    return true;
  }
}
