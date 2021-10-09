import p5, { Image } from 'p5';
import { Camera } from 'game/view';
import { Animation } from '.';
import { imageStore, soundManager, soundStore } from 'game';

const F = 15;

export class HealingAnimation implements Animation {
  constructor(
    readonly img: Image[],
    private x: number,
    private y: number,
    public frame: number,
    readonly callback: () => void,
    public done: boolean
  ) {}

  static generate(
    x: number,
    y: number,
    callback: () => void
  ): HealingAnimation {
    const sound = soundStore.healing;
    soundManager.register(sound);

    const imgs = imageStore.effects.healing;
    return new HealingAnimation(imgs, x, y, 0, callback, false);
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
