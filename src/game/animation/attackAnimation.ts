import { Actor } from 'game/models/actor';
import p5 from 'p5';
import { Animation } from '.';
import { Camera } from '../view';

const F = 5;

export class AttackAnimation implements Animation {
  constructor(
    readonly actor: Actor,
    public frame: number,
    public done: boolean,
    readonly dx: number,
    readonly dy: number,
    readonly callback?: () => void
  ) {}

  static generate(actor: Actor, callback?: () => void): AttackAnimation {
    const next = actor.d.next;
    const dx = (next.x * 0.5) / 10;
    const dy = (next.y * 0.5) / 10;
    return new AttackAnimation(actor, 0, false, dx, dy, callback);
  }

  exec(): void {
    const symbol = this.actor.symbol;
    const next =
      this.frame < 3
        ? {
            x: symbol.x + this.dx,
            y: symbol.y + this.dy,
          }
        : {
            x: symbol.x - this.dx,
            y: symbol.y - this.dy,
          };

    symbol.setAt(next.x, next.y);

    this.frame++;
    if (this.frame > F) {
      this.actor.symbol.setAt(this.actor.x, this.actor.y);

      if (this.callback) this.callback();

      this.done = true;
    }
  }

  draw(p: p5, camera: Camera): void {
    // todo
    if (this.frame <= 0) return;

    const effect = this.actor.symbol.attackEffect;
    const { x, y } = camera.adjust(this.actor.next.x, this.actor.next.y);

    p.image(effect[this.frame - 1], x, y, camera.zoom * 1.5, camera.zoom * 1.5);
  }
}
