import p5, { Image } from 'p5';
import { Camera } from 'game/view';
import { DirectionKey } from '../direction';

export interface IActorSymbol {
  x: number;
  y: number;
  idx: number;
  chips: Image[];
  currentChip: Image;
  attackEffect: Image[];
  active: boolean;
  setAt(x: number, y: number): void;
  turnTo(direction: DirectionKey): void;
  pause(): void;
  resume(): void;
  draw(p: p5, camera: Camera): void;
}

export abstract class ActorSymbol implements IActorSymbol {
  constructor(
    public chips: Image[],
    public attackEffect: Image[],
    public idx: number,
    public x: number = 0,
    public y: number = 0,
    public active: boolean = true
  ) {}

  get currentChip(): Image {
    return this.chips[this.idx];
  }

  setAt(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  pause(): void {
    this.active = false;
  }

  resume(): void {
    this.active = true;
  }

  proc(p: p5): void {
    if (!this.active) return;

    this.initIdx();
    const n = Math.floor(p.frameCount / 7) % 3;
    this.idx += n;
  }

  initIdx(): void {
    switch (this.idx) {
      case 0:
      case 1:
      case 2:
        this.idx = 0;
        break;
      case 3:
      case 4:
      case 5:
        this.idx = 3;
        break;
      case 6:
      case 7:
      case 8:
        this.idx = 6;
        break;
      case 9:
      case 10:
      case 11:
        this.idx = 9;
        break;
      case 12:
      case 13:
      case 14:
        this.idx = 12;
        break;
    }
  }

  abstract turnTo(direction: DirectionKey): void;
  abstract draw(p: p5, camera: Camera): void;
}
