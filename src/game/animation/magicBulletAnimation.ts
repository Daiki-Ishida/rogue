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
    readonly callback: () => void,
    public frame: number,
    public done: boolean
  ) {}

  static generate(
    actor: Actor,
    to: { x: number; y: number },
    callback: () => void
  ): MagicBulletAnimation {
    const img = imageStore.effects.magicBall;
    const current = { x: actor.x, y: actor.y };
    return new MagicBulletAnimation(
      img,
      actor,
      current,
      to,
      callback,
      0,
      false
    );
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

    this.current.x += factor.dx;
    this.current.y += factor.dy;

    this.frame++;

    if (this.current.x === this.to.x && this.current.y === this.to.y) {
      this.callback();
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
