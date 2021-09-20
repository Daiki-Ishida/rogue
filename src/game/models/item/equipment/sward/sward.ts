import { ItemSymbol } from '../../itemSymbol';
import { EquipmentBase } from '../equipment';
import { Shield, Sward, SwardStatus } from '../iEquipment';

export abstract class SwardBase extends EquipmentBase implements Sward {
  constructor(
    readonly symbol: ItemSymbol,
    readonly status: SwardStatus,
    public effects: string[],
    public x: number = 0,
    public y: number = 0
  ) {
    super(symbol, status);
  }

  get atk(): number {
    return this.status.baseAtk + this.status.level;
  }

  unify(sward: Sward): void {
    // 識別
    this.identify();

    // レベル合成
    this.status.level += sward.status.level;

    // 特殊能力合成
    this.effects = this.effects.concat(sward.effects);
  }

  isSward(): this is Sward {
    return false;
  }

  isShield(): this is Shield {
    return false;
  }
}
