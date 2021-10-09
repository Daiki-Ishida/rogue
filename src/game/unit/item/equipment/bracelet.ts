import { imageStore } from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/unit/actor';
import { RandomUtil } from 'game/util';
import { Equipment } from '.';
import { BraceletStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { braceletEffects } from '../effects';

export class Bracelet extends Equipment {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: BraceletStatus,
    public effect: (player: Player, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string, board: Board): Bracelet {
    const symbol = new ItemSymbol(imageStore.items.bracelet);
    const status = BraceletStatus.init(id);
    const effect = braceletEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    const bracelet = new Bracelet(0, 0, symbol, status, effect);
    bracelet.spawn(board);
    return bracelet;
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }

  isBracelet(): this is Bracelet {
    return true;
  }
}
