import { Board } from 'game/board';
import { Camera } from 'game/view';
import p5 from 'p5';
import { Actor } from '../actor';
import { trapEffects } from './trapEffects';
import { TrapStatus } from './trapStatus';
import { TrapSymbol } from './trapSymbol';

export class Trap {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: TrapSymbol,
    readonly status: TrapStatus,
    readonly effect: (actor: Actor, board: Board) => void
  ) {}

  static generate(id: string): Trap {
    const symbol = TrapSymbol.init(id);
    const status = TrapStatus.init();
    const effect = trapEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    return new Trap(0, 0, symbol, status, effect);
  }

  setAt(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.symbol.x = x;
    this.symbol.y = y;
  }

  spawn(board: Board): void {
    const { x, y } = board.getRandomEmpty();
    this.setAt(x, y);
    board.traps.push(this);
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
    board.clearTrap(this);
  }

  draw(p: p5, camera: Camera): void {
    if (this.status.hidden) return;
    this.symbol.draw(p, camera);
  }
}
