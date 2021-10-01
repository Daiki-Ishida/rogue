import { Equipment } from './equipment';
import { SwordStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Board } from 'game/board';
import { Player, Actor } from 'game/models/actor';
import { imageStore } from 'game';

export class Sword extends Equipment {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: SwordStatus,
    public effects: string[]
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string, board: Board): Sword {
    const symbol = new ItemSymbol(imageStore.items.sward[id]);
    const status = SwordStatus.init(id);

    const sword = new Sword(0, 0, symbol, status, []);
    sword.spawn(board);
    return sword;
  }

  get atk(): number {
    return this.status.baseAtk + this.status.level;
  }

  levelUp(): void {
    this.status.level++;
  }

  levelDown(): void {
    this.status.level--;
  }

  unify(sward: Sword): void {
    // 識別
    this.identify();

    // レベル合成
    this.status.level += sward.status.level;

    // 特殊能力合成
    this.effects = this.effects.concat(sward.effects);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = this.atk;
    target.damage(dmg);
    console.log(`${target.status.name}に${dmg}ダメージを与えた。`);
  }

  isSword(): this is Sword {
    return true;
  }
}
