import p5, { Image } from 'p5';
import { Animation } from '.';
import { Camera } from '../view';
import { Player } from 'game/unit/actor';
import { imageStore } from 'game';

export class SpellAnimation implements Animation {
  private constructor(
    readonly img: Image[],
    readonly actor: Player,
    readonly grid: { x: number; y: number },
    readonly callback: () => void,
    public frame: number,
    public done: boolean
  ) {}

  static generate(player: Player, callback: () => void): SpellAnimation {
    const img = imageStore.effects.spelling;
    const at = { x: player.x, y: player.y };
    return new SpellAnimation(img, player, at, callback, 0, false);
  }

  exec(): void {
    if (this.frame === 0) {
      this.actor.symbol.pause();
    }

    this.actor.symbol.idx = Math.floor(this.frame / 11);

    this.frame++;

    if (this.frame > 30) {
      this.actor.symbol.resume();
      this.callback();
      this.done = true;
    }
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.grid.x, this.grid.y);
    p.image(
      this.currentImg(),
      x,
      y,
      camera.zoom * 3.2, // 表示サイズ調整
      camera.zoom * 1.2 // 表示サイズ調整
    );
  }

  private currentImg(): Image {
    const i = Math.floor(this.frame / 6) > 5 ? 5 : Math.floor(this.frame / 6);
    return this.img[i];
  }
}
