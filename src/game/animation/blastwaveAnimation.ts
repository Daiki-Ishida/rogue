import p5, { Image } from 'p5';
import { imageStore } from 'game';
import { Animation } from '.';

const F = 15;

export class BlastwaveAnimation implements Animation {
  constructor(
    readonly img: Image[],
    public frame: number,
    public done: boolean,
    readonly callback: () => void
  ) {}

  static generate(callback: () => void): BlastwaveAnimation {
    const imgs = imageStore.effects.blastwave;
    return new BlastwaveAnimation(imgs, 0, false, callback);
  }

  exec(): void {
    this.frame++;
    if (this.frame > F) {
      this.callback();
      this.done = true;
    }
  }

  private get currentImg(): Image {
    return this.img[Math.floor(this.frame / 2)];
  }

  draw(p: p5): void {
    if (this.frame <= 0) return;
    p.push();
    p.imageMode('corner');
    p.image(this.currentImg, 0, 0, 1280, 720);
    p.pop();
  }
}
