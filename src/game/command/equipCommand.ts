import { Player } from 'game/models/actor';
import { Equipment } from 'game/models/item';
import { Command } from '.';

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
    this.done = true;
  }
}
