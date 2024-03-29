import { playlogManager } from 'game';
import { Item } from 'game/unit/item';

const CAPACITY = 28;

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
    return this.items[this.idx];
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  add(item: Item): boolean {
    if (this.items.length >= CAPACITY) {
      playlogManager.add('持ち物がいっぱいだ！');
      return false;
    }

    this.items.push(item);
    return true;
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

  sort(): void {
    this.items.sort((a, b) => {
      const priority = (item: Item): number => {
        if (item.isEquipment()) {
          if (item.status.equiped) {
            if (item.isSword()) return 1;
            if (item.isShield()) return 2;
            if (item.isBracelet()) return 3;
          } else {
            if (item.isSword()) return 4;
            if (item.isShield()) return 5;
            if (item.isBracelet()) return 6;
          }
        }

        if (item.isUsable()) {
          if (item.isFood()) return 7;
          if (item.isHerb()) return 8;
          if (item.isStaff()) return 9;
          if (item.isScroll()) return 10;
        }

        if (item.isGold()) {
          return item.status.amount + 10;
        }

        return 999999;
      };

      if (priority(a) !== priority(b)) {
        return priority(a) - priority(b);
      }

      if (a.status.id !== b.status.id) {
        return a.status.id > b.status.id ? 1 : -1;
      }

      return 0;
    });
  }
}
