import { game } from 'game';
import { Board } from 'game/board';
import { enemyDataStore } from 'game/store';
import { Actor } from './actor';
import { SpecialArt, specialArts } from './specialArt';
import { EnemyStatus } from './status';
import { basicStrategy, Strategy } from './strategy';
import { EnemySymbol } from './symbol';

export interface IEnemy {
  targetX?: number;
  targetY?: number;
  strategy: Strategy;
  hasTarget: boolean;
  specialArt: SpecialArt;
  isInSightOfPlayer(): boolean;
  isAttackable(actor: Actor): boolean;
  act(): void;
  unleashArt(board: Board): void;
  turnLeft(): void;
  turnRight(): void;
  turnAround(): void;
}

export class Enemy extends Actor implements IEnemy {
  private constructor(
    public symbol: EnemySymbol,
    public status: EnemyStatus,
    readonly specialArt: SpecialArt,
    public strategy: Strategy,
    public targetX?: number,
    public targetY?: number
  ) {
    super(symbol, status);
  }

  static generate(id: string): Enemy {
    const symbol = EnemySymbol.init(id);
    const status = EnemyStatus.init(id);
    const arts = specialArts[id];

    return new Enemy(symbol, status, arts, basicStrategy);
  }

  get hasTarget(): boolean {
    return this.targetX !== undefined && this.targetY !== undefined;
  }

  act(): void {
    if (this.x === this.targetX && this.y === this.targetY) {
      this.targetX = undefined;
      this.targetY = undefined;
    }

    const target = this.strategy.target(this);
    this.targetX = target.x;
    this.targetY = target.y;

    const command = this.strategy.command(this);
    game.commands.push(command);
  }

  isInSightOfPlayer(): boolean {
    const v = this.visibility;
    const p = game.player;

    return p.x >= v.x && p.x < v.x + v.w && p.y >= v.y && p.y < v.y + v.h;
  }

  unleashArt(board: Board): void {
    this.specialArt.effect(this, board);
  }

  isAttackable(actor: Actor): boolean {
    return this.next.x === actor.x && this.next.y === actor.y;
  }

  // 左を向く
  turnLeft(): void {
    let d = this.d.key;
    switch (d) {
      case 'LEFT':
        d = 'DOWN';
        break;
      case 'UP':
        d = 'LEFT';
        break;
      case 'RIGHT':
        d = 'UP';
        break;
      case 'DOWN':
        d = 'RIGHT';
        break;
    }
    this.turnTo(d);
  }

  // 右を向く
  turnRight(): void {
    let d = this.d.key;
    switch (d) {
      case 'LEFT':
        d = 'UP';
        break;
      case 'UP':
        d = 'RIGHT';
        break;
      case 'RIGHT':
        d = 'DOWN';
        break;
      case 'DOWN':
        d = 'LEFT';
        break;
    }
    this.turnTo(d);
  }

  // 反対を向く
  turnAround(): void {
    this.turnRight();
    this.turnRight();
  }

  levelUp(): void {
    const data = enemyDataStore.findByLevelAndGroup(
      this.status.level + 1,
      this.status.group
    );

    if (data === undefined) return;

    const status = EnemyStatus.init(data.id);
    const symbol = EnemySymbol.init(data.id);

    symbol.x = this.symbol.x;
    symbol.y = this.symbol.y;

    this.status = status;
    this.symbol = symbol;
  }

  levelDown(): void {
    const data = enemyDataStore.findByLevelAndGroup(
      this.status.level - 1,
      this.status.group
    );

    if (data === undefined) return;

    const status = EnemyStatus.init(data.id);
    const symbol = EnemySymbol.init(data.id);

    symbol.x = this.symbol.x;
    symbol.y = this.symbol.y;

    this.status = status;
    this.symbol = symbol;
  }

  isEnemy(): this is Enemy {
    return true;
  }
}
