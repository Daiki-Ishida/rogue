import { Item } from '..';
import { StorableStatus } from '../status';
import { ItemSymbol } from '../symbol';

export abstract class Storable extends Item {
  constructor(
    public x: number,
    public y: number,
    readonly contents: Item[],
    public idx: number,
    readonly symbol: ItemSymbol,
    readonly status: StorableStatus
  ) {
    super(x, y, symbol, status);
  }

  get selected(): Item {
    return this.contents[this.idx];
  }

  get isEmpty(): boolean {
    return this.contents.length === 0;
  }

  next(): void {
    if (this.isEmpty) {
      this.idx = 0;
      return;
    }

    this.idx >= this.contents.length - 1 ? (this.idx = 0) : this.idx++;
  }

  prev(): void {
    if (this.isEmpty) {
      this.idx = 0;
      return;
    }

    this.idx <= 0 ? (this.idx = this.contents.length - 1) : this.idx--;
  }

  identify(): void {
    this.status.identify();
  }

  isStorable(): this is Storable {
    return true;
  }

  abstract put(item: Item): void;
  abstract withdraw(item: Item): void;
}
