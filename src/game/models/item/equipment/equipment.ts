import { Bracelet, Shield, Sword } from '.';
import { Item } from '../item';
import { EquipmentStatus } from '../status';
import { ItemSymbol } from '../symbol';

export abstract class Equipment extends Item {
  constructor(
    public x: number,
    public y: number,
    public symbol: ItemSymbol,
    public status: EquipmentStatus
  ) {
    super(x, y, symbol, status);
  }

  identify(): void {
    this.status.identify();
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

  isEquipment(): this is Equipment {
    return true;
  }

  isSword(): this is Sword {
    return false;
  }

  isShield(): this is Shield {
    return false;
  }

  isBracelet(): this is Bracelet {
    return false;
  }
}
