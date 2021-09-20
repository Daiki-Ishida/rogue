import { Animation } from '.';
import { Camera } from '../drawer';
import { Player } from '../game/actor';

export class SpellAnimation implements Animation {
  constructor(
    readonly actor: Player,
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
