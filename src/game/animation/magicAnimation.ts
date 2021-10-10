import p5, { Image } from 'p5';
import { Camera } from 'game/view';
import { Animation } from '.';
import { imageStore } from 'game';

const F = 15;

export class MagicAnimation implements Animation {
  constructor(
    readonly img: Image[],
    private x: number,
    private y: number,
    public frame: number,
    readonly callback: () => void,
    public done: boolean
  ) {}

  static ofFire(x: number, y: number, callback: () => void): MagicAnimation {
    const fire = imageStore.effects.fire;
    return new MagicAnimation(fire, x, y, 0, callback, false);
  }

  static ofIce(x: number, y: number, callback: () => void): MagicAnimation {
    const ice = imageStore.effects.ice;
    return new MagicAnimation(ice, x, y, 0, callback, false);
  }

  static ofThunder(x: number, y: number, callback: () => void): MagicAnimation {
    const thunder = imageStore.effects.thunder;
    return new MagicAnimation(thunder, x, y, 0, callback, false);
  }

  static ofRockSlide(
    x: number,
    y: number,
    callback: () => void
  ): MagicAnimation {
    const thunder = imageStore.effects.rockSlide;
    return new MagicAnimation(thunder, x, y, 0, callback, false);
  }

  static ofExplosion(
    x: number,
    y: number,
    callback: () => void
  ): MagicAnimation {
    const thunder = imageStore.effects.explosion;
    return new MagicAnimation(thunder, x, y, 0, callback, false);
  }

  exec(): void {
    this.frame++;

    if (this.frame > F) {
      this.callback();
      this.done = true;
    }
  }

  private get currentImg(): Image {
    return this.img[Math.floor(this.frame / 3)];
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    p.image(
      this.currentImg,
      x,
      y - 20, // 描画位置調整
      camera.zoom * 2, // 表示サイズ調整
      camera.zoom * 2 // 表示サイズ調整
    );
  }
}
