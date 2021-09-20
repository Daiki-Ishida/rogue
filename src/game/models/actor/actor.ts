import { ActorStatus } from './status';
import { ActorSymbol } from './symbol';

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
  updateVisibility(): void;
  move(): void;
  canMove(): boolean;
  turnTo(direction: DirectionKey): void;
  attack(): void;
  damage(value: number): void;
  heal(value: number): void;
  levelUp(): void;
  levelDown(): void;
  isPlayer(): this is Player;
  isEnemy(): this is Enemy;
  spawn(): void;
}

export abstract class Actor implements IActor {
  constructor(
    readonly symbol: ActorSymbol,
    readonly status: ActorStatus,
    public x: number = 0,
    public y: number = 0,
    readonly conditions: Conditions = Conditions.init(),
    readonly visibility: Visibility = new Visibility(
      new SingleRangeVisibility(0, 0)
    ),
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

  setAt(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.symbol.setAt(x, y);
  }

  spawn(): void {
    const { x, y } = board.getRandomEmpty();
    this.setAt(x, y);
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

  updateVisibility(): void {
    const underneath = this.underneath();

    // todo
    if (underneath instanceof BasicRoom) {
      const v = new RoomRangeVisibility(underneath);
      this.visibility.switchRange(v);
    } else {
      const v = new ActorRangeVisibility(this);
      this.visibility.switchRange(v);
    }
  }

  move(): void {
    if (!this.canMove()) {
      return;
    }

    const next = this.d.next;
    this.x += next.x;
    this.y += next.y;

    const animation = WalkAnimation.init(this);
    animationManager.push(animation);
  }

  canMove(): boolean {
    const board = game.board;
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

  attack(): void {
    const board = game.board;
    const target = board.findActor(this.nextX, this.nextY);
    const animation = AttackAnimation.generate(this);
    animationManager.push(animation);

    if (target) {
      const battle = new Battle(this, target);
      battle.exec();
    }
  }

  underneath(): Item | Trap | Room | Exit | undefined {
    const board = game.board;
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

  abstract isPlayer(): this is Player;
  abstract isEnemy(): this is Enemy;
  abstract levelUp(): void;
  abstract levelDown(): void;
}