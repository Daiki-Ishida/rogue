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

  sort(): void {
    this.items.sort((a, b) => {
      const equipped = (item: Item): boolean => {
        return item.isEquipment() && item.status.equiped;
      };

      const priority = (item: Item): number => {
        if (item.isEquipment()) {
          if (item.isSword()) return 1;
          if (item.isShield()) return 2;
          if (item.isBracelet()) return 3;
        }

        if (item.isUsable()) {
          if (item.isFood()) return 4;
          if (item.isHerb()) return 5;
          if (item.isStaff()) return 6;
          if (item.isScroll()) return 7;
        }

        if (item.isGold()) {
          return item.status.amount + 10;
        }

        return 999999;
      };

      if (equipped(a) !== equipped(b)) {
        return equipped(a) ? -1 : 1;
      }

      return priority(a) - priority(b);
    });
  }
}
