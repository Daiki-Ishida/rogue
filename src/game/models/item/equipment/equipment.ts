import { ItemBase } from '../item';
import { ItemSymbol } from '../itemSymbol';
import { Equipment, EquipmentStatus, Shield, Sward } from './iEquipment';

export abstract class EquipmentBase extends ItemBase implements Equipment {
  constructor(
    public symbol: ItemSymbol,
    public status: EquipmentStatus,
    public x: number = 0,
    public y: number = 0
  ) {
    super(x, y, symbol, status);
  }
  abstract isSward(): this is Sward;
  abstract isShield(): this is Shield;

  identify(): void {
    this.status.fullIdentify();
  }

  equip(): void {
    this.identify();
    if (this.status.cursed) {
      console.log('なんと呪われていた！');
    }
    this.status.equiped = true;
  }

  unequip(): boolean {
    if (this.status.cursed) {
      console.log('呪われている！');
      return false;
    }

    this.status.equiped = false;
    return true;
  }

  curse(): void {
    this.status.cursed = true;
  }

  uncurse(): void {
    this.status.cursed = false;
  }
}
