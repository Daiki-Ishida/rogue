import { Board } from 'game/board';
import { Image } from 'p5';
import { TrapStatus, TrapSymbol } from '.';
import { Actor } from '../actor';

export class Trap {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly symbol: TrapSymbol,
    readonly status: TrapStatus,
    readonly effect: (actor: Actor, board: Board) => void
  ) {}

  static generate(img: Image, effect: (actor: Actor) => void): Trap {
    const symbol = TrapSymbol.init(img);
    const status = TrapStatus.init();

    return new Trap(0, 0, symbol, status, effect);
  }

  disclose(): void {
    this.status.hidden = false;
  }

  hide(): void {
    this.status.hidden = true;
  }

  activate(board: Board): void {
    this.disclose();

    const actor = board.findActor(this.x, this.y);
    if (actor === undefined) return;

    this.effect(actor, board);
  }
}
