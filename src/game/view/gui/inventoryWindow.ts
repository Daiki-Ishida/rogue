import p5 from 'p5';
import { Window } from '.';
import { Item } from '../game/item/iItem';
import { Inventory } from '../game/inventory';

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
    readonly inventory: Inventory
  ) {}

  static init(inventory: Inventory): InventoryWindow {
    return new InventoryWindow(X, Y, W, H, false, inventory);
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
  }

  prev(): void {
    this.inventory.prev();
  }

  draw(p: p5): void {
    if (!this.display) return;

    this.drawFrame(p);
    this.drawItems(p);
  }

  private drawFrame(p: p5): void {
    p.push();

    p.fill('rgba(61,61,61,0.7)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h, 10);

    p.pop();
  }

  private drawItems(p: p5): void {
    p.push();

    for (let i = 0; i < this.inventory.items.length; i++) {
      const item = this.inventory.items[i];

      if (this.inventory.idx === i) {
        this.drawSelectMarker(i, p);
      }

      if (item.isEquipment() && item.status.equiped) {
        this.drawEquipMarker(i, p);
      }

      // アイコン
      p.image(
        item.symbol.img,
        this.x + 60,
        this.y + 10 + i * LINE_HEIGHT,
        LINE_HEIGHT - 5,
        LINE_HEIGHT - 5
      );

      // 名前
      p.push();
      item.status.identified ? p.fill('yellow') : p.fill('white');
      p.text(
        `${item.status.displayName()}`,
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
}
