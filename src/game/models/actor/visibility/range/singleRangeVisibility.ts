import { VisibilityRange } from '.';

export class SingleRangeVisibility implements VisibilityRange {
  constructor(readonly _x: number, readonly _y: number) {}

  get x(): number {
    return this._x;
  }
  get y(): number {
    return this._y;
  }
  get w(): number {
    return 1;
  }
  get h(): number {
    return 1;
  }
}
