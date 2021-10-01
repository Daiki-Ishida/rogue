import { Board } from 'game/board';
import { Equipment, Item, Usable } from '../item';
import { Actor } from './actor';
import { PlayerStatus } from './status';
import { PlayerSymbol } from './symbol';

export class Player extends Actor {
  constructor(readonly symbol: PlayerSymbol, readonly status: PlayerStatus) {
    super(symbol, status);
  }

  static init(name: string): Player {
    const symbol = PlayerSymbol.init();
    const status = PlayerStatus.init(name);
    return new Player(symbol, status);
  }

  addHunger(value: number): void {
    this.status.hunger += value;
  }

  removeHunger(value: number): void {
    this.status.hunger < value
      ? (this.status.hunger = 0)
      : (this.status.hunger -= value);
  }

  gainExp(value: number): void {
    // todo
    this.status.exp += value;
  }

  loseExp(value: number): void {
    // todo
    this.status.exp -= value;
  }

  levelUp(): void {
    // todo
    this.status.level++;
  }

  levelDown(): void {
    // todo
    this.status.level--;
  }

  throw(item: Item, board: Board): void {
    if (item.isEquipment()) {
      this.unequip(item);
    }
    item.throw(this, board);
  }

  use(item: Usable, board: Board): void {
    item.use(this, board);
  }

  equip(equipment: Equipment): void {
    if (equipment.isSword()) {
      const unequiped = this.status.sward?.unequip();
      if (unequiped === false) return;

      equipment.equip();
      this.status.sward = equipment;
    }

    if (equipment.isShield()) {
      const unequiped = this.status.shield?.unequip();
      if (unequiped === false) return;

      equipment.equip();
      this.status.shield = equipment;
    }
  }

  unequip(equipment: Equipment): void {
    const unequiped = equipment.unequip();
    if (unequiped === false) return;

    if (equipment.isSword()) {
      this.status.sward = undefined;
    }

    if (equipment.isShield()) {
      this.status.shield = undefined;
    }
  }

  unequipAll(): void {
    const sword = this.status.sward?.unequip();
    if (sword) {
      this.status.sward = undefined;
    }
    const shield = this.status.shield?.unequip();
    if (shield) {
      this.status.shield = undefined;
    }
    const bracelet = this.status.bracelet?.unequip();
    if (bracelet) {
      this.status.bracelet = undefined;
    }
  }

  isPlayer(): this is Player {
    return true;
  }
}
