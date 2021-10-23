import p5 from 'p5';
import { Item } from 'game/unit/item';
import { WindowBase } from './window';
import { soundManager, soundStore } from 'game';
import { Storable } from 'game/unit/item/storable';

const X = 820;
const Y = 100;
const W = 400;
const H = 570;
const LINE_HEIGHT = 40;

export class PotContentsWindow extends WindowBase {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean,
    readonly storable: Storable
  ) {
    super(x, y, w, h, display);
  }

  static init(storable: Storable): PotContentsWindow {
    return new PotContentsWindow(X, Y, W, H, true, storable);
  }

  get selected(): Item {
    return this.storable.selected;
  }

  next(): void {
    this.storable.next();
    this.setSound();
  }

  prev(): void {
    this.storable.prev();
    this.setSound();
  }

  private setSound(): void {
    const sound = soundStore.select;
    soundManager.register(sound);
  }

  drawContent(p: p5): void {
    this.drawItems(p, this.storable.contents);
    this.drawPager(p);
  }

  private drawItems(p: p5, items: Item[]): void {
    p.push();
    p.textSize(24);
    p.fill('white');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (this.storable.idx === i) {
        this.drawSelectMarker(i, p);
      }

      // アイコン
      p.image(
        item.symbol.img,
        this.x + 80,
        this.y + 30 + i * LINE_HEIGHT,
        LINE_HEIGHT - 10,
        LINE_HEIGHT - 10
      );

      // 名前
      p.push();
      item.status.identified ? p.fill('yellow') : p.fill('white');
      p.text(
        `${item.status.displayName}`,
        this.x + 110,
        this.y + (i + 1) * LINE_HEIGHT
      );
      p.pop();
    }

    p.pop();
  }

  private drawSelectMarker(idx: number, p: p5): void {
    p.triangle(
      this.x + 10,
      this.y + 20 + idx * 40,
      this.x + 10,
      this.y + 40 + idx * 40,
      this.x + 30,
      this.y + 30 + idx * 40
    );
  }

  private drawPager(p: p5): void {
    p.push();
    p.textSize(18);
    p.fill('white');
    p.pop();
  }
}
