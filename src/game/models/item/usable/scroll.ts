import { imageStore } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
import { RandomUtil } from 'game/util';
import { ScrollStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { scrollEffects } from '../effects';
import { Usable } from './usable';

export class Scroll extends Usable {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: ScrollStatus,
    readonly effect: (user: Player, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string, board: Board): Scroll {
    const symbol = new ItemSymbol(imageStore.items.scroll);
    const status = ScrollStatus.init(id);
    const effect = scrollEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    const scroll = new Scroll(0, 0, symbol, status, effect);
    scroll.spawn(board);
    return scroll;
  }

  use(user: Player, board: Board): void {
    this.identify();
    this.effect(user, board);
    this.status.used = true;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }
}