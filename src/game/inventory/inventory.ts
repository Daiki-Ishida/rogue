import { Item } from 'game/models/item';

export class Inventory {
  constructor(
    public items: Item[],
    public idx: number,
    public display: boolean
  ) {}

  static init(): Inventory {
    return new Inventory([], 0, false);
  }

  get selected(): Item {
    const item = this.items[this.idx];
    if (item === undefined) {
      throw new Error('Item Not Found.');
    }

    return item;
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  add(item: Item): void {
    this.items.push(item);
  }

  delete(): void {
    this.items.splice(this.idx, 1);
  }

  select(n: number): void {
    this.idx = n;
  }

  next(): void {
    if (this.isEmpty) {
      this.idx = 0;
      return;
    }

    this.idx >= this.items.length - 1 ? (this.idx = 0) : this.idx++;
  }

  prev(): void {
    if (this.isEmpty) {
      this.idx = 0;
      return;
    }

    this.idx <= 0 ? (this.idx = this.items.length - 1) : this.idx--;
  }

  // open(): void {
  //   this.display = true;
  // }

  // close(): void {
  //   this.display = false;
  // }

  refresh(): void {
    // todo
    // this.items = this.items.filter((item) => !item);
    console.log('todo');
  }

  // draw(p: p5): void {
  //   p.push();
  //   p.rectMode('corner');
  //   p.imageMode('corner');

  //   const x = 820;
  //   const y = 100;
  //   const w = 400;
  //   const h = 570;
  //   const l = 40;

  //   this.drawWindow(p, x, y, w, h);
  //   this.drawItems(p, x, y, l);
  //   p.pop();
  // }

  // drawWindow(p: p5, x: number, y: number, w: number, h: number): void {
  //   p.fill('rgba(61,61,61,0.7)');
  //   p.stroke('grey');
  //   p.strokeWeight(2);
  //   p.rect(x, y, w, h, 10);
  // }

  // drawItems(p: p5, x: number, y: number, l: number): void {
  //   p.fill('white');
  //   p.noStroke();
  //   p.textSize(25);
  //   this.items.forEach((item, idx) => {
  //     // 選択マーカー描画
  //     if (item === this.selected) {
  //       p.triangle(
  //         x + 10,
  //         y + 20 + idx * 40,
  //         x + 10,
  //         y + 40 + idx * 40,
  //         x + 30,
  //         y + 30 + idx * 40
  //       );
  //     }

  //     // 装備マーカー描画
  //     if (item instanceof Equipment && item.equiped) {
  //       p.text(`E`, x + 40, y + 40 + idx * 40);
  //     }

  //     // アイテムアイコン描画
  //     p.image(item.img, x + 60, y + 10 + idx * l, l - 5, l - 5);

  //     // アイテム名称等描画
  //     if (!item.isIdentified()) {
  //       p.push();
  //       p.fill('yellow');
  //       p.text(`${item.displayName()}`, x + 110, y + l + idx * l);
  //       p.pop();
  //     } else {
  //       p.text(`${item.displayName()}`, x + 110, y + l + idx * l);
  //     }
  //   });
  // }
}
