import { Board } from 'game/board';
import { Room } from 'game/dungeon/room';
import { ItemSymbol } from 'game/models/item/symbol';
import { TrapSymbol } from 'game/models/trap';
import { Actor } from '../actor';
import { ActorSymbol } from '../symbol';
import {
  ActorRangeVisibility,
  FullRangeVisibility,
  RoomRangeVisibility,
  SingleRangeVisibility,
  VisibilityRange,
} from './range';

interface Symbols {
  traps: TrapSymbol[];
  items: ItemSymbol[];
  actors: ActorSymbol[];
}

export class Visibility {
  constructor(public range: VisibilityRange) {}

  static init(): Visibility {
    const range = new SingleRangeVisibility(0, 0);
    return new Visibility(range);
  }

  setRoomRange(room: Room): void {
    this.range = new RoomRangeVisibility(room);
  }

  setActorRange(actor: Actor): void {
    this.range = new ActorRangeVisibility(actor);
  }

  setFullRange(): void {
    this.range = new FullRangeVisibility();
  }

  get x(): number {
    return this.range.x;
  }

  get y(): number {
    return this.range.y;
  }

  get w(): number {
    return this.range.w;
  }

  get h(): number {
    return this.range.h;
  }

  listSymbolsInRange(board: Board): Symbols {
    const traps: TrapSymbol[] = [];
    const items: ItemSymbol[] = [];
    const actors: ActorSymbol[] = [];

    const inRange = (x: number, y: number) => {
      return (
        x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.h
      );
    };

    for (const trap of board.traps) {
      const symbol = trap.symbol;
      if (!inRange(symbol.x, symbol.y)) continue;

      traps.push(symbol);
    }

    for (const item of board.items) {
      const symbol = item.symbol;
      if (!inRange(symbol.x, symbol.y)) continue;

      items.push(symbol);
    }
    for (const actor of board.actors) {
      const symbol = actor.symbol;
      if (!inRange(symbol.x, symbol.y)) continue;

      actors.push(symbol);
    }

    return {
      traps: traps,
      items: items,
      actors: actors,
    };
  }
}
