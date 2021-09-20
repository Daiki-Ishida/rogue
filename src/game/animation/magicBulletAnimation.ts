import { Animation } from '.';
import { Camera } from '../drawer';

export class MagicBulletAnimation implements Animation {
  constructor(public frame: number, readonly done: boolean) {}
  draw(p: import('p5'), camera: Camera): void {
    throw new Error('Method not implemented.');
  }

  exec(): void {
    return;
  }
}
