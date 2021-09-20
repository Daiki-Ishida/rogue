import { Player } from '../../actor';
import { Board } from '../../board';
import { Item } from '../iItem';
import { ItemStatus } from '../itemStatus';

export interface Equipment extends Item {
  status: EquipmentStatus;
  equip(): void;
  unequip(): boolean;
  curse(): void;
  uncurse(): void;
  isSward(): this is Sward;
  isShield(): this is Shield;
}

export interface Sward extends Equipment {
  status: SwardStatus;
  atk: number;
  effects: string[];
  unify(sward: Sward): void;
}

export interface Shield extends Equipment {
  status: ShieldStatus;
  def: number;
  effects: string[];
  unify(sward: Shield): void;
}

export interface Bracelet extends Equipment {
  effect(player: Player, board: Board): void;
}

export interface EquipmentStatus extends ItemStatus {
  fullIdentified: boolean;
  equiped: boolean;
  cursed: boolean;
  fullIdentify(): void;
}

export interface SwardStatus extends EquipmentStatus {
  baseAtk: number;
  level: number;
}

export interface ShieldStatus extends EquipmentStatus {
  def: number;
  level: number;
}
