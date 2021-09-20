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

  throw(item: Item): void {
    item.throw(this, board);
  }

  use(item: Usable): void {
    item.use(this, board);
  }

  equip(equipment: Equipment): void {
    if (equipment.isSward()) {
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

    if (equipment.isSward()) {
      this.status.sward = undefined;
    }

    if (equipment.isShield()) {
      this.status.shield = undefined;
    }
  }
}
