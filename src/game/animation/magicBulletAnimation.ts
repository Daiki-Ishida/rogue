import p5, { Image } from 'p5';
import { Animation } from '.';
import { Camera } from '../view';
import { Actor } from 'game/models/actor';
import { imageStore } from 'game';

const SPEED = 1;

export class MagicBulletAnimation implements Animation {
  private constructor(
    readonly img: Image[],
    readonly actor: Actor,
    private current: { x: number; y: number },
    readonly to: { x: number; y: number },
    public frame: number,
    public done: boolean
  ) {}

  static generate(
    actor: Actor,
    to: { x: number; y: number }
  ): MagicBulletAnimation {
    const img = imageStore.effects.magicBall;
    const current = { x: actor.x, y: actor.y };
    return new MagicBulletAnimation(img, actor, current, to, 0, false);
  }

  private get currentImg(): Image {
    return this.img[Math.floor((this.frame / 3) % 3) + 3];
  }

  exec(): void {
    const next = this.actor.d.next;
    const factor = {
      dx: next.x * SPEED,
      dy: next.y * SPEED,
    };

    // this.current.x = Math.floor((this.current.x + factor.dx) * 100) / 100;
    // this.current.y = Math.floor((this.current.y + factor.dy) * 100) / 100;
    this.current.x += factor.dx;
    this.current.y += factor.dy;

    this.frame++;

    console.log('user');
    console.log(this.actor.x, this.actor.y);
    console.log('hit at');
    console.log(this.to.x, this.to.y);
    console.log('current');
    console.log(this.current.x, this.current.y);

    if (this.current.x === this.to.x && this.current.y === this.to.y) {
      this.done = true;
    }
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.current.x, this.current.y);
    p.image(
      this.currentImg,
      x,
      y,
      camera.zoom * 4, // 表示サイズ調整
      camera.zoom * 4 // 表示サイズ調整
    );
  }
}
