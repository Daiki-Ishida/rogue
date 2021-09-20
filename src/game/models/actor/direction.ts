export type DirectionKey = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export class Direction {
  constructor(public key: DirectionKey) {}

  static init(): Direction {
    return new Direction('DOWN');
  }

  get next(): { x: number; y: number } {
    return {
      UP: {
        x: 0,
        y: -1,
      },
      DOWN: {
        x: 0,
        y: 1,
      },
      LEFT: {
        x: -1,
        y: 0,
      },
      RIGHT: {
        x: 1,
        y: 0,
      },
    }[this.key];
  }

  set(key: DirectionKey): void {
    this.key = key;
  }
}
