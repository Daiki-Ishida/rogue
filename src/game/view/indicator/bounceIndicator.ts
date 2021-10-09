import Eases from 'eases';
import p5 from 'p5';
import { Camera } from 'game/view';
import { Actor } from 'game/unit/actor';

const F = 30;
const HEIGHT = 0.5;

export class BounceIndicator {
  private constructor(
    readonly value: string,
    private x: number,
    private y: number,
    private initY: number,
    private color: string,
    public frame: number,
    public done: boolean
  ) {}

  static ofDamage(_value: number, target: Actor): BounceIndicator {
    const value = `${_value}`;
    const x = target.x - 0.2;
    const y = target.y - 0.5;
    const color = '#FE8F8F';

    return new BounceIndicator(value, x, y, y, color, 0, false);
  }

  static ofHealing(_value: number, target: Actor): BounceIndicator {
    const value = `${_value}`;
    const x = target.x - 0.2;
    const y = target.y - 0.5;
    const color = '#08ffc8';

    return new BounceIndicator(value, x, y, y, color, 0, false);
  }

  static ofMissHit(target: Actor): BounceIndicator {
    const value = `MISS`;
    const x = target.x - 0.5;
    const y = target.y - 0.5;
    const color = '#F0A500';

    return new BounceIndicator(value, x, y, y, color, 0, false);
  }

  proc(): void {
    const progress = this.frame / F;
    const easing =
      progress < 0.5
        ? Eases.expoOut(progress)
        : 1 - Eases.bounceOut((progress - 0.5) * 2);

    const dy = HEIGHT * easing;
    this.y = this.initY - dy;
    this.frame++;

    if (this.frame > F) {
      this.done = true;
    }
  }

  draw(p: p5, camera: Camera): void {
    p.push();
    const { x, y } = camera.adjust(this.x, this.y);

    p.textSize(28);
    p.stroke('#334756');
    p.strokeWeight(3);
    p.fill(this.color);
    p.text(this.value, x, y);
    p.pop();
  }
}
