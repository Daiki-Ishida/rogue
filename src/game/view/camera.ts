import { Actor } from '../game/actor';

export class Camera {
  constructor(public x: number, public y: number, readonly zoom: number) {}

  static init(zoom: number): Camera {
    return new Camera(0, 0, zoom);
  }

  track(actor: Actor): void {
    const dx = 1280 / this.zoom - 1;
    const dy = 720 / this.zoom - 1;

    this.x = actor.symbol.x - dx / 2;
    this.y = actor.symbol.y - dy / 2;
  }

  adjust(x: number, y: number): { x: number; y: number } {
    const cx = (x - this.x) * this.zoom;
    const cy = (y - this.y) * this.zoom;
    return {
      x: Math.floor(cx * 100) / 100,
      y: Math.floor(cy * 100) / 100,
    };
  }
}
