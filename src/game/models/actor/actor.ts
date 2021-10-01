import { animationManager } from 'game';
import { AttackAnimation, WalkAnimation } from 'game/animation';
import { Battle } from 'game/battle';
import { Board } from 'game/board';
import { Exit } from 'game/dungeon/exit';
import { Room } from 'game/dungeon/room';
import { Item } from '../item';
import { Trap } from '../trap';
import { Conditions } from './condition';
import { Direction, DirectionKey } from './direction';
import { Enemy } from './enemy';
import { Player } from './player';
import { ActorStatus } from './status';
import { ActorSymbol } from './symbol';
import { Visibility } from './visibility';

interface IActor {
  x: number;
  y: number;
  next: { x: number; y: number };
  d: Direction;
  symbol: ActorSymbol;
  status: ActorStatus;
  visibility: Visibility;
  conditions: Conditions;
  isDead: boolean;
  setAt(x: number, y: number): void;
  underneath(board: Board): Item | Trap | Room | Exit | undefined;
  // updateVisibility(): void;
  move(board: Board): void;
  canMove(board: Board): boolean;
  turnTo(direction: DirectionKey): void;
  attack(board: Board): void;
  damage(value: number): void;
  heal(value: number): void;
  levelUp(): void;
  levelDown(): void;
  isPlayer(): this is Player;
  isEnemy(): this is Enemy;
  spawn(board: Board): void;
}

export abstract class Actor implements IActor {
  constructor(
    readonly symbol: ActorSymbol,
    readonly status: ActorStatus,
    public x: number = 0,
    public y: number = 0,
    readonly conditions: Conditions = Conditions.init(),
    readonly visibility: Visibility = Visibility.init(),
    readonly d: Direction = Direction.init()
  ) {}

  get next(): { x: number; y: number } {
    const x = this.x + this.d.next.x;
    const y = this.y + this.d.next.y;
    return { x: x, y: y };
  }

  get isDead(): boolean {
    return this.status.hp <= 0;
  }

  abstract levelUp(): void;
  abstract levelDown(): void;

  setAt(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.symbol.setAt(x, y);
  }

  spawn(board: Board): void {
    const { x, y } = board.getRandomEmpty();
    this.setAt(x, y);
    const room = board.findRoom(x, y);
    if (room) {
      this.visibility.setRoomRange(room);
    }
    board.actors.push(this);
  }

  damage(value: number): void {
    if (value < 0) return;
    this.status.dmg += value;
  }

  heal(value: number): void {
    this.status.dmg < value
      ? (this.status.dmg = 0)
      : (this.status.dmg -= value);
  }

  move(board: Board): void {
    if (!this.canMove(board)) {
      return;
    }

    const next = this.d.next;
    this.x += next.x;
    this.y += next.y;

    const animation = WalkAnimation.init(this);
    animationManager.push(animation);
  }

  canMove(board: Board): boolean {
    const { x, y } = this.next;
    const blocked = board.isBlock(x, y);
    if (blocked) return false;

    const actor = board.findActor(x, y);
    if (actor) return false;

    return true;
  }

  turnTo(direction: DirectionKey): void {
    this.d.set(direction);
    this.symbol.turnTo(direction);
  }

  attack(board: Board): void {
    const target = board.findActor(this.next.x, this.next.y);
    const animation = AttackAnimation.generate(this);
    animationManager.push(animation);

    if (target) {
      const battle = new Battle(this, target);
      battle.exec();
    }
  }

  underneath(board: Board): Item | Trap | Room | Exit | undefined {
    const exit = board.findExit(this.x, this.y);
    if (exit) {
      return exit;
    }

    const item = board.findItem(this.x, this.y);
    if (item) {
      return item;
    }

    const trap = board.findTrap(this.x, this.y);
    if (trap) {
      return trap;
    }

    const room = board.findRoom(this.x, this.y);
    if (room) {
      return room;
    }

    return undefined;
  }

  isPlayer(): this is Player {
    return false;
  }

  isEnemy(): this is Enemy {
    return false;
  }
}
