import { playlogManager } from 'game';
import { Board } from 'game/board';
import { playerDataStore } from 'game/store';
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
    this.status.exp += value;
    playlogManager.add(`${value}の経験値を獲得した`);

    if (this.isLevelUp()) {
      this.levelUp();
    }
  }

  loseExp(value: number): void {
    this.status.exp -= value;
    if (this.isLevelDown()) {
      this.levelDown();
    }
  }

  levelUp(): void {
    this.status.levelUp();
  }

  levelDown(): void {
    this.status.levelDown();
  }

  private isLevelUp(): boolean {
    const level = playerDataStore.findLevelByExp(this.status.exp);
    return this.status.level < level;
  }

  private isLevelDown(): boolean {
    const level = playerDataStore.findLevelByExp(this.status.exp);
    return this.status.level > level;
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

    if (equipment.isBracelet()) {
      const unequiped = this.status.bracelet?.unequip();
      if (unequiped === false) return;

      equipment.equip();
      this.status.bracelet = equipment;
    }

    playlogManager.add(`${equipment.status.displayName}を装備した。`);
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

    if (equipment.isBracelet()) {
      this.status.bracelet = undefined;
    }

    playlogManager.add(`${equipment.status.displayName}をはずした。`);
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
