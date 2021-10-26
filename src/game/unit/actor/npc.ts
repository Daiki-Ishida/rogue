import { Game } from 'game/game';
import { Player } from '.';
import { Ability, NpcAbility } from './ability';
import { Actor } from './actor';
import { NpcStatus } from './status';
import { Strategy } from './strategy';
import { npcWalkingAroundStrategy } from './strategy/npcStrategy';
import { NpcSymbol } from './symbol';

/**
 * NPCクラス
 */
export class Npc extends Actor {
  private constructor(
    readonly symbol: NpcSymbol,
    readonly status: NpcStatus,
    readonly ability: Ability,
    public strategy: Strategy,
    public targetX?: number,
    public targetY?: number
  ) {
    super(symbol, status);
  }

  static generate(id: string): Npc {
    const symbol = NpcSymbol.init(id);
    const status = NpcStatus.init(id);
    const ability = NpcAbility()[id];

    return new Npc(symbol, status, ability, npcWalkingAroundStrategy);
  }

  get hasTarget(): boolean {
    return this.targetX !== undefined && this.targetY !== undefined;
  }

  act(game: Game): void {
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

  // 能力発動
  activateAbility(player: Player): void {
    this.ability.exec(player);
    this.status.state = 'INACTIVE';
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

  // NPCはレベル変動なし
  levelUp(): void {
    return;
  }

  // NPCはレベル変動なし
  levelDown(): void {
    return;
  }

  isNpc(): this is Npc {
    return true;
  }
}
