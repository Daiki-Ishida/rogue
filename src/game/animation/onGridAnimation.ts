import p5, { Image } from 'p5';
import { Camera } from 'game/view';
import { Animation } from '.';
import { imageStore } from 'game';

const F = 15;

/**
 * 特定の１マスの上に描画されるエフェクト
 */
export class OnGridAnimation implements Animation {
  constructor(
    readonly img: Image[],
    private x: number,
    private y: number,
    public frame: number,
    readonly callback: () => void,
    public done: boolean
  ) {}

  // 炎
  static ofFire(x: number, y: number, callback: () => void): OnGridAnimation {
    const fire = imageStore.effects.fire;
    return new OnGridAnimation(fire, x, y, 0, callback, false);
  }

  // 氷
  static ofIce(x: number, y: number, callback: () => void): OnGridAnimation {
    const ice = imageStore.effects.ice;
    return new OnGridAnimation(ice, x, y, 0, callback, false);
  }

  // 雷
  static ofThunder(
    x: number,
    y: number,
    callback: () => void
  ): OnGridAnimation {
    const thunder = imageStore.effects.thunder;
    return new OnGridAnimation(thunder, x, y, 0, callback, false);
  }

  // 回復
  static ofHeal(x: number, y: number, callback: () => void): OnGridAnimation {
    const imgs = imageStore.effects.healing;
    return new OnGridAnimation(imgs, x, y, 0, callback, false);
  }

  // 落石
  static ofRockSlide(
    x: number,
    y: number,
    callback: () => void
  ): OnGridAnimation {
    const thunder = imageStore.effects.rockSlide;
    return new OnGridAnimation(thunder, x, y, 0, callback, false);
  }

  // 爆発
  static ofExplosion(
    x: number,
    y: number,
    callback: () => void
  ): OnGridAnimation {
    const thunder = imageStore.effects.explosion;
    return new OnGridAnimation(thunder, x, y, 0, callback, false);
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
