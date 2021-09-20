import { TrapStatus, TrapStatusBase, TrapSymbol } from '.';
import { Actor } from '../actor';
import { Board } from '../board';

export interface Trap {
  x: number;
  y: number;
  symbol: TrapSymbol;
  status: TrapStatus;
  disclose(): void;
  hide(): void;
  activate(board: Board): void;
}

export abstract class TrapBase implements Trap {
  constructor(
    public symbol: TrapSymbol,
    public status: TrapStatus = new TrapStatusBase(),
    readonly x: number = 0,
    readonly y: number = 0
  ) {}

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

  abstract effect(actor: Actor, board: Board): void;
}
