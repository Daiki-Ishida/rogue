import { Player } from 'game/models/actor';
import { Animation } from '.';
import { Camera } from '../view';

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
