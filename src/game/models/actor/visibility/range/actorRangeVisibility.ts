import { VisibilityRange } from '.';
import { Actor } from '../..';

// 視界半径
const R = 1;

export class ActorRangeVisibility implements VisibilityRange {
  constructor(readonly actor: Actor) {}

  get x(): number {
    return this.actor.symbol.x - R;
  }
  get y(): number {
    return this.actor.symbol.y - R;
  }
  get w(): number {
    return R * 2 + 1;
  }
  get h(): number {
    return R * 2 + 1;
  }
}
