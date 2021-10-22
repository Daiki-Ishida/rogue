import p5 from 'p5';
import { Animation } from '.';
import { Item } from 'game/unit/item';
import { Player } from 'game/unit/actor';
import { Camera } from 'game/drawer';

export class ThrownItemAnimation implements Animation {
  private constructor(
    readonly thrower: Player,
    readonly item: Item,
    readonly to: { x: number; y: number },
    readonly callback: () => void,
    public frame: number,
    public done: boolean
  ) {}

  static generate(
    thrower: Player,
    item: Item,
    to: { x: number; y: number },
    callback: () => void
  ): ThrownItemAnimation {
    return new ThrownItemAnimation(thrower, item, to, callback, 0, false);
  }

  exec(): void {
    const next = this.thrower.d.next;
    const from = { x: this.thrower.x, y: this.thrower.y };

    const x = Math.floor((from.x + next.x * this.frame) * 100) / 100;
    const y = Math.floor((from.y + next.y * this.frame) * 100) / 100;
    this.item.symbol.x = x;
    this.item.symbol.y = y;
    this.frame++;

    if (x === this.to.x && y === this.to.y) {
      this.callback();
      this.item.symbol.x = this.item.x;
      this.item.symbol.y = this.item.y;

      this.done = true;
    }
  }

  draw(p: p5, camera: Camera): void {
    this.item.symbol.draw(p, camera);
  }
}
