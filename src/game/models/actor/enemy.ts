import { EnemyStatus, EnemySymbol } from '.';
import { Actor, ActorBase } from '..';
import { game, player } from '../../..';
import { enemyDataStore } from '../../../store';
import { basicStrategy, Strategy } from './strategy';

export interface Enemy extends Actor {
  targetX?: number;
  targetY?: number;
  strategy: Strategy;
  hasTarget: boolean;
  isInSightOfPlayer(): boolean;
  isAttackable(): boolean;
  act(): void;
  specialArts(): void;
  turnLeft(): void;
  turnRight(): void;
  turnAround(): void;
}

export abstract class EnemyBase extends ActorBase implements Enemy {
  constructor(
    public symbol: EnemySymbol,
    public status: EnemyStatus,
    public strategy: Strategy = basicStrategy,
    public targetX?: number,
    public targetY?: number
  ) {
    super(symbol, status);
  }

  get hasTarget(): boolean {
    return this.targetX !== undefined && this.targetY !== undefined;
  }

  abstract specialArts(): void;

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
    const p = player;

    return p.x >= v.x && p.x < v.x + v.w && p.y >= v.y && p.y < v.y + v.h;
  }

  isAttackable(): boolean {
    return this.nextX === player.x && this.nextY === player.y;
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
}
