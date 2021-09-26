import { Board } from 'game/board';
import { Player, Actor } from 'game/models/actor';
import { ShieldStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Equipment } from './equipment';

export class Shield extends Equipment {
  constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: ShieldStatus,
    public effects: string[]
  ) {
    super(x, y, symbol, status);
  }

  get def(): number {
    return this.status.def + this.status.level;
  }

  levelUp(): void {
    this.status.level++;
  }

  levelDown(): void {
    this.status.level--;
  }

  unify(shield: Shield): void {
    // 識別
    this.identify();

    // レベル合成
    this.status.level += shield.status.level;

    // 特殊能力合成
    this.effects = this.effects.concat(shield.effects);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    throw new Error('Method not implemented.');
  }

  isShield(): this is Shield {
    return true;
  }
}
