import { ItemSymbol, ItemStatus, Usable } from '.';
import { Player, Actor } from '../actor';
import { Board } from '../board';
import { Equipment } from './equipment/iEquipment';

export interface Item {
  x: number;
  y: number;
  symbol: ItemSymbol;
  status: ItemStatus;
  identify(): void;
  throw: (thrower: Player, board: Board) => void;
  onHit(user: Player, target: Actor, board: Board): void;
  onUnhit: (board: Board) => void;
  isUsable(): this is Usable;
  isEquipment(): this is Equipment;
  spawn(): void;
}
