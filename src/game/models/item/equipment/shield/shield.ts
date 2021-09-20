import { EquipmentBase } from '../equipment';
import { ItemSymbol } from '../../itemSymbol';
import { Shield, ShieldStatus, Sward } from '../iEquipment';

export abstract class ShieldBase extends EquipmentBase implements Shield {
  constructor(
    readonly symbol: ItemSymbol,
    readonly status: ShieldStatus,
    public effects: string[],
    public x: number = 0,
    public y: number = 0
  ) {
    super(symbol, status);
  }

  get def(): number {
    return this.status.def + this.status.level;
  }

  unify(shield: Shield): void {
    // 識別
    this.identify();

    // レベル合成
    this.status.level += shield.status.level;

    // 特殊能力合成
    this.effects = this.effects.concat(shield.effects);
  }

  isSward(): this is Sward {
    return false;
  }

  isShield(): this is Shield {
    return true;
  }
}
