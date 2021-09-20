import { Animation } from '.';
import { Camera } from '../drawer';
import { Item } from '../game/item/iItem';

export class ThrownItemAnimation implements Animation {
  constructor(
    readonly item: Item,
    public frame: number,
    readonly done: boolean
  ) {}
  draw(p: import('p5'), camera: Camera): void {
    throw new Error('Method not implemented.');
  }

  exec(): void {
    return;
  }
}
