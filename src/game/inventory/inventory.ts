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
}
