import {
  animationManager,
  imageStore,
  playlogManager,
  soundManager,
  soundStore,
} from 'game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/unit/actor';
import { RandomUtil } from 'game/util';
import { ScrollStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { scrollEffects } from '../effects';
import { Usable } from './usable';
import { SpellAnimation } from 'game/animation';

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

  static generate(id: string): Scroll {
    const symbol = new ItemSymbol(imageStore.items.scroll);
    const status = ScrollStatus.init(id);
    const effect = scrollEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    return new Scroll(0, 0, symbol, status, effect);
  }

  use(user: Player, board: Board): void {
    this.identify();

    const animation = SpellAnimation.generate(user, () => {
      this.effect(user, board);
    });
    animationManager.register(animation);

    this.status.used = true;

    playlogManager.add(`${this.status.displayName}を読んだ`);

    soundManager.register(soundStore.magic);
  }

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }

  isScroll(): this is Scroll {
    return true;
  }
}
