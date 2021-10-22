import { Player } from 'game/unit/actor';
import { Equipment } from 'game/unit/item';
import { Command } from '.';

/**
 * 装備コマンド
 */
export class EquipCommand implements Command {
  private constructor(
    readonly actor: Player,
    readonly item: Equipment,
    public done: boolean
  ) {}

  static of(player: Player, equipment: Equipment): EquipCommand {
    return new EquipCommand(player, equipment, false);
  }

  exec(): void {
    this.item.status.equiped
      ? this.actor.unequip(this.item)
      : this.actor.equip(this.item);
    this.done = true;
  }
}
