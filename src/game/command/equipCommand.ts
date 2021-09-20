import { Command } from '.';
import { Player } from '../actor';
import { Equipment } from '../item/equipment/iEquipment';

export class EquipCommand implements Command {
  constructor(
    readonly actor: Player,
    readonly item: Equipment,
    public done: boolean = false
  ) {}

  exec(): void {
    this.item.status.equiped
      ? this.actor.unequip(this.item)
      : this.actor.equip(this.item);
  }
}
