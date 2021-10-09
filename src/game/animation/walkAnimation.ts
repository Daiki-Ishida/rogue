import { Actor } from 'game/unit/actor';
import { Animation } from '.';

const F = 5;

export class WalkAnimation implements Animation {
  constructor(
    readonly actor: Actor,
    public frame: number,
    public done: boolean
  ) {}

  static init(actor: Actor): WalkAnimation {
    return new WalkAnimation(actor, 0, false);
  }

  exec(): void {
    const { x, y } = this.actor.d.next;

    const dx = x / F;
    const dy = y / F;

    const currentX = this.actor.symbol.x;
    const currentY = this.actor.symbol.y;

    const nextX = currentX + dx;
    const nextY = currentY + dy;

    this.actor.symbol.setAt(nextX, nextY);
    this.frame++;

    if (this.frame > F) {
      this.actor.symbol.x = this.actor.x;
      this.actor.symbol.y = this.actor.y;
      this.done = true;
    }
  }

  draw(): void {
    return;
  }
}
