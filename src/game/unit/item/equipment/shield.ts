import { imageStore } from 'game';
import { Board } from 'game/board';
import { Player, Actor } from 'game/unit/actor';
import { ShieldStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { Equipment } from './equipment';

export class Shield extends Equipment {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: ShieldStatus,
    public effects: string[]
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string, board: Board): Shield {
    const symbol = new ItemSymbol(imageStore.items.shield[id]);
    const status = ShieldStatus.init(id);

    const sword = new Shield(0, 0, symbol, status, []);
    sword.spawn(board);
    return sword;
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
    // this.effects = this.effects.concat(shield.effects);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = Math.floor(this.def / 2);
    target.damage(dmg);
    console.log(`${target.status.name}に${dmg}ダメージを与えた。`);
  }

  isShield(): this is Shield {
    return true;
  }
}
