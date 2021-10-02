import Eases from 'eases';
import p5 from 'p5';
import { Camera } from 'game/view';
import { Animation } from '.';

const F = 30;
const HEIGHT = 150;

export class BounceAnimation implements Animation {
  constructor(
    readonly value: string,
    private x: number,
    private y: number,
    public frame: number,
    public done: boolean
  ) {}

  static generate(value: string, x: number, y: number): BounceAnimation {
    return new BounceAnimation(value, x, y, 0, false);
  }

  exec(): void {
    const progress = this.frame / F;
    const easing =
      progress < 0.5
        ? Eases.expoOut(progress * 2)
        : Eases.bounceOut((progress - 0.5) * 2);

    const dy = HEIGHT * easing;
    this.y -= dy;
    this.frame++;

    if (this.frame > F) {
      this.done = true;
    }
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);

    p.textSize(50);
    p.fill('red');
    p.text(this.value, x, y);
  }
}
