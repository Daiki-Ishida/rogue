import { Board } from 'game/board';
import { Room } from 'game/dungeon/room';
import { Item } from 'game/models/item';
import { Trap } from 'game/models/trap';
import { Actor } from '../actor';
import {
  ActorRangeVisibility,
  FullRangeVisibility,
  RoomRangeVisibility,
  SingleRangeVisibility,
  VisibilityRange,
} from './range';

interface Symbols {
  traps: Trap[];
  items: Item[];
  actors: Actor[];
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
    const traps: Trap[] = [];
    const items: Item[] = [];
    const actors: Actor[] = [];

    const inRange = (x: number, y: number) => {
      return (
        x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.h
      );
    };

    for (const trap of board.traps) {
      const symbol = trap.symbol;
      if (!inRange(symbol.x, symbol.y)) continue;

      traps.push(trap);
    }

    for (const item of board.items) {
      const symbol = item.symbol;
      if (!inRange(symbol.x, symbol.y)) continue;

      items.push(item);
    }

    for (const actor of board.actors) {
      const symbol = actor.symbol;
      if (!inRange(symbol.x, symbol.y)) continue;

      actors.push(actor);
    }

    return {
      traps: traps,
      items: items,
      actors: actors,
    };
  }
}
