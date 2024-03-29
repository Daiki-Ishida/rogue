import {
  animationManager,
  game,
  indicatorManager,
  playlogManager,
  soundManager,
  soundStore,
} from 'game';
import { AttackAnimation } from 'game/animation';
import { Battle } from 'game/battle';
import { Board } from 'game/board';
import { AttackCommand } from 'game/command';
import { playerDataStore } from 'game/store';
import { BounceIndicator } from 'game/view/indicator';
import { Equipment, Item, Usable } from '../item';
import { Actor } from './actor';
import { DirectionKey } from './direction';
import { PlayerStatus } from './status';
import { PlayerSymbol } from './symbol';

export class Player extends Actor {
  private constructor(
    readonly symbol: PlayerSymbol,
    public status: PlayerStatus
  ) {
    super(symbol, status);
  }

  static init(name: string): Player {
    const symbol = PlayerSymbol.init();
    const status = PlayerStatus.init(name);
    return new Player(symbol, status);
  }

  changeName(name: string): void {
    this.status.name = name;
  }

  autoHeal(): void {
    if (this.status.dmg === 0) return;
    if (this.status.fullness <= 0) return;

    this.status.dmg--;
  }

  addHunger(value: number): void {
    this.status.hunger += value;
    if (this.status.maxFullness < this.status.hunger) {
      this.status.hunger = this.status.maxFullness;
    }
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

    const sound = soundStore.levelUp;
    soundManager.register(sound);

    const indicator = BounceIndicator.ofLevelUp(this);
    indicatorManager.bounceIndicators.push(indicator);
  }

  levelDown(): void {
    this.status.levelDown();

    const sound = soundStore.levelDown;
    soundManager.register(sound);

    const indicator = BounceIndicator.ofLevelDown(this);
    indicatorManager.bounceIndicators.push(indicator);
  }

  private isLevelUp(): boolean {
    const level = playerDataStore.findLevelByExp(this.status.exp);
    return this.status.level < level;
  }

  private isLevelDown(): boolean {
    const level = playerDataStore.findLevelByExp(this.status.exp);
    return this.status.level > level;
  }

  // override
  attack(board: Board): void {
    const target = board.findActor(this.next.x, this.next.y);
    const callback = () => {
      this.status.sword?.effects.forEach((effect) => {
        effect.onAttack(this, board);
      });
    };
    const animation = AttackAnimation.generate(this, callback);
    animationManager.register(animation);

    let sound = soundStore.attack;

    if (target) {
      const battle = Battle.generate(this, target);
      battle.exec();
      if (battle.status === 'CRITICAL_HIT') {
        sound = soundStore.criticalHit;
      } else if (battle.status === 'MISSED') {
        sound = soundStore.missHit;
      }

      // todo refactor NPCの反撃
      if (target.isNpc() && battle.status !== 'MISSED') {
        let d: DirectionKey;
        switch (this.d.key) {
          case 'DOWN':
            d = 'UP';
            break;
          case 'UP':
            d = 'DOWN';
            break;
          case 'LEFT':
            d = 'RIGHT';
            break;
          case 'RIGHT':
            d = 'LEFT';
            break;
        }
        target.turnTo(d);
        game.commands.push(AttackCommand.of(target));
      }
    }

    soundManager.register(sound);
  }

  throw(item: Item, board: Board): void {
    if (item.isEquipment() && item.status.equiped) {
      this.unequip(item);
    }
    item.throw(this, board);
  }

  use(item: Usable, board: Board): void {
    item.use(this, board);
  }

  equip(equipment: Equipment): void {
    if (equipment.isSword()) {
      const unequiped = this.status.sword?.unequip();
      if (unequiped === false) return;

      equipment.equip();
      this.status.sword = equipment;
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
      this.status.sword = undefined;
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
    const sword = this.status.sword?.unequip();
    if (sword) {
      this.status.sword = undefined;
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
