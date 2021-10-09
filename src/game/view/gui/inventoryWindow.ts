import p5 from 'p5';
import { Inventory } from 'game/inventory';
import { Item } from 'game/models/item';
import { Window } from './window';
import { soundManager, soundStore } from 'game';

const X = 820;
const Y = 100;
const W = 400;
const H = 570;
const LINE_HEIGHT = 40;

export class InventoryWindow implements Window {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean,
    private page: 1 | 2,
    readonly inventory: Inventory
  ) {}

  static init(inventory: Inventory): InventoryWindow {
    return new InventoryWindow(X, Y, W, H, false, 1, inventory);
  }

  get selected(): Item {
    return this.inventory.selected;
  }

  open(): void {
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  next(): void {
    this.inventory.next();
    this.setSound();
  }

  prev(): void {
    this.inventory.prev();
    this.setSound();
  }

  nextPage(): void {
    this.page = 2;
    this.inventory.idx = 14;
    this.setSound();
  }

  prevPage(): void {
    this.page = 1;
    this.inventory.idx = 0;
    this.setSound();
  }

  sort(): void {
    this.inventory.sort();
    this.setSound();
  }

  private setSound(): void {
    const sound = soundStore.select;
    soundManager.register(sound);
  }

  draw(p: p5): void {
    if (!this.display) return;

    const list =
      this.page === 1
        ? this.inventory.items.slice(0, 13)
        : this.inventory.items.slice(14, 28);

    this.drawFrame(p);
    this.drawItems(p, list);
    this.drawPager(p);
  }

  private drawFrame(p: p5): void {
    p.push();

    p.fill('rgba(61,61,61,0.7)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h, 10);

    p.pop();
  }

  private drawItems(p: p5, items: Item[]): void {
    p.push();
    p.textSize(24);
    p.fill('white');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const idx = this.page === 1 ? i : i + 14;

      if (this.inventory.idx === idx) {
        this.drawSelectMarker(i, p);
      }

      if (item.isEquipment() && item.status.equiped) {
        this.drawEquipMarker(i, p);
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

  private drawEquipMarker(idx: number, p: p5): void {
    p.text(`E`, this.x + 40, this.y + 40 + idx * 40);
  }

  private drawPager(p: p5): void {
    p.push();
    p.textSize(18);
    p.fill('white');
    p.text(`${this.page} / 2`, 1180, 90);
    p.pop();
  }
}
